// "use client";

// import { createContext, useContext, useEffect, useRef } from "react";
// import Lenis from "lenis";

// type LenisContextType = {
//   lock: () => void;
//   unlock: () => void;
//   scrollTo: (target: number, options?: { duration?: number }) => void;
// };

// const LenisContext = createContext<LenisContextType>({
//   lock: () => {},
//   unlock: () => {},
//   scrollTo: () => {},
// });

// export const useLenis = () => useContext(LenisContext);

// export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
//   const lenisRef = useRef<Lenis | null>(null);
//   const pendingRef = useRef<(() => void)[]>([]);

//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.5,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       smoothWheel: true,
//     });

//     lenisRef.current = lenis;
//     lenis.stop();

//     pendingRef.current.forEach((fn) => fn());
//     pendingRef.current = [];

//     let rafId: number;
//     function raf(time: number) {
//       lenis.raf(time);
//       rafId = requestAnimationFrame(raf);
//     }
//     rafId = requestAnimationFrame(raf);

//     return () => {
//       cancelAnimationFrame(rafId);
//       lenis.destroy();
//     };
//   }, []);

//   const lock = () => lenisRef.current?.stop();

//   const unlock = () => {
//     if (lenisRef.current) {
//       lenisRef.current.start();
//     } else {
//       pendingRef.current.push(() => lenisRef.current?.start());
//     }
//   };

//   const scrollTo = (target: number, options?: { duration?: number }) => {
//     if (lenisRef.current) {
//       lenisRef.current.scrollTo(target, options);
//     }
//   };

//   return (
//     <LenisContext.Provider value={{ lock, unlock, scrollTo }}>
//       {children}
//     </LenisContext.Provider>
//   );
// };



// "use client";

// import { createContext, useContext, useEffect, useRef } from "react";
// import { usePathname } from "next/navigation"; // 👈 add this
// import Lenis from "lenis";

// type LenisContextType = {
//   lock: () => void;
//   unlock: () => void;
//   scrollTo: (target: number, options?: { duration?: number }) => void;
// };

// const LenisContext = createContext<LenisContextType>({
//   lock: () => {},
//   unlock: () => {},
//   scrollTo: () => {},
// });

// export const useLenis = () => useContext(LenisContext);

// export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
//   const lenisRef = useRef<Lenis | null>(null);
//   const pendingRef = useRef<(() => void)[]>([]);
//   const pathname = usePathname(); // 👈 track route

// useEffect(() => {
//   const lenis = new Lenis({
//     duration: 1.5,
//     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//     smoothWheel: true,
//     overscroll: false, // 👈
//   });

//   lenisRef.current = lenis;
//   lenis.stop();

//   pendingRef.current.forEach((fn) => fn());
//   pendingRef.current = [];

//   let rafId: number;
//   function raf(time: number) {
//     lenis.raf(time);
//     rafId = requestAnimationFrame(raf);
//   }
//   rafId = requestAnimationFrame(raf);

//   // 👇 Wait for full paint then recalculate scroll height
//   const resizeTimer = setTimeout(() => {
//     lenis.resize();
//   }, 300);

//   return () => {
//     cancelAnimationFrame(rafId);
//     clearTimeout(resizeTimer);
//     lenis.destroy();
//   };
// }, []);

// // Reset scroll + recalculate on every route change
// useEffect(() => {
//   if (!lenisRef.current) return;

//   lenisRef.current.scrollTo(0, { immediate: true });

//   // 👇 Recalculate scroll bounds after new page content paints
//   const resizeTimer = setTimeout(() => {
//     lenisRef.current?.resize();
//   }, 300);

//   return () => clearTimeout(resizeTimer);
// }, [pathname]);

//   const lock = () => lenisRef.current?.stop();

//   const unlock = () => {
//     if (lenisRef.current) {
//       lenisRef.current.start();
//     } else {
//       pendingRef.current.push(() => lenisRef.current?.start());
//     }
//   };

//   const scrollTo = (target: number, options?: { duration?: number }) => {
//     if (lenisRef.current) {
//       lenisRef.current.scrollTo(target, options);
//     }
//   };

//   return (
//     <LenisContext.Provider value={{ lock, unlock, scrollTo }}>
//       {children}
//     </LenisContext.Provider>
//   );
// };


// "use client";

// import { createContext, useContext, useEffect, useRef } from "react";
// import { usePathname } from "next/navigation";
// import Lenis from "lenis";

