const adviseMsg = {
  bull1: 'Bullish market attitude, enter into Long trades only - do not bet against the trend\n',
  bull2: 'Prices have slid below the fast MA, this may reflect some profit taking or the beginning of consolidation.  Enter long trades once the prices return above the MA.\n',
  bull3: 'Prices are in consolidation.  Do not enter into any new trades at this time.  Wait for the break out of the consolidation to occur.\n',
  bull4: 'Trend strength is weakening.  Cover your current trades but do not trade opposite the trend yet.  Wait for confirmation of trend switch.\n',
  bull5: 'Consolidation is taking too long/weakening. Cover your current trades but do not trade opposite the trend yet.  Wait for confirmation of trend switch.\n',
  bull6: 'Consolidation has broken through the low.  Take a short position with tighter stops (Consolidation Low + ATR) in place.  This might be the start of a trend reversal - but again, it may not be.\n',
  bear1: 'Bearish market attitude, enter into Short trades only - do not bet against the trend\n',
  bear2: 'Prices have raised above the fast MA, this may reflect some bargin buying or the beginning of consolidation.  If you are in, hold.  If you are looking to get in/add to your position, enter short trades once the prices return below the MA.\n',
  bear3: 'Prices are in consolidation.  Do not enter into any new trades at this time.  Wait for the break out of the consolidation to occur.\n',
  bear4: 'Trend strength is weakening.  Cover your current trades but do not trade opposite the trend yet.  Wait for confirmation of trend switch.\n',
  bear5: 'Consolidation is taking too long/weakening. Cover your current trades but do not trade opposite the trend yet.  Wait for confirmation of trend switch.\n',
  bear6: 'Consolidation has broken through the high.  Take a long position with tighter stops (Consolidation High + ATR) in place.  This might be the start of a trend reversal - but again, it may not be.\n'
}

function strategyOne(msg) {
  var returnMsg = {
    lastprice: 0,
    ma8: 0,
    ma13: 0,
    ma21: 0,
    consolidation: 0,
    trend: 0,
    openClose: 0,
    openPosition: 0,
    advice: 'I got nothing.\n'
  };

  if (msg.timePeriod == 'D') {
    returnMsg.lastprice = msg.lastprice;
    returnMsg.ma8 = msg.ma8;
    returnMsg.ma13 = msg.ma13;
    returnMsg.ma21 = msg.ma21;
    returnMsg.consolidation = msg.consolDD;

    returnMsg = pricesTrend(returnMsg);
    returnMsg = prices13(returnMsg);
    returnMsg = prices8(returnMsg);
    returnMsg = advice(returnMsg);
    console.table(returnMsg);

    msg.strategyOne = returnMsg.advice;
  }

  return msg;
}

function pricesTrend(returnMsg) {
  if (returnMsg.lastprice > returnMsg.ma21) returnMsg.trend = 1;
  return returnMsg;
}

function prices8(returnMsg) {
  if (returnMsg.lastprice > returnMsg.ma8) returnMsg.openPosition = 1;

  return returnMsg;
}

function prices13(returnMsg) {
  if (returnMsg.lastprice > returnMsg.ma13) returnMsg.openClose = 1;

  return returnMsg;
}

function advice(returnMsg) {
  if (returnMsg.trend == 1) {
    if (returnMsg.openClose == 1) {
      if (returnMsg.consolidation == 2 || returnMsg.consolidation == 5) {
        if (returnMsg.openPosition == 1) returnMsg.advice = adviseMsg.bull1;
        if (returnMsg.openPosition == 0) returnMsg.advice = adviseMsg.bull2;
      }
      if (returnMsg.consolidation == 1 || returnMsg.consolidation == 4) {
        if (returnMsg.openPosition == 0) returnMsg.advice = adviseMsg.bull3;
        if (returnMsg.openPosition == 1) returnMsg.advice = adviseMsg.bull3;
      }
    } else {
      if (returnMsg.consolidation == 2 || returnMsg.consolidation == 5) {
        if (returnMsg.openPosition == 0) returnMsg.advice = adviseMsg.bull4;
      }
      if (returnMsg.consolidation == 1 || returnMsg.consolidation == 4) {
        if (returnMsg.openPosition == 0) returnMsg.advice = adviseMsg.bull5;
      }
      if (returnMsg.consolidation == 3) {
        if (returnMsg.openPosition == 0) returnMsg.advice = adviseMsg.bull6;
      }
    }
  } else {
    if (returnMsg.openClose == 0) {
      if (returnMsg.consolidation == 3 || returnMsg.consolidation == 5) {
        if (returnMsg.openPosition == 0) returnMsg.advice = adviseMsg.bear1;
        if (returnMsg.openPosition == 1) returnMsg.advice = adviseMsg.bear2;
      }
      if (returnMsg.consolidation == 1 || returnMsg.consolidation == 4) {
        if (returnMsg.openPosition == 1) returnMsg.advice = adviseMsg.bear3;
        if (returnMsg.openPosition == 0) returnMsg.advice = adviseMsg.bear3;
      }
    } else {
      if (returnMsg.consolidation == 1 || returnMsg.consolidation == 4) {
        if (returnMsg.openPosition == 1) returnMsg.advice = adviseMsg.bear5;
      }
      if (returnMsg.consolidation == 3 || returnMsg.consolidation == 5) {
        if (returnMsg.openPosition == 1) returnMsg.advice = adviseMsg.bear4;
      }
      if (returnMsg.consolidation == 2) {
        if (returnMsg.openPosition == 1) returnMsg.advice = adviseMsg.bear6;
      }
    }
  }

  return returnMsg;
}

function buildMAStrategySummary(msg) {
  var message = '';
  if (msg.day.timePeriod == "D") {
    message += '\n\nMoving Average Strategy\nStrategy composed of 3 moving averages and prices interaction with the averages.\n';
    message += "Daily: " + msg.day.strategyOne;
  }

  return message;
}
