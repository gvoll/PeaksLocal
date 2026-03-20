import React from 'react';
import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import PlatformStrip from '../components/PlatformStrip.jsx';
import Problem from '../components/Problem.jsx';
import VisibilityScore from '../components/VisibilityScore.jsx';
import Pipeline from '../components/Pipeline.jsx';
import System from '../components/System.jsx';
import Services from '../components/Services.jsx';
import WhoWeHelp from '../components/WhoWeHelp.jsx';
import About from '../components/About.jsx';
import AuditForm from '../components/AuditForm.jsx';
import Footer from '../components/Footer.jsx';

export default function LandingPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PlatformStrip />
        <Problem />
        <VisibilityScore />
        <Pipeline />
        <System />
        <Services />
        <WhoWeHelp />
        <About />
        <AuditForm />
      </main>
      <Footer />
    </>
  );
}
