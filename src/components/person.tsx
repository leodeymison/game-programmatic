export default function Person({
  bgColor,
  name,
  size,
  position,
}: {
  size: number;
  bgColor: string;
  name: string;
  position: { x: number; y: number };
}) {
  return (
    <div
      className="rounded-full absolute"
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    ></div>
  );
}
