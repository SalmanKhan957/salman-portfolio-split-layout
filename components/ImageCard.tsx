import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function ImageCard({ src, alt, className, priority }: Props) {
  return (
    <div className={cn("relative w-full max-w-md", className)}>
      {/* offset frame */}
      <div className="absolute -right-3 -top-3 hidden h-full w-full rounded-3xl border-2 border-ink-900/80 md:block" aria-hidden />
      {/* card */}
      <div className="relative overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-soft">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 90vw, 420px"
            className="object-cover"
          />
        </div>

      </div>
    </div>
  );
}
