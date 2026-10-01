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
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 md:px-12 max-w-5xl mx-auto">
      <HeroIdentity 
        data={portfolioData.personalInfo} 
        focus={portfolioData.currentFocus}
        content={portfolioData.content} 
      />
      
      <WorkExperience experience={portfolioData.experience} />
      
      <ProjectIndex projects={portfolioData.projects} />
      
      <TechnicalEvidence 
        profile={portfolioData.technicalProfile} 
        projects={portfolioData.projects} 
      />
      
      <LearningInPublic data={portfolioData.learningInPublic} />
      
      <CreativeIdentity 
        interests={portfolioData.interests} 
        content={portfolioData.content} 
      />
      
      <Foundations 
        education={portfolioData.education} 
        achievements={portfolioData.achievements} 
      />
      
      <ContactSection />
    </div>
  );
}
