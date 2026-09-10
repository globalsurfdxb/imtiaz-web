"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import NavPageV3 from "./NavPageV3-v4";
import { motion, AnimatePresence } from "framer-motion";
import AuthSlider from "../auth/AuthSlider-v4";
import SignupForm from "../auth/SignupForm-v4";
import LoginForm from "../auth/LoginForm-v4";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

type AuthView = "login" | "signup";

const HeaderWithHamburger = ({ menuData }: { menuData: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [darkHeader, setDarkHeader] = useState(false);
  const [authView, setAuthView] = useState<AuthView | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeAuth = () => setAuthView(null);

  const lastScroll = useRef(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const [langPos, setLangPos] = useState({ top: 0, right: 0 });
  const langBtnRef = useRef<HTMLButtonElement>(null);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node))
        setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // 👇 Only render portal after client mount
  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const current = Math.max(window.scrollY, 0);

      // rubber-band guard: at/near top, always show, don't trust delta
      if (current <= 0) {
        setShowHeader(true);
        lastScroll.current = 0;
        ticking = false;
        return;
      }

      const delta = current - lastScroll.current;

      if (Math.abs(delta) > 5) {
        if (delta > 0 && current > 300) {
          setShowHeader(false);
        } else if (delta < 0) {
          setShowHeader(true);
        }
        lastScroll.current = current;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(handleScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const w = window.innerWidth;
    const vh = window.innerHeight;

    const getHeaderMetrics = (w: number) => {
      if (w >= 1920) return { startH: "70px", endH: "40px", hdrcntsH: "80px" };
      if (w >= 1024) return { startH: "65px", endH: "35px", hdrcntsH: "75px" };
      if (w >= 768) return { startH: "45px", endH: "30px", hdrcntsH: "65px" };
      if (w >= 375) return { startH: "40px", endH: "20px", hdrcntsH: "80px" };
      return { startH: "39px", endH: "20px", hdrcntsH: "75px" };
    };

    const { startH, endH, hdrcntsH } = getHeaderMetrics(w);

    // exact pixel height of the real viewport — no vh guessing, no clipping bug
    gsap.set(".hdrcnts", { height: vh });
    gsap.set(".hdrlgs svg", { height: startH });

    const tl = gsap.timeline();

    tl.to(".group-1 path", { y: 0, opacity: 1, stagger: 0.15, duration: 0.8 })
      .to(".hdrcnts", { height: hdrcntsH, duration: 0.5 })
      .to(".hdrlgs svg", { height: endH, duration: 0.5 }, "<")
      .to(".ovrlyabg", { opacity: "0", duration: 0.6 })
      .to(".bckbg", { height: "100%", duration: 0.6 }, "-=2")
      .to(".bckbg", { height: "100%", width: "100%", duration: 0.8 })
      .to(".ovrlyabg", { opacity: "0", zIndex: "-1", height: "0%" })
      .fromTo(
        ".mnhmns button",
        { y: 40 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 1 },
        "-=0.8",
      )
      // gradient backdrop (below md) fades in at the same time the hamburger appears
      .to(".hdrgrad", { opacity: 1, duration: 1 }, "<")
      .fromTo(
        ".rgtbtn button",
        { y: 40 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 1 },
        "<",
      )
      .add(() => {
        gsap.set(".bckbg", { height: hdrcntsH }); // matches hdrcnts exactly, no drift
        window.dispatchEvent(new Event("headerAnimationComplete"));
      });
  }, []);


  useEffect(() => {
  const targets = Array.from(
    document.querySelectorAll<HTMLElement>(
      ".make-header-black, [data-header='dark']",
    ),
  );
  if (!targets.length) return;

  const HEADER_LINE = 80;

  const evaluate = () => {
    const isDark = targets.some((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top <= HEADER_LINE && rect.bottom >= HEADER_LINE;
    });
    setDarkHeader(isDark);
  };

  const observer = new IntersectionObserver(evaluate, {
    threshold: [0, 0.01, 0.25, 0.5, 0.75, 1],
  });

  targets.forEach((el) => observer.observe(el));

  evaluate();

  return () => observer.disconnect();
}, []);


  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div
        id="header"
        className={clsx(
          "mnhdr fixed w-full z-[999] left-1/2 -translate-x-1/2 transition-transform duration-500",
          showHeader
            ? "translate-y-0"
            : // below md the header stays pinned at the top; md and up keeps the hide-on-scroll behaviour
              "translate-y-0 md:-translate-y-full md:pointer-events-none",
        )}
      >
        <div className="ovrlyabg bg-black/60 w-full h-[100dvh] z-0 absolute"></div>
        {/* Black gradient backdrop for small screens (replaces the pill below md). Fades in with the logo via GSAP (.hdrgrad) */}
        <div className="hdrgrad md:hidden pointer-events-none absolute top-0 left-0 w-full h-full opacity-0 z-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
        {/* <header className="overflow-hidden w-full"> */}
        <header className="w-full">
          <div className="container flex justify-center  lg:!px-[15px]">
            <div className="hdrcnts flex items-center justify-between md:rounded-[150px] md:py-[15px] md:px-20 xl:pl-30 w-full relative h-[100dvh] md:mt-5">
              <div
                className={clsx(
                  // max-md:hidden removes the whole blurred pill below md — only icons + logo remain (a gradient stands in, see .hdrgrad)
                  "bckbg max-md:hidden backdrop-blur-[30px] left-1/2 w-0 -translate-x-1/2 absolute rounded-[150px] z-[-1] transition-colors duration-500",
                  darkHeader ? "bg-black/60" : "bg-white/10",
                )}
              ></div>

              {/* ------- LEFT MENU ------- */}
              <div className="flex items-center w-[35%] sm:w-[40%] 2xl:w-[33.33%] mnhmns">
                <button
                  className="flex items-center justify-start md:justify-center w-[40px] h-[40px] cursor-pointer opacity-0"
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

              {/* ------- CENTER LOGO ------- */}
              <Link className="hdrlgs cursor-pointer" href={"/"}>
                <svg
                  className="w-auto h-[60px]"
                  id="eaSfcpdDOLI1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 133.1 24.2"
                  shapeRendering="geometricPrecision"
                  textRendering="geometricPrecision"
                  project-id="313d9f857086497caad8e8067c79b740"
                  export-id="67da73b20e1c4d4d90724f34fead18dd"
                >
                  <g
                    clipPath="url(#eaSfcpdDOLI9)"
                    className="logo-group group-1"
                  >
                    <path
                      d="M56.9,2.9c1,0,2.2,0,3.2,0c2.2,0,4.3.4,6.5.9L66.1,0L43,0l-.6,3.8c2.1-.5,4.3-.8,6.5-.9c1,0,2.2,0,3.2,0v16.8c0,1.4-.3,3.2-.6,4.5h6.1c-.3-1.3-.6-3.2-.6-4.5v-16.8h-.1Z"
                      fill="#fff"
                    />
                    <path
                      d="M71.1,4.5c0-1.4-.3-3.2-.6-4.5h6.1c-.3,1.3-.6,3.2-.6,4.5v15.1c0,1.4.3,3.2.6,4.5h-6.1c.3-1.3.6-3.2.6-4.5v-15.1Z"
                      fill="#fff"
                    />
                    <path
                      d="M89.4,14.4l3.8-8.6L97,14.4h-7.6Zm-1.3,3.8c.2-.3.5-.6.8-.7.2,0,.3,0,.4-.1.5,0,.8,0,1.3,0c.7,0,1.6,0,2.5,0s1.8,0,2.5,0c.5,0,.8,0,1.3,0c.1,0,.3,0,.5.1.3,0,.6.3.8.7.5,1,1.2,2.5,1.9,4.2c0,.2.1.4.1.5c0,.3-.2.5-.5.8-.2.2-.4.4-.5.5h8c-.8-.9-1.5-1.9-2.1-2.9-1.6-2.5-2.7-5.4-3.9-8.1s-2.4-5.4-3.6-8.1c-.3-.7-.6-1.4-.9-2.1-.4-.8-1-2.4-1.2-3h-5.8c.2.2.4.4.6.6s.4.4.5.6c.2.6,0,1.2-.2,1.7-2.7,6.4-7.2,16.7-7.6,17.6-.6,1.3-1.5,2.5-2.4,3.7h6.6c-.2-.2-.3-.4-.5-.5-.3-.3-.4-.4-.5-.8c0-.2,0-.4.1-.5.7-1.6,1.4-3.2,1.9-4.2"
                      fill="#fff"
                    />
                    <path
                      d="M35.3,8c0,0,5.6,14.4,5.7,14.5c0,.2,0,.4,0,.6c0,.4-.2.8-.2,1.1h6.7l-.3-.4c-.6-.9-1.1-1.7-1.6-2.5-.5-.9-1-1.9-1.5-2.9L36.3,0h-4.9l1.3,3.3v0c.4.9.4,2,0,3l-4.4,11L21.1,0h-5.2c0,0,1.5,3.5,1.6,3.5.2.5.3,1,.3,1.5c0,.4,0,.7-.1,1.1-1.1,3.2-2.4,6.5-3.9,10.2-.3.8-.8,1.9-1.1,2.6-.1.4-.3.8-.5,1.2-.4.9-.7,1.7-1.2,2.5-.3.6-.6,1-.9,1.6h5.6c0,0-.2-.3-.4-.6-.2-.4-.4-.9-.3-1.4c0,0,0,0,0,0c.2-.8.4-1.6.7-2.4C17.1,16.2,20,8.1,20.1,8L27,24.2h2.3L35.5,8h-.2Z"
                      fill="#fff"
                    />
                    <path
                      d="M0.6,4.5C0.6,3.2,0.3,1.3,0,0h6.1c-.3,1.3-.6,3.2-.6,4.5v15.1c0,1.4.3,3.2.6,4.5h-6.1c.3-1.3.6-3.2.6-4.5v-15.1Z"
                      fill="#fff"
                    />
                    <path
                      d="M132.2,24.2l.9-3.8c-2.4.6-4.8.9-7.3.9-2.4,0-6.7,0-9,0c1.8-2.4,14.4-18.7,16.3-21.3h-23.3l-.9,3.8c2.4-.6,4.8-.9,7.3-.9c2.4,0,6.6,0,9,0L109.1,24.2h23.1Z"
                      fill="#fff"
                    />
                    <clipPath id="eaSfcpdDOLI9">
                      <rect
                        width="133.1"
                        height="24.200001"
                        rx="0"
                        ry="0"
                        transform="matrix(1.000003 0 0 1.000003 -0.0002 -0.000035)"
                        fill="#d2dbed"
                        strokeWidth="0"
                      />
                    </clipPath>
                  </g>
                </svg>
              </Link>

              {/* RIGHT — Icons */}
              <div className="w-[35%] 2xl:w-[33.33%] flex justify-end">
                <div className="flex items-center gap-[5px] sm:gap-[10px] rgtbtn">
                  <button
                    onClick={() => setAuthView("login")}
                    className="flex group items-center justify-center w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] bg-white/25 backdrop-blur-[30px] rounded-full cursor-pointer opacity-0"
                  >
                    <Image
                      src="/images/account.svg"
                      alt="account"
                      width={14}
                      height={15}
                      className="invert w-[10px] h-[12px] sm:h-[15.16px] sm:w-[14px] w-auto group-hover:scale-110 transition-all duration-400"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>

      {mounted &&
        createPortal(
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
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] w-full h-full  "
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
                          transition={{
                            duration: 0.25,
                            ease: [0.25, 1, 0.5, 1],
                          }}
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
          </AnimatePresence>,
          document.body,
        )}

      {/* ========================= SIDEBAR ========================= */}
      {mounted &&
        createPortal(
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
                  <NavPageV3
                    setIsMenuOpen={setIsMenuOpen}
                    menuData={menuData}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};

export default HeaderWithHamburger;
