// "use client";

// import { useEffect, useRef } from "react";
// import { useLenis } from "@/app/contexts/LenisContext";

// export function useSectionSnap(
//   sectionRefs: React.RefObject<HTMLElement | null>[],
//   enabled: boolean,
// ) {
//   const { lock, unlock } = useLenis();

//   const currentIndexRef = useRef(0);
//   const isAnimatingRef  = useRef(false);
//   const rafIdRef        = useRef<number | null>(null);
//   const touchStartYRef  = useRef(0);

//   const DURATION = 1000;

//   const easeInOutCubic = (t: number) =>
//     t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

//   useEffect(() => {
//     if (!enabled) return;

//     // ── helpers ──────────────────────────────────────────────────────────────

//     /** offsetTop of the last snap section's bottom edge */
//     const snapZoneBottom = (): number => {
//       const last = sectionRefs[sectionRefs.length - 1]?.current;
//       if (!last) return 0;
//       return last.offsetTop + last.offsetHeight;
//     };

//     /** true only when scrollY is inside the 4 snap sections */
//     const inSnapZone = (): boolean =>
//       window.scrollY < snapZoneBottom() - 50;

//     // ── animation ────────────────────────────────────────────────────────────

//     const animateTo = (targetY: number, onDone: () => void) => {
//       const startY    = window.scrollY;
//       const distance  = targetY - startY;
//       const startTime = performance.now();

//       if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);

//       const step = (now: number) => {
//         const elapsed  = now - startTime;
//         const progress = Math.min(elapsed / DURATION, 1);
//         window.scrollTo(0, startY + distance * easeInOutCubic(progress));

//         if (progress < 1) {
//           rafIdRef.current = requestAnimationFrame(step);
//         } else {
//           window.scrollTo(0, targetY);
//           rafIdRef.current = null;
//           onDone();
//         }
//       };

//       rafIdRef.current = requestAnimationFrame(step);
//     };

//     const doSnap = (direction: 1 | -1) => {
//       if (isAnimatingRef.current) return;

//       const nextIndex = currentIndexRef.current + direction;

//       if (nextIndex < 0) return;
//       if (nextIndex >= sectionRefs.length) return;

//       const targetEl = sectionRefs[nextIndex]?.current;
//       if (!targetEl) return;

//       isAnimatingRef.current = true;
//       currentIndexRef.current = nextIndex;

//       lock();

//       animateTo(targetEl.offsetTop, () => {
//         unlock();
//         isAnimatingRef.current = false;
//       });
//     };

//     // ── wheel ────────────────────────────────────────────────────────────────

//     const onWheel = (e: WheelEvent) => {
//       const isDown = e.deltaY > 0;

//       // Below snap zone entirely → free scroll in both directions, no intercept
//       if (!inSnapZone()) {
//         // But if user is scrolling up and re-entering the snap zone bottom,
//         // reset index to last so they snap back through sections correctly.
//         // We detect "just crossed back in" by checking previous scrollY next frame —
//         // simpler: just don't intercept below snap zone at all.
//         return;
//       }

//       const atLast = currentIndexRef.current >= sectionRefs.length - 1;

//       // At last snap section scrolling down → release into free scroll
//       if (atLast && isDown) {
//         unlock();
//         return;
//       }

//       e.preventDefault();
//       doSnap(isDown ? 1 : -1);
//     };

//     // ── touch ────────────────────────────────────────────────────────────────

//     const onTouchStart = (e: TouchEvent) => {
//       touchStartYRef.current = e.touches[0].clientY;
//     };

//     const onTouchEnd = (e: TouchEvent) => {
//       const delta  = touchStartYRef.current - e.changedTouches[0].clientY;
//       if (Math.abs(delta) < 40) return;

//       if (!inSnapZone()) return;

//       const isDown = delta > 0;
//       const atLast = currentIndexRef.current >= sectionRefs.length - 1;

//       if (atLast && isDown) {
//         unlock();
//         return;
//       }

//       e.preventDefault();
//       doSnap(isDown ? 1 : -1);
//     };

//     // ── scroll listener: keep currentIndex honest ─────────────────────────
//     // When user is in free-scroll territory and scrolls back up near the snap
//     // zone, reset currentIndex to last so if they re-enter the snap zone from
//     // below via free Lenis scroll, the index is correct.

//     const onScroll = () => {
//       if (isAnimatingRef.current) return;
//       if (!inSnapZone()) {
//         // Below snap zone — ensure index is pinned to last
//         currentIndexRef.current = sectionRefs.length - 1;
//       }
//     };

//     window.addEventListener("wheel",      onWheel,      { passive: false });
//     window.addEventListener("touchstart", onTouchStart, { passive: true  });
//     window.addEventListener("touchend",   onTouchEnd,   { passive: false });
//     window.addEventListener("scroll",     onScroll,     { passive: true  });

//     return () => {
//       window.removeEventListener("wheel",      onWheel);
//       window.removeEventListener("touchstart", onTouchStart);
//       window.removeEventListener("touchend",   onTouchEnd);
//       window.removeEventListener("scroll",     onScroll);
//       if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
//     };
//   }, [enabled, sectionRefs, lock, unlock]);
// }



"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "@/app/contexts/LenisContext";

