/**
 * Add the Courses & Training section.
 *
 *   node scripts/add-training.mjs
 *
 * Only the IBM business analysis training is listed, because it is the one
 * that was named. Nothing else is added here: a course entry is a claim a
 * recruiter can ask about, and inventing one to fill a row would be the single
 * most damaging thing this site could do.
 */
import fs from "node:fs";
import path from "node:path";

const DATA = path.resolve(import.meta.dirname, "../src/data/HomePagdData.json");
const data = JSON.parse(fs.readFileSync(DATA, "utf8"));

data.training = data.training || {
  sectionHeading: {
    miniTitle: "Continuing Education",
    title: "Courses & <span>Training</span>",
  },
  list: [],
};

const entries = [
  {
    name: "IBM Business Analyst Professional Certificate",
    issuer: "IBM",
    date: "",
    icon: "simple-icons:ibm",
    note: "Business analysis fundamentals: stakeholder analysis, requirements elicitation and documentation, process modelling, and data-driven decision making.",
    verifyUrl: "",
  },
];

for (const entry of entries) {
  if (!data.training.list.some((item) => item.name === entry.name)) {
    data.training.list.push(entry);
  }
}

fs.writeFileSync(DATA, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(`  training entries: ${data.training.list.length}`);
for (const item of data.training.list) {
  console.log(`    - ${item.name} (${item.issuer}${item.date ? `, ${item.date}` : ", date to confirm"})`);
}
