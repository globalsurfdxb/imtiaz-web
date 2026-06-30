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







// "use client";

// import { useEffect, useRef } from "react";
// import { useLenis } from "@/app/contexts/LenisContext";

// export function useSectionSnap(
//   sectionRefs: React.RefObject<HTMLElement | null>[],
//   enabled: boolean,
// ) {
//   const { lock, unlock, syncTo } = useLenis();

//   const currentIndexRef = useRef(0);
//   const isAnimatingRef = useRef(false);
//   const rafIdRef = useRef<number | null>(null);
//   const wasBelowRef = useRef(false);
//   const releasedRef = useRef(false);

//   const DURATION = 1600;

//   const easeInOutCubic = (t: number) =>
//     t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

//   useEffect(() => {
//     // Disable entirely on touch devices — snap is a desktop-only pattern
//     const isTouchDevice = window.matchMedia(
//       "(hover: none) and (pointer: coarse)",
//     ).matches;
//     if (!enabled || isTouchDevice) return;

//     const snapZoneBottom = (): number => {
//       const last = sectionRefs[sectionRefs.length - 1]?.current;
//       if (!last) return 0;
//       return last.offsetTop + last.offsetHeight;
//     };

//     const inSnapZone = (): boolean => window.scrollY < snapZoneBottom() - 50;

//     const animateTo = (targetY: number, onDone: () => void) => {
//       const startY = window.scrollY;
//       const distance = targetY - startY;
//       const startTime = performance.now();

//       if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);

//       const step = (now: number) => {
//         const elapsed = now - startTime;
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

//       const offset = Number(targetEl.dataset.snapOffset ?? 0);

//       isAnimatingRef.current = true;
//       currentIndexRef.current = nextIndex;

//       lock();

// animateTo(targetEl.offsetTop + offset, () => {
//         syncTo(targetEl.offsetTop);
//         requestAnimationFrame(() => {
//           unlock();
//           isAnimatingRef.current = false;
//         });
//       });
//     };

//     const release = () => {
//       releasedRef.current = true;
//       wasBelowRef.current = true;
//       syncTo(window.scrollY);
//       unlock();
//     };

//     const handleIntent = (isDown: boolean): boolean => {
//       if (releasedRef.current) {
//         if (!inSnapZone()) return false;
//         if (!isDown) {
//           releasedRef.current = false;
//           wasBelowRef.current = true;
//         } else {
//           return false;
//         }
//       }

//       if (!inSnapZone()) {
//         wasBelowRef.current = true;
//         return false;
//       }

//       if (wasBelowRef.current) {
//         wasBelowRef.current = false;
//         currentIndexRef.current = sectionRefs.length;
//       }

//       const atLast = currentIndexRef.current >= sectionRefs.length - 1;

//       if (atLast && isDown) {
//         release();
//         return false;
//       }

//       doSnap(isDown ? 1 : -1);
//       return true;
//     };

//     const onWheel = (e: WheelEvent) => {
//       const handled = handleIntent(e.deltaY > 0);
//       if (handled) e.preventDefault();
//     };

//     window.addEventListener("wheel", onWheel, { passive: false });

//     return () => {
//       window.removeEventListener("wheel", onWheel);
//       if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
//     };
//   }, [enabled, sectionRefs, lock, unlock, syncTo]);
// }







// "use client";

// import { useEffect, useRef } from "react";
// import { useLenis } from "@/app/contexts/LenisContext";

// const TOUCH_THRESHOLD = 30;

// export function useSectionSnap(
//   sectionRefs: React.RefObject<HTMLElement | null>[],
//   enabled: boolean,
// ) {
//   const { lock, unlock, syncTo } = useLenis();

//   const currentIndexRef = useRef(0);
//   const isAnimatingRef = useRef(false);
//   const rafIdRef = useRef<number | null>(null);
//   const wasBelowRef = useRef(false);
//   const releasedRef = useRef(false);
//   const touchStartYRef = useRef<number | null>(null);
//   const touchActiveRef = useRef(false); // true while finger is down in snap zone

//   const DURATION = 1600;

//   const easeInOutCubic = (t: number) =>
//     t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

//   useEffect(() => {
//     if (!enabled) return;

