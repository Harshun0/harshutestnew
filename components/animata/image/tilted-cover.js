import Image from "next/image";

export default function TiltedCover({
  children,
  direction = "left",
  tiltCover = true,
  cover,
  image,
}) {
  const tiltLeft = direction === "left";
  const factor = tiltLeft ? 1 : -1;

  return (
    // The container has height and width set to the size of the content + padding.
    <div className="flex h-64 w-52 items-center justify-center overflow-hidden">
      <div className="group relative h-52 w-40">
        {/* Background content */}
        <div
          className="border-box border-1 pointer-events-none relative h-full w-full overflow-hidden rounded-xl border bg-background transition-all duration-500 ease-slow group-hover:!transform-none dark:border-zinc-700"
          style={{
            transform: `perspective(400px) rotateY(${factor * 20}deg) scale(0.85) translateX(${-factor * 20}%)`,
          }}
        >
          {children}
          <div className="absolute inset-0 h-full w-full bg-gray-400/10 transition-all group-hover:bg-transparent" />
        </div>

        {/* Cover Content */}
        <div
          className={`border-box pointer-events-none absolute inset-0 h-full w-full rounded-xl border-[6px] bg-white transition-all delay-75 duration-500 ease-slow group-hover:!transform-none group-hover:opacity-0 dark:bg-gray-800 ${tiltLeft ? "group-hover:left-[200%]" : "group-hover:-left-[200%]"}`}
          style={{
            transform: tiltCover ? `perspective(400px) rotateY(${factor * 20}deg)` : undefined,
          }}
        >
          <div className="h-full w-full rounded-md object-cover">
            {image ? (
              <Image
                {...image}
                alt={image.alt ?? ""}
                src={image.src}
                className={`h-full w-full rounded-md object-cover ${image.className ?? ""}`}
              />
            ) : (
              cover
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
