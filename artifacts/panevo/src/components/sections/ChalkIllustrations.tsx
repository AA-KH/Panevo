/**
 * ChalkIllustrations
 *
 * A set of reusable inline SVG chalk/line illustrations for use throughout
 * the PANEVO website. All are colourless (inherit currentColor) so they
 * blend with any background using opacity.
 *
 * Usage:
 *   <ChalkCow className="w-32 h-32 opacity-20 text-white" />
 */

/** Small floating milk droplet + splash for header accents */
export function ChalkMilkSplash({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 70"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        {/* Drop body */}
        <path d="M30 60 Q16 44 20 30 Q24 14 30 10 Q36 14 40 30 Q44 44 30 60Z" />
        {/* Splash arcs */}
        <path d="M30 10 Q24 2 18 6" strokeWidth="1.2" />
        <path d="M30 10 Q36 2 42 6" strokeWidth="1.2" />
        <path d="M30 10 Q28 0 30 -2" strokeWidth="1.2" />
        {/* Tiny droplets */}
        <circle cx="16" cy="4" r="1.5" fill="currentColor" opacity="0.5" />
        <circle cx="44" cy="5" r="1.2" fill="currentColor" opacity="0.5" />
        <circle cx="30" cy="1" r="2" fill="currentColor" opacity="0.4" />
        {/* Shine */}
        <path d="M24 35 Q25 30 26 35" strokeWidth="1" opacity="0.5" />
      </g>
    </svg>
  );
}

/** Simple cow head for corner accents */
export function ChalkCowHead({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        {/* Head */}
        <ellipse cx="40" cy="46" rx="24" ry="22" />
        {/* Snout */}
        <ellipse cx="40" cy="62" rx="12" ry="7" />
        {/* Nostrils */}
        <circle cx="36" cy="63" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="44" cy="63" r="2" fill="currentColor" opacity="0.5" />
        {/* Eyes */}
        <circle cx="30" cy="42" r="3" />
        <circle cx="50" cy="42" r="3" />
        <circle cx="31" cy="41" r="1" fill="currentColor" />
        <circle cx="51" cy="41" r="1" fill="currentColor" />
        {/* Ears */}
        <path d="M16 38 Q8 28 14 26 Q20 26 22 36" />
        <path d="M64 38 Q72 28 66 26 Q60 26 58 36" />
        {/* Horns */}
        <path d="M20 30 Q14 16 22 14" strokeWidth="1.4" />
        <path d="M60 30 Q66 16 58 14" strokeWidth="1.4" />
        {/* Spot on head */}
        <path d="M36 32 Q40 26 44 32 Q42 38 36 32Z" strokeWidth="1" opacity="0.4" />
      </g>
    </svg>
  );
}

/** Herb sprig cluster for section accents */
export function ChalkHerbs({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 110"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {/* Oregano left */}
        <path d="M20 105 Q22 82 20 58" strokeWidth="1.4" />
        <path d="M20 95 Q11 88 18 90" strokeWidth="1.1" />
        <path d="M20 85 Q29 78 22 81" strokeWidth="1.1" />
        <path d="M20 75 Q11 68 18 71" strokeWidth="1.1" />
        <path d="M20 65 Q29 58 22 61" strokeWidth="1.1" />
        <circle cx="13" cy="90" r="1.8" fill="currentColor" opacity="0.35" />
        <circle cx="29" cy="80" r="1.8" fill="currentColor" opacity="0.35" />

        {/* Basil centre */}
        <path d="M50 105 L50 72" strokeWidth="1.4" />
        <path d="M50 85 Q36 71 42 79 Q44 86 50 85Z" strokeWidth="1.2" />
        <path d="M50 77 Q64 63 58 71 Q56 78 50 77Z" strokeWidth="1.2" />
        <path d="M50 72 Q43 62 50 65 Q57 62 50 72Z" strokeWidth="1.1" />

        {/* Rosemary right */}
        <path d="M80 105 Q82 82 80 58" strokeWidth="1.4" />
        <path d="M80 95 Q71 89 78 91" strokeWidth="1.1" />
        <path d="M80 87 Q89 81 82 83" strokeWidth="1.1" />
        <path d="M80 79 Q71 73 78 75" strokeWidth="1.1" />
        <path d="M80 71 Q89 65 82 67" strokeWidth="1.1" />
        <path d="M80 63 Q73 57 78 59" strokeWidth="1.1" />
      </g>
    </svg>
  );
}

