/* ============================================================
   main.js
   Wires data.js content through render.js templates into the
   DOM containers defined in index.html. No animation/interaction
   logic added at this stage — content and structure only.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("concept-cards-container").innerHTML = renderConceptCards(CONCEPT_CARDS);
  document.getElementById("comparisons-container").innerHTML = renderComparisons(COMPARISONS);
  document.getElementById("workflows-container").innerHTML = renderWorkflows(WORKFLOWS);
  document.getElementById("applications-container").innerHTML = renderApplications(APPLICATIONS);
  document.getElementById("research-container").innerHTML = renderResearchItems(RESEARCH_ITEMS);
  document.getElementById("sustainability-container").innerHTML = renderSustainability(
    SUSTAINABILITY_TEXT,
    SDG_CARDS
  );
  document.getElementById("reflections-container").innerHTML = renderReflections(REFLECTIONS);
  document.getElementById("contribution-matrix-container").innerHTML = renderContributionMatrix(
    CONTRIBUTION_MATRIX
  );
  document.getElementById("references-container").innerHTML = renderReferences(REFERENCES);
  document.getElementById("ai-declaration-container").innerHTML = renderAIDeclaration(AI_DECLARATION_TEXT);

  document.getElementById("current-year").textContent = new Date().getFullYear();
});