export function useSectionSnap(
  sectionRefs: React.RefObject<HTMLElement | null>[],
  enabled: boolean,
) {
  const { lock, unlock, syncTo } = useLenis();

  const currentIndexRef = useRef(0);
  const isAnimatingRef  = useRef(false);
  const rafIdRef        = useRef<number | null>(null);
  const wasBelowRef     = useRef(false);
  const releasedRef     = useRef(false);

  // Touch
  const touchStartYRef    = useRef(0);
  const touchStartXRef    = useRef(0);
  const touchBlockedRef   = useRef(false); // true = we own this touch sequence

  const DURATION = 1600;

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  useEffect(() => {
    if (!enabled) return;

    // ── helpers ──────────────────────────────────────────────────────────────

    const snapZoneBottom = (): number => {
      const last = sectionRefs[sectionRefs.length - 1]?.current;
      if (!last) return 0;
      return last.offsetTop + last.offsetHeight;
    };

    const inSnapZone = (): boolean =>
      window.scrollY < snapZoneBottom() - 50;

    // ── animation ────────────────────────────────────────────────────────────

    const animateTo = (targetY: number, onDone: () => void) => {
      const startY    = window.scrollY;
      const distance  = targetY - startY;
      const startTime = performance.now();

      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);

      const step = (now: number) => {
        const elapsed  = now - startTime;
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

    const doSnap = (direction: 1 | -1) => {
      if (isAnimatingRef.current) return;

      const nextIndex = currentIndexRef.current + direction;

      if (nextIndex < 0) return;
      if (nextIndex >= sectionRefs.length) return;

      const targetEl = sectionRefs[nextIndex]?.current;
      if (!targetEl) return;

      isAnimatingRef.current  = true;
      currentIndexRef.current = nextIndex;

      lock();

      animateTo(targetEl.offsetTop, () => {
        syncTo(targetEl.offsetTop);
        requestAnimationFrame(() => {
          unlock();
          isAnimatingRef.current = false;
        });
      });
    };

    const release = () => {
      releasedRef.current = true;
      wasBelowRef.current = true;
      syncTo(window.scrollY);
      unlock();
    };

    // ── shared snap-or-release logic ──────────────────────────────────────────
    // Returns true if the event was handled (caller should preventDefault),
    // false if it should pass through freely.

    const handleIntent = (isDown: boolean): boolean => {
      // Re-engage from released state
      if (releasedRef.current) {
        if (!inSnapZone()) return false;
        if (!isDown) {
          releasedRef.current     = false;
          wasBelowRef.current     = true;
        } else {
          return false; // inside zone scrolling down while released → free
        }
      }

      // Below snap zone → free
      if (!inSnapZone()) {
        wasBelowRef.current = true;
        return false;
      }

      // Just re-entered from below → reset index to one past last
      if (wasBelowRef.current) {
        wasBelowRef.current     = false;
        currentIndexRef.current = sectionRefs.length;
      }

      const atLast = currentIndexRef.current >= sectionRefs.length - 1;

      // At last section scrolling down → hand off to free scroll
      if (atLast && isDown) {
        release();
        return false;
      }

      doSnap(isDown ? 1 : -1);
      return true; // we handled it
    };

    // ── wheel (desktop) ───────────────────────────────────────────────────────

    const onWheel = (e: WheelEvent) => {
      const handled = handleIntent(e.deltaY > 0);
      if (handled) e.preventDefault();
    };

    // ── touch (mobile) ────────────────────────────────────────────────────────
    // Strategy:
    // - On touchstart: record position, reset ownership flag
    // - On touchmove: once we know direction (>10px vertical delta),
    //   decide if we own this sequence. If yes, preventDefault every move.
    // - On touchend: if we own it, fire the snap.
    // This prevents the browser's native momentum scroll from fighting our rAF.

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current  = e.touches[0].clientY;
      touchStartXRef.current  = e.touches[0].clientX;
      touchBlockedRef.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isAnimatingRef.current) {
        // During our animation, block ALL native scroll
        e.preventDefault();
        return;
      }

      const dy = touchStartYRef.current - e.touches[0].clientY;
      const dx = touchStartXRef.current - e.touches[0].clientX;

      // Ignore horizontal swipes (Swiper)
      if (Math.abs(dx) > Math.abs(dy)) return;

      // Wait for a minimum vertical intent
      if (Math.abs(dy) < 10) return;

      const isDown = dy > 0;

      // Check if we should own this sequence
      const wouldHandle =
        !releasedRef.current &&
        inSnapZone() &&
        !(currentIndexRef.current >= sectionRefs.length - 1 && isDown);

      if (wouldHandle) {
        touchBlockedRef.current = true;
        e.preventDefault(); // block native scroll for this move
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchStartYRef.current - e.changedTouches[0].clientY;
      const dx = touchStartXRef.current - e.changedTouches[0].clientX;

      // Ignore horizontal swipes
      if (Math.abs(dx) > Math.abs(dy)) return;

      // Ignore micro-swipes
      if (Math.abs(dy) < 40) return;

      // Only fire snap if we owned this touch sequence
      if (!touchBlockedRef.current) return;

      touchBlockedRef.current = false;
      handleIntent(dy > 0);
    };

    window.addEventListener("wheel",      onWheel,      { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true  });
    window.addEventListener("touchmove",  onTouchMove,  { passive: false });
    window.addEventListener("touchend",   onTouchEnd,   { passive: true  });

    return () => {
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
      window.removeEventListener("touchend",   onTouchEnd);
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [enabled, sectionRefs, lock, unlock, syncTo]);
}