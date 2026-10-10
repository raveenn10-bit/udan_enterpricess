"use client";
import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';
  delay?: number;
  duration?: number;
  bidirectional?: boolean;
  threshold?: string;
  endThreshold?: string;
}

export default function FadeIn({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.7,
  bidirectional = true,
  threshold,
  endThreshold,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const y = direction === 'up' ? 30 : direction === 'down' ? -30 : 0;
    const x = direction === 'left' ? 30 : direction === 'right' ? -30 : 0;
    const scale = direction === 'scale' ? 0.95 : 1;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y, x, scale },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: threshold || "top 88%",
            end: endThreshold || "bottom 10%",
            toggleActions: bidirectional ? "play reverse play reverse" : "play none none none",
          },
        }
      );
    }, ref);

    return () => {
      ctx.revert();
    };
  }, [direction, delay, duration, bidirectional, threshold, endThreshold]);

  return <div ref={ref} className={className}>{children}</div>;
}