//     const snapZoneBottom = (): number => {
//       const last = sectionRefs[sectionRefs.length - 1]?.current;
//       if (!last) return 0;
//       return last.offsetTop + last.offsetHeight;
//     };

//     const inSnapZone = (): boolean => window.scrollY < snapZoneBottom() - 50;

//     const animateTo = (targetY: number, onDone: () => void) => {
//       const startY = window.scrollY;
//       const distance = targetY - startY;
//       const startTime = performance.now();

//       if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);

//       const step = (now: number) => {
//         const elapsed = now - startTime;
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
//       if (nextIndex < 0 || nextIndex >= sectionRefs.length) return;

//       const targetEl = sectionRefs[nextIndex]?.current;
//       if (!targetEl) return;

//       const offset = Number(targetEl.dataset.snapOffset ?? 0);

//       isAnimatingRef.current = true;
//       currentIndexRef.current = nextIndex;

//       lock();

//       animateTo(targetEl.offsetTop + offset, () => {
//         syncTo(targetEl.offsetTop);
//         requestAnimationFrame(() => {
//           unlock();
//           isAnimatingRef.current = false;
//         });
//       });
//     };

//     const release = () => {
//       releasedRef.current = true;
//       wasBelowRef.current = true;
//       syncTo(window.scrollY);
//       unlock();
//     };

//     const handleIntent = (isDown: boolean): boolean => {
//       if (releasedRef.current) {
//         if (!inSnapZone()) return false;
//         if (!isDown) {
//           releasedRef.current = false;
//           wasBelowRef.current = true;
//         } else {
//           return false;
//         }
//       }

//       if (!inSnapZone()) {
//         wasBelowRef.current = true;
//         return false;
//       }

//       if (wasBelowRef.current) {
//         wasBelowRef.current = false;
//         currentIndexRef.current = sectionRefs.length;
//       }

//       const atLast = currentIndexRef.current >= sectionRefs.length - 1;

//       if (atLast && isDown) {
//         release();
//         return false;
//       }

//       doSnap(isDown ? 1 : -1);
//       return true;
//     };

//     // ── Desktop ────────────────────────────────────────────────────────────────
//     const onWheel = (e: WheelEvent) => {
//       const handled = handleIntent(e.deltaY > 0);
//       if (handled) e.preventDefault();
//     };

//     // ── Mobile ─────────────────────────────────────────────────────────────────
//     const onTouchStart = (e: TouchEvent) => {
//       touchStartYRef.current = e.touches[0].clientY;
//       touchActiveRef.current = inSnapZone();

//       // Lock Lenis immediately so its smooth scroll doesn't run during the gesture
//   if (touchActiveRef.current && !releasedRef.current) {
//     lock();
//   }
//     };

//     const onTouchMove = (e: TouchEvent) => {
//       // Prevent native scroll entirely while finger is down in snap zone.
//       // This is the key fix — no browser scroll = nothing to fight against.
//   if (touchActiveRef.current && !releasedRef.current) {
//     e.preventDefault();
//   }
//     };

//     const onTouchEnd = (e: TouchEvent) => {
//       if (touchStartYRef.current === null) return;

//       const delta = touchStartYRef.current - e.changedTouches[0].clientY;
//       touchStartYRef.current = null;

//       if (!touchActiveRef.current) return;
//       touchActiveRef.current = false;

//       if (Math.abs(delta) < TOUCH_THRESHOLD) {
//         // Swipe too small — just resync and unlock, no snap
//         syncTo(window.scrollY);
//         unlock();
//         return;
//       }

//       // handleIntent calls doSnap which calls lock() again — that's fine, idempotent
//       const handled = handleIntent(delta > 0);
//       if (!handled) {
//         // handleIntent didn't snap (e.g. release case) — unlock already called inside
//         // but if it returned false without releasing, unlock here
//         if (!releasedRef.current) {
//           syncTo(window.scrollY);
//           unlock();
//         }
//       }
//     };

//     window.addEventListener("wheel", onWheel, { passive: false });
//     window.addEventListener("touchstart", onTouchStart, { passive: true });
//     // ← non-passive so we can preventDefault
//     window.addEventListener("touchmove", onTouchMove, { passive: false });
//     window.addEventListener("touchend", onTouchEnd, { passive: true });

