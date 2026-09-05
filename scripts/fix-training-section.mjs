/**
 * Undo a duplicate section, and add the IBM business analysis certificate to
 * the Courses & Training list that already existed.
 *
 *   node scripts/fix-training-section.mjs
 *
 * A second "Courses & Training" section was added without checking, while the
 * page already carried one - built on the testimonial block and holding four
 * entries. Two sections with the same heading is worse than none.
 *
 * The analyst certificate goes first: this is an analyst's portfolio, and the
 * list opened with a full-stack development programme.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DATA = path.join(ROOT, "src/data/HomePagdData.json");
const data = JSON.parse(fs.readFileSync(DATA, "utf8"));

// Remove the duplicate block added earlier.
delete data.training;

const entry = {
  reviewText:
    "IBM Business Analyst Professional Certificate via Coursera — business analysis fundamentals: stakeholder analysis, requirements elicitation and documentation, process modelling, and data-driven decision making.",
  avatarImg: "/images/avatar-1.png",
  avatarName: "IBM via Coursera",
  avatarCompany: "Business Analyst",
};

const list = data.testimonial.allTestimonial;
if (!list.some((item) => item.avatarCompany === entry.avatarCompany)) {
  list.unshift(entry);
}

/* ---------- analyst first, developer second ---------- */

data.about.title = "FUNCTIONAL & TECHNICAL ANALYST · <span>FULL-STACK</span> DEVELOPER";

fs.writeFileSync(DATA, JSON.stringify(data, null, 2) + "\n", "utf8");

console.log(`  duplicate section removed: ${data.training === undefined}`);
console.log(`  courses & training (${list.length}):`);
for (const item of list) console.log(`    - ${item.avatarName} — ${item.avatarCompany}`);
console.log(`  about title: ${data.about.title.replace(/<[^>]+>/g, "")}`);
