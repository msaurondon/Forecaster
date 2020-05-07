function summarizeIndicators(msg) {
  var bulls = msg.indicatorCounter.Bull;
  var bears = msg.indicatorCounter.Bear;
  var neutral = msg.indicatorCounter.Neutral;
  var indicatorsCounted = Math.round(bulls) + Math.round(bears) + Math.round(neutral);

  var percentBull = (
    (Math.round(bulls).toFixed(2) / Math.round(indicatorsCounted).toFixed(2)) *
    100
  ).toFixed(2);
  var percentBear = (
    (Math.round(bears).toFixed(2) / Math.round(indicatorsCounted).toFixed(2)) *
    100
  ).toFixed(2);
  var percentNeutral = (
    (Math.round(neutral).toFixed(2) / Math.round(indicatorsCounted).toFixed(2)) *
    100
  ).toFixed(2);

  msg.indicatorSummary = `Out of the cumulative indicators monitored, ${percentBull}% are bullish, ${percentBear}% are bearish, ${percentNeutral}% are neutral`;
  return msg;
}

function buildIndicators(msg) {
  var message = '\n\nIndicators Summary.\nA collection of technical indicators whose directional attitude has been summarized.';
  if (msg.month.timePeriod == 'M') {
    message += `\nMonthly: ${msg.month.indicatorSummary}`;
  }
  if (msg.week.timePeriod == 'W') {
    message += `\nWeekly: ${msg.week.indicatorSummary}`;
  }
  if (msg.day.timePeriod == 'D') {
    message += `\nDaily: ${msg.day.indicatorSummary}`;
  }

  return message;
}