//     return () => {
//       window.removeEventListener("wheel", onWheel);
//       window.removeEventListener("touchstart", onTouchStart);
//       window.removeEventListener("touchmove", onTouchMove);
//       window.removeEventListener("touchend", onTouchEnd);
//       if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
//     };
//   }, [enabled, sectionRefs, lock, unlock, syncTo]);
// }












// "use client";

// import { useEffect, useRef } from "react";
// import { useLenis } from "@/app/contexts/LenisContext";

// const TOUCH_THRESHOLD = 30;

// export function useSectionSnap(
//   sectionRefs: React.RefObject<HTMLElement | null>[],
//   enabled: boolean,
// ) {
//   const { lock, unlock, syncTo } = useLenis();

//   const currentIndexRef = useRef(0);
//   const isAnimatingRef = useRef(false);
//   const rafIdRef = useRef<number | null>(null);
//   const releasedRef = useRef(false);
//   const wasInZoneRef = useRef(false); // last known zone membership, updated by the scroll watcher
//   const touchStartYRef = useRef<number | null>(null);
//   const touchActiveRef = useRef(false); // true while finger is down AND we're already inside the zone

//   const DURATION = 1600;

//   const easeInOutCubic = (t: number) =>
//     t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

//   useEffect(() => {
//     if (!enabled) return;

//     const snapZoneBottom = (): number => {
//       const last = sectionRefs[sectionRefs.length - 1]?.current;
//       if (!last) return 0;
//       return last.offsetTop + last.offsetHeight;
//     };

//     const inSnapZone = (): boolean => window.scrollY < snapZoneBottom() - 50;

//     // Force iOS Safari to abort any in-flight momentum scroll.
//     const killMomentum = () => {
//       const body = document.body;
//       const prevOverflow = body.style.overflow;
//       body.style.overflow = "hidden";
//       // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//       body.offsetHeight; // force reflow
//       body.style.overflow = prevOverflow;
//     };

//     const nearestSectionIndex = (): number => {
//       let closest = 0;
//       let closestDist = Infinity;
//       sectionRefs.forEach((ref, i) => {
//         const el = ref.current;
//         if (!el) return;
//         const dist = Math.abs(el.offsetTop - window.scrollY);
//         if (dist < closestDist) {
//           closestDist = dist;
//           closest = i;
//         }
//       });
//       return closest;
//     };

//     const animateTo = (targetY: number, onDone: () => void) => {
//       const startY = window.scrollY;
//       const distance = targetY - startY;
//       const startTime = performance.now();

//       if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);

//       const step = (now: number) => {
//         const elapsed = now - startTime;
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

//     const snapToIndex = (index: number) => {
//       const targetEl = sectionRefs[index]?.current;
//       if (!targetEl) return;

//       const offset = Number(targetEl.dataset.snapOffset ?? 0);

//       isAnimatingRef.current = true;
//       currentIndexRef.current = index;

//       killMomentum();
//       lock();

//       animateTo(targetEl.offsetTop + offset, () => {
//         syncTo(targetEl.offsetTop);
//         requestAnimationFrame(() => {
//           unlock();
//           isAnimatingRef.current = false;
//         });
//       });
//     };

//     const doSnap = (direction: 1 | -1) => {
//       if (isAnimatingRef.current) return;

//       const nextIndex = currentIndexRef.current + direction;
//       if (nextIndex < 0 || nextIndex >= sectionRefs.length) return;

//       snapToIndex(nextIndex);
//     };

//     const release = () => {
//       releasedRef.current = true;
//       syncTo(window.scrollY);
//       unlock();
//     };

//     // ── Live scroll watcher ──────────────────────────────────────────────────
//     // Catches zone-boundary crossings regardless of input method: wheel,
//     // touch-drag, or unattended momentum after the finger has lifted.
//     // This is what the old touch-event-only detection missed entirely.
//     const onScroll = () => {
//       if (isAnimatingRef.current) return;
//       if (releasedRef.current) {
//         // Only re-arm once the user has scrolled back into the zone from below.
//         if (inSnapZone()) {
//           releasedRef.current = false;
//         } else {
//           wasInZoneRef.current = false;
//           return;
//         }
//       }