// type LenisContextType = {
//   lock: () => void;
//   unlock: () => void;
//   scrollTo: (target: number, options?: { duration?: number }) => void;
//   isProgrammaticScroll: React.MutableRefObject<boolean>;
// };

// const LenisContext = createContext<LenisContextType>({
//   lock: () => {},
//   unlock: () => {},
//   scrollTo: () => {},
//   isProgrammaticScroll: { current: false },
// });

// export const useLenis = () => useContext(LenisContext);

// export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
//   const lenisRef = useRef<Lenis | null>(null);
//   const pendingRef = useRef<(() => void)[]>([]);
//   const isProgrammaticScroll = useRef(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.5,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       smoothWheel: true,
//       overscroll: false,
//     });

//     lenisRef.current = lenis;
//     lenis.stop();

//     pendingRef.current.forEach((fn) => fn());
//     pendingRef.current = [];

//     let rafId: number;
//     function raf(time: number) {
//       lenis.raf(time);
//       rafId = requestAnimationFrame(raf);
//     }
//     rafId = requestAnimationFrame(raf);

//     const resizeTimer = setTimeout(() => {
//       lenis.resize();
//     }, 300);

//     return () => {
//       cancelAnimationFrame(rafId);
//       clearTimeout(resizeTimer);
//       lenis.destroy();
//     };
//   }, []);

//   useEffect(() => {
//     if (!lenisRef.current) return;
//     lenisRef.current.scrollTo(0, { immediate: true });

//     const resizeTimer = setTimeout(() => {
//       lenisRef.current?.resize();
//     }, 300);

//     return () => clearTimeout(resizeTimer);
//   }, [pathname]);

//   const lock = () => lenisRef.current?.stop();

//   const unlock = () => {
//     if (lenisRef.current) {
//       lenisRef.current.start();
//     } else {
//       pendingRef.current.push(() => lenisRef.current?.start());
//     }
//   };

//   const scrollTo = (target: number, options?: { duration?: number }) => {
//     if (lenisRef.current) {
//       isProgrammaticScroll.current = true;
//       lenisRef.current.scrollTo(target, {
//         ...options,
//         onComplete: () => {
//           isProgrammaticScroll.current = false;
//         },
//       });
//     }
//   };

//   return (
//     <LenisContext.Provider value={{ lock, unlock, scrollTo, isProgrammaticScroll }}>
//       {children}
//     </LenisContext.Provider>
//   );
// };

"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

type LenisContextType = {
  lock: () => void;
  unlock: () => void;
  scrollTo: (target: number, options?: { duration?: number }) => void;
  syncTo: (y: number) => void; // force-sync Lenis internal state, no animation
  isProgrammaticScroll: React.MutableRefObject<boolean>;
};

const LenisContext = createContext<LenisContextType>({
  lock: () => {},
  unlock: () => {},
  scrollTo: () => {},
  syncTo: () => {},
  isProgrammaticScroll: { current: false },
});

export const useLenis = () => useContext(LenisContext);

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const pendingRef = useRef<(() => void)[]>([]);
  const isProgrammaticScroll = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      overscroll: false,
    });

    lenisRef.current = lenis;
    lenis.stop();

    pendingRef.current.forEach((fn) => fn());
    pendingRef.current = [];

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const resizeTimer = setTimeout(() => {
      lenis.resize();
    }, 300);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;
    lenisRef.current.scrollTo(0, { immediate: true });

    const resizeTimer = setTimeout(() => {
      lenisRef.current?.resize();
    }, 300);

    return () => clearTimeout(resizeTimer);
  }, [pathname]);

  const lock = () => lenisRef.current?.stop();

  const unlock = () => {
    if (lenisRef.current) {
      lenisRef.current.start();
    } else {
      pendingRef.current.push(() => lenisRef.current?.start());
    }
  };

  const scrollTo = (target: number, options?: { duration?: number }) => {
    if (lenisRef.current) {
      isProgrammaticScroll.current = true;
      lenisRef.current.scrollTo(target, {
        ...options,
        onComplete: () => {
          isProgrammaticScroll.current = false;
        },
      });
    }
  };

  /**
   * syncTo — reset Lenis's internal scroll target to `y` with no animation.
   * Call this before unlock() after a native rAF scroll so Lenis wakes up
   * already synced to the current position instead of jerking to reconcile.
   */
  const syncTo = (y: number) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(y, { immediate: true });
    }
  };

  return (
    <LenisContext.Provider value={{ lock, unlock, scrollTo, syncTo, isProgrammaticScroll }}>
      {children}
    </LenisContext.Provider>
  );
};