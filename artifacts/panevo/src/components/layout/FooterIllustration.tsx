/**
 * FooterIllustration
 *
 * Clean, minimal, Google-style line illustration of farm & dairy life.
 * Rendered as inline SVG so it is colour-aware and fully integrated
 * with the footer's green (secondary) background — no raster image slap-on.
 *
 * The scene reads left-to-right:
 *   barn silo → rolling hills with a cow → herb sprigs → paneer block → milk jug
 * with subtle decorative lines below.
 */
export function FooterIllustration({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 120"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "auto", ...style }}
    >
      {/* ── STROKE STYLE: all strokes are currentColor (inherits footer text colour) */}
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" opacity="0.25">

        {/* ─── Ground baseline ─── */}
        <path d="M0 98 Q225 88 450 96 Q675 104 900 98" strokeWidth="1.2" />

        {/* ─── Rolling hills ─── */}
        <path d="M0 98 Q80 60 160 98 Q240 60 320 98 Q400 55 480 98 Q560 60 640 98 Q720 55 800 98 Q860 70 900 98"
              strokeWidth="1" opacity="0.5" />

        {/* ══════════════════════════════════
            BARN / SILO  (left side)
        ══════════════════════════════════ */}
        {/* Barn body */}
        <rect x="28" y="56" width="36" height="42" strokeWidth="1.4" />
        {/* Barn roof (pentagon) */}
        <path d="M24 56 L46 36 L70 56Z" strokeWidth="1.4" />
        {/* Barn door */}
        <rect x="37" y="74" width="16" height="24" strokeWidth="1.2" />
        {/* Silo */}
        <rect x="68" y="62" width="16" height="36" strokeWidth="1.2" />
        <path d="M68 62 Q76 54 84 62" strokeWidth="1.2" />
        {/* Silo horizontal lines */}
        <line x1="68" y1="70" x2="84" y2="70" strokeWidth="0.8" opacity="0.6" />
        <line x1="68" y1="78" x2="84" y2="78" strokeWidth="0.8" opacity="0.6" />
        {/* Weather vane */}
        <line x1="46" y1="36" x2="46" y2="26" strokeWidth="1" />
        <path d="M40 29 L46 26 L52 29" strokeWidth="1" />

        {/* ══════════════════════════════════
            COW  (centre-left)
        ══════════════════════════════════ */}
        {/* Body */}
        <ellipse cx="210" cy="82" rx="28" ry="16" strokeWidth="1.4" />
        {/* Head */}
        <ellipse cx="240" cy="72" rx="12" ry="10" strokeWidth="1.4" />
        {/* Ear */}
        <path d="M234 64 Q230 58 236 60" strokeWidth="1.1" />
        {/* Horn */}
        <path d="M238 63 Q242 56 246 60" strokeWidth="1.1" />
        {/* Eye */}
        <circle cx="243" cy="70" r="1.5" fill="currentColor" />
        {/* Nose dots */}
        <circle cx="249" cy="74" r="1" fill="currentColor" />
        <circle cx="245" cy="75" r="1" fill="currentColor" />
        {/* Mouth */}
        <path d="M245 76 Q247 79 250 76" strokeWidth="1" />
        {/* Tail */}
        <path d="M182 82 Q174 74 176 82 Q178 88 174 92" strokeWidth="1.2" />
        {/* Legs */}
        <line x1="196" y1="96" x2="194" y2="112" strokeWidth="1.3" />
        <line x1="206" y1="96" x2="205" y2="112" strokeWidth="1.3" />
        <line x1="218" y1="96" x2="218" y2="112" strokeWidth="1.3" />
        <line x1="228" y1="96" x2="229" y2="112" strokeWidth="1.3" />
        {/* Udder */}
        <path d="M200 96 Q206 104 214 96" strokeWidth="1" />
        {/* Spots */}
        <path d="M200 76 Q204 70 210 74 Q208 80 202 78Z" strokeWidth="0.9" opacity="0.5" />

        {/* ══════════════════════════════════
            HERB SPRIGS  (centre)
        ══════════════════════════════════ */}
        {/* Rosemary sprig left */}
        <path d="M380 98 Q382 78 380 58" strokeWidth="1.3" />
        <path d="M380 88 Q372 82 380 84" strokeWidth="1" />
        <path d="M380 80 Q388 74 380 76" strokeWidth="1" />
        <path d="M380 72 Q373 66 380 68" strokeWidth="1" />
        <path d="M380 64 Q387 58 380 60" strokeWidth="1" />

        {/* Basil plant */}
        <path d="M420 98 L420 70" strokeWidth="1.3" />
        {/* Big leaf left */}
        <path d="M420 80 Q406 68 412 76 Q414 82 420 80Z" strokeWidth="1.1" />
        {/* Big leaf right */}
        <path d="M420 73 Q434 61 428 69 Q426 75 420 73Z" strokeWidth="1.1" />
        {/* Top small leaf */}
        <path d="M420 70 Q414 62 420 64 Q426 62 420 70Z" strokeWidth="1" />

        {/* Coriander sprigs */}
        <path d="M455 98 L455 74" strokeWidth="1.2" />
        <path d="M455 86 Q446 80 455 82" strokeWidth="1" />
        <path d="M455 78 Q464 72 455 74" strokeWidth="1" />
        {/* Coriander leaves (fan) */}
        <path d="M455 74 Q448 64 452 70" strokeWidth="0.9" opacity="0.7" />
        <path d="M455 74 Q455 62 455 68" strokeWidth="0.9" opacity="0.7" />
        <path d="M455 74 Q462 64 458 70" strokeWidth="0.9" opacity="0.7" />

        {/* Oregano sprigs */}
        <path d="M490 98 Q492 80 490 62" strokeWidth="1.2" />
        <path d="M490 90 Q482 84 488 86" strokeWidth="1" />
        <path d="M490 82 Q498 76 492 78" strokeWidth="1" />
        <path d="M490 74 Q482 68 488 70" strokeWidth="1" />
        <path d="M490 66 Q498 60 492 62" strokeWidth="1" />
        {/* Small circles for oregano berries */}
        <circle cx="484" cy="86" r="1.5" fill="currentColor" opacity="0.4"/>
        <circle cx="498" cy="78" r="1.5" fill="currentColor" opacity="0.4"/>
        <circle cx="484" cy="70" r="1.5" fill="currentColor" opacity="0.4"/>

        {/* ══════════════════════════════════
            PANEER BLOCK  (centre-right)
        ══════════════════════════════════ */}
        {/* Main face */}
        <rect x="558" y="64" width="44" height="34" strokeWidth="1.5" />
        {/* Top face */}
        <path d="M558 64 L572 52 L616 52 L602 64Z" strokeWidth="1.4" />
        {/* Right face */}
        <path d="M602 64 L616 52 L616 86 L602 98Z" strokeWidth="1.4" />
        {/* Surface texture — horizontal lines on main face */}
        <line x1="558" y1="74" x2="602" y2="74" strokeWidth="0.8" opacity="0.5" />
        <line x1="558" y1="84" x2="602" y2="84" strokeWidth="0.8" opacity="0.5" />
        {/* Surface texture — vertical lines */}
        <line x1="576" y1="64" x2="576" y2="98" strokeWidth="0.8" opacity="0.4" />
        <line x1="590" y1="64" x2="590" y2="98" strokeWidth="0.8" opacity="0.4" />
        {/* Cross-hatch on top */}
        <line x1="572" y1="56" x2="600" y2="56" strokeWidth="0.8" opacity="0.4" />
        {/* Small herb speckles on face */}
        <circle cx="566" cy="70" r="1" fill="currentColor" opacity="0.35"/>
        <circle cx="580" cy="78" r="1" fill="currentColor" opacity="0.35"/>
        <circle cx="594" cy="69" r="1" fill="currentColor" opacity="0.35"/>
        <circle cx="570" cy="90" r="1" fill="currentColor" opacity="0.35"/>
        <circle cx="586" cy="88" r="1" fill="currentColor" opacity="0.35"/>

        {/* Cutting board under paneer */}
        <path d="M548 99 L626 99 L628 104 L546 104Z" strokeWidth="1.2" />
        <line x1="548" y1="99" x2="546" y2="104" strokeWidth="1" />

        {/* ══════════════════════════════════
            MILK JUG  (right side)
        ══════════════════════════════════ */}
        {/* Jug body */}
        <path d="M680 60 Q670 64 668 80 Q666 96 680 98 L720 98 Q734 96 732 80 Q730 64 720 60Z"
              strokeWidth="1.5" />
        {/* Jug neck */}
        <path d="M684 60 Q702 52 716 60" strokeWidth="1.4" />
        {/* Jug rim */}
        <path d="M682 52 Q702 46 722 52 Q720 58 702 58 Q684 58 682 52Z" strokeWidth="1.3" />
        {/* Handle */}
        <path d="M720 68 Q742 68 742 80 Q742 90 720 90" strokeWidth="1.4" />
        {/* Milk inside — slightly lower fill level line */}
        <path d="M670 84 Q702 78 732 84" strokeWidth="1" opacity="0.4" />
        {/* Milk splash from top */}
        <path d="M702 46 Q698 36 694 30 Q698 28 700 34" strokeWidth="1" opacity="0.6" />
        <path d="M702 46 Q706 34 712 28 Q716 30 712 36" strokeWidth="1" opacity="0.6" />
        <circle cx="690" cy="26" r="2" fill="currentColor" opacity="0.3"/>
        <circle cx="714" cy="24" r="1.5" fill="currentColor" opacity="0.3"/>
        <circle cx="702" cy="20" r="2.5" fill="currentColor" opacity="0.3"/>

        {/* Jug surface shine */}
        <path d="M676 72 Q678 68 680 74" strokeWidth="0.9" opacity="0.4" />

        {/* ══════════════════════════════════
            PEPPERCORNS  (scattered)
        ══════════════════════════════════ */}
        <circle cx="760" cy="80" r="3.5" strokeWidth="1.1" />
        <circle cx="772" cy="76" r="3" strokeWidth="1.1" />
        <circle cx="768" cy="88" r="2.5" strokeWidth="1" />
        <circle cx="780" cy="84" r="3.5" strokeWidth="1.1" />
        <circle cx="790" cy="78" r="3" strokeWidth="1.1" />
        {/* Stem dots on peppercorns */}
        <circle cx="760" cy="77.5" r="0.8" fill="currentColor" opacity="0.6"/>
        <circle cx="772" cy="73.5" r="0.8" fill="currentColor" opacity="0.6"/>
        <circle cx="780" cy="80.5" r="0.8" fill="currentColor" opacity="0.6"/>

        {/* ══════════════════════════════════
            CHILLI PEPPER  (far right)
        ══════════════════════════════════ */}
        <path d="M840 60 Q860 50 868 62 Q870 74 856 82 Q844 86 838 76 Q832 66 840 60Z"
              strokeWidth="1.4" />
        {/* Stem */}
        <path d="M840 60 Q836 50 840 44" strokeWidth="1.3" />
        {/* Small leaf at stem */}
        <path d="M838 52 Q828 48 834 54" strokeWidth="1" />

        {/* ══════════════════════════════════
            DECORATIVE DOTS & TINY ELEMENTS
        ══════════════════════════════════ */}
        <circle cx="108" cy="90" r="2" strokeWidth="1" opacity="0.4" />
        <circle cx="118" cy="86" r="1.5" strokeWidth="1" opacity="0.4" />
        <circle cx="128" cy="92" r="2.5" strokeWidth="1" opacity="0.4" />
        {/* Tiny stars */}
        <path d="M330 80 L331 76 L332 80 L336 80 L333 83 L334 87 L331 84 L328 87 L329 83 L326 80Z"
              strokeWidth="0.8" opacity="0.3" />
        <path d="M534 70 L535 67 L536 70 L539 70 L537 72 L538 75 L535 73 L532 75 L533 72 L531 70Z"
              strokeWidth="0.8" opacity="0.3" />

      </g>
    </svg>
  );
}
