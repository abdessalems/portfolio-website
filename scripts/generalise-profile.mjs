/**
 * Say what the skill is, not whose project it came from.
 *
 *   node scripts/generalise-profile.mjs
 *
 * The competencies had been written straight off a client's job description:
 * a named migration from EJB/WebLogic to Docker and Kubernetes, a named
 * government API standard, a named message broker. On a public portfolio that
 * reads as somebody publishing the inside of an engagement, which is a worse
 * first impression than a thin skill list - and it narrows the profile to one
 * employer's stack when the work applies anywhere.
 *
 * The competencies below name the discipline. The proof of the specific
 * technology stays where it belongs: in the case study, which a reader opens
 * deliberately.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DATA = path.join(ROOT, "src/data/HomePagdData.json");
const data = JSON.parse(fs.readFileSync(DATA, "utf8"));

/* ---------- the three competencies, rewritten as disciplines ---------- */

const REWRITTEN = {
  "Microservices & API Architecture": {
    title: "Technical Analysis & Solution Design",
    subTitle:
      "Turning business requirements into a technical design engineers can build from: system decomposition, interface and integration analysis, data flows between systems, and the feasibility and impact assessment behind each option.",
    icon: "bi:diagram-2",
  },
  "Event-Driven & Resilience Patterns": {
    title: "Integration Analysis",
    subTitle:
      "Specifying how systems talk to each other: synchronous API contracts and asynchronous, message-based exchanges, error and retry behaviour, and the edge cases that decide whether an integration is safe to rely on.",
    icon: "bi:arrow-repeat",
  },
  "Data Modelling & Agile Delivery": {
    title: "Data Modelling & Agile Delivery",
    subTitle:
      "Conceptual and logical data modelling, table design and data mapping across systems, with API test scenarios. User stories written to the INVEST principle, refined and delivered in Scrum.",
    icon: "bi:database",
  },
};

for (const card of data.service.allService) {
  const rewrite = REWRITTEN[card.title];
  if (!rewrite) continue;
  Object.assign(card, rewrite);
}

/* ---------- the developer card keeps the stack, drops the client's ---------- */

const dev = data.service.allService.find((item) => item.title === "Full-Stack Development");
if (dev) {
  dev.subTitle =
    "Hands-on development with Java, Spring Boot, FastAPI and REST APIs, plus Angular and React — technical depth that enables close, well-informed collaboration with IT teams.";
}

/* ---------- the about paragraph ---------- */

data.about.description =
  "Functional & Technical Analyst based in Brussels, Belgium, with 5+ years bridging business needs and technical delivery across enterprise and SaaS environments. I gather, analyse and document business requirements, model processes with UML & BPMN, write functional specifications and API documentation (Swagger/OpenAPI), and manage stakeholders. I analyse how systems fit together — service boundaries, synchronous and asynchronous integration, error handling and logical data models — and translate that into designs engineering teams can build from. Embedded with hands-on full-stack development for close, clear collaboration with IT teams. Delivered functional analysis at enterprise scale across the Finance, Fitness, HR and logistics sectors (including Leejam Sports — 200+ locations, 100,000+ members). MBA in IT Management (2025). Trilingual — Arabic (native), English & French (B2), Dutch (A2, improving). Available immediately. Before IT, an international professional Muay Thai & Kickboxing champion.";

data.hero.description =
  "Functional & Technical Analyst with 5+ years bridging business needs and technical delivery in enterprise and SaaS environments. My core strength is requirements engineering — gathering, analysing and documenting business requirements, modelling processes with UML & BPMN, and writing functional specifications and API documentation (Swagger/OpenAPI) — extending into integration analysis and data modelling, grounded in hands-on full-stack development with Java and Spring Boot.";

fs.writeFileSync(DATA, JSON.stringify(data, null, 2) + "\n", "utf8");

/* ---------- and the descriptions search engines show ---------- */

const routesPath = path.join(ROOT, "src/data/RouteMetaData.json");
const routes = JSON.parse(fs.readFileSync(routesPath, "utf8"));
routes.routes["/"].description =
  "Functional & Technical Analyst in Brussels with 5+ years bridging business and IT: requirements engineering, UML/BPMN process modelling, functional specifications, Swagger/OpenAPI documentation, integration and data analysis, Java Spring Boot and Angular.";
fs.writeFileSync(routesPath, JSON.stringify(routes, null, 2) + "\n", "utf8");

const indexPath = path.join(ROOT, "public/index.html");
let html = fs.readFileSync(indexPath, "utf8");
html = html
  .split("microservices and event-driven architecture, ")
  .join("integration and data analysis, ");
fs.writeFileSync(indexPath, html, "utf8");

/* ---------- report anything client-specific still on the public pages ---------- */

const WORDS = ["Belgif", "WebLogic", "EJB", "Artemis", "Kubernetes", "Docker", "DB2", "Saga", "idempotenc"];
const haystack = [
  fs.readFileSync(DATA, "utf8"),
  fs.readFileSync(routesPath, "utf8"),
  html,
].join("\n");

console.log("  competencies:");
for (const card of data.service.allService) console.log(`    - ${card.title}`);
console.log("  client-specific terms remaining on the public pages:");
let clean = true;
for (const word of WORDS) {
  if (haystack.toLowerCase().includes(word.toLowerCase())) {
    console.log(`    ! ${word}`);
    clean = false;
  }
}
if (clean) console.log("    none");
