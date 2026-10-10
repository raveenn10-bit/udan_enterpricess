"use client";

import React from "react";

interface BrandBounceTextProps {
  className?: string;
  sizeClassName?: string;
  dark?: boolean;
}

/**
 * Automotive Bounce Text component for "UDAN ENTERPRISES".
 * Features staggered entrance suspension dampening overshoot on mount
 * and a responsive spring bounce wave on hover.
 */
export default function BrandBounceText({
  className = "",
  sizeClassName = "text-base sm:text-lg",
  dark = false,
}: BrandBounceTextProps) {
  const word1 = "UDAN";
  const word2 = "ENTERPRISES";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-heading font-black tracking-tight uppercase select-none leading-none whitespace-nowrap ${sizeClassName} ${className}`}
      aria-label="UDAN ENTERPRISES"
    >
      <span className="inline-flex">
        {word1.split("").map((char, i) => (
          <span
            key={`udan-${i}`}
            className={`udan-bounce-letter transition-colors ${
              dark
                ? "text-white"
                : "text-slate-900 group-hover:text-[#FF5E14]"
            }`}
            style={{ "--char-index": i } as React.CSSProperties}
          >
            {char}
          </span>
        ))}
      </span>
      <span className="inline-flex">
        {word2.split("").map((char, i) => (
          <span
            key={`ent-${i}`}
            className="udan-bounce-letter text-[#FF5E14]"
            style={
              {
                "--char-index": word1.length + 1 + i,
              } as React.CSSProperties
            }
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  );
}
