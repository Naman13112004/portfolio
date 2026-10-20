import type { Interests, Content } from '../../data/types';
import { Reveal } from '../../components/reveal';
import { Eyebrow, ExternalLink, SectionTitle } from './primitives';

/** "Outside the code": built only from the verified interests and content-platform data. */
export default function CreativeIdentity({ interests, content }: { interests: Interests; content: Content }) {
  const topics = [...interests.reading, ...interests.creative].join(', ');

  return (
    <Reveal className="min-w-0">
      <Eyebrow>Outside the code</Eyebrow>
      <SectionTitle id="outside-title" className="mb-6 mt-3">
        Reading widely. Writing and creating.
      </SectionTitle>
      <p className="max-w-[650px] text-slate">{topics}.</p>
      <div className="mt-[35px] flex flex-wrap gap-6 text-[13px]">
        {content.youtube.url && (
          <ExternalLink href={content.youtube.url}>{content.youtube.name} / YouTube</ExternalLink>
        )}
        {content.instagram.url && (
          <ExternalLink href={content.instagram.url}>{content.instagram.handle} / Instagram</ExternalLink>
        )}
      </div>
    </Reveal>
  );
}
