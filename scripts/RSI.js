function summarizeRSI(msg) {
  var rsiBullDir = "";
  var rsiBearDir = "";
  var rsi5Dir = "";
  var rsi14 = msg.rsi14;
  var rsi5 = msg.rsi5;

  if (rsi14 > 50) {
    rsiBearDir = "Bull";
    rsiBullDir = "Bull";
    msg.indicatorCounter.Bull++;
    msg.indicatorCounter.Bull++;
    if (rsi14 < 66) {
      rsiBearDir = "Neutral " + rsiBearDir;
      msg.indicatorCounter.Bull--;
      msg.indicatorCounter.Neutral++;
      if (rsi14 < 55) {
        rsiBullDir = "Neutral " + rsiBullDir;
        msg.indicatorCounter.Bull--;
        msg.indicatorCounter.Neutral++;
      }
    }
  } else {
    rsiBearDir = "Bear";
    rsiBullDir = "Bear";
    msg.indicatorCounter.Bear++;
    msg.indicatorCounter.Bear++;
    if (rsi14 > 34) {
      rsiBullDir = "Neutral " + rsiBullDir;
      msg.indicatorCounter.Bear--;
      msg.indicatorCounter.Neutral++;
      if (rsi14 > 45) {
        rsiBearDir = "Neutral " + rsiBearDir;
        msg.indicatorCounter.Bear--;
        msg.indicatorCounter.Neutral++;
      }
    }
  }

  if (rsi5 > 50) {
    rsi5Dir = "Bull";
    msg.indicatorCounter.Bull++;
  } else {
    rsi5Dir = "Bear";
    msg.indicatorCounter.Bear++;
  }
  msg.bullRSISummary = rsiBullDir;
  msg.bearRSISummary = rsiBearDir;
  msg.RSI5Summary = rsi5Dir;

  return msg;
}
