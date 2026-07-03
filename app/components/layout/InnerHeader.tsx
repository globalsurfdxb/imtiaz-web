"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import NavPageV3 from "../common/NavPageV3";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { usePathname } from "next/navigation";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import AuthSlider from "../auth/AuthSlider";
import Link from "next/link";
import { useLenis } from "@/app/contexts/LenisContext";
import { createPortal } from "react-dom";

type AuthView = "login" | "signup";

const InnerHeader = ({menuData}:{menuData:any}) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthView | null>(null);
  const [mounted, setMounted] = useState(false);
  const [headerTheme, setHeaderTheme] = useState<"light" | "dark">("light");
  const [langPos, setLangPos] = useState({ top: 0, right: 0 });
  const langBtnRef = useRef<HTMLButtonElement>(null);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Scroll hide/show
  const lastScrollY = useRef(0);
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 80, damping: 20, mass: 0.8 });
  const { isProgrammaticScroll } = useLenis();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (isProgrammaticScroll.current) return; // 👈 ignore lenis scrollTo

  //     const currentY = window.scrollY;
  //     const diff = currentY - lastScrollY.current;
  //     if (diff > 0) {
  //       y.set(-120);
  //     } else {
  //       y.set(0);
  //     }
  //     lastScrollY.current = currentY;
  //   };

  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [y, isProgrammaticScroll]);

  // 👇 Only render portal after client mount
  
  useEffect(() => {
  const handleScroll = () => {
    if (isProgrammaticScroll.current) return;

    // clamp — iOS can report negative values during rubber-band overscroll
    const currentY = Math.max(window.scrollY, 0);

    // near/at top: always force header visible, ignore delta entirely
    if (currentY <= 0) {
      y.set(0);
      lastScrollY.current = 0;
      return;
    }

    const diff = currentY - lastScrollY.current;
    if (diff > 0) {
      y.set(-120);
    } else {
      y.set(0);
    }
    lastScrollY.current = currentY;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, [y, isProgrammaticScroll]);
  
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Section-based header theme
  useEffect(() => {
    const check = () => {
      const headerEl = document.getElementById("inner-header");
      if (headerEl) headerEl.style.pointerEvents = "none";

      const el = document.elementFromPoint(window.innerWidth / 2, 80);

      if (headerEl) headerEl.style.pointerEvents = "";

      let node = el as HTMLElement | null;
      let theme: "light" | "dark" = "light";

      while (node && node !== document.body) {
        if (node.dataset.header) {
          theme = node.dataset.header as "light" | "dark";
          break;
        }
        node = node.parentElement;
      }

      setHeaderTheme(theme);
    };

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    setTimeout(check, 100);

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

  useEffect(() => {
    if (!authView) return;

    const scrollY = window.scrollY;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.paddingRight = "";
      window.scrollTo(0, scrollY);
    };
  }, [authView]);

  const closeAuth = () => setAuthView(null);

  return (
    <>
      {/* ========================= HEADER ========================= */}
      <motion.div
        id="inner-header"
        style={{ y: springY }}
        className="fixed top-0 left-0 w-full z-[999]  pt-5"
      >
        <header className="w-full">
          <div className={isMobile ? "container" : "container"}>
            <div className="relative flex items-center justify-between w-full rounded-full h-[80px]   lg:h-[75px] 3xl:h-[80px] py-[15px] px-20 xl:pl-40 xl:pr-30">
              <div
                className={`absolute inset-0 rounded-full backdrop-blur-[30px] z-[-1] transition-colors duration-500 ${
                  headerTheme === "dark" ? "bg-black/60" : "bg-white/10"
                }`}
              />

              {/* LEFT — Hamburger */}
              <div className="flex items-center w-[35%] sm:w-[40%] 2xl:w-[33.33%]">
                <button
                  className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <Image
                    src="/images/hamburger-desktop.svg"
                    alt="menu"
                    width={22}
                    height={22}
                    className="w-[18px] h-[16px] md:w-auto md:h-[15.13px]"
                  />
                </button>
              </div>

              {/* CENTER — Logo */}
              <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                <Link href="/">
                  <Image
                    src="/images/logo-new.svg"
                    alt="Imtiaz"
                    width={183}
                    height={50}
                    priority
                    className="w-[131px] xl:w-[183px] h-[20px] md:h-[30px] lg:h-[45px] 3xl:h-[50px] invert brightness-0"
                  />
                </Link>
              </div>

              {/* RIGHT — Icons */}
              <div className="w-[35%] sm:w-[40%] 2xl:w-[33.33%] flex justify-end">
                <div className="flex items-center gap-[5px] sm:gap-[10px] rgtbtn">
                  <button
                    onClick={() => setAuthView("login")}
                    className="flex group items-center justify-center w-[24px] h-[24px]  sm:w-[32px] sm:h-[32px] bg-white/25 backdrop-blur-[30px] rounded-full cursor-pointer"
                  >
                    <Image
                      src="/images/account.svg"
                      alt="account"
                      width={14}
                      height={15}
                      className="invert w-[10px] h-[12px] md:h-[15.16px] md:w-[14px] w-auto group-hover:scale-110 transition-all duration-400"
                    />
                  </button>

                  {/* <div className="relative" ref={langRef}>
                    <button
                      ref={langBtnRef}
                      onClick={() => {
                        if (!langOpen && langBtnRef.current) {
                          const rect =
                            langBtnRef.current.getBoundingClientRect();
                          setLangPos({
                            top: rect.bottom + 8,
                            right: window.innerWidth - rect.right,
                          });
                        }
                        setLangOpen((p) => !p);
                      }}
                      className="group flex items-center justify-center gap-[5px] sm:gap-[10px] md:gap-[8px] w-auto px-[7px] py-[6px] sm:h-[32px] md:px-[6px]  bg-white/25  backdrop-blur-[30px]  rounded-full cursor-pointer"
                    >
                      <Image
                        src="/images/map.svg"
                        alt="map"
                        width={24}
                        height={24}
                        className="invert h-[12.24px] sm:h-[24px] w-auto group-hover:scale-110 transition-all duration-400"
                      />
                      <div className="block">
                        <ChevronDown className="text-white w-[12px] h-[12px] sm:w-[18px] sm:h-[18px]" />
                      </div>
                    </button>

                    {mounted &&
                      createPortal(
                        <AnimatePresence>
                          {langOpen && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                clipPath: "inset(0% 0% 100% 0% round 12px)",
                              }}
                              animate={{
                                opacity: 1,
                                clipPath: "inset(0% 0% 0% 0% round 12px)",
                              }}
                              exit={{
                                opacity: 0,
                                clipPath: "inset(0% 0% 100% 0% round 12px)",
                              }}
                              transition={{
                                duration: 0.5,
                                ease: [0.76, 0, 0.24, 1],
                                opacity: { duration: 0.3, ease: "easeIn" },
                              }}
                              style={{
                                transformOrigin: "top",
                                position: "fixed",
                                top: langPos.top,
                                right: langPos.right,
                                zIndex: 9999,
                              }}
                              className="bg-white/25 backdrop-blur-[30px] rounded-[12px] overflow-hidden"
                            >
                              <button
                                onClick={() => setLangOpen(false)}
                                className="w-full text-left px-5 py-2 text-white text-[14px] font-[avenirRoman] hover:bg-white/10 transition-colors duration-150"
                              >
                                العربية
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>,
                        document.body,
                      )}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </header>
      </motion.div>

      {/* ========================= AUTH MODAL ========================= */}
      <AnimatePresence mode="wait">
        {authView && (
          <>
            <motion.div
              key="auth-backdrop"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAuth}
            />

            <motion.div
              // className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] w-full h-full sm:h-[85vh] lg:h-[80vh] xl:h-full"
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] w-full h-full"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="flex w-full overflow-hidden bg-white h-full">
                <div className="relative h-full flex-shrink-0 hidden md:block md:w-[48.4%]">
                  <AuthSlider />
                </div>

                <div className="relative w-full md:w-[51.6%] h-full bg-white overflow-hidden pointer-events-none">
                  {/* Background decoration — behind scroll layer */}
                  <div className="absolute bottom-0 left-0 pointer-events-none">
                    <Image
                      src="/icons/layout_icons/m-icon.svg"
                      alt="Icon"
                      width={534}
                      height={704}
                    />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={authView}
                      className="absolute inset-0 flex items-start justify-center overflow-y-auto py-150 3xl:py-0 pointer-events-auto dark-section-2"
                      onWheel={(e) => e.stopPropagation()}
                      onTouchMove={(e) => e.stopPropagation()}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                    >
                      {authView === "login" ? (
                        <LoginForm
                          onClose={closeAuth}
                          onSwitch={() => setAuthView("signup")}
                        />
                      ) : (
                        <SignupForm
                          onClose={closeAuth}
                          onSwitch={() => setAuthView("login")}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ========================= NAV OVERLAY ========================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              className="fixed inset-0 z-[999]"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            >
              <NavPageV3 setIsMenuOpen={setIsMenuOpen} menuData={menuData}/>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default InnerHeader;
