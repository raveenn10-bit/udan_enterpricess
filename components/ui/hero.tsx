"use client";

import { useEffect, useRef } from "react";
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
  videoSrc = "/media/hero/hero-video.mp4",
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const gridLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Lazy defer video playback until after DOM load to ensure ultrafast FCP / LCP
    const video = videoRef.current;
    if (video) {
      const playVideo = () => {
        video.play().catch(() => {});
      };
      if (document.readyState === "complete") {
        playVideo();
      } else {
        window.addEventListener("load", playVideo, { once: true });
        const timer = setTimeout(playVideo, 1200);
        return () => {
          window.removeEventListener("load", playVideo);
          clearTimeout(timer);
        };
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Grid lines stagger fade in
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

      // Badge
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

      // Title words
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".word");
        tl.fromTo(
          words,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.04,
            ease: "power3.out",
          },
          0.4
        );
      }

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        0.7
      );

      // CTA
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.5)",
        },
        0.9
      );

      // Parallax effect on scroll
      if (sectionRef.current && contentRef.current) {
        gsap.to(contentRef.current, {
          y: "25%",
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
  }, []);

  const titleWords = title.split(" ");

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
          preload="none"
          poster="/media/hero/hero-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-20 max-w-5xl px-6 py-20 text-center text-white will-change-transform">
        {/* Eyebrow badge */}
        <div ref={badgeRef} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#e1fcad] backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e1fcad] animate-pulse" />
          <span>JOIN US &amp; CHARGE YOUR RIDE ⚡</span>
        </div>

        <h1 ref={titleRef} className="text-center font-normal text-4xl text-white tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.08] flex flex-wrap justify-center overflow-hidden font-hero">
          {titleWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.25em] last:mr-0">
              {word}
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
