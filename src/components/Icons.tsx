/**
 * OXO Settlement — Custom Futuristic Icon System
 * Style: Sharp, angular, glitch-tech aesthetic with layered geometry.
 * All icons accept className prop and inherit currentColor.
 */

type IconProps = { className?: string };

// ─── Shield / Security ─────────────────────────────────────────────────────
// Hexagonal shield with inner scan-line and corner notches
export const ShieldIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main hex shield */}
        <path
            d="M12 2L4 5.5V11c0 4.418 3.314 8.193 8 9.5 4.686-1.307 8-5.082 8-9.5V5.5L12 2Z"
            stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
        />
        {/* Inner glow ring */}
        <path
            d="M12 4.5L6 7.25V11c0 3.09 2.31 5.74 6 6.85 3.69-1.11 6-3.76 6-6.85V7.25L12 4.5Z"
            stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" opacity="0.4"
        />
        {/* Check mark - bold angular */}
        <path
            d="M8.5 11.5L10.5 13.5L15.5 9"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter"
        />
        {/* Corner accent left */}
        <path d="M4 5.5L5.5 5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
        {/* Corner accent right */}
        <path d="M20 5.5L18.5 5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
    </svg>
);

// ─── Swap / Exchange ────────────────────────────────────────────────────────
// Double-headed arrows with hex nodes at ends
export const SwapIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Top arrow — right direction */}
        <path d="M4 8H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        <path d="M14 4L18.5 8L14 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter" strokeLinecap="square" />
        {/* Bottom arrow — left direction */}
        <path d="M20 16H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        <path d="M10 12L5.5 16L10 20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter" strokeLinecap="square" />
        {/* Node dots */}
        <rect x="2.5" y="6.5" width="3" height="3" rx="0" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        <rect x="18.5" y="14.5" width="3" height="3" rx="0" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    </svg>
);

// ─── Lock / Secure ─────────────────────────────────────────────────────────
// Futuristic angular padlock with scan notch
export const LockIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shackle */}
        <path
            d="M8 11V7a4 4 0 018 0v4"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"
        />
        {/* Body — chamfered rect */}
        <path
            d="M5 11h14v9.5a.5.5 0 01-.5.5h-13a.5.5 0 01-.5-.5V11Z"
            stroke="currentColor" strokeWidth="1.4"
        />
        {/* Keyhole outer */}
        <circle cx="12" cy="15.5" r="1.8" stroke="currentColor" strokeWidth="1.2" />
        {/* Keyhole pin */}
        <path d="M12 17.3V19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
        {/* Corner detail */}
        <path d="M5 13h2" stroke="currentColor" strokeWidth="0.6" opacity="0.5" strokeLinecap="round" />
        <path d="M17 13h2" stroke="currentColor" strokeWidth="0.6" opacity="0.5" strokeLinecap="round" />
    </svg>
);

// ─── Wallet ─────────────────────────────────────────────────────────────────
// Futuristic chip-wallet with circuit line
export const WalletIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main wallet body */}
        <path
            d="M3 7h18v12a1 1 0 01-1 1H4a1 1 0 01-1-1V7Z"
            stroke="currentColor" strokeWidth="1.4"
        />
        {/* Flap top line */}
        <path d="M3 7l2-3h14l2 3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="miter" />
        {/* Coin pocket */}
        <rect x="14" y="11" width="5" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" />
        {/* Coin dot */}
        <circle cx="16.5" cy="13" r="0.8" fill="currentColor" />
        {/* Circuit accent */}
        <path d="M5 11h5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
        <path d="M5 14h4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
    </svg>
);

// ─── Check / Success ────────────────────────────────────────────────────────
// Hexagonal success badge with angular check
export const CheckIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Hex outer */}
        <path
            d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2Z"
            stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
        />
        {/* Inner hex thin */}
        <path
            d="M12 5l6.5 3.75v7.5L12 20l-6.5-3.75V8.75L12 5Z"
            stroke="currentColor" strokeWidth="0.4" strokeLinejoin="round" opacity="0.3"
        />
        {/* Angular check */}
        <path
            d="M8 12l3 3 5-6"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter"
        />
    </svg>
);

// ─── Fingerprint / ZK Proof ─────────────────────────────────────────────────
// Stylized radial scan with broken arcs = ZK-tech feel
export const FingerprintIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer arc */}
        <path
            d="M4.5 11.5a7.5 7.5 0 0115 0"
            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.9"
        />
        {/* Outer arc bottom — broken */}
        <path
            d="M4.5 13c.5 3 2.5 5.5 5 7"
            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"
        />
        <path
            d="M14.5 20c2.5-1.5 4.4-4 5-7"
            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"
        />
        {/* Mid arc */}
        <path
            d="M7.5 11.5a4.5 4.5 0 019 0"
            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"
        />
        <path
            d="M7.5 13c.4 2 1.5 3.5 2.5 4.5"
            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6"
        />
        <path
            d="M14 18c1.2-1 2.1-2.5 2.5-4.5"
            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6"
        />
        {/* Inner arc */}
        <path
            d="M10.5 11.5a1.5 1.5 0 013 0v4"
            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"
        />
        {/* Center dot */}
        <circle cx="12" cy="11.5" r="1" fill="currentColor" opacity="0.9" />
        {/* Top notch */}
        <path d="M11 5.5h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
        <path d="M8.5 6.5l.8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <path d="M15.5 6.5l-.8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
);