//       const nowInZone = inSnapZone();

//       if (nowInZone && !wasInZoneRef.current) {
//         // Crossed into the zone — from above (top of page) or from below
//         // (scrolling up out of normal content). Snap to the nearest section
//         // immediately, killing any native momentum that carried us here.
//         wasInZoneRef.current = true;
//         touchActiveRef.current = true;
//         currentIndexRef.current = nearestSectionIndex();
//         snapToIndex(currentIndexRef.current);
//       } else if (!nowInZone && wasInZoneRef.current) {
//         wasInZoneRef.current = false;
//         touchActiveRef.current = false;
//       }
//     };

//     const handleGestureIntent = (isDown: boolean): boolean => {
//       if (releasedRef.current) return false;
//       if (!inSnapZone()) return false;

//       const atLast = currentIndexRef.current >= sectionRefs.length - 1;
//       const atFirst = currentIndexRef.current <= 0;

//       if (atLast && isDown) {
//         release();
//         return false;
//       }
//       if (atFirst && !isDown) {
//         // Scrolling up past the first snap section — let it fall through
//         // to normal scroll (page top), scroll watcher will re-snap if needed.
//         return false;
//       }

//       doSnap(isDown ? 1 : -1);
//       return true;
//     };

//     // ── Desktop ────────────────────────────────────────────────────────────────
//     const onWheel = (e: WheelEvent) => {
//       if (!inSnapZone() || releasedRef.current) return;
//       const handled = handleGestureIntent(e.deltaY > 0);
//       if (handled) e.preventDefault();
//     };

//     // ── Mobile: only handles in-zone section-to-section gestures now.
//     // Zone *entry* detection is owned entirely by onScroll above.
//     const onTouchStart = (e: TouchEvent) => {
//       touchStartYRef.current = e.touches[0].clientY;
//       touchActiveRef.current = inSnapZone() && !releasedRef.current;
//     };

//     const onTouchMove = (e: TouchEvent) => {
//       if (touchActiveRef.current && !releasedRef.current) {
//         e.preventDefault();
//       }
//     };

//     const onTouchEnd = (e: TouchEvent) => {
//       if (touchStartYRef.current === null) return;

//       const delta = touchStartYRef.current - e.changedTouches[0].clientY;
//       touchStartYRef.current = null;

//       if (!touchActiveRef.current) return;
//       touchActiveRef.current = false;

//       if (Math.abs(delta) < TOUCH_THRESHOLD) {
//         syncTo(window.scrollY);
//         unlock();
//         return;
//       }

//       const handled = handleGestureIntent(delta > 0);
//       if (!handled && !releasedRef.current) {
//         syncTo(window.scrollY);
//         unlock();
//       }
//     };

//     window.addEventListener("scroll", onScroll, { passive: true });
//     window.addEventListener("wheel", onWheel, { passive: false });
//     window.addEventListener("touchstart", onTouchStart, { passive: true });
//     window.addEventListener("touchmove", onTouchMove, { passive: false });
//     window.addEventListener("touchend", onTouchEnd, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("wheel", onWheel);
//       window.removeEventListener("touchstart", onTouchStart);
//       window.removeEventListener("touchmove", onTouchMove);
//       window.removeEventListener("touchend", onTouchEnd);
//       if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
//     };
//   }, [enabled, sectionRefs, lock, unlock, syncTo]);
// }








// "use client";

// import { useEffect, useRef } from "react";
// import { useLenis } from "@/app/contexts/LenisContext";

// const TOUCH_THRESHOLD = 30;

// export function useSectionSnap(
//   sectionRefs: React.RefObject<HTMLElement | null>[],
//   enabled: boolean,
// ) {
//   const { lock, unlock, syncTo } = useLenis();

