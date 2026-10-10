"use client";
import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeInProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
}

export default function FadeIn({ children, className = '', direction = 'up', delay = 0, duration = 0.7 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const y = direction === 'up' ? 30 : direction === 'down' ? -30 : 0;
    const x = direction === 'left' ? 30 : direction === 'right' ? -30 : 0;
    const tween = gsap.fromTo(ref.current,
      { opacity: 0, y, x },
      { opacity: 1, y: 0, x: 0, duration, delay, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true }
      }
    );
    return () => { tween.kill(); };
  }, [direction, delay, duration]);
  return <div ref={ref} className={className}>{children}</div>;
}
