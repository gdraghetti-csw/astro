import { IoMdInformationCircle, IoMdWarning } from "react-icons/io";
import { LuChevronsLeftRight } from "react-icons/lu";
import { MdLightbulb, MdLock, MdOutlineCheck } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

type CalloutVariant =
  | "warning"
  | "info"
  | "success"
  | "error"
  | "idea"
  | "lock"
  | "api";

const variants = {
  warning: "#f29159",
  info: "#59a9f2",
  success: "#47c187",
  error: "#f25959",
  idea: "#a598ec",
  lock: "#a598ec",
  api: "#a598ec",
} as const;

const icons = {
  warning: IoMdWarning,
  info: IoMdInformationCircle,
  success: MdOutlineCheck,
  error: RxCross2,
  idea: MdLightbulb,
  lock: MdLock,
  api: LuChevronsLeftRight,
} as const;

const iconColors = {
  warning: "text-[#f29159]",
  info: "text-[#59a9f2]",
  success: "text-[#47c187]",
  error: "text-[#f25959]",
  idea: "text-[#a598ec]",
  lock: "text-[#a598ec]",
  api: "text-[#a598ec]",
} as const;

interface CalloutProps {
  variant?: CalloutVariant;
  children?: React.ReactNode;
}

export default function Callout({ variant = "info", children }: CalloutProps) {
  const Icon = icons[variant] || icons.info;
  const variantClass = variants[variant] || variants.info;
  const iconColorClass = iconColors[variant] || iconColors.info;

  return (
    <blockquote
    style={{borderLeft: `3px solid ${variantClass}`}}
      className={`relative overflow-hidden rounded-lg bg-neutral-background-secondary border-l-4 my-4 shadow-sm`}
    >
      <div className="flex items-start gap-3 p-4">
        <Icon className={iconColorClass} size={25} />
        <div className="md:w-8/9 leading-6 text-neutral-text font-light">
          {children}
        </div>
      </div>
    </blockquote>
  );
}