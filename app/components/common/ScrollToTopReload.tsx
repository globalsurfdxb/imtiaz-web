// "use client";

// import { useEffect } from "react";
// import { useSmoothScrollContext } from "../../contexts/smoothScrollContext";

// export default function ScrollToTopReload() {
//   const { setSmoothScrollActive } = useSmoothScrollContext();
//   setSmoothScrollActive(false);
//   useEffect(() => {
//     if ("scrollRestoration" in window.history) {
//       window.history.scrollRestoration = "manual";
//     }

//     // 1. After hydration
//     setTimeout(() => {
//       window.scrollTo(0, 0);
//     }, 200);

//     // 2. After page fully loads
//     const onLoad = () => window.scrollTo(0, 0);
//     window.addEventListener("load", onLoad);
//     // setSmoothScrollActive(true)

//     return () => window.removeEventListener("load", onLoad);
//   }, []);

//   return null;
// }





// "use client";

// import { useEffect } from "react";
// import { useSmoothScrollContext } from "../../contexts/smoothScrollContext";

// export default function ScrollToTopReload() {
//   const { setSmoothScrollActive } = useSmoothScrollContext();

//   useEffect(() => {
//     setSmoothScrollActive(false);

//     // Disable default scroll restore
//     if ("scrollRestoration" in history) {
//       history.scrollRestoration = "manual";
//     }

//     // 1️⃣ Prevent Chrome from saving scroll position
//     const stopSave = () => {
//       history.scrollRestoration = "manual";
//       window.scrollTo(0, 0);
//     };
//     window.addEventListener("beforeunload", stopSave);

//     // 2️⃣ Force scroll reset AFTER Chrome’s restore
//     requestAnimationFrame(() => {
//       requestAnimationFrame(() => {
//         window.scrollTo(0, 0);
//       });
//     });

//     // 3️⃣ One more on full load
//     const onLoad = () => window.scrollTo(0, 0);
//     window.addEventListener("load", onLoad);

//     return () => {
//       window.removeEventListener("beforeunload", stopSave);
//       window.removeEventListener("load", onLoad);
//     };
//   }, []);

//   return null;
// }





// "use client";

// import { useEffect } from "react";
// import { useLenis } from "../../contexts/LenisContext";

// export default function ScrollToTopReload() {
//   const { lock } = useLenis();

//   useEffect(() => { 
//     lock(); // lock scroll on home page load

//     if ("scrollRestoration" in history) {
//       history.scrollRestoration = "manual";
//     }

//     const stopSave = () => {
//       history.scrollRestoration = "manual";
//       window.scrollTo(0, 0);
//     };
//     window.addEventListener("beforeunload", stopSave);

//     requestAnimationFrame(() => {
//       requestAnimationFrame(() => {
//         window.scrollTo(0, 0);
//       });
//     });

//     const onLoad = () => window.scrollTo(0, 0);
//     window.addEventListener("load", onLoad);

//     return () => {
//       window.removeEventListener("beforeunload", stopSave);
//       window.removeEventListener("load", onLoad);
//     };
//   }, []);

//   return null;
// }








"use client";

import { useEffect } from "react";
import { useLenis } from "../../contexts/LenisContext";

export default function ScrollToTopReload() {
  const { lock } = useLenis();

  useEffect(() => {
    lock(); // lock scroll on home page load

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const stopSave = () => {
      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", stopSave);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    });
    

    return () => {
      window.removeEventListener("beforeunload", stopSave);
    };
  }, []);

  return null;
}