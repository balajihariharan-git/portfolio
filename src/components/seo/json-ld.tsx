export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://balajihariharan.com/#person",
    name: "Balaji Hariharan",
    jobTitle: "AI Solutions Architect",
    url: "https://balajihariharan.com",
    sameAs: [
      "https://github.com/shackleai",
      "https://www.npmjs.com/package/@shackleai/memory-mcp",
      "https://github.com/balajihariharan-git",
      "https://github.com/shackleai/orchestrator",
    ],
    knowsAbout: [
      "AI Agent Orchestration",
      "Agent Orchestration",
      "MCP Protocol",
      "LLM Infrastructure",
      "Full-Stack Development",
      "TypeScript",
      "Python",
      "Banking AI Systems",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Balaji Hariharan",
    url: "https://balajihariharan.com",
    description:
      "AI Solutions Architect building production agent systems, LLM gateways, and governance frameworks.",
  };

  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: { "@id": "https://balajihariharan.com/#person" },
    url: "https://balajihariharan.com",
    name: "Balaji Hariharan — AI Solutions Architect",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePage) }}
      />
    </>
  );
}