// ─── Close / X ──────────────────────────────────────────────────────────────
// Fractured X with corner bracket styling
export const CloseIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Corner brackets */}
        <path d="M4 6V4h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" opacity="0.4" />
        <path d="M18 4h2v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" opacity="0.4" />
        <path d="M4 18v2h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" opacity="0.4" />
        <path d="M18 20h2v-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" opacity="0.4" />
        {/* X lines */}
        <path d="M7 7l10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17 7L7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

// ─── Google ──────────────────────────────────────────────────────────────────
// Keep real Google branding (colored)
export const GoogleIcon = ({ className = "w-5 h-5" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

// ─── Arrow Up Right / Navigate ──────────────────────────────────────────────
// Techy arrow with tail notch
export const ArrowUpRight = ({ className = "w-5 h-5" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shaft */}
        <path d="M5 19L18 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
        {/* Head */}
        <path d="M9 6h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter" />
        {/* Tail notch */}
        <path d="M5 15v4h4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="square" opacity="0.4" />
    </svg>
);

// ─── Risk / Scan ─────────────────────────────────────────────────────────────
// Animated radar scan ring — used in risk screening context
export const ScanIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer ring broken */}
        <path d="M12 3a9 9 0 019 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
        <path d="M21 12a9 9 0 01-9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
        <path d="M12 21a9 9 0 01-9-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.3" />
        <path d="M3 12a9 9 0 019-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
        {/* Mid ring */}
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
        {/* Target cross */}
        <path d="M12 9v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M12 13v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M9 12h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M13 12h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        {/* Center dot */}
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </svg>
);

// ─── ZK Proof / Certificate ──────────────────────────────────────────────────
// Angular doc with circuit nodes at corners
export const ZKProofIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Page with folded corner */}
        <path
            d="M5 2h10l4 4v16H5V2Z"
            stroke="currentColor" strokeWidth="1.4" strokeLinejoin="miter"
        />
        {/* Fold crease */}
        <path d="M15 2l4 4h-4V2Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="miter" opacity="0.5" />
        {/* Lines — data */}
        <path d="M8 9h8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
        <path d="M8 12h8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <path d="M8 15h5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
        {/* Corner nodes */}
        <rect x="4" y="1" width="2.5" height="2.5" fill="currentColor" opacity="0.3" />
        <rect x="17.5" y="18.5" width="2.5" height="2.5" fill="currentColor" opacity="0.3" />
        {/* Verified tick at bottom */}
        <path d="M9 17l1.5 1.5L15 14.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// ─── Chain / Network ─────────────────────────────────────────────────────────
// Circuit-board style chain of nodes
export const ChainIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Nodes */}
        <rect x="1.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <rect x="9.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <rect x="17.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
        {/* Connectors */}
        <path d="M6.5 12h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
        <path d="M14.5 12h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
        {/* Top pins */}
        <path d="M4 9.5V7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <path d="M12 9.5V7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <path d="M20 9.5V7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        {/* Bottom pins */}
        <path d="M4 14.5V17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <path d="M12 14.5V17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <path d="M20 14.5V17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
);

// ─── Dashboard / Live Monitor ─────────────────────────────────────────────────
// HUD-style dash with bar chart + live dot
export const DashboardIcon = ({ className = "w-6 h-6" }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Screen border with notches */}
        <path
            d="M3 5h18v14H3V5Z"
            stroke="currentColor" strokeWidth="1.4"
        />
        {/* Corner accents */}
        <path d="M3 5h3" stroke="currentColor" strokeWidth="2" strokeLinecap="square" opacity="0.7" />
        <path d="M3 5v3" stroke="currentColor" strokeWidth="2" strokeLinecap="square" opacity="0.7" />
        <path d="M21 5h-3" stroke="currentColor" strokeWidth="2" strokeLinecap="square" opacity="0.7" />
        <path d="M21 5v3" stroke="currentColor" strokeWidth="2" strokeLinecap="square" opacity="0.7" />
        <path d="M3 19h3" stroke="currentColor" strokeWidth="2" strokeLinecap="square" opacity="0.7" />
        <path d="M3 19v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="square" opacity="0.7" />
        <path d="M21 19h-3" stroke="currentColor" strokeWidth="2" strokeLinecap="square" opacity="0.7" />
        <path d="M21 19v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="square" opacity="0.7" />
        {/* Bar chart */}
        <rect x="6" y="14" width="2" height="3" fill="currentColor" opacity="0.4" />
        <rect x="9" y="11" width="2" height="6" fill="currentColor" opacity="0.6" />
        <rect x="12" y="9" width="2" height="8" fill="currentColor" opacity="0.8" />
        <rect x="15" y="12" width="2" height="5" fill="currentColor" opacity="0.5" />
        {/* Live dot */}
        <circle cx="18" cy="9" r="1.2" fill="currentColor" opacity="0.9" />
    </svg>
);
