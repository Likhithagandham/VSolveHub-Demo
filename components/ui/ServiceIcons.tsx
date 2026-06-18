type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

function Svg({ size = 24, color = "currentColor", className = "", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function ScooterIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <circle cx="6" cy="17" r="2.5" />
      <circle cx="18" cy="17" r="2.5" />
      <path d="M8 17h8M10 11l2-4h4l2 4M6 14h3l1-3" />
    </Svg>
  );
}

export function CarFrontIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M5 17h14l1-5-2-3H6L4 12z" />
      <circle cx="8" cy="17" r="1.5" />
      <circle cx="16" cy="17" r="1.5" />
      <path d="M7 12h10" />
    </Svg>
  );
}

export function TaxiIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M5 17h14l1-5-2-3H6L4 12z" />
      <circle cx="8" cy="17" r="1.5" />
      <circle cx="16" cy="17" r="1.5" />
      <rect x="9" y="6" width="6" height="3" rx="0.5" fill={color} stroke="none" />
      <path d="M10 7.5h4" stroke="white" strokeWidth="1" />
    </Svg>
  );
}

export function WrenchIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.8-2.8 2.5-2.5z" />
    </Svg>
  );
}

export function ToolsIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M14 6l-4 4 6 6 4-4-6-6z" />
      <path d="M6 14l-2 4 4-2" />
      <path d="M3 21l2-2" />
    </Svg>
  );
}

export function WarningTriangleIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M12 4l9 16H3L12 4z" />
      <path d="M12 10v4M12 17h.01" />
    </Svg>
  );
}

export function TowTruckIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M3 14h11v4H3zM14 12h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
      <path d="M14 8v4h5" />
    </Svg>
  );
}

export function HardHatIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M4 14h16v3H4z" />
      <path d="M6 14V11a6 6 0 0 1 12 0v3" />
      <path d="M12 8v3" />
    </Svg>
  );
}

export function CalendarStarIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
      <path d="M12 13l1 2 2 .2-1.5 1.3.5 2-2-1.2-2 1.2.5-2L9 15.2l2-.2 1-2z" fill={color} stroke="none" />
    </Svg>
  );
}

export function BriefcaseIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </Svg>
  );
}

export function CartIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M2 4h2l2.5 11h11l2-8H6" />
    </Svg>
  );
}

export function GridFourIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </Svg>
  );
}

export function ShieldIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </Svg>
  );
}

export function DiamondIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M4 9h16l-2 10H6L4 9z" />
      <path d="M2 9h20M8 9l4-5 4 5" />
    </Svg>
  );
}

export function HeadsetIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2" y="14" width="4" height="6" rx="2" />
      <rect x="18" y="14" width="4" height="6" rx="2" />
    </Svg>
  );
}

export function LockIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="16" r="1.5" fill={color} stroke="none" />
    </Svg>
  );
}

export function DocShieldIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M8 4h8l2 2v14H6V4h2z" />
      <path d="M12 11l-3 3 1.5 1.5L12 14l4.5 4.5L18 17l-6-6z" />
    </Svg>
  );
}

export function BroomIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M4 20l4-10M8 10l8-6" />
      <path d="M14 4l6 2-2 6" />
    </Svg>
  );
}

export function PestIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M7 7l10 10" />
      <path d="M12 8v4M10 14h4" />
    </Svg>
  );
}

export function FaucetIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M6 8h8v3H6zM14 9h4v6h-4" />
      <path d="M10 11v6" />
      <path d="M10 19c0 1 1 2 2 2" />
      <path d="M8 6V4h4v2" />
    </Svg>
  );
}

export function BoltIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M13 2L5 14h6l-1 8 8-12h-6l1-8z" fill={color} stroke="none" />
    </Svg>
  );
}

export function HammerIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M14 4l6 6-4 4-6-6 4-4z" />
      <path d="M5 19l5-5" />
    </Svg>
  );
}

export function PaintRollerIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <rect x="3" y="10" width="10" height="4" rx="1" />
      <path d="M8 14v6M6 20h4" />
      <path d="M13 12h5l2 2v2h-7" />
    </Svg>
  );
}

