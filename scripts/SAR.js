function summarizeSAR(msg) {

  var sarDir = "Jello";

  if (msg.lastprice > msg.sar) {
    sarDir = "Bull";
    msg.indicatorCounter.Bull++;
    msg.confirmSummary.Bull++;
  }
  if (msg.lastprice < msg.sar) {
    sarDir = "Bear";
    msg.indicatorCounter.Bear++;
    msg.confirmSummary.Bear++;
  }
  msg.SARSummary = sarDir;

  return msg;
}
