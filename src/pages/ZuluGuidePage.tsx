import { Navigate, useParams } from "react-router-dom";
import { zuluData } from "../data/zulu";
import type { Step } from "../data/types";
import BeadBand from "../components/UI/BeadBand";
import { JourneyBar, JourneyLine } from "../components/UI/Journey";
import StageChapter from "../components/UI/StageChapter";

const GUIDE_PATH = "/guide/zulu";
const hrefFor = (step: Step) => `${GUIDE_PATH}/${step.id}`;

const ZuluGuidePage = () => {
  const { stageId } = useParams();
  const { steps, theme } = zuluData;

  // The guide opens on the first stage; each stage has its own address so it
  // can be shared and the back button walks the journey.
  const index = stageId ? steps.findIndex((step) => step.id === stageId) : 0;
  if (index === -1) return <Navigate to={GUIDE_PATH} replace />;

  const step = steps[index];
  const journey = { steps, currentIndex: index, theme, hrefFor };

  return (
    <div className="bg-paper font-reading text-lg leading-[1.65] text-ink lg:text-xl lg:leading-[1.7]">
      <BeadBand colors={theme.beads} />

      <div className="mx-auto flex max-w-[1120px] flex-col gap-6 px-5 pb-10 pt-6 lg:flex-row lg:items-start lg:gap-[72px] lg:px-8 lg:pt-14">
        <aside
          aria-label="The journey"
          className="hidden w-60 flex-shrink-0 lg:sticky lg:top-24 lg:block"
        >
          <p className="mb-5 text-[13px] font-medium uppercase leading-snug tracking-[0.16em] text-ink-soft">
            The journey
          </p>
          <JourneyLine {...journey} />
        </aside>

        <div className="lg:hidden">
          {/* Keyed so the stage list folds away again after choosing a stage */}
          <JourneyBar key={step.id} {...journey} />
        </div>

        <StageChapter
          step={step}
          index={index}
          total={steps.length}
          theme={theme}
          previous={steps[index - 1]}
          next={steps[index + 1]}
          hrefFor={hrefFor}
        />
      </div>

      <BeadBand colors={theme.beads} />
    </div>
  );
};

export default ZuluGuidePage;
