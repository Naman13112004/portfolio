import HeroIdentity from './HeroIdentity';
import WorkExperience from './WorkExperience';
import ProjectIndex from './ProjectIndex';
import TechnicalEvidence from './TechnicalEvidence';
import LearningInPublic from './LearningInPublic';
import CreativeIdentity from './CreativeIdentity';
import Foundations from './Foundations';
import ContactSection from './ContactSection';
import { portfolioData } from '../../data/portfolio';

export default function OverviewPage() {
  const currentRole = portfolioData.experience.find((job) => job.current) ?? portfolioData.experience[0];

  return (
    <div>
      <HeroIdentity
        data={portfolioData.personalInfo}
        focus={portfolioData.currentFocus}
        content={portfolioData.content}
        current={currentRole}
      />

      <WorkExperience experience={portfolioData.experience} />

      <ProjectIndex projects={portfolioData.projects} />

      <TechnicalEvidence items={portfolioData.technicalEvidence} projects={portfolioData.projects} />

      <LearningInPublic data={portfolioData.learningInPublic} focus={portfolioData.currentFocus} />

      <section
        aria-labelledby="outside-title"
        className="shell-width section-pad grid grid-cols-[1.1fr_0.9fr] gap-[10vw] max-[680px]:grid-cols-1 max-[680px]:gap-[45px]"
      >
        <CreativeIdentity interests={portfolioData.interests} content={portfolioData.content} />
        <Foundations education={portfolioData.education} achievements={portfolioData.achievements} />
      </section>

      <div className="bg-stone">
        <div className="shell-width section-pad">
          <ContactSection />
        </div>
      </div>
    </div>
  );
}
