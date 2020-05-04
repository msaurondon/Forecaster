function buildProjectionDirection(msg) {
  let message = "";
  var output = `\nPrice Projection:\nThe price action has generated a projection signal for the underlying.`;
  if (msg.month.timePeriod == "M") {
    message = buildProjectionMessage(msg.month);
    output += `\nMonthly: ${message}`;
  }
  if (msg.week.timePeriod == "W") {
    message = buildProjectionMessage(msg.week);
    output += `\nWeekly: ${message}`;
  }
  if (msg.day.timePeriod == "D") {
    message = buildProjectionMessage(msg.day);
    output += `\nDaily: ${message}`;
  }
  return output;
}

function buildProjectionMessage(msg) {
  var single = 0;
  var first = 0;
  var second = 0;
  var lastprice = 0;
  var atr = 0;
  var ma21 = 0;
  let message = "";

  if (msg.timePeriod == 'M') {
    single = msg.ppSingle;
    first = msg.ppFirst;
    second = msg.ppSecond;
    lastprice = msg.lastprice;
    atr = msg.atr;
    ma21 = msg.ma21;
    message += setPriceProjection(single, first, second, lastprice, atr, ma21,'months');
    //if (parseInt(single).toFixed(2) > 0.0 == 0 && parseInt(first).toFixed(2) > 0.0) message += "Prices are not currently generating projection signals.";
  }
  else if (msg.timePeriod == 'W') {
    single = msg.ppSingle;
    first = msg.ppFirst;
    second = msg.ppSecond;
    lastprice = msg.lastprice;
    atr = msg.atr;
    ma21 = msg.ma21;
    message += setPriceProjection(single, first, second, lastprice, atr, ma21,'weeks');
    //if (parseInt(single).toFixed(2) > 0.0 == 0 && parseInt(first).toFixed(2) > 0.0) message += "Prices are not currently generating projection signals.";
  }
  else if (msg.timePeriod == 'D') {
    single = msg.ppSingle;
    first = msg.ppFirst;
    second = msg.ppSecond;
    lastprice = msg.lastprice;
    atr = msg.atr;
    ma21 = msg.ma21;
    message += setPriceProjection(single, first, second, lastprice, atr, ma21,'days');
  }


  return message;
}

function setPriceProjection(single, first, second, lastprice, atr, ma21, tradePeriod){
  let message = '';
  if (!(parseInt(single).toFixed(2) > 0.0)  && !(parseInt(first).toFixed(2) > 0.0)) message += "Prices are not currently generating projection signals.";
  else if (parseInt(first).toFixed(2) > 0.0) {
    message += `Price currently displays (if strength and attitude continue) a desire to move first toward ${first} before moving toward ${second}`;
  } else if (parseInt(single).toFixed(2) > 0.0) {
    message += `Price currently displays (if strength and attitude continue) a desire to move toward ${single}`;
  }
  message += howLong(lastprice, single, first, second, atr, ma21, tradePeriod);
  return message;
}

function howLong(lastprice, single, first, second, atr, ma21, tradePeriod) {
  var diff1 = 0;
  var diff2 = 0;
  var diff3 = 0;
  var stall1 = 0;
  var stall2 = 0;
  var message = '';

  if (lastprice > ma21) {
    if (single > 0) {
      diff1 = single - ma21;
      stall1 = diff1 / atr;
    }
    if (first > 0) {
      diff2 = first - ma21;
      stall1 = diff2 / atr;
    }
    if (second > 0) {
      diff3 = second - ma21;
      stall2 = diff3 / atr;
    }

  }
  if (ma21 > lastprice) {
    if (single > 0) {
      diff1 = ma21 - single;
      stall1 = diff1 / atr;
    }
    if (first > 0) {
      diff2 = ma21 - first;
      stall1 = diff2 / atr;
    }
    if (second > 0) {
      diff3 = ma21 - second;
      stall2 = diff3 / atr;
    }
    console.log("Diff: " + diff1 + ", atr:" + atr + " single: " + single + " lastprice " + lastprice + " ma21" + ma21);
  }

  // default minimum values.
  if (Math.round(Math.abs(stall1)) == 0) stall1 = 1;
  if (Math.round(Math.abs(stall2)) == 0) stall2 = 1;

  if (single > 0) {
    message += `\nIf strength and attitude continue, it could take between ${Math.round(Math.abs(stall1))} to ${Math.round(Math.abs(stall1)) * 2} trade periods (${tradePeriod}) to reach the projection.`
  }
  if (first > 0) {
    message += `\nIf strength and attitude continue, it could take between ${Math.round(Math.abs(stall1))} - ${Math.round(Math.abs(stall1)) * 2} trade periods (${tradePeriod}) for the first projection and ${Math.round(Math.abs(stall2))} - ${Math.round(Math.abs(stall2)) * 2} to reach the second projection.`
  }

  return message;

}
