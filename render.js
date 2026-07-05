/* ============================================================
   render.js
   Reusable render functions. Each function takes data (from data.js)
   and returns an HTML string. No styling/animation logic here —
   structure and content only, per current build stage.
   ============================================================ */

function renderList(items) {
  return `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
}

const ICONS = {
  tokenization: '<path d="M4 6h16M4 12h10M4 18h7"/><circle cx="20" cy="18" r="2"/>',
  "stopword-removal": '<path d="M4 4l16 16M4 20L20 4"/>',
  stemming: '<path d="M12 20V10M12 10c0-3 2-6 6-6M12 10c0-3-2-6-6-6"/>',
  lemmatization: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13Z"/><path d="M4 19.5V6.5"/>',
  "bag-of-words": '<path d="M6 8h12l-1.5 12h-9L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  tfidf: '<path d="M4 19V5M4 19h16M8 15l3-4 3 3 4-6"/>',
  "search-engines": '<circle cx="10" cy="10" r="6"/><path d="M20 20l-5.5-5.5"/>',
  chatbots: '<path d="M4 5h16v10H8l-4 4V5Z"/>',
  "sentiment-analysis": '<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
  "machine-translation": '<path d="M4 6h9M7 4v2m2 0c0 4-3 7-6 8m3-3c1.5 1.5 3 2 5 2M14 20l4-9 4 9M15.5 17h5"/>',
  "text-summarization": '<path d="M4 5h16M4 10h16M4 15h10M4 20h6"/>',
  preprocessing: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  features: '<path d="M4 20V10M10 20V4M16 20v-7M22 20v-3"/>',
  vectors: '<path d="M4 20L14 4M4 20h6M4 20v-6"/><circle cx="18" cy="7" r="2"/>',
  research: '<circle cx="10" cy="10" r="6"/><path d="M20 20l-5.5-5.5"/>',
  industry: '<path d="M3 21h18M5 21V9l6-4 6 4v12M9 21v-6h4v6"/>',
  framework: '<path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>',
};

function iconSvg(name, cls) {
  const path = ICONS[name];
  if (!path) return "";
  return `<svg class="icon ${cls || ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ---------- Concept Cards ----------
function buildConceptSearchText(card) {
  const parts = [
    card.title,
    card.contributor,
    card.definition,
    card.purpose,
    card.workingPrinciple,
    card.example.input,
    Array.isArray(card.example.output) ? card.example.output.join(" ") : card.example.output,
    ...card.advantages,
    ...card.limitations,
    ...card.applications,
    card.keyTakeaway,
  ];
  return parts.join(" ").toLowerCase();
}

function renderConceptCard(card) {
  return `
    <article class="card concept-card expandable-card" id="${card.id}" data-search="${escapeAttr(buildConceptSearchText(card))}">
      <header class="card-header card-expand-header">
        <div class="card-title-group">
          <span class="icon-badge">${iconSvg(card.id)}</span>
          <h3>${card.title}</h3>
        </div>
        <div class="card-header-actions">
          <span class="tag">Contributor: ${card.contributor}</span>
          <button type="button" class="expand-btn" aria-expanded="false" aria-controls="body-${card.id}">
            <span class="expand-btn-text">Expand</span>
            <svg class="icon expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
        </div>
      </header>
      <div class="card-body collapsible-body" id="body-${card.id}">
        <h4>Definition</h4>
        <p>${card.definition}</p>

        <h4>Purpose</h4>
        <p>${card.purpose}</p>

        <h4>Working Principle</h4>
        <p>${card.workingPrinciple}</p>

        <h4>Example</h4>
        <p><strong>Input:</strong> ${card.example.input}<br/>
        <strong>Output:</strong> ${
          Array.isArray(card.example.output) ? card.example.output.join(" → ") : card.example.output
        }</p>

        <h4>Advantages</h4>
        ${renderList(card.advantages)}

        <h4>Limitations</h4>
        ${renderList(card.limitations)}

        <h4>Applications</h4>
        ${renderList(card.applications)}

        <h4>Key Takeaway</h4>
        <p class="key-takeaway">${card.keyTakeaway}</p>
      </div>
    </article>
  `;
}

function renderConceptCards(cards) {
  return cards.map(renderConceptCard).join("");
}

// ---------- Comparative Analysis ----------
function renderComparisonTable(comparison) {
  const [leftLabel, rightLabel] = comparison.title.split(" vs ");
  const rows = comparison.rows
    .map(
      (r) => `
      <tr>
        <td class="criterion-cell">${r.criterion}</td>
        <td>${r.left}</td>
        <td>${r.right}</td>
      </tr>`
    )
    .join("");

  return `
    <div class="comparison-block" id="${comparison.id}">
      <div class="card-header">
        <div class="card-title-group">
          <span class="icon-badge icon-badge-outline">${iconSvg("vectors")}</span>
          <h3>${comparison.title}</h3>
        </div>
        <span class="tag">Contributor: ${comparison.contributor}</span>
      </div>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Criterion</th>
              <th>${leftLabel}</th>
              <th>${rightLabel}</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <p class="conclusion"><strong>Conclusion:</strong> ${comparison.conclusion}</p>
    </div>
  `;
}

function renderComparisons(comparisons) {
  return comparisons.map(renderComparisonTable).join("");
}

// ---------- Workflow Diagrams ----------
function renderWorkflow(workflow) {
  const steps = workflow.steps
    .map(
      (step, i) => `
      <li class="workflow-step">
        <span class="step-number">${i + 1}</span>
        <span class="step-label">${step}</span>
      </li>`
    )
    .join('<li class="workflow-arrow" aria-hidden="true">↓</li>');

  return `
    <div class="workflow-block" id="${workflow.id}">
      <div class="card-header">
        <div class="card-title-group">
          <span class="icon-badge icon-badge-outline">${iconSvg("preprocessing")}</span>
          <h3>${workflow.title}</h3>
        </div>
        <span class="tag">Contributor: ${workflow.contributor}</span>
      </div>
      <ol class="workflow-diagram">${steps}</ol>
    </div>
  `;
}

function renderWorkflows(workflows) {
  return workflows.map(renderWorkflow).join("");
}

// ---------- Applications ----------
function renderApplicationCard(app) {
  return `
    <article class="card application-card" id="${app.id}">
      <span class="icon-badge">${iconSvg(app.id)}</span>
      <h3>${app.title}</h3>
      <h4>Overview</h4>
      <p>${app.overview}</p>
      <h4>NLP Concepts Used</h4>
      ${renderList(app.conceptsUsed)}
      <h4>Benefits</h4>
      ${renderList(app.benefits)}
      <h4>Real-World Example</h4>
      <p>${app.example}</p>
    </article>
  `;
}

function renderApplications(apps) {
  return apps.map(renderApplicationCard).join("");
}

// ---------- Research & Industry Insights ----------
const RESEARCH_ICON_KEY = {
  "Research Development": "research",
  "Industrial Application": "industry",
  "Open-Source Framework": "framework",
};

function renderResearchItem(item) {
  return `
    <article class="card research-card">
      <span class="icon-badge">${iconSvg(RESEARCH_ICON_KEY[item.category])}</span>
      <span class="tag">${item.category}</span>
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
    </article>
  `;
}

function renderResearchItems(items) {
  return items.map(renderResearchItem).join("");
}

// ---------- Sustainability ----------
function renderSustainability(text, sdgCards) {
  const paragraphs = text
    .split("\n\n")
    .map((p) => `<p>${p}</p>`)
    .join("");

  const cards = sdgCards
    .map(
      (c) => `
      <div class="card sdg-card">
        <span class="sdg-code">${c.code}</span>
        <h4>${c.title}</h4>
        <p>${c.note}</p>
      </div>`
    )
    .join("");

  return `
    <div class="sustainability-text">${paragraphs}</div>
    <div class="sdg-grid">${cards}</div>
  `;
}

// ---------- Reflection Notes ----------
function renderReflection(reflection) {
  return `
    <article class="card reflection-card">
      <header class="card-header">
        <h3>Reflection — ${reflection.student}</h3>
        ${reflection.status === "placeholder" ? '<span class="tag tag-warning">Genuine Reflection</span>' : ""}
      </header>
      <p>${reflection.text}</p>
    </article>
  `;
}

function renderReflections(reflections) {
  return reflections.map(renderReflection).join("");
}

// ---------- Contribution Matrix ----------
function renderContributionMatrix(matrix) {
  const rows = matrix
    .map(
      (row) => `
      <tr>
        <td class="criterion-cell">${row.student}</td>
        <td>${row.contribution}</td>
      </tr>`
    )
    .join("");

  return `
    <div class="table-wrapper">
      <table>
        <thead>
          <tr><th>Student</th><th>Contribution</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

// ---------- References ----------
function renderReferences(refs) {
  return `<ol class="reference-list">${refs.map((r) => `<li>${r}</li>`).join("")}</ol>`;
}

// ---------- AI Declaration ----------
function renderAIDeclaration(text) {
  return `<p>${text}</p>`;
}
