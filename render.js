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
    <article class="card concept-card" id="${card.id}">
      <header class="card-header">
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
        <span class="tag">Contributor: ${card.contributor}</span>
     </header>
      <div class="card-body collapsible-body" id="body-${card.id}">
      <div class="card-body">
       <h4>Definition</h4>
       <p>${card.definition}</p>
