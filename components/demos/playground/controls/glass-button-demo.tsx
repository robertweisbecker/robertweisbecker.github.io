export function GlassButtonDemo() {
  return (
    <div className="relative">
      <div
        data-slot="glass"
        className="size-button rounded-full"
        style={{
          background: "rgba(248, 240, 248, 0.1)",
          backgroundImage:
            "linear-gradient(0deg, rgba(248, 248, 248, 0.2), rgba(248, 248, 248, 0.2)), linear-gradient(0deg, rgba(68, 68, 68, 0.6), rgba(68, 68, 68, 0.6)), linear-gradient(0deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.25)), rgba(0, 0, 0, 0.25)",
          backgroundBlendMode: "luminosity, plus-lighter, normal, normal",
          boxShadow:
            "1.25px 0px 0px -0.75px rgba(0, 0, 0, 0.2), -1.25px 0px 0px -0.75px rgba(0, 0, 0, 0.2), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.14), 0px 12px 3px -4px color-mix(in srgb, var(--card) 50%, transparent), 0px 9px 6px -2px rgba(0, 0, 0, 0.1), inset 0px -1px 0px -0.5px rgba(255, 255, 255, 0.4), inset 0px 1px 0px -0.5px rgba(255, 255, 255, 0.4), inset 0px 1px 1px rgba(255, 255, 255, 0.2), inset 0px -1px 1px rgba(255, 255, 255, 0.2), inset 0px 6px 6px 4px rgba(0, 0, 0, 0.07)",
          backdropFilter: "blur(1.5px) saturate(1.5) brightness(1.1)",
        }}
      />
      <div
        data-slot="reflection"
        style={{
          position: "absolute",
          inset: 2,
          filter: "blur(2px)",
          borderRadius: "100%",
          borderTop: "1px solid color-mix(var(--bg) 90%,canvastext)",
          mixBlendMode: "hard-light",
        }}
      />
      <div
        style={{
          position: "absolute",
          fontSize: "1rem",
          inset: 0,
          textAlign: "center",
          height: "100%",
          display: "grid",
          placeItems: "center center",
          color: "color-mix(in srgb, contrast-color(var(--bg)) 80%, contrast-color(canvas))",
          opacity: "0.75",
          mixBlendMode: "plus-darker",
        }}
      >
        ❖
      </div>
    </div>
  );
}
