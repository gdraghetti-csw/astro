import { useState } from "react";

type ColorType =
  | string
  | {
      color: string;
      name?: string;
    };

type Props = {
  color: ColorType;
  variant?: "full" | "table" | "compact";
};


export default function ColorButton({ color, variant = "full" }: Props) {
  const value = typeof color === "string" ? color : color?.color;
  const name = typeof color === "string" ? color : color?.name;

  const [copiedHex, setCopiedHex] = useState(false);
  const [copiedCmyk, setCopiedCmyk] = useState(false);
  const [copiedRgb, setCopiedRgb] = useState(false);
  const [copiedName, setCopiedName] = useState(false);
  const [codiceColoreRgb, setcodiceColoreRgb] = useState("");
  const [codiceColoreCmyk, setcodiceColoreCmyk] = useState("");
  const [open, setOpen] = useState(false);

  const copyHex = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedHex(true);
    setTimeout(() => {
      setCopiedHex(false);
    }, 1500);
  };
  const copyCmyk = (value: string) => {
    const cmyk = hexToCmyk(value);
    navigator.clipboard.writeText(cmyk);
    setcodiceColoreCmyk(cmyk);
    setCopiedCmyk(true);
    setTimeout(() => {
      setCopiedCmyk(false);
    }, 1500);
  };
  const copyRgb = (value: string) => {
    const rgb = hexToRgb(value);
    navigator.clipboard.writeText(rgb);
    setcodiceColoreRgb(rgb);
    setCopiedRgb(true);
    setTimeout(() => {
      setCopiedRgb(false);
    }, 1500);
  };
  const copyName = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedName(true);
    setTimeout(() => {
      setCopiedName(false);
    }, 1500);
  };

  const hexToCmyk = (hex: string): string => {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
    const k = 1 - Math.max(r, g, b);
    const c = k === 1 ? 0 : (1 - r - k) / (1 - k);
    const m = k === 1 ? 0 : (1 - g - k) / (1 - k);
    const y = k === 1 ? 0 : (1 - b - k) / (1 - k);
    const toPercent = (v: number) => Math.round(v * 100);
    return `cmyk(${toPercent(c)}%, ${toPercent(m)}%, ${toPercent(y)}%, ${toPercent(k)}%)`;
  };

  const hexToRgb = (hex: string): string => {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const getTextColorSimple = (hex: string) => {
  if (!hex.startsWith("#")) return "#000";

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // formula semplice (perceived brightness)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 150 ? "#000" : "#fff";
};

  return (
    <span className=" inline-block">
      {variant === "table" ? (
        <button
          onClick={() => setOpen(!open)}
          style={{ background: value, color: getTextColorSimple(value as string), border: "1px solid #000" }}
          className="px-1 py-1 rounded-md w-70"
        >
          <div className="h-5 rounded-md w-full flex items-center justify-between px-2">
            <p style={{ margin: 0 }}>{name}</p>
            <p style={{ margin: 0 }}>{value}</p>
          </div>
        </button>
      ) : variant === "full" ? (
        <button
          onClick={() => setOpen(!open)}
          className=" h-7 flex items-center gap-1 px-1 py-1 rounded-md border w-fit"
        >
          <div
              className="h-5 rounded-md w-10"
              style={{ background: value }}
            />
            <span className="text-black w-fit" >
              {name}
            </span>
        </button>
      ) : (
        <button
          onClick={() => setOpen(!open)}
          className=" h-7 flex items-center gap-1 px-1 py-1 rounded-md border w-fit"
        >
          <div
            className="h-5 rounded-md w-30"
            style={{ background: value }}
          />
        </button>
      )}
      
      {open && (
        <span className="absolute m-2 p-3 bg-white shadow-lg rounded-md border z-10 w-fit min-w-45">
          <button onClick={() => {copyHex(value)}}>{copiedHex ? "✅ HEX copiato: " + value : "Copia HEX"}</button>
          <br />
          <button onClick={() => copyRgb(value)}>{copiedRgb ? "✅ RGB copiato: " + codiceColoreRgb : "Copia RGB"}</button>
          <br />
          <button onClick={() => copyCmyk(value)}>{copiedCmyk ? "✅ CMYK copiato: " + codiceColoreCmyk : "Copia CMYK"}</button>
          <br />
          <button onClick={() => name && copyName(name)}>{copiedName ? "✅ Nome copiato: " + name : "Copia Nome"}</button>
        </span>
      )}
    </span>
  );
}