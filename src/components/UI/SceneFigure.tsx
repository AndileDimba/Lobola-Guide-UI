import React from "react";
import type { Media } from "../../data/types";

interface SceneFigureProps {
  media?: Media;
  label: string; // e.g. "Scene three", prefixed to the caption
  className?: string;
}

/**
 * The scene slot. Every stage has one, whether or not its scene exists yet, so
 * the page keeps its shape as stages are upgraded one at a time. The media
 * frame matches the illustrations (680 by 300) so a placeholder and a finished
 * scene sit in the same space.
 */
const SceneFigure: React.FC<SceneFigureProps> = ({ media, label, className = "" }) => {
  const placeholder = media?.alt ?? "A scene for this stage is still to come.";

  return (
    <figure className={className}>
      {media?.src ? (
        media.kind === "video" ? (
          <video
            src={media.src}
            controls
            preload="none"
            className="block w-full"
            aria-label={media.alt}
          />
        ) : (
          <img
            src={media.src}
            alt={media.alt}
            loading="lazy"
            width={680}
            height={300}
            className="block h-auto w-full"
          />
        )
      ) : (
        <div
          className="flex aspect-[680/300] w-full items-center justify-center border border-dashed border-rule bg-ink/5 text-center"
          role="img"
          aria-label={placeholder}
        >
          <span className="max-w-sm px-6 text-base italic text-ink-soft">
            {placeholder}
          </span>
        </div>
      )}
      {media?.caption && (
        <figcaption className="mx-5 mt-2 text-[15px] italic leading-normal text-ink-soft sm:mx-0 lg:mt-2.5 lg:text-base">
          {label}. {media.caption.en}
          {media.caption.zu && (
            <span lang="zu" className="block">
              {media.caption.zu}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
};

export default SceneFigure;
