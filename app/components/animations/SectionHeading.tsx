"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  // Rendered as HTML (e.g. "Our <span class='text-primary'>Story</span>"); "\n" becomes a line break
  title: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
  delay?: number;
}

// Wraps every word/char inside the element's text nodes (keeps the HTML tags as-is)
function splitHtmlChars(root: HTMLElement) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

  textNodes.forEach((node) => {
    const text = node.textContent ?? "";
    if (!text.trim()) return;

    const frag = document.createDocumentFragment();
    text.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part));
        return;
      }

      const word = document.createElement("span");
      Object.assign(word.style, {
        display: "inline-block",
        whiteSpace: "nowrap",
        overflow: "hidden",
        lineHeight: "inherit",
        verticalAlign: "top",
        paddingBottom: "0.2em",
        marginBottom: "-0.2em",
      });

      part.split("").forEach((char) => {
        const c = document.createElement("span");
        c.setAttribute("data-char", "");
        c.style.display = "inline-block";
        c.textContent = char;
        word.appendChild(c);
      });

      frag.appendChild(word);
    });

    node.replaceWith(frag);
  });
}

export function SectionHeading({
  title,
  className = "",
  as: Tag = "h2",
  delay = 0,
}: SectionHeadingProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);

  const html = useMemo(
    () =>
      (title ?? "")
        .split("\n")
        .map((line) => line.trim())
        .join("<br/>"),
    [title],
  );

  // Stable object: React 19 re-applies innerHTML whenever this object changes,
  // which would wipe the split chars on every parent re-render (e.g. parallax on scroll)
  const htmlProp = useMemo(() => ({ __html: html }), [html]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // reset first so a re-run (StrictMode / delay change) doesn't split already-split chars
    el.innerHTML = html;
    splitHtmlChars(el);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chars = el.querySelectorAll<HTMLElement>("[data-char]");

    gsap.set(chars, { yPercent: 120, rotation: 2, opacity: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          once: true,
        },
      });

      tl.to(chars, {
        yPercent: 0,
        rotation: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        stagger: { amount: 0.55 },
      });
    }, el);

    return () => ctx.revert();
  }, [html, delay]);

  return (
    <Tag
      key={html}
      ref={ref}
      className={`text-heading text-trim ${className}`}
      dangerouslySetInnerHTML={htmlProp}
    />
  );
}
