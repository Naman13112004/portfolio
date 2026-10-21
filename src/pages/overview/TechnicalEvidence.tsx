import type { Project, TechnicalEvidenceItem } from '../../data/types';
import { Reveal } from '../../components/reveal';
import { stagger } from '../../lib/motion';
import { SectionLabel, SectionTitle } from './primitives';

const columns =
  'grid grid-cols-[0.7fr_0.85fr_1.45fr] gap-[30px] border-b border-ink-line py-[18px] max-[680px]:grid-cols-[105px_minmax(0,1fr)] max-[680px]:gap-[10px]';

/**
 * Technology -> project -> evidence table on a full-width dark band.
 * Grid cells use `min-w-0` and `break-words` so long names wrap instead of widening the page.
 */
export default function TechnicalEvidence({
  items,
  projects,
}: {
  items: TechnicalEvidenceItem[];
  projects: Project[];
}) {
  const projectName = (title: string) => projects.find((project) => project.title === title)?.shortTitle ?? title;

  return (
    <section aria-labelledby="evidence-title" className="bg-ink text-paper">
      <div className="shell-width section-pad">
        <Reveal>
          <SectionLabel number="03" onDark>
            Technical evidence
          </SectionLabel>
        </Reveal>

        <Reveal className="mb-[65px] mt-[55px] grid grid-cols-[1.2fr_0.8fr] items-end gap-[10vw] max-[680px]:mb-[45px] max-[680px]:mt-[35px] max-[680px]:grid-cols-1 max-[680px]:gap-[45px]">
          <SectionTitle id="evidence-title">Tools, in context.</SectionTitle>
          <p className="text-on-ink-muted">
            Not a percentage chart. A traceable link between a technology and the work where it was applied.
          </p>
        </Reveal>

        <div role="table" aria-label="Technologies and where they were applied" className="border-t border-ink-line">
          <div
            role="row"
            className={`${columns} font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-on-ink-faint max-[680px]:hidden`}
          >
            <span role="columnheader">Technology</span>
            <span role="columnheader">Project</span>
            <span role="columnheader">Evidence</span>
          </div>
          {items.map((item, index) => (
            <Reveal
              key={`${item.technology}-${item.project}`}
              delay={stagger.evidenceRow * index}
              className={`${columns} transition-[background-color,padding] duration-200 hover:bg-ink-raised hover:px-[10px]`}
              role="row"
            >
              <strong role="cell" className="min-w-0 break-words font-mono text-base font-medium text-accent-soft">
                {item.technology}
              </strong>
              <span role="cell" className="min-w-0 break-words text-on-ink-soft">
                {projectName(item.project)}
              </span>
              <span
                role="cell"
                className="min-w-0 break-words text-on-ink-soft max-[680px]:col-start-2 max-[680px]:text-[13px] max-[680px]:text-on-ink-faint"
              >
                {item.note}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
