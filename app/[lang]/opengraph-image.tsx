/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { getDictionary } from "./dictionaries";
import { hasLocale } from "./locales";

export const alt = "RA2P Labs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = hasLocale(lang) ? await getDictionary(lang) : null;
  const og = dict?.og as { title: string; description: string } | undefined;

  const logoBuf = readFileSync(
    join(process.cwd(), "public", "logo.png"),
  );
  const logoSrc = `data:image/png;base64,${logoBuf.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0A192F 0%, #1E3A5F 100%)",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "rgba(37, 99, 235, 0.2)" }} />
        <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: 350, height: 350, borderRadius: "50%", background: "rgba(96, 165, 250, 0.12)" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 88, height: 88, borderRadius: 20, background: "rgba(37, 99, 235, 0.12)", border: "1px solid rgba(37, 99, 235, 0.25)", marginBottom: 28 }}>
            <img src={logoSrc} alt="" width={56} height={56} />
          </div>
          <span style={{ fontSize: 48, fontWeight: 800, color: "#F8FAFC", letterSpacing: "-0.03em", marginBottom: 12 }}>
            RA2P Labs
          </span>
          <span style={{ fontSize: 28, fontWeight: 600, color: "#93C5FD", letterSpacing: "-0.01em", marginBottom: 8 }}>
            {og?.title || "Software, IA y Automatización"}
          </span>
          <span style={{ fontSize: 18, color: "#64748B", letterSpacing: "-0.01em" }}>
            {og?.description || "Construimos el futuro digital de tu empresa"}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
