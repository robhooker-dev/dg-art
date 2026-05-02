export default function PaintingImage({ painting, sold, style }) {
  const { palette, image, title } = painting;

  if (image) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          ...style,
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        {sold && <SoldOverlay />}
      </div>
    );
  }

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%", ...style }}
    >
      <svg
        viewBox="0 0 400 300"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <rect width="400" height="300" fill={palette[0]} />
        <rect y="180" width="400" height="120" fill={palette[1]} />
        <ellipse
          cx="200"
          cy="156"
          rx="280"
          ry="84"
          fill={palette[2]}
          opacity="0.45"
        />
        <rect y="240" width="400" height="60" fill={palette[1]} opacity="0.5" />
        <text
          x="200"
          y="158"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="40"
          fill="rgba(255,255,255,0.13)"
          fontWeight="300"
          letterSpacing="10"
        >
          DG
        </text>
      </svg>
      {sold && <SoldOverlay />}
    </div>
  );
}

function SoldOverlay() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(20,19,17,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#f5f1eb",
          border: "1px solid rgba(245,241,235,0.5)",
          padding: "0.3rem 0.9rem",
        }}
      >
        Sold
      </span>
    </div>
  );
}
