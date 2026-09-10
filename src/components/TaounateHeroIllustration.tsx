import React from 'react';

export const TaounateHeroIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-950 via-slate-900 to-red-950 p-1 shadow-2xl border border-amber-500/30 ${className}`}>
      {/* Decorative Moroccan Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Main SVG Graphic */}
      <svg
        viewBox="0 0 800 550"
        className="w-full h-auto rounded-[22px] block select-none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="مشهد طبيعي مستوحى من تضاريس إقليم تاونات وجبال الريف وسد الوحدة وبساتين الزيتون"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="35%" stopColor="#1e293b" />
            <stop offset="70%" stopColor="#78350f" />
            <stop offset="90%" stopColor="#991b1b" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>

          <linearGradient id="sunGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="rifMountFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <linearGradient id="rifMountMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="100%" stopColor="#022c22" />
          </linearGradient>

          <linearGradient id="damLake" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#075985" />
          </linearGradient>

          <linearGradient id="moroccanOliveHill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="60%" stopColor="#166534" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>

          <linearGradient id="foregroundHill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#991b1b" />
            <stop offset="100%" stopColor="#450a0a" />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect width="800" height="550" fill="url(#skyGrad)" />

        {/* Moroccan Sunrise and geometric subtle halo */}
        <circle cx="400" cy="240" r="140" fill="url(#sunGlow)" />
        <circle cx="400" cy="240" r="65" fill="#fef08a" opacity="0.9" />

        {/* Geometric Star of Morocco (Subtle watermark in the sunrise) */}
        <g transform="translate(400, 240) scale(0.6)" opacity="0.25">
          <polygon
            points="0,-80 23,-25 80,-25 35,10 52,65 0,30 -52,65 -35,10 -80,-25 -23,-25"
            fill="#065f46"
            stroke="#fef08a"
            strokeWidth="3"
          />
        </g>

        {/* Distant High Rif Mountain Ridges (جبال الريف والقمم الشامخة) */}
        <path
          d="M0 320 Q120 230 240 280 T480 250 T720 280 L800 310 L800 550 L0 550 Z"
          fill="url(#rifMountFar)"
          opacity="0.85"
        />

        {/* Mid Rif Hills with rugged crests */}
        <path
          d="M0 350 C150 290 280 340 400 310 C540 280 670 340 800 330 L800 550 L0 550 Z"
          fill="url(#rifMountMid)"
        />

        {/* Barrage Al Wahda / Water Reservoir Lake (سد الوحدة) */}
        <path
          d="M60 410 C200 370 360 380 500 395 C630 405 720 385 800 420 L800 470 C650 490 350 495 0 460 L0 410 Z"
          fill="url(#damLake)"
          opacity="0.9"
        />

        {/* Water Ripple Reflections */}
        <path d="M220 420 Q350 410 460 425" stroke="#bae6fd" strokeWidth="2.5" opacity="0.6" fill="none" />
        <path d="M150 440 Q320 435 520 445" stroke="#bae6fd" strokeWidth="1.8" opacity="0.5" fill="none" />
        <path d="M300 455 Q420 450 600 460" stroke="#bae6fd" strokeWidth="2" opacity="0.4" fill="none" />

        {/* Rolling Olive Grooves Hill (تلال الزيتون بتاونات) */}
        <path
          d="M-20 450 Q220 380 420 430 T820 440 L820 550 L-20 550 Z"
          fill="url(#moroccanOliveHill)"
        />

        {/* Stylized Olive Trees clusters */}
        <g fill="#14532d" stroke="#166534" strokeWidth="1">
          {/* Group left */}
          <ellipse cx="140" cy="445" rx="22" ry="14" />
          <ellipse cx="160" cy="440" rx="26" ry="16" fill="#15803d" />
          <ellipse cx="185" cy="448" rx="20" ry="13" />

          {/* Group center */}
          <ellipse cx="380" cy="465" rx="28" ry="18" fill="#166534" />
          <ellipse cx="415" cy="460" rx="32" ry="20" fill="#15803d" />
          <ellipse cx="445" cy="468" rx="22" ry="14" />

          {/* Group right */}
          <ellipse cx="640" cy="470" rx="24" ry="16" />
          <ellipse cx="670" cy="463" rx="30" ry="19" fill="#15803d" />
          <ellipse cx="705" cy="472" rx="20" ry="14" />
        </g>

        {/* Foreground warm terrace hill with Moroccan Red tone */}
        <path
          d="M0 500 C200 480 450 510 800 490 L800 550 L0 550 Z"
          fill="url(#foregroundHill)"
          opacity="0.9"
        />

        {/* Traditional Moroccan architectural minaret silhouette in distance */}
        <g transform="translate(620, 315) scale(0.7)" fill="#1e293b" opacity="0.9">
          <rect x="25" y="40" width="22" height="70" rx="2" />
          <polygon points="36,15 22,40 50,40" />
          <line x1="36" y1="5" x2="36" y2="15" stroke="#f59e0b" strokeWidth="3" />
          <circle cx="36" cy="5" r="3" fill="#f59e0b" />
        </g>

        {/* Golden Moroccan Banner Ribbon text */}
        <g transform="translate(400, 520)">
          <rect x="-170" y="-18" width="340" height="34" rx="17" fill="#0f172a" stroke="#d97706" strokeWidth="1.5" opacity="0.92" />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fill="#fef3c7"
            fontSize="14"
            fontFamily="Cairo, sans-serif"
            fontWeight="bold"
          >
            إقليم تاونات • طبيعة جبلية وأولويات تنموية طموحة
          </text>
        </g>
      </svg>
    </div>
  );
};
