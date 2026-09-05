/**
 * Bring the profile up to date: five years, and the microservices work.
 *
 *   node scripts/update-profile.mjs
 *
 * Every competency added below is demonstrated in the published workspace,
 * not merely claimed: the TO-BE project carries the REST contracts written to
 * the Belgif error model, the Artemis command and event catalogue, the saga
 * state machine, the retry policy at 2s/4s/8s, the idempotency store, the DLQ
 * and its recovery path, the DB2 model with ownership per service, the
 * Postman collection and the INVEST story grooming. A recruiter can open any
 * of them.
 */
import fs from "node:fs";
import path from "node:path";

const DATA = path.resolve(import.meta.dirname, "../src/data/HomePagdData.json");
const data = JSON.parse(fs.readFileSync(DATA, "utf8"));

/* ---------- five years, and the analyst-plus-developer framing ---------- */

data.hero.typingText = [
  "I'm a Functional Analyst",
  1500,
  "I'm a Technical Analyst",
  1500,
  "I'm a Full-Stack Developer",
  1500,
];

data.hero.description =
  "Functional & Technical Analyst with 5+ years bridging business needs and technical delivery in enterprise and SaaS environments. My core strength is requirements engineering — gathering, analysing and documenting business requirements, modelling processes with UML & BPMN, and writing functional specifications and REST API contracts (Swagger/OpenAPI) — extending into microservices architecture, event-driven integration and data modelling, grounded in hands-on full-stack development with Java and Spring Boot.";

data.about.title = "FUNCTIONAL & TECHNICAL <span>ANALYST</span>";

data.about.description =
  "Functional & Technical Analyst based in Brussels, Belgium, with 5+ years bridging business needs and technical delivery across enterprise and SaaS environments. I gather, analyse and document business requirements, model processes with UML & BPMN, write functional specifications and REST API contracts (Swagger/OpenAPI, Belgif standards), and manage stakeholders. I analyse and design microservices architectures — including the migration of EJB/WebLogic systems towards Java, Docker and Kubernetes — covering synchronous API contracts, asynchronous and event-driven flows over message brokers, and logical data modelling on DB2. Embedded with hands-on full-stack development for close, clear collaboration with IT teams. Delivered functional analysis at enterprise scale across the Finance, Fitness, HR and logistics sectors (including Leejam Sports — 200+ locations, 100,000+ members). MBA in IT Management (2025). Trilingual — Arabic (native), English & French (B2), Dutch (A2, improving). Available immediately. Before IT, an international professional Muay Thai & Kickboxing champion.";

const years = data.about.funfacts.find((fact) => fact.title === "Years Experience");
if (years) years.number = 5;

/* ---------- the developer card widens to full stack ---------- */

const dev = data.service.allService.find((item) => item.title === "Java & Spring Boot");
if (dev) {
  dev.title = "Full-Stack Development";
  dev.subTitle =
    "Hands-on development with Java, Spring Boot, FastAPI and REST APIs, plus Angular and React, containerised with Docker and deployed on Kubernetes — technical depth that enables close, well-informed collaboration with IT teams.";
}

/* ---------- three cards for the microservices work ---------- */

const added = [
  {
    imgUrl: "/images/service-01.jpg",
    title: "Microservices & API Architecture",
    subTitle:
      "Analysing and designing microservices architectures, including migration from EJB/WebLogic towards Java, Docker and Kubernetes. Decomposition by business capability, REST API contracts written to Belgif standards, OpenAPI, versioning and a common error model.",
    icon: "bi:diagram-2",
    ratings: 5,
  },
  {
    imgUrl: "/images/service-02.jpg",
    title: "Event-Driven & Resilience Patterns",
    subTitle:
      "Analysis of synchronous and asynchronous exchanges over message brokers (Artemis): commands against events, saga orchestration across services, retry policy with exponential backoff, idempotency keys and dead letter queues.",
    icon: "bi:arrow-repeat",
    ratings: 5,
  },
  {
    imgUrl: "/images/service-03.jpg",
    title: "Data Modelling & Agile Delivery",
    subTitle:
      "Conceptual and logical data modelling with table design on DB2, ownership per service, and API test scenarios in Postman. User stories written to the INVEST principle, refined and delivered in Scrum.",
    icon: "bi:database",
    ratings: 5,
  },
];

for (const card of added) {
  if (!data.service.allService.some((item) => item.title === card.title)) {
    data.service.allService.push(card);
  }
}

fs.writeFileSync(DATA, JSON.stringify(data, null, 2) + "\n", "utf8");

console.log(`  years experience: ${years?.number}`);
console.log(`  competency cards: ${data.service.allService.length}`);
for (const item of data.service.allService) console.log(`    - ${item.title}`);
