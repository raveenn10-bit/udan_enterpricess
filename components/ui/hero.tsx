"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onCtaClick?: () => void;
  videoSrc?: string;
}

export default function Hero({
  title = "Sustainable Solutions for a Better Future",
  subtitle = "Empowering businesses and communities to thrive in a low-carbon world through tailored clean energy solutions.",
  buttonText = "Start a Project",
  onCtaClick,
  videoSrc = "/videos/hero.mp4",
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const gridLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Typewriter reveal state
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);

  // Tokenize title into words & characters for zero-layout-shift typewriter effect
  const wordsData = useMemo(() => {
    const words = title.split(" ");
    let runningIndex = 0;
    return words.map((word, wordIdx) => {
      const chars = word.split("").map((char) => {
        const idx = runningIndex;
        runningIndex += 1;
        return { char, index: idx };
      });
      const hasSpaceAfter = wordIdx < words.length - 1;
      const spaceIndex = hasSpaceAfter ? runningIndex : null;
      if (hasSpaceAfter) {
        runningIndex += 1;
      }
      return {
        word,
        chars,
        spaceIndex,
      };
    });
  }, [title]);

  const totalChars = useMemo(() => {
    if (wordsData.length === 0) return 0;
    const lastWord = wordsData[wordsData.length - 1];
    if (lastWord.chars.length === 0) return 0;
    return lastWord.chars[lastWord.chars.length - 1].index + 1;
  }, [wordsData]);

  useEffect(() => {
    // Ultra-fast instant playback with no artificial delay
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Architectural Grid Lines stagger fade in
      tl.fromTo(
        gridLinesRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power2.out",
        },
        0
      );

      // 2. Eyebrow Badge
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        0.2
      );

      // 3. Smooth realistic Typewriter reveal on Hero Title
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        setVisibleCount(totalChars);
        setIsTypingComplete(true);
      } else {
        const typeProgress = { count: 0 };
        tl.to(
          typeProgress,
          {
            count: totalChars,
            duration: Math.max(3.2, totalChars * 0.075),
            ease: "none",
            onUpdate: () => {
              const current = Math.floor(typeProgress.count);
              setVisibleCount((prev) => (prev !== current ? current : prev));
            },
            onComplete: () => {
              setVisibleCount(totalChars);
              setIsTypingComplete(true);
            },
          },
          0.4
        );
      }

      // 4. Subtitle fade in (timed to blend as typing progresses)
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
        },
        3.4
      );

      // 5. CTA Button pop in with spring physics
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.4)",
        },
        3.8
      );

      // 6. Parallax effect on scroll
      if (sectionRef.current && contentRef.current) {
        gsap.to(contentRef.current, {
          y: "25%",
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [totalChars]);

  // Glowing orange bar typing cursor
  const renderCursor = () => (
    <span
      aria-hidden="true"
      className="inline-block w-0 relative overflow-visible pointer-events-none select-none align-baseline"
    >
      <span
        className={`absolute -left-[1.5px] -top-[0.08em] h-[1.15em] w-[3px] sm:w-[4px] lg:w-[5px] rounded-full bg-[#FF5E14] shadow-[0_0_12px_#FF5E14,0_0_24px_rgba(255,94,20,0.7)] ${
          isTypingComplete ? "animate-cursor-pulse" : "animate-cursor-blink"
        }`}
      />
    </span>
  );

  return (
    <section ref={sectionRef} className="relative flex min-h-[90vh] lg:h-screen w-full items-center justify-center overflow-hidden">
      {/* 12-column architectural grid overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 size-full">
        <div className="grid w-full grid-cols-12 divide-x divide-white/10 h-full">
          <div className="col-span-1 h-full" ref={(el) => { gridLinesRef.current[0] = el; }} />
          <div className="col-span-3 h-full" ref={(el) => { gridLinesRef.current[1] = el; }} />
          <div className="col-span-4 h-full" ref={(el) => { gridLinesRef.current[2] = el; }} />
          <div className="col-span-3 h-full" ref={(el) => { gridLinesRef.current[3] = el; }} />
          <div className="col-span-1 h-full" ref={(el) => { gridLinesRef.current[4] = el; }} />
        </div>
      </div>

      {/* Hero background video with dark overlay */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          preload="auto"
          poster="/media/branding/udan-hero-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          {...{ fetchPriority: "high" }}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
          <source src="/media/hero/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-20 max-w-5xl px-4 sm:px-6 py-20 text-center text-white will-change-transform">
        {/* Eyebrow badge */}
        <div ref={badgeRef} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#e1fcad] backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e1fcad] animate-pulse" />
          <span>JOIN US &amp; CHARGE YOUR RIDE ⚡</span>
        </div>

        {/* Hero Title with realistic Typewriter reveal animation and zero layout shift */}
        <h1
          ref={titleRef}
          aria-label={title}
          className="text-center font-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.12] sm:leading-[1.08] tracking-tight text-white flex flex-wrap justify-center font-hero select-none break-words hyphens-none"
        >
          {wordsData.map((wordObj, wordIdx) => (
            <span
              key={wordIdx}
              className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0"
            >
              {/* If cursor is before first character */}
              {visibleCount === 0 && wordIdx === 0 && renderCursor()}

              {wordObj.chars.map((charObj) => {
                const isVisible = charObj.index < visibleCount;
                const isCursorHere = charObj.index === visibleCount - 1;
                return (
                  <span key={charObj.index} className="inline">
                    <span
                      className={`inline transition-opacity duration-75 ${
                        isVisible ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {charObj.char}
                    </span>
                    {isCursorHere && renderCursor()}
                  </span>
                );
              })}

              {/* If cursor is active on the space following this word */}
              {wordObj.spaceIndex !== null &&
                wordObj.spaceIndex === visibleCount - 1 &&
                renderCursor()}
            </span>
          ))}
        </h1>

        <p ref={subtitleRef} className="mx-auto mt-6 mb-8 max-w-2xl text-center font-light text-base text-white/90 sm:text-lg md:text-xl leading-relaxed">
          {subtitle}
        </p>

        <div ref={ctaRef}>
          <Button
            onClick={onCtaClick}
            className="group not-disabled:inset-shadow-none mx-auto flex cursor-pointer items-center justify-center gap-0 rounded-full border-none bg-transparent px-0 py-5 font-normal shadow-none hover:bg-transparent [:hover,[data-pressed]]:bg-transparent"
          >
            <span className="rounded-full bg-[#e1fcad] px-7 py-3.5 text-sm sm:text-base font-bold text-black duration-500 ease-in-out group-hover:bg-[#122023] group-hover:text-[#e1fcad] group-hover:transition-colors shadow-lg">
              {buttonText}
            </span>
            <div className="relative flex h-fit cursor-pointer items-center overflow-hidden rounded-full bg-[#e1fcad] p-5 text-black duration-500 ease-in-out group-hover:bg-[#122023] group-hover:text-[#e1fcad] group-hover:transition-colors shadow-lg">
              <ArrowUpRight className="absolute h-5 w-5 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" />
              <ArrowUpRight className="absolute h-5 w-5 -translate-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" />
            </div>
          </Button>
        </div>
      </div>
    </section>
  );
}
