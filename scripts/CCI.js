function summarizeCCI(msg) {
  var cci50 = msg.cci50;
  var cci14 = msg.cci14;
  var ema34 = msg.ema34;
  var lastprice = msg.lastprice;

  var sum50 = 0;
  var sum14 = 0;
  var sumTotal = 0;
  var output = "";
  var opportunity = "No entries at this time.  If in, consider covering.";

  if (cci50 > 0 && cci50 < 100) sum50 = 1;
  if (cci50 > 100) sum50 = 2;
  if (cci50 > -100 && cci50 < 0) sum50 = -1;
  if (cci50 < -100) sum50 = -2;

  if (cci14 > 0 && cci14 < 75) sum14 = 1;
  if (cci14 > 75) sum14 = 2;
  if (cci14 > -75 && cci14 < 0) sum14 = -1;

  if (cci14 < -75) sum14 = -2;

  sumTotal = sum50 + sum14;
  switch (sumTotal) {
    case 2:
      output = "Bullish";
      msg.indicatorCounter.Bull++;
      break;
    case 3:
      output = "Strongly bullish";
      msg.indicatorCounter.Bull++;
      break;
    case 4:
      output = "Very strongly bullish";
      msg.indicatorCounter.Bull++;
      break;
    case -2:
      output = "Bearish";
      msg.indicatorCounter.Bear++;
      break;
    case -3:
      output = "Strongly bearish";
      msg.indicatorCounter.Bear++;
      break;
    case -4:
      output = "Very strongly bearish";
      msg.indicatorCounter.Bear++;
      break;
    default:
      output = "Neutral price action";
      msg.indicatorCounter.Neutral++;
      break;
  }

  if (lastprice > ema34) {
    if (cci50 > 0 && cci14 > 100) {
      opportunity = "long entries";
    }
    if (cci50 > 100 && (cci14 > 75 && cci14 < 100)) {
      opportunity = "long reentries";
    }
    if (cci50 > 100 && cci14 < 75) {
      opportunity = "longs closed";
    }
    if (cci50 > 0 && cci50 < 100 && (cci14 > 0 && cci14 < 75)) {
      opportunity = "cover longs";
    }
  }

  //TODO: Tune this engine piece - this is just the base ruleset.
  if (lastprice < ema34) {
    if (cci50 < 0 && cci14 < -100) {
      opportunity = "short entries";
    }
    if (cci50 < -100 && (cci14 > -100 && cci14 < -75)) {
      opportunity = "short reentries";
    }
    if (cci50 > -100 && cci14 > -75) {
      opportunity = "shorts closed";
    }
    if (cci50 > -100 && cci50 < 0 && (cci14 > -75 && cci14 < 0)) {
      opportunity = "cover shorts";
    }
  }

  msg.cciTrend = output;
  msg.cciSummary = opportunity;
  console.log("cci sum total: " + sumTotal);
  console.log("opportunity: " + opportunity);

  return msg;
}

function buildCCISuggestion(msg){
  var message = '\n\nThe CCI indicator trading strategy suggest the following:'
  if(msg.month.timePeriod=='M'){
    message+=`\nMonthly: ${msg.month.cciTrend} - ${msg.month.cciSummary}.`;
  }
  if(msg.week.timePeriod=='W'){
    message+=`\nWeekly: ${msg.week.cciTrend} - ${msg.week.cciSummary}.`;
  }
  if(msg.day.timePeriod=='D'){
    message+=`\nDaily: ${msg.day.cciTrend} - ${msg.day.cciSummary}.`;
  }

  return message;
}
