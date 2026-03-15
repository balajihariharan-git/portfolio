import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Background } from "@/components/sections/background";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { WorkWithMe } from "@/components/sections/work-with-me";
import { OpenSource } from "@/components/sections/open-source";
import { Timeline } from "@/components/sections/timeline";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Background />
      <Projects />
      <Skills />
      <WorkWithMe />
      <OpenSource />
      <Timeline />
      <Contact />
    </>
  );
}
