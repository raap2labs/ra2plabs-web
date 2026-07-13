import { ImageResponse } from "next/og";

export const alt = "RA2P Labs — Software, IA y Automatización";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(37, 99, 235, 0.2)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-5%",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: "rgba(96, 165, 250, 0.12)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "linear-gradient(135deg, #2563EB, #60A5FA)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              R
            </div>
            <span
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: "#F8FAFC",
                letterSpacing: "-0.02em",
              }}
            >
              RA2P Labs
            </span>
          </div>
          <span
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "#F8FAFC",
              letterSpacing: "-0.03em",
              textAlign: "center",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Software, IA y Automatización
          </span>
          <span
            style={{
              fontSize: 22,
              color: "#94A3B8",
              textAlign: "center",
              letterSpacing: "-0.01em",
            }}
          >
            Construimos el futuro digital de tu empresa
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
