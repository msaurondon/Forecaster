function summarizeStochastic(msg) {
  var kDir = "";
  var dDir = "";

  if (msg.k > 63) {
    kDir = "Bull";
    msg.indicatorCounter.Bull++;
    msg.confirmSummary.Bull++;
  } else if (msg.k < 37) {
    kDir = "Bear";
    msg.indicatorCounter.Bear++;
    msg.confirmSummary.Bear++;
  } else {
    kDir = "Neutral";
    msg.indicatorCounter.Neutral++;
    msg.confirmSummary.Neutral++;
  }

  if (msg.k > msg.d) {
    dDir = "Bull";
  } else {
    dDir = "Bear";
  }
  msg.kSummary = kDir;
  msg.dSummary = dDir;

  return msg;
}
