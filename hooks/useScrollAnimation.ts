"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const children = ref.current.querySelectorAll('[data-animate]');
    const ctx = gsap.context(() => {
      children.forEach((el, i) => {
        const direction = el.getAttribute('data-animate') || 'up';
        const delay = parseFloat(el.getAttribute('data-delay') || '0');
        const y = direction === 'up' ? 40 : direction === 'down' ? -40 : 0;
        const x = direction === 'left' ? 40 : direction === 'right' ? -40 : 0;
        gsap.fromTo(
          el,
          { opacity: 0, y, x, scale: direction === 'scale' ? 0.95 : 1 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: 0.8,
            delay: delay + i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, []);
  return ref;
}

export function useCountUp(target: number, duration = 2) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 90%',
        toggleActions: 'play reverse play reverse',
      },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.val).toLocaleString();
      },
    });
    return () => {
      tween.kill();
    };
  }, [target, duration]);
  return ref;
}