export function ShovelIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <circle cx="8" cy="6" r="3" />
      <path d="M10 8l8 12" />
      <path d="M14 16h6" />
    </Svg>
  );
}

export function BrickWallIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <rect x="3" y="5" width="8" height="4" />
      <rect x="13" y="5" width="8" height="4" />
      <rect x="3" y="11" width="8" height="4" />
      <rect x="13" y="11" width="8" height="4" />
      <rect x="3" y="17" width="8" height="4" />
      <rect x="13" y="17" width="8" height="4" />
    </Svg>
  );
}

export function WeldingMaskIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M4 10a8 8 0 0 1 16 0v6H4v-6z" />
      <path d="M8 14h8" />
      <path d="M12 6V4" />
    </Svg>
  );
}

export function IBeamIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M6 6h12v3H6zM8 9v9M16 9v9M6 18h12v-3H6z" />
    </Svg>
  );
}

export function AcUnitIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <rect x="4" y="6" width="16" height="10" rx="2" />
      <path d="M8 10h8M8 13h8" />
      <path d="M12 16v4M9 20h6" />
    </Svg>
  );
}

export function ToolboxIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <rect x="3" y="10" width="18" height="10" rx="2" />
      <path d="M8 10V8a4 4 0 0 1 8 0v2" />
      <path d="M12 14v3" />
    </Svg>
  );
}

export function VenueIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M4 20V8l8-4 8 4v12" />
      <path d="M4 20h16M9 20v-6h6v6" />
      <path d="M8 8l2-2M16 8l-2-2" />
    </Svg>
  );
}

export function ClocheIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M4 14h16" />
      <path d="M6 14c0-5 3-8 6-8s6 3 6 8" />
      <circle cx="12" cy="6" r="1" fill={color} stroke="none" />
    </Svg>
  );
}

export function ArchFlowersIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M4 18c4-10 12-10 16 0" />
      <circle cx="7" cy="12" r="2" />
      <circle cx="17" cy="12" r="2" />
      <circle cx="12" cy="8" r="2" />
    </Svg>
  );
}

export function CameraIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M4 8h4l2-2h4l2 2h4v12H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </Svg>
  );
}

export function HeadphonesMusicIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2" y="14" width="4" height="6" rx="2" />
      <rect x="18" y="14" width="4" height="6" rx="2" />
      <path d="M12 4v2M10 6c0-1 1-2 2-2s2 1 2 2" />
    </Svg>
  );
}

export function ClipboardCheckIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4h6v3H9z" />
      <path d="M9 12l2 2 4-4" />
    </Svg>
  );
}

export function TruckIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M3 12h11v7H3zM14 10h4l3 4v5h-7" />
      <circle cx="7" cy="19" r="2" />
      <circle cx="17" cy="19" r="2" />
    </Svg>
  );
}

export function TutorIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <circle cx="12" cy="7" r="3" />
      <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
      <path d="M4 14h6v4H4zM14 14h6v4h-6z" />
    </Svg>
  );
}

export function BeautyIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <circle cx="10" cy="10" r="5" />
      <path d="M16 8c2 0 4 2 4 4s-2 3-4 3" />
      <path d="M18 6l2-2M18 10l3 1" />
    </Svg>
  );
}

export function YogaIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4M8 13l4-2 4 2M6 18l6-3 6 3" />
    </Svg>
  );
}

export function PawIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <ellipse cx="8" cy="9" rx="2" ry="2.5" />
      <ellipse cx="16" cy="9" rx="2" ry="2.5" />
      <ellipse cx="6" cy="14" rx="1.8" ry="2.2" />
      <ellipse cx="18" cy="14" rx="1.8" ry="2.2" />
      <path d="M10 14c1 3 3 4 4 4s3-1 4-4" />
    </Svg>
  );
}

export function WalkerIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <circle cx="12" cy="6" r="2.5" />
      <path d="M12 9v5M9 20l3-6 3 6" />
      <path d="M7 12h10M6 16h3M15 16h3" />
    </Svg>
  );
}

