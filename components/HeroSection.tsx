"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Zap, ShieldCheck, DollarSign, Play, Pause, Volume2, VolumeX, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface HeroSectionProps {
  onOpenTestRide: () => void;
}

export default function HeroSection({ onOpenTestRide }: HeroSectionProps) {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-[#F7F9FA] hairline-b overflow-hidden"
    >
      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            {/* Minimal Brand Tag */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#E8F1F5] border border-[#E0E8EC] text-[#346C83] text-[11px] font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#346C83]" />
              <span>{t.hero_eyebrow}</span>
            </div>

            {/* Oversized Editorial Typography */}
            <h1 className="font-heading text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#111820] leading-[1.04]">
              <div>{t.hero_title_1}</div>
              <div>
                <span className="text-[#346C83]">{t.hero_title_2}</span>
              </div>
              <div>{t.hero_title_3}</div>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#667780] max-w-lg leading-relaxed font-normal">
              {t.hero_desc}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#models"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#111820] hover:bg-[#346C83] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm group"
              >
                <span>{t.hero_btn_explore}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={onOpenTestRide}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-[#E0E8EC] hover:border-[#111820] bg-white text-[#111820] font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <span>{t.hero_btn_book}</span>
              </button>
            </div>

            {/* Metric Strip matching design */}
            <div className="pt-6 border-t border-[#E0E8EC] grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[#346C83]">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm sm:text-base font-bold text-[#111820]">100%</span>
                </div>
                <div className="text-[11px] text-[#667780] font-medium uppercase tracking-wide">
                  {t.metric_electric}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[#346C83]">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-sm sm:text-base font-bold text-[#111820]">0%</span>
                </div>
                <div className="text-[11px] text-[#667780] font-medium uppercase tracking-wide">
                  {t.metric_emissions}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[#346C83]">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm sm:text-base font-bold text-[#111820]">Low Cost</span>
                </div>
                <div className="text-[11px] text-[#667780] font-medium uppercase tracking-wide">
                  {t.metric_cost}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Video Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#E0E8EC] bg-[#111820] shadow-xl aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5]">
              <video
                ref={videoRef}
                src="/media/hero/hero-video.mp4"
                preload="none"
                poster="/media/hero/hero-poster.webp"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover object-center"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

              {/* Top Controls */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ZUBOO APEX SERIES
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-lg bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-colors"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-lg bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-colors"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-5 left-5 right-5 z-10">
                <div className="p-4 sm:p-5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#E8F1F5]/80">
                    RIDE • CHANGE • LIVE CLEAN
                  </p>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-white mt-0.5">
                    Smart Technology For A Smoother Ride
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