/** Paneer block with texture */
export function ChalkPaneer({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4">
        {/* Main face */}
        <rect x="10" y="26" width="58" height="42" />
        {/* Top face */}
        <path d="M10 26 L28 10 L86 10 L68 26Z" />
        {/* Right face */}
        <path d="M68 26 L86 10 L86 52 L68 68Z" />
        {/* Texture lines on front */}
        <line x1="10" y1="40" x2="68" y2="40" strokeWidth="0.8" opacity="0.5" />
        <line x1="10" y1="54" x2="68" y2="54" strokeWidth="0.8" opacity="0.5" />
        <line x1="30" y1="26" x2="30" y2="68" strokeWidth="0.8" opacity="0.4" />
        <line x1="50" y1="26" x2="50" y2="68" strokeWidth="0.8" opacity="0.4" />
        {/* Top texture */}
        <line x1="28" y1="18" x2="76" y2="18" strokeWidth="0.8" opacity="0.4" />
        {/* Herb speckles */}
        <circle cx="20" cy="34" r="1.2" fill="currentColor" opacity="0.4" />
        <circle cx="40" cy="46" r="1.2" fill="currentColor" opacity="0.4" />
        <circle cx="58" cy="33" r="1.2" fill="currentColor" opacity="0.4" />
        <circle cx="23" cy="58" r="1.2" fill="currentColor" opacity="0.4" />
        <circle cx="55" cy="60" r="1.2" fill="currentColor" opacity="0.4" />
      </g>
    </svg>
  );
}

/** Rolling farm hills with a tiny sun */
export function ChalkFarmHills({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 80"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {/* Sun */}
        <circle cx="170" cy="18" r="10" strokeWidth="1.3" />
        <line x1="170" y1="4" x2="170" y2="0" strokeWidth="1.2" />
        <line x1="182" y1="8" x2="185" y2="5" strokeWidth="1.2" />
        <line x1="186" y1="18" x2="190" y2="18" strokeWidth="1.2" />
        <line x1="182" y1="28" x2="185" y2="31" strokeWidth="1.2" />
        <line x1="158" y1="28" x2="155" y2="31" strokeWidth="1.2" />
        <line x1="154" y1="18" x2="150" y2="18" strokeWidth="1.2" />
        <line x1="158" y1="8" x2="155" y2="5" strokeWidth="1.2" />
        {/* Hills */}
        <path d="M0 80 Q30 40 60 80 Q90 40 120 80 Q150 30 200 80" strokeWidth="1.5" opacity="0.8" />
        {/* Far hills */}
        <path d="M0 80 Q50 55 100 70 Q150 50 200 75" strokeWidth="1" opacity="0.4" />
        {/* Tiny tree */}
        <line x1="60" y1="80" x2="60" y2="55" strokeWidth="1.2" />
        <path d="M50 62 Q60 48 70 62 Q64 60 60 55 Q56 60 50 62Z" strokeWidth="1" opacity="0.7" />
      </g>
    </svg>
  );
}

/** Scattering of peppercorns */
export function ChalkPeppercorns({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 60"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3">
        <circle cx="12" cy="30" r="5" />
        <circle cx="26" cy="22" r="4" />
        <circle cx="22" cy="42" r="4.5" />
        <circle cx="40" cy="32" r="5.5" />
        <circle cx="54" cy="24" r="4" />
        <circle cx="50" cy="44" r="5" />
        <circle cx="68" cy="34" r="4.5" />
        {/* Stem nubs */}
        <circle cx="12" cy="25.5" r="1" fill="currentColor" opacity="0.6" />
        <circle cx="26" cy="18.5" r="1" fill="currentColor" opacity="0.6" />
        <circle cx="40" cy="27" r="1" fill="currentColor" opacity="0.6" />
        <circle cx="54" cy="20" r="1" fill="currentColor" opacity="0.6" />
        <circle cx="68" cy="30" r="1" fill="currentColor" opacity="0.6" />
      </g>
    </svg>
  );
}

/** Chilli pepper pair */
export function ChalkChilli({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 70 90"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        {/* Left chilli */}
        <path d="M20 18 Q6 24 8 42 Q10 60 22 68 Q32 72 36 60 Q38 46 28 30 Q24 22 20 18Z" />
        <path d="M20 18 Q18 8 20 2" strokeWidth="1.4" />
        <path d="M18 10 Q10 8 14 14" strokeWidth="1.1" />
        {/* Right chilli (slightly rotated) */}
        <path d="M50 14 Q64 22 62 40 Q60 58 48 64 Q38 66 36 54 Q34 40 44 26 Q48 18 50 14Z" />
        <path d="M50 14 Q52 4 50 -2" strokeWidth="1.4" />
        <path d="M52 6 Q60 4 56 10" strokeWidth="1.1" />
        {/* Highlight lines */}
        <path d="M15 36 Q16 30 17 36" strokeWidth="0.9" opacity="0.5" />
        <path d="M55 32 Q56 26 57 32" strokeWidth="0.9" opacity="0.5" />
      </g>
    </svg>
  );
}

/** Star/asterisk burst – small decorative accent */
export function ChalkStarburst({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeWidth="1.3">
        <line x1="20" y1="2" x2="20" y2="38" />
        <line x1="2" y1="20" x2="38" y2="20" />
        <line x1="6" y1="6" x2="34" y2="34" />
        <line x1="34" y1="6" x2="6" y2="34" />
      </g>
    </svg>
  );
}
