import React from "react";

export default function CanvaEmbed() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 0,
        paddingTop: "135%",
        boxShadow: "0 2px 8px rgba(63,69,81,0.16)",
        marginTop: "0em",
        marginBottom: "0em",
        overflow: "hidden",
        borderRadius: "8px",
      }}
    >
      <iframe
        loading="lazy"
        src="https://www.canva.com/design/DAHIEVkSkZc/ofmY5fjC9RyOVqU1AepXZg/view?embed"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          border: "none",
        }}
        allowFullScreen
        title="Canva design"
      />
    </div>
  );
}