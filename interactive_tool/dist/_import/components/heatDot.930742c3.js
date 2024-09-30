import {html} from "../../_npm/htl@0.3.1/063eb405.js";

export var heatDot = function heatDot(score, minScore, maxScore, incr=true, size=18) {
  // Ensure score is a number and clamp it between minScore and maxScore
  const scoreNumber = parseFloat(score);
  const clampedScore = Math.max(minScore, Math.min(scoreNumber, maxScore));

  // Calculate the normalized value between 0 and 1
  const value = (clampedScore - minScore) / (maxScore - minScore);

  // Adjust hue based on whether higher score is better or lower score is better
  var hue;
  if (incr === true) {
      // Higher score is better
      hue = ((value) * 120).toString(10); // Green (120) to Red (0)
  } else {
      // Lower score is better
      hue = ((1 - value) * 120).toString(10); // Red (0) to Green (120)
  }

  // Generate HSL color and return HTML span element
  var colour = ["hsl(", hue, ",100%,50%)"].join("");
  return html`<span style="font-size:${size}px;color:${colour};">&#9679;</span>`;
}