/**
 * Bring the search and social descriptions in line with the profile.
 *
 * These are the sentences Google, LinkedIn and WhatsApp show when the site is
 * shared, so they were still advertising four years and saying nothing about
 * the microservices work.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

const HOME_DESCRIPTION =
  "Functional & Technical Analyst in Brussels with 5+ years bridging business and IT: requirements engineering, UML/BPMN modelling, REST API contracts to Belgif standards, microservices and event-driven architecture, DB2 data modelling, Java Spring Boot and Angular.";

const SOCIAL_DESCRIPTION =
  "Functional & Technical Analyst with 5+ years bridging business and IT. Requirements engineering, UML/BPMN, REST API contracts, microservices and event-driven architecture, Java Spring Boot & Angular. Former professional Muay Thai & kickboxing champion.";

const SOCIAL_SHORT =
  "Functional & Technical Analyst with 5+ years bridging business and IT. Former professional Muay Thai & kickboxing champion.";

/* ---------- route metadata ---------- */

const routesPath = path.join(ROOT, "src/data/RouteMetaData.json");
const routes = JSON.parse(fs.readFileSync(routesPath, "utf8"));
routes.routes["/"].title = "Abdessalem Saadaoui — Functional & Technical Analyst";
routes.routes["/"].description = HOME_DESCRIPTION;
fs.writeFileSync(routesPath, JSON.stringify(routes, null, 2) + "\n", "utf8");

/* ---------- the static head, which social crawlers read ---------- */

const indexPath = path.join(ROOT, "public/index.html");
let html = fs.readFileSync(indexPath, "utf8");

const replacements = [
  [
    'Functional Analyst with 4+ years bridging business and IT. Requirements engineering, UML/BPMN, Swagger/OpenAPI, Java Spring Boot &amp; Angular. Former professional Muay Thai &amp; kickboxing champion.',
    SOCIAL_DESCRIPTION.replace(/&/g, "&amp;"),
  ],
  [
    'Functional Analyst with 4+ years bridging business and IT. Requirements engineering, UML/BPMN, Swagger/OpenAPI, Java Spring Boot & Angular. Former professional Muay Thai & kickboxing champion.',
    SOCIAL_DESCRIPTION,
  ],
  [
    'Functional Analyst with 4+ years bridging business and IT. Former professional Muay Thai &amp; kickboxing champion.',
    SOCIAL_SHORT.replace(/&/g, "&amp;"),
  ],
  [
    'Functional Analyst with 4+ years bridging business and IT. Former professional Muay Thai & kickboxing champion.',
    SOCIAL_SHORT,
  ],
];

let changed = 0;
for (const [from, to] of replacements) {
  if (html.includes(from)) {
    html = html.split(from).join(to);
    changed++;
  }
}
fs.writeFileSync(indexPath, html, "utf8");

const left = (html.match(/4\+ years/g) || []).length;
console.log(`  meta blocks rewritten: ${changed}`);
console.log(`  "4+ years" left in index.html: ${left}`);
