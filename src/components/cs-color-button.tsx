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
  const [open1, setOpen1] = useState(false);
  const [showIconName, setshowIconName] = useState(false);
  const [showIconHex, setshowIconHex] = useState(false);
  const [showIconRgb, setshowIconRgb] = useState(false);
  const [showIconCmyk, setshowIconCmyk] = useState(false);

  const copyHex = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedHex(true);
    setTimeout(() => {
      setCopiedHex(false);
    }, 1000);
  };
  const copyCmyk = (value: string) => {
    const cmyk = hexToCmyk(value);
    navigator.clipboard.writeText(cmyk);
    setcodiceColoreCmyk(cmyk);
    setCopiedCmyk(true);
    setTimeout(() => {
      setCopiedCmyk(false);
    }, 1000);
  };
  const copyRgb = (value: string) => {
    const rgb = hexToRgb(value);
    navigator.clipboard.writeText(rgb);
    setcodiceColoreRgb(rgb);
    setCopiedRgb(true);
    setTimeout(() => {
      setCopiedRgb(false);
    }, 1000);
  };
  const copyName = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedName(true);
    setTimeout(() => {
      setCopiedName(false);
    }, 1000);
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
      { variant === "table" ? (
        <div
        className="flex flex-col items-end gap-1 p-3 w-45"
        style={{background: value, color: getTextColorSimple(value as string)}}>
          <p style={{ margin: 0}} 
          onMouseEnter={()=>setshowIconName(!showIconName)}
          onMouseLeave={()=>setshowIconName(!showIconName)}
          onClick={() => name && copyName(name)}>
            {copiedName ? "✅ copiato" : (
              <span>
                {showIconName && <i className="fa-duotone fa-solid fa-copy"></i>}{name}
              </span>
            )}
          </p>
          <p style={{ margin: 0}} 
          onMouseEnter={()=>setshowIconHex(!showIconHex)}
          onMouseLeave={()=>setshowIconHex(!showIconHex)}
          onClick={() => {copyHex(value)}}>
            {copiedHex ? "✅ copiato" : (
              <span>
                {showIconHex && <i className="fa-duotone fa-solid fa-copy"></i>}{value}
              </span>
            )}
          </p>
          <p style={{ margin: 0}} 
          onMouseEnter={()=>setshowIconRgb(!showIconRgb)}
          onMouseLeave={()=>setshowIconRgb(!showIconRgb)}
          onClick={() => {copyRgb(value)}}>
            {copiedRgb ? "✅ copiato" : (
              <span>
                {showIconRgb && <i className="fa-duotone fa-solid fa-copy"></i>}{hexToRgb(value)}
              </span>
            )}
          </p>
          {/* <i style={{ margin: 0}} className="fa-duotone fa-solid fa-circle-info" onClick={() => {setOpen1(!open1)}}></i> */}
        </div>
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
      {open1 && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setOpen1(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-220"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="w-1/3">
                <button onClick={() => {copyHex(value)}}>{copiedHex ? "✅ HEX copiato: " + value : "Copia HEX"}</button>
                <br />
                <button onClick={() => copyRgb(value)}>{copiedRgb ? "✅ RGB copiato: " + codiceColoreRgb : "Copia RGB"}</button>
                <br />
                <button onClick={() => copyCmyk(value)}>{copiedCmyk ? "✅ CMYK copiato: " + codiceColoreCmyk : "Copia CMYK"}</button>
                <br />
                <button onClick={() => name && copyName(name)}>{copiedName ? "✅ Nome copiato: " + name : "Copia Nome"}</button>
              </span>
            <button onClick={() => setOpen1(false)}>Chiudi</button>
          </div>
        </div>
      )}
    </span>
  );
}