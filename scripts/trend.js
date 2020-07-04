function summarizeTrend(msg) {
  var ma21 = 0;
  var ma13 = 0;
  var ma8 = 0;

  if (msg.lastprice > msg.ma21) ma21 = 1;
  if (msg.lastprice > msg.ma13) {
    ma13 = 1;
    msg.confirmSummary.Bull++;
  } else {
    msg.confirmSummary.Bear++;
  }
  if (msg.lastprice > msg.ma8) ma8 = 1;

  var summary =
    Math.abs(parseInt(ma21) * 3) +
    Math.abs(parseInt(ma13) * 2) +
    Math.abs(parseInt(ma8) * 1);

  console.log("trend summary: " + summary);
  switch (summary) {
    case 6:
      msg.trendSummary = "long positions";
      msg.indicatorCounter.Bull++;
      break;
    case 0:
      msg.trendSummary = "short positions";
      msg.indicatorCounter.Bear++;
      break;
    case 5:
      msg.trendSummary =
        "hold current position but prepare to close, ensure stops are placed.";
      msg.indicatorCounter.Neutral++;
      break;
    case 1:
      msg.trendSummary =
        "hold current position but prepare to close, ensure stops are placed.";
      msg.indicatorCounter.Neutral++;
      break;
    case 3:
      msg.trendSummary = "close current positions.";
      msg.indicatorCounter.Neutral++;
      break;
    default:
      msg.trendSummary =
        "prices are caught in consolidation/transitioning to new direction.  Ensure your stops are placed.";
      msg.indicatorCounter.Neutral++;
      break;
  }
  console.log(summary);
  return msg;
}

function buildPriceTrendSummary(msg) {
  var output = `Trend Analysis:\n`;
  output += `The current trend is defined by the last price and it's relationship to specific moving averages.\n`;
  output += `Check the MA strategy for more specific suggestions.\n`
  if (msg.month.timePeriod == "M")
    output += `Monthly: The relationship to the primary trend MA is ${msg.month.disposition}. The price in relationship to the other averages suggest ${msg.month.trendSummary}\n`;
  if (msg.week.timePeriod == "W")
    output += `Weekly: The relationship to the primary trend MA is ${msg.week.disposition}.  The price in relationship to the other averages suggest ${msg.week.trendSummary}\n`;
  if (msg.day.timePeriod == "D")
    output += `Daily: The relationship to the primary trend MA is ${msg.day.disposition}.  The price in relationship to the other averages suggest ${msg.day.trendSummary}\n`;

  return output;
}