export function JobSearchIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <rect x="4" y="8" width="14" height="11" rx="2" />
      <path d="M8 8V6a3 3 0 0 1 6 0v2" />
      <circle cx="17" cy="17" r="3" />
      <path d="M19 19l2 2" />
    </Svg>
  );
}

export function MegaphoneIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M4 10v4l12 4V6L4 10z" />
      <path d="M16 14v4l4 2V8l-4 2" />
    </Svg>
  );
}

export function FreelancerIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <circle cx="12" cy="11" r="3" />
      <path d="M3 19h18" />
    </Svg>
  );
}

export function BuildingsIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <rect x="3" y="8" width="7" height="13" />
      <rect x="14" y="4" width="7" height="17" />
      <path d="M6 12h1M6 16h1M17 8h1M17 12h1M17 16h1" />
    </Svg>
  );
}

export function TagPercentIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M20 12l-8 8-8-8V4h8l8 8z" />
      <circle cx="8" cy="8" r="1.5" fill={color} stroke="none" />
      <path d="M14 10l4 4" />
    </Svg>
  );
}

export function HouseIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 10v10h12V10" />
    </Svg>
  );
}

export function CarSideIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M5 14h14l-1-5-3-3H7L5 14z" />
      <circle cx="8" cy="16" r="1.5" />
      <circle cx="16" cy="16" r="1.5" />
    </Svg>
  );
}

export function GradCapIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <path d="M3 9l9-4 9 4-9 4-9-4z" />
      <path d="M6 11v4c0 2 4 3 6 3s6-1 6-3v-4" />
    </Svg>
  );
}

export function CalendarIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </Svg>
  );
}

export function WorkerIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <circle cx="12" cy="7" r="3" />
      <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
      <path d="M4 14h16" />
    </Svg>
  );
}

export function PersonIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20v-1a7 7 0 0 1 14 0v1" />
    </Svg>
  );
}

export function GridMenuIcon({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <Svg size={size} color={color} className={className}>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </Svg>
  );
}

export const ICON_MAP = {
  scooter: ScooterIcon,
  "car-front": CarFrontIcon,
  taxi: TaxiIcon,
  wrench: WrenchIcon,
  tools: ToolsIcon,
  warning: WarningTriangleIcon,
  "tow-truck": TowTruckIcon,
  "hard-hat": HardHatIcon,
  "calendar-star": CalendarStarIcon,
  briefcase: BriefcaseIcon,
  cart: CartIcon,
  "grid-four": GridFourIcon,
  shield: ShieldIcon,
  diamond: DiamondIcon,
  headset: HeadsetIcon,
  lock: LockIcon,
  "doc-shield": DocShieldIcon,
  broom: BroomIcon,
  pest: PestIcon,
  faucet: FaucetIcon,
  bolt: BoltIcon,
  hammer: HammerIcon,
  "paint-roller": PaintRollerIcon,
  shovel: ShovelIcon,
  "brick-wall": BrickWallIcon,
  "welding-mask": WeldingMaskIcon,
  ibeam: IBeamIcon,
  "ac-unit": AcUnitIcon,
  toolbox: ToolboxIcon,
  venue: VenueIcon,
  cloche: ClocheIcon,
  "arch-flowers": ArchFlowersIcon,
  camera: CameraIcon,
  "headphones-music": HeadphonesMusicIcon,
  "clipboard-check": ClipboardCheckIcon,
  truck: TruckIcon,
  tutor: TutorIcon,
  beauty: BeautyIcon,
  yoga: YogaIcon,
  paw: PawIcon,
  walker: WalkerIcon,
  "job-search": JobSearchIcon,
  megaphone: MegaphoneIcon,
  freelancer: FreelancerIcon,
  buildings: BuildingsIcon,
  "tag-percent": TagPercentIcon,
  house: HouseIcon,
  "car-side": CarSideIcon,
  "grad-cap": GradCapIcon,
  calendar: CalendarIcon,
  worker: WorkerIcon,
  person: PersonIcon,
  "grid-menu": GridMenuIcon,
} as const;

export type IconName = keyof typeof ICON_MAP;

export function ServiceIcon({
  name,
  size = 24,
  color = "currentColor",
  className,
}: {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon size={size} color={color} className={className} />;
}
