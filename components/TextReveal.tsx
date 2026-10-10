"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  splitBy?: 'words' | 'chars';
}

export default function TextReveal({ children, as: Tag = 'h2', className = '', delay = 0, splitBy = 'words' }: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const text = el.textContent || '';
    const units = splitBy === 'words' ? text.split(' ') : text.split('');
    el.innerHTML = units.map(u => 
      `<span style="display:inline-block;overflow:hidden"><span class="reveal-unit" style="display:inline-block">${u === ' ' ? '&nbsp;' : u}</span></span>${splitBy === 'words' ? ' ' : ''}`
    ).join('');
    const spans = el.querySelectorAll('.reveal-unit');
    const ctx = gsap.context(() => {
      gsap.fromTo(spans, 
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.6,
          stagger: splitBy === 'words' ? 0.04 : 0.02, 
          ease: 'power3.out',
          delay,
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [children, delay, splitBy]);
  return <Tag ref={containerRef as any} className={className}>{children}</Tag>;
}

