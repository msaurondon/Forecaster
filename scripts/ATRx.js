function summarizeATRx(msg) {
  var atrx = msg.atrX;
  var atr = msg.atr;
  var baseAtrx = Math.round(atrx * 100);
  var summary = "Prices are currently " + atrx + "x the normal trading range.";

  if (baseAtrx >= Math.round(4 * 100)) {
    summary +=
      " Prices are equvialent to 4 or more days away from the trend average.  Prices can suddenly stall and move sideways while awaiting the averges or transition directions suddenly.";
  } else if (baseAtrx > Math.round(2 * 100) && baseAtrx < Math.round(3 * 100)) {
    summary +=
      " Prices can encounter consolidation and begin transitioning counter trend.";
  } else if (baseAtrx > Math.round(1 * 100) && baseAtrx < Math.round(2 * 100)) {
    summary += " Prices are trading within the mean range for activity.  This generally indicates a healthy trading range.";
  } else if (baseAtrx < Math.round(1 * 100)) {
    summary += " Prices are trading within the mean range for activity.  This generally indicates a consolidation of strength/indecision in the market regarding direction.";
  }

  if (baseAtrx > Math.round(2 * 100) && msg.timePeriod == "D") {
    var diff = 0;
    diff = msg.ma21 - msg.lastprice;
    if (msg.lastprice > msg.ma21) {
      diff = msg.lastprice - msg.ma21;
    }
    var stallTime = (diff / atr);
    summary +=
      " The prices can stall for up to " +
      parseInt(stallTime) + " - " + parseInt(stallTime * 2) +
      " days.  Or transition and return to the trend MA during that time.";
    console.log('diff: ' + diff + '-' + atr);
  }

  msg.atrxSummary = summary;
  return msg;
}
