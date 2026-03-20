import React, { useEffect } from 'react';
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
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 150);
    }
  }, []);

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
