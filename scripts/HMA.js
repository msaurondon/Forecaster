function hmaCalculation(msg) {
  var multipliers = { vs: 1.382, s: 0.618, b: 0.5 };
  var hmaValues = [
    { key: 8, bull: msg.atr * multipliers.vs, bear: 0 },
    { key: 7, bull: msg.atr, bear: 0 },
    {
      key: 6,
      bull: msg.atr * multipliers.s,
      bear: msg.atr * multipliers.b * -1
    },
    {
      key: 5,
      bull: msg.atr * multipliers.s,
      bear: msg.atr * multipliers.s * -1
    },
    {
      key: 4,
      bull: msg.atr * multipliers.s,
      bear: msg.atr * multipliers.s * -1
    },
    {
      key: 3,
      bull: msg.atr * multipliers.b,
      bear: msg.atr * multipliers.s * -1
    },
    { key: 2, bull: 0, bear: msg.atr * -1 },
    { key: 1, bull: 0, bear: msg.atr * multipliers.vs * -1 }
  ];
  var hmaDD = validateHMAdd(msg.hmaDD, msg.consolDD);

  var hmaCalc = hmaValues.find(m => m.key == hmaDD);
  msg.hmaHighAdder = hmaCalc.bull;
  msg.hmaLowAdder = hmaCalc.bear;

  return msg;
}

function validateHMAdd(hmaDD, consolDD) {
  console.log("before: " + hmaDD + " : " + consolDD);
  if (consolDD == 1 || consolDD == 4) {
    if (hmaDD > 5) hmaDD--;
    if (hmaDD < 4) hmaDD++;
  }
  console.log("after: " + hmaDD + " : " + consolDD);
  return hmaDD;
}

function buildHMAStrengthRange(msg) {
  var highRange = 0;
  var lowRange = 0;
  var output = `\nCalculated Price Strength:\nThe strength of the trend in conjunction with specific averages\n`;
  if (msg.month.timePeriod == "M") {
    highRange =
      parseFloat(msg.month.lastprice) + parseFloat(msg.month.hmaHighAdder);
    lowRange =
      parseFloat(msg.month.lastprice) + parseFloat(msg.month.hmaLowAdder);
    output += `Monthly: Trend strength suggests a trade range of ${lowRange.toFixed(
      2
    )} to ${highRange.toFixed(2)} for the following month.\n`;
  }
  if (msg.week.timePeriod == "W") {
    highRange = parseFloat(msg.week.lastprice) + parseFloat(msg.week.hmaHighAdder);
    lowRange = parseFloat(msg.week.lastprice) + parseFloat(msg.week.hmaLowAdder);
    output += `Weekly: Trend strength suggests a trade range of ${lowRange.toFixed(
      2
    )} to ${highRange.toFixed(2)} for the following week.\n`;
  }
  if (msg.day.timePeriod == "D") {
    highRange = parseFloat(msg.day.lastprice) + parseFloat(msg.day.hmaHighAdder);
    lowRange = parseFloat(msg.day.lastprice) + parseFloat(msg.day.hmaLowAdder);
    output += `Daily: Trend strength suggests a trade range of ${lowRange.toFixed(
      2
    )} to ${highRange.toFixed(2)} for the following day.\n`;
  }

  return output;
}
