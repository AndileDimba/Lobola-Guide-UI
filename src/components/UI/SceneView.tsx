import React from "react";
import type { Scene, Theme } from "../../data/types";

interface SceneViewProps {
  scene: Scene;
  theme: Theme;
}

/**
 * Renders a stage as a "scene" — a story you can watch — instead of a checklist.
 * English is the face (always shown); isiZulu is the heart (shown where it carries
 * weight). See docs/ROADMAP.md, Phase 1.
 */
const SceneView: React.FC<SceneViewProps> = ({ scene, theme }) => {
  return (
    <div className="animate-fade-in space-y-8">
      {/* Media slot — reserved. Shows a placeholder until real media is added. */}
      {scene.media && (
        <figure className="overflow-hidden rounded-2xl">
          {scene.media.src ? (
            scene.media.kind === "video" ? (
              <video
                src={scene.media.src}
                controls
                className="w-full rounded-2xl"
                aria-label={scene.media.alt}
              />
            ) : (
              <img
                src={scene.media.src}
                alt={scene.media.alt}
                loading="lazy"
                className="w-full rounded-2xl object-cover"
              />
            )
          ) : (
            <div
              className="flex aspect-[16/9] w-full items-center justify-center rounded-2xl bg-gradient-to-br from-stone-100 to-stone-200 text-center"
              role="img"
              aria-label={scene.media.alt}
            >
              <span className="max-w-sm px-6 text-sm italic text-stone-400">
                {scene.media.alt}
              </span>
            </div>
          )}
          {scene.media.caption && (
            <figcaption className="mt-2 text-center text-xs text-stone-500">
              {scene.media.caption.en}
              {scene.media.caption.zu && (
                <span className="mt-0.5 block italic text-stone-400">
                  {scene.media.caption.zu}
                </span>
              )}
            </figcaption>
          )}
        </figure>
      )}

      {/* English narration — the doorway into the scene */}
      <p className="text-lg leading-relaxed text-stone-700">
        {scene.narration}
      </p>

      {/* The isiZulu voice of this moment — the heart, shown in full */}
      {scene.voice && (
        <blockquote
          className={`rounded-2xl border-l-4 ${theme.border} bg-white/60 p-6`}
        >
          <p className="font-serif text-xl italic leading-relaxed text-zinc-900">
            "{scene.voice.zu}"
          </p>
          <p className="mt-3 text-sm text-stone-600">{scene.voice.en}</p>
          {scene.voice.note && (
            <p className="mt-2 text-xs uppercase tracking-widest text-stone-400">
              {scene.voice.note}
            </p>
          )}
        </blockquote>
      )}

      {/* Who is present */}
      {scene.roles && scene.roles.length > 0 && (
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-stone-500">
            Who is here
          </h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {scene.roles.map((role) => (
              <div
                key={role.term}
                className="rounded-xl border border-stone-100 bg-white p-4"
              >
                <p className={`font-bold ${theme.accent}`}>{role.term}</p>
                <p className="mt-1 text-sm text-stone-600">{role.gloss}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What unfolds — the beats, English with isiZulu beneath */}
      {scene.beats && scene.beats.length > 0 && (
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-stone-500">
            What unfolds
          </h4>
          <ol className="space-y-5">
            {scene.beats.map((beat, i) => (
              <li key={i} className="flex gap-4">
                <span
                  className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${theme.button.split(" ")[0]}`}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="leading-relaxed text-stone-700">{beat.en}</p>
                  {beat.zu && (
                    <p className="mt-1 text-sm italic text-stone-400">
                      {beat.zu}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* The humble note — "commonly… but families and regions differ" */}
      {scene.variesNote && (
        <p className="rounded-xl bg-stone-100 p-4 text-sm italic text-stone-500">
          {scene.variesNote}
        </p>
      )}
    </div>
  );
};

export default SceneView;
