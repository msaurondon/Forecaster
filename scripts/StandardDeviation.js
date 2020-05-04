function buildStandardDeviation(msg) {
  var output = `\n\nStandard Deviation\n`;
  if (msg.month.timePeriod == "M")
    output += `Monthly: Standard deviation suggests a range from ${msg.month.stddevL} to ${msg.month.stddevH} for the following month.\n`;
  if (msg.week.timePeriod == "W")
    output += `Weekly: Standard deviation suggests a range from ${msg.week.stddevL} to ${msg.week.stddevH} for the following week.\n`;
  if (msg.day.timePeriod == "D")
    output += `Daily: Standard deviation suggests a range from ${msg.day.stddevL} to ${msg.day.stddevH} for the follow on trading day.\n`;
  return output;
}
