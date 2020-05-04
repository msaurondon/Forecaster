function summarizeBSI(msg) {
  var bsi = -msg.bsi;
  var bsima = msg.bsiMA;
  var bsiDir = "Bear";
  var bsiMADir = "Bear";

  if (bsi > 0) {
    bsiDir = "Bull";
    msg.indicatorCounter.Bull++;
  }

  if (bsi > bsima) {
    bsiMADir = "Bull";
    msg.indicatorCounter.Bear++;
  }
  msg.bsiSummary = bsiDir;
  msg.bsiMASummary = bsiMADir;

  return msg;
}
