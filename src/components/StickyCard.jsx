export default function StickyCard({
  children,
  color = "#ffd7d7", // default soft pink
  rotation = "-4deg",
}) {
  return (
    <div
      className="sticky-card"
      style={{
        backgroundColor: color,
        transform: `rotate(${rotation})`
      }}
    >
      {/* tape */}
      <div className="sticky-tape" />
      <div className="sticky-inner">
        {children}
      </div>
    </div>
  );
}
