function buildTitle(msg) {
  var title = "Error in Title Component";

  if (msg.month.timePeriod == "M") {
    title = `${msg.month.symbol} Month End Evaluation`;
  } else if (msg.week.timePeriod == "W") {
    title = `${msg.week.symbol} End Of Week Evaluation`;
  } else if (msg.day.timePeriod == "D") {
    title = `${msg.day.symbol} evaluation of ${msg.day.datadate}`;
  }
  return title;
}

function buildMessage(msg) {
  var comments = "";

  if (document.getElementById("comments").value.length > 0) {
    comments = `*** Comments prior to evaluation summary ***
    ${document.getElementById("comments").value}\n\n`;
  }

  var priceActionSummary = buildPriceActionSummary(msg);
  var priceTrendSummary = buildPriceTrendSummary(msg);
  var priceStandardDeviation = buildStandardDeviation(msg);
  var priceStrength = buildHMAStrengthRange(msg);
  var projection = buildProjectionDirection(msg);
  var indicators = buildIndicators(msg);
  var cci = buildCCISuggestion(msg);
  var r = buildConfirmSuggestion(msg);
  var adviceMsg = buildMAStrategySummary(msg);
  var stops = suggestedStops(msg);

  var messageBody = `${comments}${priceTrendSummary}${priceActionSummary}${priceStandardDeviation}${priceStrength}${projection}${indicators}${cci}${r}${adviceMsg}${stops}`;

  return messageBody;
}