//   const currentIndexRef = useRef(0);
//   const isAnimatingRef = useRef(false);
//   const rafIdRef = useRef<number | null>(null);
//   const releasedRef = useRef(false);
//   const wasInZoneRef = useRef(false);
//   const touchStartYRef = useRef<number | null>(null);
//   const touchActiveRef = useRef(false);
//   const isTouchDownRef = useRef(false); // true for the entire duration a finger is on screen
//   const pendingSyncRef = useRef(false); // a syncTo/unlock was deferred because finger was down
//   const pendingKillMomentumRef = useRef(false); // a killMomentum was deferred for the same reason

//   const DURATION = 1600;

//   const easeInOutCubic = (t: number) =>
//     t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

//   useEffect(() => {
//     if (!enabled) return;

//     const snapZoneBottom = (): number => {
//       const last = sectionRefs[sectionRefs.length - 1]?.current;
//       if (!last) return 0;
//       return last.offsetTop + last.offsetHeight;
//     };

//     const inSnapZone = (): boolean => window.scrollY < snapZoneBottom() - 50;

//     // Force iOS Safari to abort any in-flight momentum scroll.
//     // Only safe to call when no finger is currently touching the screen —
//     // toggling overflow mid-touch causes the browser to fight the active
//     // gesture for one frame (visible as a shiver/stutter).
//     const killMomentum = () => {
//       if (isTouchDownRef.current) {
//         pendingKillMomentumRef.current = true;
//         return;
//       }
//       const body = document.body;
//       const prevOverflow = body.style.overflow;
//       body.style.overflow = "hidden";
//       // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//       body.offsetHeight; // force reflow
//       body.style.overflow = prevOverflow;
//     };

//     // Same deferral logic for the Lenis force-jump — calling syncTo while
//     // native touch scroll is still actively writing scrollY causes the
//     // two systems to race for one frame.
//     const safeSyncTo = (y: number) => {
//       if (isTouchDownRef.current) {
//         pendingSyncRef.current = true;
//         return;
//       }
//       syncTo(y);
//     };

//     const flushPendingTouchActions = () => {
//       if (pendingKillMomentumRef.current) {
//         pendingKillMomentumRef.current = false;
//         killMomentum();
//       }
//       if (pendingSyncRef.current) {
//         pendingSyncRef.current = false;
//         syncTo(window.scrollY);
//       }
//     };

//     const nearestSectionIndex = (): number => {
//       let closest = 0;
//       let closestDist = Infinity;
//       sectionRefs.forEach((ref, i) => {
//         const el = ref.current;
//         if (!el) return;
//         const dist = Math.abs(el.offsetTop - window.scrollY);
//         if (dist < closestDist) {
//           closestDist = dist;
//           closest = i;
//         }
//       });
//       return closest;
//     };

//     const animateTo = (targetY: number, onDone: () => void) => {
//       const startY = window.scrollY;
//       const distance = targetY - startY;
//       const startTime = performance.now();

//       if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);

//       const step = (now: number) => {
//         const elapsed = now - startTime;
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

//     const snapToIndex = (index: number) => {
//       const targetEl = sectionRefs[index]?.current;
//       if (!targetEl) return;

//       const offset = Number(targetEl.dataset.snapOffset ?? 0);

//       isAnimatingRef.current = true;
//       currentIndexRef.current = index;

//       killMomentum();
//       lock();

//       animateTo(targetEl.offsetTop + offset, () => {
//         safeSyncTo(targetEl.offsetTop);
//         requestAnimationFrame(() => {
//           unlock();
//           isAnimatingRef.current = false;
//         });
//       });
//     };

//     const doSnap = (direction: 1 | -1) => {
//       if (isAnimatingRef.current) return;

//       const nextIndex = currentIndexRef.current + direction;
//       if (nextIndex < 0 || nextIndex >= sectionRefs.length) return;

//       snapToIndex(nextIndex);
//     };

//     const release = () => {
//       releasedRef.current = true;
//       // NOTE: deliberately NOT calling safeSyncTo/lenis.scrollTo(immediate)
//       // here. Lenis has a known issue (darkroomengineering/lenis#443) where
//       // scrollTo(immediate: true) can leave the instance in a stalled state
//       // until the next manual scroll input, which produces exactly the
//       // stick-then-jump feel reported here. window.scrollY is already at
//       // the correct position from the raw rAF snap animation, so we only
//       // need Lenis to resume — it will read the real native scroll position
//       // on its next raf tick without needing to be told to jump anywhere.
//       requestAnimationFrame(() => {
//         unlock();
//       });
//     };

