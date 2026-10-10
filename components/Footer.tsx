"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ArrowUp, MapPin, ExternalLink } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useTranslation } from "@/lib/i18n";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import BrandBounceText from "@/components/BrandBounceText";
import { useShowroomSettings } from "@/lib/site-data";

export default function Footer() {
  const { t } = useTranslation();
  const { settings } = useShowroomSettings();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // 1. GSAP ScrollTrigger Reveal
    const ctx = gsap.context(() => {
      if (footerRef.current && typeof ScrollTrigger !== "undefined") {
        gsap.fromTo(
          footerRef.current.querySelectorAll(
            ".skyline-canvas-wrapper, .footer-columns-grid > div, .footer-bottom-bar"
          ),
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 88%",
              end: "bottom 10%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, footerRef);

    // 2. Floating Light Embers Particle Engine (Canvas)
    const canvas = canvasRef.current;
    let animationFrameId: number;
    let isVisible = false;

    if (canvas) {
      const renderCtx = canvas.getContext("2d");
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (renderCtx && !prefersReducedMotion) {
        let width = 0;
        let height = 0;
        const particleCount = 42;

        const resize = () => {
          if (!canvas) return;
          const rect = canvas.getBoundingClientRect();
          width = canvas.width = rect.width || window.innerWidth;
          height = canvas.height = rect.height || 150;
        };
        resize();

        interface Particle {
          x: number;
          y: number;
          radius: number;
          alpha: number;
          speedY: number;
          speedX: number;
          decay: number;
          color: string;
        }

        const createParticle = (initial = false): Particle => ({
          x: Math.random() * (width || 1200),
          y: initial
            ? Math.random() * (height || 150)
            : (height || 150) + Math.random() * 20,
          radius: Math.random() * 1.6 + 0.6,
          alpha: Math.random() * 0.7 + 0.2,
          speedY: -(Math.random() * 0.8 + 0.4),
          speedX: (Math.random() - 0.5) * 0.5,
          decay: Math.random() * 0.003 + 0.002,
          color:
            Math.random() > 0.45
              ? "rgba(255, 94, 20,"
              : Math.random() > 0.5
              ? "rgba(239, 68, 68,"
              : "rgba(251, 191, 36,",
        });

        const particles: Particle[] = Array.from({ length: particleCount }, () =>
          createParticle(true)
        );

        const draw = () => {
          if (!isVisible) return;
          renderCtx.clearRect(0, 0, width, height);

          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.y += p.speedY;
            p.x += p.speedX;
            p.alpha -= p.decay;

            if (p.alpha <= 0 || p.y < -10) {
              particles[i] = createParticle(false);
              continue;
            }

            renderCtx.beginPath();
            renderCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            renderCtx.fillStyle = `${p.color} ${p.alpha})`;
            renderCtx.shadowColor =
              p.color === "rgba(255, 94, 20," ? "#FF5E14" : "#ef4444";
            renderCtx.shadowBlur = 8;
            renderCtx.fill();
          }

          animationFrameId = requestAnimationFrame(draw);
        };

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                isVisible = true;
                resize();
                animationFrameId = requestAnimationFrame(draw);
              } else {
                isVisible = false;
                cancelAnimationFrame(animationFrameId);
              }
            });
          },
          { threshold: 0.05 }
        );
        observer.observe(canvas);

        window.addEventListener("resize", resize);

        return () => {
          ctx.revert();
          observer.disconnect();
          cancelAnimationFrame(animationFrameId);
          window.removeEventListener("resize", resize);
        };
      }
    }

    return () => {
      ctx.revert();
    };
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await addDoc(collection(db, "newsletter_subscribers"), {
        email,
        subscribedAt: serverTimestamp(),
      });
    } catch (err) {
      console.warn("Newsletter notice:", err);
    }
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      ref={footerRef}
      className="udan-skyline-footer relative w-full overflow-hidden bg-[#060608] text-white mt-16 isolation-auto"
      id="site-footer"
    >
      {/* 1. TOP NEON RED / CRIMSON LASER GLOW EDGE */}
      <div className="skyline-neon-edge" aria-hidden="true" />

      {/* 2. ANIMATED MOTORCYCLE SKYLINE HORIZON STAGE */}
      <div className="skyline-canvas-wrapper relative w-full h-[180px] max-h-[180px] max-sm:h-[110px] max-sm:max-h-[110px] overflow-hidden bg-[#090104] z-10" aria-hidden="true">
        {/* Floating Particles Canvas */}
        <canvas
          ref={canvasRef}
          id="footer-embers-canvas"
          className="footer-embers-canvas absolute inset-0 pointer-events-none z-10"
        />

        <svg
          className="motorcycle-skyline-svg w-full h-[180px] max-h-[180px] max-sm:h-[110px] max-sm:max-h-[110px] block"
          viewBox="0 0 1600 300"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="skyDuskGlow" cx="60%" cy="85%" r="75%">
              <stop offset="0%" stopColor="#800b16" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#4a040b" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#1e0205" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0a0103" stopOpacity="1" />
            </radialGradient>
            <radialGradient id="crimsonSun" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff3b30" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#cc1111" stopOpacity="0.75" />
              <stop offset="85%" stopColor="#660000" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#220000" stopOpacity="0" />
            </radialGradient>
            <filter id="neonRedGlow" x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="5" result="blur1" />
              <feGaussianBlur stdDeviation="12" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="headlightBeam" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#ffe6a3" stopOpacity="0.6" />
              <stop offset="65%" stopColor="#ff9900" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ff4400" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="tailLightTrail" x1="100%" y1="50%" x2="0%" y2="50%">
              <stop offset="0%" stopColor="#ff1a1a" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#ff0044" stopOpacity="0.5" />
              <stop offset="80%" stopColor="#cc0022" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#660000" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="amberLampGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffeaa7" stopOpacity="1" />
              <stop offset="35%" stopColor="#fdcb6e" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#e17055" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#d63031" stopOpacity="0" />
            </radialGradient>
            {/* Embedded Keyframes guaranteeing flawless animation across all mobile browsers (iOS Safari, Android Chrome) */}
            <style>{`
              @keyframes rideMotorcycleOnRoad {
                0% {
                  transform: translate(-160px, 160px) rotate(0deg);
                }
                25% {
                  transform: translate(350px, 168px) rotate(0.8deg);
                }
                48% {
                  transform: translate(740px, 140px) rotate(-1.5deg);
                }
                74% {
                  transform: translate(1220px, 180px) rotate(1.5deg);
                }
                100% {
                  transform: translate(1750px, 154px) rotate(-0.5deg);
                }
              }
              .traveling-motorcycle-carrier {
                animation: rideMotorcycleOnRoad 10s cubic-bezier(0.35, 0, 0.25, 1) infinite;
                will-change: transform;
                transform-box: view-box;
                transform-origin: 0 0;
              }
            `}</style>
          </defs>

          {/* Sky Background */}
          <rect width="1600" height="300" fill="url(#skyDuskGlow)" />
          <circle cx="1060" cy="180" r="58" fill="url(#crimsonSun)" />

          {/* Distant Mountains */}
          <path
            className="skyline-layer mountains"
            fill="#130104"
            opacity="0.85"
            d="M 0 300 L 0 190 Q 120 160 220 180 T 460 170 Q 580 145 680 175 T 920 165 Q 1040 140 1180 170 T 1420 155 Q 1520 175 1600 180 L 1600 300 Z"
          />

          {/* City Skyline & Lotus Tower */}
          <g className="skyline-layer city" fill="#0d0103">
            <rect x="40" y="170" width="35" height="130" />
            <rect x="85" y="155" width="28" height="145" />
            <polygon points="99,140 96,155 102,155" />
            <rect x="120" y="165" width="45" height="135" />
            <rect x="175" y="180" width="30" height="120" />
            <rect x="320" y="160" width="32" height="140" />
            <rect x="360" y="145" width="40" height="155" />
            <rect x="410" y="170" width="25" height="130" />
            <rect x="520" y="150" width="35" height="150" />
            <rect x="565" y="165" width="48" height="135" />
            <rect x="710" y="160" width="30" height="140" />
            <rect x="750" y="140" width="42" height="160" />
            <polygon points="771,120 769,140 773,140" />
            <rect x="800" y="155" width="36" height="145" />
            <rect x="845" y="168" width="50" height="132" />
            <rect x="910" y="150" width="38" height="150" />
            {/* Lotus Tower */}
            <line x1="990" y1="95" x2="990" y2="135" stroke="#0d0103" strokeWidth="3" />
            <path d="M 980 148 C 975 140, 982 135, 990 133 C 998 135, 1005 140, 1000 148 C 1004 156, 996 162, 990 163 C 984 162, 976 156, 980 148 Z" />
            <polygon points="986,163 994,163 996,250 984,250" />
            <rect x="1020" y="145" width="45" height="155" />
            <rect x="1075" y="130" width="55" height="170" />
            <line x1="1102" y1="112" x2="1102" y2="130" stroke="#0d0103" strokeWidth="2.5" />
            <rect x="1140" y="150" width="38" height="150" />
            <rect x="1190" y="138" width="48" height="162" />
            <rect x="1250" y="160" width="40" height="140" />
            <rect x="1300" y="175" width="35" height="125" />
            <rect x="1345" y="155" width="50" height="145" />
            <rect x="1405" y="165" width="42" height="135" />
            <rect x="1460" y="175" width="60" height="125" />
          </g>

          {/* Streetlights */}
          <g className="skyline-streetlights" stroke="#060102" strokeWidth="2.5" fill="none">
            <path d="M 240 220 L 240 160 Q 240 148 248 148 L 255 148" />
            <circle cx="255" cy="151" r="5" fill="url(#amberLampGlow)" stroke="none" />
            <path d="M 670 215 L 670 152 Q 670 140 678 140 L 685 140" />
            <circle cx="685" cy="143" r="5" fill="url(#amberLampGlow)" stroke="none" />
            <path d="M 1160 225 L 1160 162 Q 1160 150 1168 150 L 1175 150" />
            <circle cx="1175" cy="153" r="5" fill="url(#amberLampGlow)" stroke="none" />
          </g>

          {/* Roadside Warning Chevrons */}
          <g className="skyline-chevrons">
            <rect x="62" y="172" width="20" height="16" rx="2" fill="#ff2200" stroke="#ffcc00" strokeWidth="1.5" />
            <path d="M 77 175 L 70 180 L 77 185" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="72" y1="188" x2="72" y2="215" stroke="#111" strokeWidth="2" />
            <rect x="375" y="178" width="20" height="16" rx="2" fill="#ff2200" stroke="#ffcc00" strokeWidth="1.5" />
            <path d="M 390 181 L 383 186 L 390 191" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="385" y1="194" x2="385" y2="225" stroke="#111" strokeWidth="2" />
            <rect x="1355" y="184" width="20" height="16" rx="2" fill="#ff2200" stroke="#ffcc00" strokeWidth="1.5" />
            <path d="M 1370 187 L 1363 192 L 1370 197" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="1365" y1="200" x2="1365" y2="228" stroke="#111" strokeWidth="2" />
          </g>

          {/* Stationary Bike Silhouettes */}
          <g className="stationary-bike bike-adventure" transform="translate(460, 162) scale(0.65)" fill="#050002">
            <circle cx="22" cy="50" r="14" /><circle cx="82" cy="50" r="14" />
            <circle cx="22" cy="50" r="8" fill="#150205" /><circle cx="82" cy="50" r="8" fill="#150205" />
            <path d="M 22 50 L 40 32 L 58 30 L 72 26 L 82 50 L 60 52 L 40 50 Z" />
            <path d="M 38 28 C 44 24 54 24 64 27 L 70 18 L 65 14 L 56 22 Z" />
            <rect x="14" y="24" width="14" height="12" rx="2" />
            <line x1="68" y1="18" x2="74" y2="16" stroke="#050002" strokeWidth="3" />
          </g>
          <g className="stationary-bike bike-scooter" transform="translate(790, 172) scale(0.68)">
            <polygon points="76,38 180,24 195,58 76,44" fill="url(#headlightBeam)" opacity="0.65" />
            <circle cx="75" cy="41" r="3.5" fill="#ffffff" filter="url(#neonRedGlow)" />
            <g fill="#050002">
              <circle cx="20" cy="50" r="11" /><circle cx="72" cy="50" r="11" />
              <path d="M 18 50 L 32 44 L 46 45 L 60 40 L 72 40 L 68 28 L 56 32 L 42 42 L 28 38 Z" />
              <circle cx="50" cy="10" r="8" />
              <path d="M 46 18 L 54 18 L 58 32 L 68 30 L 66 33 L 52 38 L 44 32 Z" />
              <path d="M 44 34 L 50 42 L 44 45 L 38 42 Z" />
            </g>
          </g>
          <g className="stationary-bike bike-sport-parked" transform="translate(1240, 170) scale(0.65)" fill="#050002">
            <circle cx="20" cy="50" r="13" /><circle cx="78" cy="50" r="13" />
            <path d="M 20 50 L 36 34 L 52 30 L 70 24 L 78 50 L 58 50 L 40 48 Z" />
            <path d="M 50 24 L 64 22 L 72 16 L 62 16 Z" />
            <circle cx="48" cy="12" r="7.5" />
            <path d="M 44 19 L 52 19 L 56 30 L 42 30 Z" />
          </g>

          {/* Curved Highway Road Base & Neon Red Light Crest */}
          <path
            className="road-body-fill"
            fill="#08080a"
            d="M 0 300 L 0 216 C 180 205, 320 228, 480 220 C 640 212, 740 196, 900 204 C 1060 212, 1220 236, 1400 224 C 1480 218, 1540 214, 1600 210 L 1600 300 Z"
          />
          <path
            className="road-neon-edge"
            id="road-crest-path"
            d="M 0 216 C 180 205, 320 228, 480 220 C 640 212, 740 196, 900 204 C 1060 212, 1220 236, 1400 224 C 1480 218, 1540 214, 1600 210"
            stroke="#ff1f24"
            strokeWidth="3.5"
            fill="none"
            filter="url(#neonRedGlow)"
            strokeLinecap="round"
          />
          <path
            d="M 0 216 C 180 205, 320 228, 480 220 C 640 212, 740 196, 900 204 C 1060 212, 1220 236, 1400 224 C 1480 218, 1540 214, 1600 210"
            stroke="#ffffff"
            strokeWidth="1.2"
            opacity="0.8"
            fill="none"
          />

          {/* Traveling Motorcycle with Headlight Beam & Taillight Streak */}
          <g className="traveling-motorcycle-carrier" id="traveling-motorcycle-carrier">
            {/* Native SVG Translation along the exact Road Curve */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="-160 160; 350 168; 740 140; 1220 180; 1750 154"
              keyTimes="0; 0.25; 0.48; 0.74; 1"
              dur="10s"
              repeatCount="indefinite"
            />
            {/* Red Taillight Streaks streaming behind */}
            <g className="tail-light-streaks" opacity="0.9">
              <path d="M 0 26 C -40 24, -90 18, -140 16" stroke="url(#tailLightTrail)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              <path d="M 0 29 C -30 28, -75 25, -115 24" stroke="url(#tailLightTrail)" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 0 33 C -20 33, -60 32, -90 32" stroke="url(#tailLightTrail)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>
            {/* Bright Headlight Cone Beam casting light forward onto road */}
            <g className="headlight-beam-group">
              <polygon points="98,28 260,10 280,68 98,38" fill="url(#headlightBeam)" opacity="0.75" />
              <circle cx="98" cy="32" r="5" fill="#ffffff" filter="url(#neonRedGlow)" />
              <ellipse cx="210" cy="52" rx="45" ry="10" fill="#ffeaa7" opacity="0.25" />
            </g>
            {/* Racer Silhouette & Spinning Wheels */}
            <g className="racer-bike-silhouette" fill="#040001">
              <g className="bike-wheel rear-wheel">
                <circle cx="22" cy="42" r="14" fill="#040001" stroke="#ff2200" strokeWidth="1.2" />
                <circle cx="22" cy="42" r="8" fill="#111" />
                <g className="wheel-spokes-group">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 22 42"
                    to="360 22 42"
                    dur="0.3s"
                    repeatCount="indefinite"
                  />
                  <line x1="22" y1="28" x2="22" y2="56" stroke="#444" strokeWidth="1" className="wheel-spoke" />
                  <line x1="8" y1="42" x2="36" y2="42" stroke="#444" strokeWidth="1" className="wheel-spoke" />
                  <line x1="12" y1="32" x2="32" y2="52" stroke="#444" strokeWidth="1" className="wheel-spoke" />
                  <line x1="12" y1="52" x2="32" y2="32" stroke="#444" strokeWidth="1" className="wheel-spoke" />
                </g>
              </g>
              <g className="bike-wheel front-wheel">
                <circle cx="86" cy="42" r="14" fill="#040001" stroke="#ff2200" strokeWidth="1.2" />
                <circle cx="86" cy="42" r="8" fill="#111" />
                <g className="wheel-spokes-group">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 86 42"
                    to="360 86 42"
                    dur="0.3s"
                    repeatCount="indefinite"
                  />
                  <line x1="86" y1="28" x2="86" y2="56" stroke="#444" strokeWidth="1" className="wheel-spoke" />
                  <line x1="72" y1="42" x2="100" y2="42" stroke="#444" strokeWidth="1" className="wheel-spoke" />
                  <line x1="76" y1="32" x2="96" y2="52" stroke="#444" strokeWidth="1" className="wheel-spoke" />
                  <line x1="76" y1="52" x2="96" y2="32" stroke="#444" strokeWidth="1" className="wheel-spoke" />
                </g>
              </g>
              <line x1="22" y1="42" x2="48" y2="40" stroke="#040001" strokeWidth="5" />
              <line x1="38" y1="43" x2="18" y2="44" stroke="#ff4400" strokeWidth="2.5" />
              <path d="M 22 42 L 40 26 L 56 22 L 78 18 L 94 28 L 86 42 L 62 44 L 42 42 Z" />
              <path d="M 72 16 L 86 16 L 96 28 L 84 28 Z" />
              <ellipse cx="68" cy="8" rx="8.5" ry="7" />
              <ellipse cx="50" cy="12" rx="7" ry="5" />
              <path d="M 44 14 C 52 10, 60 12, 68 14 L 72 24 L 56 24 Z" />
              <path d="M 46 22 L 40 32 L 52 35 L 56 24 Z" />
              <path d="M 62 16 L 78 20 L 76 24 L 60 20 Z" />
            </g>
          </g>
        </svg>
      </div>

      {/* 3. MAIN FOOTER BODY (Deep Onyx / Carbon with Tire Tread Accents) */}
      <div className="footer-body-wrapper relative bg-[#070709] px-6 pt-7 pb-5 lg:px-12 z-20">
        <div className="tire-tread-glow-left" aria-hidden="true" />
        <div className="tire-tread-glow-right" aria-hidden="true" />

        <div className="footer-main-container max-w-7xl mx-auto">
          {/* 4-Column Responsive Grid - Sleek & Compact Spacing */}
          <div className="footer-columns-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-6 border-b border-white/10">
            {/* Col 1: Brand & Showroom */}
            <div className="footer-col brand-col lg:col-span-2 space-y-3">
              <div className="footer-brand-header flex items-center gap-3">
                <div className="relative h-11 w-11 shrink-0">
                  <Image
                    src="/media/branding/udan-logo.png"
                    alt="Udan Enterprises"
                    fill
                    loading="lazy"
                    sizes="44px"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <BrandBounceText sizeClassName="text-base" dark={true} />
                  <span className="text-[9px] text-[#FF4D4D] uppercase tracking-widest mt-1 font-bold">
                    {t.brand_subtitle}
                  </span>
                </div>
              </div>

              <p className="brand-description text-xs text-slate-400 leading-relaxed max-w-md">
                {t.footer_desc}
              </p>

              <div className="showroom-quick-card p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5 text-xs">
                <div className="font-heading font-bold text-[#FF5E14] text-xs tracking-wide">
                  {settings.footerTagline || t.slogan_charge}
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                    Showroom Address:
                  </span>
                  {settings.address || t.showroom_address}
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                    Hotline & WhatsApp:
                  </span>
                  <a
                    href={`tel:${(settings.hotline || "+94784969652").replace(/\s+/g, '')}`}
                    className="text-white hover:text-[#FF5E14] font-bold transition-colors"
                  >
                    {settings.hotline || t.phone_label}
                  </a>
                </div>
                <div className="pt-0.5">
                  <a
                    href={settings.googleMapsUrl || "https://maps.app.goo.gl/GyJCSSS7p6Bd18xM8"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-white/10 hover:bg-[#FF5E14] px-3 py-1.5 rounded-lg border border-white/15 transition-all mt-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#FF5E14]" />
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </div>
              </div>

              {/* Social Media Cluster with Animated Rings */}
              <div className="footer-social-cluster flex items-center gap-2 pt-1">
                <a
                  href={settings.facebookUrl || "https://facebook.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle-btn w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#FF5E14] hover:bg-[#FF5E14]/20 transition-all"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7v-3h3V9.5C10 6.57 11.76 5 14.4 5c1.26 0 2.38.09 2.7.13v3.13h-1.85c-1.42 0-1.7.67-1.7 1.66V12h3.45l-.45 3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                  </svg>
                </a>
                <a
                  href={`https://wa.me/${(settings.whatsappNumber || "94784969652").replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle-btn w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500 hover:bg-emerald-500/20 transition-all"
                  aria-label="WhatsApp"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.53 1.37 5.08L2 22l5.17-1.36c1.49.81 3.17 1.25 4.87 1.25 5.46 0 9.91-4.45 9.91-9.91A9.91 9.91 0 0 0 12.04 2zm0 16.33c-1.5 0-2.98-.4-4.26-1.16l-.31-.18-3.16.83.84-3.08-.2-.32a8.03 8.03 0 0 1-1.23-4.47c0-4.47 3.64-8.11 8.12-8.11 2.17 0 4.21.85 5.75 2.38a8.07 8.07 0 0 1 2.37 5.73c0 4.47-3.64 8.11-8.12 8.11z" />
                  </svg>
                </a>
                <a
                  href={settings.instagramUrl || "https://instagram.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle-btn w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500 hover:bg-pink-500/20 transition-all"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-circle-btn w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-500 hover:bg-red-500/20 transition-all"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2: Zuboo Featured Models */}
            <div className="footer-col bikes-col lg:col-span-1 space-y-2.5">
              <h4 className="footer-col-title text-[11px] font-extrabold uppercase tracking-[1.5px] text-[#E2E8F0] flex items-center gap-1.5">
                <span className="footer-slash text-[#FF5E14]">/</span> {t.footer_models}
              </h4>
              <ul className="footer-nav-list grid grid-cols-2 md:grid-cols-1 gap-2 text-xs font-medium text-slate-300">
                <li>
                  <Link
                    href="/bikes/t3"
                    className="footer-nav-link group p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#FF5E14]/50 transition-all flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5 min-w-0">
                      <span className="arrow-bullet text-[#FF2222] font-black text-xs transition-transform duration-200 group-hover:translate-x-0.5 shrink-0">›</span>
                      <span className="truncate group-hover:text-white">Zuboo T3</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FF5E14]/15 text-[#FF5E14] font-bold border border-[#FF5E14]/30 shrink-0 ml-1">2000W</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bikes/gt"
                    className="footer-nav-link group p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#FF5E14]/50 transition-all flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5 min-w-0">
                      <span className="arrow-bullet text-[#FF2222] font-black text-xs transition-transform duration-200 group-hover:translate-x-0.5 shrink-0">›</span>
                      <span className="truncate group-hover:text-white">Zuboo GT</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-bold shrink-0 ml-1">1800W</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bikes/the-tank"
                    className="footer-nav-link group p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#FF5E14]/50 transition-all flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5 min-w-0">
                      <span className="arrow-bullet text-[#FF2222] font-black text-xs transition-transform duration-200 group-hover:translate-x-0.5 shrink-0">›</span>
                      <span className="truncate group-hover:text-white">Zuboo The Tank</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FF5E14]/15 text-[#FF5E14] font-bold border border-[#FF5E14]/30 shrink-0 ml-1">3000W</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bikes/paris"
                    className="footer-nav-link group p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#FF5E14]/50 transition-all flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5 min-w-0">
                      <span className="arrow-bullet text-[#FF2222] font-black text-xs transition-transform duration-200 group-hover:translate-x-0.5 shrink-0">›</span>
                      <span className="truncate group-hover:text-white">Zuboo Paris</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-bold shrink-0 ml-1">Retro</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bikes/t11"
                    className="footer-nav-link group p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#FF5E14]/50 transition-all flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5 min-w-0">
                      <span className="arrow-bullet text-[#FF2222] font-black text-xs transition-transform duration-200 group-hover:translate-x-0.5 shrink-0">›</span>
                      <span className="truncate group-hover:text-white">Zuboo T11</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-bold shrink-0 ml-1">Sport</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bikes/ex008"
                    className="footer-nav-link group p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#FF5E14]/50 transition-all flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5 min-w-0">
                      <span className="arrow-bullet text-[#FF2222] font-black text-xs transition-transform duration-200 group-hover:translate-x-0.5 shrink-0">›</span>
                      <span className="truncate group-hover:text-white">Zuboo EX008</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FF5E14]/15 text-[#FF5E14] font-bold border border-[#FF5E14]/30 shrink-0 ml-1">2000W</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bikes/mini"
                    className="footer-nav-link group p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#FF5E14]/50 transition-all flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5 min-w-0">
                      <span className="arrow-bullet text-[#FF2222] font-black text-xs transition-transform duration-200 group-hover:translate-x-0.5 shrink-0">›</span>
                      <span className="truncate group-hover:text-white">Zuboo Mini</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-bold shrink-0 ml-1">City</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bikes/kb1"
                    className="footer-nav-link group p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#FF5E14]/50 transition-all flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5 min-w-0">
                      <span className="arrow-bullet text-[#FF2222] font-black text-xs transition-transform duration-200 group-hover:translate-x-0.5 shrink-0">›</span>
                      <span className="truncate group-hover:text-white">Zuboo KB1</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-bold shrink-0 ml-1">Utility</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Newsletter & Updates */}
            <div className="footer-col newsletter-col lg:col-span-1 space-y-2.5">
              <h4 className="footer-col-title text-[11px] font-extrabold uppercase tracking-[1.5px] text-[#E2E8F0] flex items-center gap-1.5">
                <span className="footer-slash text-[#FF5E14]">/</span> {t.footer_stay_informed}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.footer_newsletter_desc}
              </p>

              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5E14] focus:ring-1 focus:ring-[#FF5E14]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-[#FF5E14] to-[#ef4444] hover:from-[#e04d09] hover:to-[#dc2626] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:shadow-[#FF5E14]/20 flex items-center justify-center gap-1.5"
                  >
                    <span>{t.footer_join_btn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Thank you. You are on the priority update list.</span>
                </div>
              )}
            </div>
          </div>

          {/* 4. BOTTOM DISCLAIMER, CREDITS & BACK TO TOP */}
          <div className="footer-bottom-bar pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
            <div className="copyright-text text-center sm:text-left">
              © {new Date().getFullYear()} Udan Enterprises (Pvt) Ltd. {t.footer_all_rights}
            </div>

            <div className="footer-legal-links flex items-center gap-3 text-slate-400">
              <Link href="/contact" className="hover:text-white transition-colors">
                Showroom Verification
              </Link>
              <span className="text-slate-600">|</span>
              <span>Crafted by <strong className="text-slate-300">Harsh Apex Digital Solutions</strong></span>
            </div>

            {/* Smooth Back-to-Top Button with Breathing Pulse */}
            <button
              type="button"
              onClick={scrollToTop}
              className="back-to-top-circle w-9 h-9 rounded-full bg-white/5 border-2 border-[#FF2222] text-[#FF2222] hover:bg-[#FF2222] hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
              aria-label="Back to Top"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
