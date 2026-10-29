import React from "react";
import type { Scene, Theme } from "../../data/types";

interface SceneViewProps {
  scene: Scene;
  theme: Theme;
}

const eyebrow =
  "text-[13px] font-medium uppercase leading-snug tracking-[0.16em] text-ink-soft";
const heading =
  "mb-2.5 mt-9 font-display text-[1.625rem] font-semibold leading-tight lg:mb-3 lg:mt-11 lg:text-[1.875rem]";

/**
 * The body of a stage told as a scene: who is present, what is said, what
 * unfolds. The narration and media are placed by StageChapter, because the
 * page orders them differently on a phone. English comes first, isiZulu
 * second. See docs/ROADMAP.md, Phase 1.
 */
const SceneView: React.FC<SceneViewProps> = ({ scene, theme }) => {
  return (
    <div>
      {/* Words to know: the isiZulu term is the word being taught, so it leads */}
      {scene.roles && scene.roles.length > 0 && (
        <section
          aria-label="Words to know"
          className="border-y border-rule pb-1.5 pt-5 lg:pb-3 lg:pt-6"
        >
          <p className={`mb-3 lg:mb-4 ${eyebrow}`}>Words to know</p>
          <dl>
            {scene.roles.map((role) => (
              <div key={role.term} className="mb-4 lg:mb-[18px]">
                <dt
                  lang="zu"
                  className={`font-display text-[1.375rem] italic leading-snug lg:text-2xl ${theme.accent}`}
                >
                  {role.term}
                </dt>
                <dd className="mt-0.5 text-[17px] leading-relaxed lg:text-lg">
                  {role.gloss}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* What is said, in full: English, then the isiZulu as it is spoken */}
      {scene.voice && (
        <>
          <h2 className={heading}>What is said</h2>
          <figure className={`border-l-4 pl-5 ${theme.border}`}>
            <blockquote>
              <p>{scene.voice.en}</p>
              <p
                lang="zu"
                className="mt-2 font-display text-[1.375rem] italic leading-snug lg:text-2xl"
              >
                {scene.voice.zu}
              </p>
            </blockquote>
            {scene.voice.note && (
              <figcaption className={`mt-3 ${eyebrow}`}>
                {scene.voice.note}
              </figcaption>
            )}
          </figure>
        </>
      )}

      {scene.beats && scene.beats.length > 0 && (
        <>
          <h2 className={heading}>What unfolds</h2>
          <ol className="space-y-5">
            {scene.beats.map((beat, i) => (
              <li key={i} className="flex gap-4">
                <span
                  className={`w-6 flex-shrink-0 font-display text-2xl font-semibold leading-[1.2] ${theme.accent}`}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <p>{beat.en}</p>
                  {beat.zu && (
                    <p lang="zu" className="mt-1 text-base italic text-ink-soft lg:text-lg">
                      {beat.zu}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </>
      )}

      {/* The humble note: "commonly... but families and regions differ" */}
      {scene.variesNote && (
        <p className="mt-9 italic text-ink-soft lg:mt-11">{scene.variesNote}</p>
      )}
    </div>
  );
};

export default SceneView;
