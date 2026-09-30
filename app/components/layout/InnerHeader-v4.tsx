"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import NavPageV3 from "../common/NavPageV3-v4";
import AuthSlider from "../auth/AuthSlider-v4";
import SignupForm from "../auth/SignupForm-v4";
import LoginForm from "../auth/LoginForm-v4";
import { useLenis } from "@/app/contexts/LenisContext";

type AuthView = "login" | "signup";

// Static version of HeaderWithHamburger-v4 without the intro GSAP animation.
// Pinned at the top on all screens with a black gradient backdrop (no pill).
const InnerHeader = ({ menuData }: { menuData: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthView | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeAuth = () => setAuthView(null);

  const { lock, unlock } = useLenis();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock page scroll while the menu or auth modal is open
  useEffect(() => {
    if (!isMenuOpen && !authView) return;

    const scrollY = window.scrollY;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    lock();

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.paddingRight = "";
      window.scrollTo(0, scrollY);

      unlock();
    };
  }, [isMenuOpen, authView, lock, unlock]);

  return (
    <>
      <div
        id="inner-header"
        className="fixed top-0 w-full z-[999] left-1/2 -translate-x-1/2"
      >
        {/* Black gradient backdrop */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
        <header className="w-full">
          <div className="container flex justify-center lg:!px-[15px]">
            <div className="flex items-center justify-between w-full relative h-[75px] min-[375px]:h-[80px] md:h-[65px] lg:h-[80px] min-[1920px]:h-[85px]">

              {/* ------- LEFT MENU ------- */}
              <div className="flex items-center w-[35%] sm:w-[40%] 2xl:w-[33.33%]">
                <button
                  className="flex items-center justify-start md:justify-center w-[40px] h-[40px] cursor-pointer"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <Image
                    src="/images/hamburger-desktop.svg"
                    alt="menu"
                    width={22}
                    height={22}
                    className="w-[20px] h-[19px] md:w-auto md:h-[15.13px]"
                  />
                </button>
              </div>

              {/* ------- CENTER LOGO ------- */}
              <Link className="cursor-pointer" href={"/"}>
                <svg
                  className="w-auto h-[20px] md:h-[30px] lg:h-[35px] min-[1920px]:h-[40px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 133.1 24.2"
                  shapeRendering="geometricPrecision"
                  textRendering="geometricPrecision"
                >
                  <g clipPath="url(#inner-header-logo-clip)">
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
                    <clipPath id="inner-header-logo-clip">
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
                <div className="flex items-center gap-[5px] sm:gap-[10px]">
                  <button
                    onClick={() => setAuthView("login")}
                    className="flex group items-center justify-center w-7 h-7 sm:w-[32px] sm:h-[32px] bg-white/25 backdrop-blur-[30px] rounded-full cursor-pointer"
                  >
                    <Image
                      src="/images/account.svg"
                      alt="account"
                      width={14}
                      height={15}
                      className="invert h-[14px] sm:h-[15.16px] w-[14px] w-auto group-hover:scale-110 transition-all duration-400"
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

export default InnerHeader;
