type Position = "left" | "right" | "top" | "bottom";
type BackgroundSize = "cover" | "contain" | "auto" | string;

interface Props {
    position: Position;
    blurPosition: Position;
    backgroundSize: BackgroundSize;
    width: string;
    imagePath: string;
    className?: string;
}

export default function IndexCardBg({
    position,
    imagePath,
    className,
    blurPosition,
    backgroundSize,
    width,
}: Props) {
    return (
        <div
            className={`${className} absolute ${position}-0 top-0 bg-${position} bg-${backgroundSize} w-${width} h-full opacity-60 mix-blend-multiply dark:mix-blend-plus-lighter`}
            style={{
                backgroundImage: `url("${imagePath}")`,
                maskImage: `linear-gradient(to ${blurPosition}, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))`,
                WebkitMaskImage: `linear-gradient(to ${blurPosition}, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))`,
            }}
        ></div>
    );
}
