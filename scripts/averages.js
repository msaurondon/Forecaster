function summarizeAPO(msg) {
  var apoDIR = "";
  if (msg.apo > 0) {
    apoDIR = "Bull";
    msg.indicatorCounter.Bull++;
    msg.confirmSummary.Bull++;
  }
  if (msg.apo < 0) {
    apoDIR = "Bear";
    msg.indicatorCounter.Bear++;
    msg.confirmSummary.Bear++;
  }
  msg.APOSummary = apoDIR;

  return msg;
}

function summarizeSMA10(msg) {
  var smaDIR = "";
  if (msg.lastprice > msg.sma10) {
    smaDIR = "Bull";
    msg.indicatorCounter.Bull++;
    msg.confirmSummary.Bull++;
  } else {
    smaDIR = "Bear";
    msg.indicatorCounter.Bear++;
    msg.confirmSummary.Bear++;
  }
  msg.sma10Summary = smaDIR;

  return msg;
}

function summarizeCombinedAverages(msg) {
  var disposition = "bearish";

  if (msg.ma21 < msg.lastprice) {
    disposition = "bullish";
  }
  //bullish

  //if(ma8 == 1 && ma13 == 1) {disposition = 'Long'};
  //if(ma8 == 0 && ma13 == 1) {disposition = 'Hold'};
  //if(ma8 == 0 && ma13 == 0) {disposition = 'Cover Longs'};
  //if(ma8 == 1 && ma13 == 0) {disposition = 'Hold - Prices in consolidation/transition'};
  //else {
  //bearish
  //if(ma8 == 0 && ma13 == 0) {disposition = 'Short'};
  //if(ma8 == 1 && ma13 == 0) {disposition = 'Hold'};
  //if(ma8 == 1 && ma13 == 1) {disposition = 'Cover Shorts'};
  //if(ma8 == 1 && ma13 == 0) {disposition = 'Hold - Prices in consolidation/transition'};
  //}
  msg.disposition = disposition;
  return msg;
}
