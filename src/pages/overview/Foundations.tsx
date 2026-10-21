import type { Education, Achievement } from '../../data/types';
import { Reveal } from '../../components/reveal';
import { Eyebrow } from './primitives';

/** Education and verified credentials, shown as a compact column beside "Outside the code". */
export default function Foundations({ education, achievements }: { education: Education[]; achievements: Achievement[] }) {
  return (
    <Reveal
      delay={0.05}
      className="min-w-0 border-l border-line pl-[clamp(2rem,5vw,5rem)] max-[680px]:border-l-0 max-[680px]:border-t max-[680px]:pl-0 max-[680px]:pt-[45px]"
    >
      {education.map((edu) => (
        <div key={edu.institution}>
          <Eyebrow>Education</Eyebrow>
          <h3 className="mb-1 mt-[18px] font-display text-[1.7rem] font-medium">{edu.institution}</h3>
          <p className="mb-2 text-slate">
            {edu.degree} · {edu.period}
          </p>
          <strong className="font-mono text-base font-medium text-forest">{edu.grade}</strong>
        </div>
      ))}

      <div className="mt-12">
        <Eyebrow>Selected signals</Eyebrow>
        <ul>
          {achievements.map((achievement) => (
            <li key={achievement.title} className="border-b border-line py-[13px] text-slate">
              <b className="mr-2 font-mono text-xs font-semibold text-ink">{achievement.title}</b>
              {achievement.detail}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
