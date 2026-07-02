"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "@/app/contexts/LenisContext";

const TOUCH_THRESHOLD = 30;

export function useSectionSnap(
  sectionRefs: React.RefObject<HTMLElement | null>[],
  enabled: boolean,
) {
  const { lock, unlock, syncTo } = useLenis();

  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const releasedRef = useRef(false);
  const wasInZoneRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const touchActiveRef = useRef(false);
  const isTouchDownRef = useRef(false); // true for the entire duration a finger is on screen
  const pendingSyncRef = useRef(false); // a syncTo/unlock was deferred because finger was down
  const pendingKillMomentumRef = useRef(false); // a killMomentum was deferred for the same reason

  const DURATION = 800;

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  useEffect(() => {
    if (!enabled) return;

    const snapZoneBottom = (): number => {
      const last = sectionRefs[sectionRefs.length - 1]?.current;
      if (!last) return 0;
      return last.offsetTop + last.offsetHeight;
    };

    const inSnapZone = (): boolean => window.scrollY < snapZoneBottom() - 50;

    // Force iOS Safari to abort any in-flight momentum scroll.
    // Only safe to call when no finger is currently touching the screen —
    // toggling overflow mid-touch causes the browser to fight the active
    // gesture for one frame (visible as a shiver/stutter).
    const killMomentum = () => {
      if (isTouchDownRef.current) {
        pendingKillMomentumRef.current = true;
        return;
      }
      const body = document.body;
      const prevOverflow = body.style.overflow;
      body.style.overflow = "hidden";
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      body.offsetHeight; // force reflow
      body.style.overflow = prevOverflow;
    };

    // Same deferral logic for the Lenis force-jump — calling syncTo while
    // native touch scroll is still actively writing scrollY causes the
    // two systems to race for one frame.
    const safeSyncTo = (y: number) => {
      if (isTouchDownRef.current) {
        pendingSyncRef.current = true;
        return;
      }
      syncTo(y);
    };

    const flushPendingTouchActions = () => {
      if (pendingKillMomentumRef.current) {
        pendingKillMomentumRef.current = false;
        killMomentum();
      }
      if (pendingSyncRef.current) {
        pendingSyncRef.current = false;
        syncTo(window.scrollY);
      }
    };

    const nearestSectionIndex = (): number => {
      let closest = 0;
      let closestDist = Infinity;
      sectionRefs.forEach((ref, i) => {
        const el = ref.current;
        if (!el) return;
        const dist = Math.abs(el.offsetTop - window.scrollY);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      return closest;
    };

    const animateTo = (targetY: number, onDone: () => void) => {
      const startY = window.scrollY;
      const distance = targetY - startY;
      const startTime = performance.now();

      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / DURATION, 1);
        window.scrollTo(0, startY + distance * easeInOutCubic(progress));

        if (progress < 1) {
          rafIdRef.current = requestAnimationFrame(step);
        } else {
          window.scrollTo(0, targetY);
          rafIdRef.current = null;
          onDone();
        }
      };

      rafIdRef.current = requestAnimationFrame(step);
    };

const snapToIndex = (index: number) => {
  const targetEl = sectionRefs[index]?.current;
  if (!targetEl) return;

  const offset = Number(targetEl.dataset.snapOffset ?? 0);
  const finalY = targetEl.offsetTop + offset;   // single source of truth

  isAnimatingRef.current = true;
  currentIndexRef.current = index;

  killMomentum();
  lock();

  animateTo(finalY, () => {
    requestAnimationFrame(() => {
      unlock();               // start Lenis first...
      safeSyncTo(finalY);     // ...then sync it to the SAME target the animation landed on
      isAnimatingRef.current = false;
    });
  });
};

    const doSnap = (direction: 1 | -1) => {
      if (isAnimatingRef.current) return;

      const nextIndex = currentIndexRef.current + direction;
      if (nextIndex < 0 || nextIndex >= sectionRefs.length) return;

      snapToIndex(nextIndex);
    };

    const release = () => {
      releasedRef.current = true;
      // NOTE: deliberately NOT calling safeSyncTo/lenis.scrollTo(immediate)
      // here. Lenis has a known issue (darkroomengineering/lenis#443) where
      // scrollTo(immediate: true) can leave the instance in a stalled state
      // until the next manual scroll input, which produces exactly the
      // stick-then-jump feel reported here. window.scrollY is already at
      // the correct position from the raw rAF snap animation, so we only
      // need Lenis to resume — it will read the real native scroll position
      // on its next raf tick without needing to be told to jump anywhere.
      requestAnimationFrame(() => {
        unlock();
      });
    };

    // ── Live scroll watcher ──────────────────────────────────────────────────
    const onScroll = () => {
      if (isAnimatingRef.current) return;

      let justRearmed = false;
      if (releasedRef.current) {
        if (inSnapZone()) {
          releasedRef.current = false;
          justRearmed = true;
        } else {
          wasInZoneRef.current = false;
          return;
        }
      }

      const nowInZone = inSnapZone();

      if (nowInZone && !wasInZoneRef.current) {
        wasInZoneRef.current = true;
        touchActiveRef.current = true;

        if (justRearmed) {
          // Re-entering from below, possibly mid fast-scroll/momentum.
          // killMomentum() first to stop the browser's in-flight native
          // scroll, then wait one frame before starting our own rAF snap
          // animation — committing on the same tick that flipped
          // releasedRef races any already-queued native scroll events
          // still mutating scrollY, which is the source of the shiver.
          killMomentum();
          lock();
          requestAnimationFrame(() => {
            const index = nearestSectionIndex();
            currentIndexRef.current = index;
            snapToIndex(index);
          });
        } else {
          currentIndexRef.current = nearestSectionIndex();
          snapToIndex(currentIndexRef.current);
        }
      } else if (!nowInZone && wasInZoneRef.current) {
        wasInZoneRef.current = false;
        touchActiveRef.current = false;
      }
    };

    const handleGestureIntent = (isDown: boolean): boolean => {
      if (releasedRef.current) return false;
      if (!inSnapZone()) return false;

      const atLast = currentIndexRef.current >= sectionRefs.length - 1;
      const atFirst = currentIndexRef.current <= 0;

      if (atLast && isDown) {
        release();
        return false;
      }
      if (atFirst && !isDown) {
        return false;
      }

      doSnap(isDown ? 1 : -1);
      return true;
    };

    // ── Desktop ────────────────────────────────────────────────────────────────
    const onWheel = (e: WheelEvent) => {
      if (!inSnapZone() || releasedRef.current) return;
      const handled = handleGestureIntent(e.deltaY > 0);
      if (handled) e.preventDefault();
    };

    // ── Mobile ─────────────────────────────────────────────────────────────────
    const onTouchStart = (e: TouchEvent) => {
      isTouchDownRef.current = true;
      touchStartYRef.current = e.touches[0].clientY;
      touchActiveRef.current = inSnapZone() && !releasedRef.current;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchActiveRef.current && !releasedRef.current) {
        e.preventDefault();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      isTouchDownRef.current = false;

      if (touchStartYRef.current === null) {
        flushPendingTouchActions();
        return;
      }

      const delta = touchStartYRef.current - e.changedTouches[0].clientY;
      touchStartYRef.current = null;

      if (!touchActiveRef.current) {
        flushPendingTouchActions();
        return;
      }
      touchActiveRef.current = false;

      if (Math.abs(delta) < TOUCH_THRESHOLD) {
        safeSyncTo(window.scrollY);
        unlock();
        flushPendingTouchActions();
        return;
      }

      const handled = handleGestureIntent(delta > 0);
      if (!handled && !releasedRef.current) {
        safeSyncTo(window.scrollY);
        unlock();
      }

      // Finger is now up — any DOM mutations deferred during this gesture
      // (or the one that just fired above) are now safe to flush.
      flushPendingTouchActions();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [enabled, sectionRefs, lock, unlock, syncTo]);
}