//     // ── Live scroll watcher ──────────────────────────────────────────────────
//     const onScroll = () => {
//       if (isAnimatingRef.current) return;
//       if (releasedRef.current) {
//         if (inSnapZone()) {
//           releasedRef.current = false;
//         } else {
//           wasInZoneRef.current = false;
//           return;
//         }
//       }

//       const nowInZone = inSnapZone();

//       if (nowInZone && !wasInZoneRef.current) {
//         wasInZoneRef.current = true;
//         touchActiveRef.current = true;
//         currentIndexRef.current = nearestSectionIndex();
//         snapToIndex(currentIndexRef.current);
//       } else if (!nowInZone && wasInZoneRef.current) {
//         wasInZoneRef.current = false;
//         touchActiveRef.current = false;
//       }
//     };

//     const handleGestureIntent = (isDown: boolean): boolean => {
//       if (releasedRef.current) return false;
//       if (!inSnapZone()) return false;

//       const atLast = currentIndexRef.current >= sectionRefs.length - 1;
//       const atFirst = currentIndexRef.current <= 0;

//       if (atLast && isDown) {
//         release();
//         return false;
//       }
//       if (atFirst && !isDown) {
//         return false;
//       }

//       doSnap(isDown ? 1 : -1);
//       return true;
//     };

//     // ── Desktop ────────────────────────────────────────────────────────────────
//     const onWheel = (e: WheelEvent) => {
//       if (!inSnapZone() || releasedRef.current) return;
//       const handled = handleGestureIntent(e.deltaY > 0);
//       if (handled) e.preventDefault();
//     };

//     // ── Mobile ─────────────────────────────────────────────────────────────────
//     const onTouchStart = (e: TouchEvent) => {
//       isTouchDownRef.current = true;
//       touchStartYRef.current = e.touches[0].clientY;
//       touchActiveRef.current = inSnapZone() && !releasedRef.current;
//     };

//     const onTouchMove = (e: TouchEvent) => {
//       if (touchActiveRef.current && !releasedRef.current) {
//         e.preventDefault();
//       }
//     };

//     const onTouchEnd = (e: TouchEvent) => {
//       isTouchDownRef.current = false;

//       if (touchStartYRef.current === null) {
//         flushPendingTouchActions();
//         return;
//       }

//       const delta = touchStartYRef.current - e.changedTouches[0].clientY;
//       touchStartYRef.current = null;

//       if (!touchActiveRef.current) {
//         flushPendingTouchActions();
//         return;
//       }
//       touchActiveRef.current = false;

//       if (Math.abs(delta) < TOUCH_THRESHOLD) {
//         safeSyncTo(window.scrollY);
//         unlock();
//         flushPendingTouchActions();
//         return;
//       }

//       const handled = handleGestureIntent(delta > 0);
//       if (!handled && !releasedRef.current) {
//         safeSyncTo(window.scrollY);
//         unlock();
//       }

//       // Finger is now up — any DOM mutations deferred during this gesture
//       // (or the one that just fired above) are now safe to flush.
//       flushPendingTouchActions();
//     };

//     window.addEventListener("scroll", onScroll, { passive: true });
//     window.addEventListener("wheel", onWheel, { passive: false });
//     window.addEventListener("touchstart", onTouchStart, { passive: true });
//     window.addEventListener("touchmove", onTouchMove, { passive: false });
//     window.addEventListener("touchend", onTouchEnd, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("wheel", onWheel);
//       window.removeEventListener("touchstart", onTouchStart);
//       window.removeEventListener("touchmove", onTouchMove);
//       window.removeEventListener("touchend", onTouchEnd);
//       if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
//     };
//   }, [enabled, sectionRefs, lock, unlock, syncTo]);
// }





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

  const DURATION = 1600;

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

      isAnimatingRef.current = true;
      currentIndexRef.current = index;

      killMomentum();
      lock();

      animateTo(targetEl.offsetTop + offset, () => {
        safeSyncTo(targetEl.offsetTop);
        requestAnimationFrame(() => {
          unlock();
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