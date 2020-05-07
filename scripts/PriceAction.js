function buildPriceActionSummary(msg) {
  var output = `\nPrice Action:\n`;
  if (msg.month.timePeriod == "M") {
    output += `Monthly: The average price range currently is ${msg.month.atr} points/ticks/pips.  ${msg.month.atrxSummary}\n`;
    output += rangeInConsolidation(msg.month);
  }
  if (msg.week.timePeriod == "W") {
    output += `Weekly: The average price range currently is ${msg.week.atr} points/ticks/pips.  ${msg.week.atrxSummary}\n`;
    output += rangeInConsolidation(msg.week);
  }

  if (msg.day.timePeriod == "D") {
    output += `Daily: The average price range currently is ${msg.day.atr} points/ticks/pips.  ${msg.day.atrxSummary}\n`;
    output += rangeInConsolidation(msg.day);
  }



  return output;
}

function rangeInConsolidation(msg) {
  var output = "";
  var consolAtr = 0;
  if (msg.timePeriod == "M") {
    if (msg.consolDD == 1 || msg.consolDD == 4) {
      consolAtr = parseInt(msg.atr).toFixed(2) * .618;
      output += inConsolidation(msg);
      output += `\nWhile in consolidation the trade range may decrease to ${consolAtr} points/ticks/pips.\n`;
    } else {
      output += inConsolidation(msg);
    }
  }
  if (msg.timePeriod == "W") {
    if (msg.consolDD == 1 || msg.consolDD == 4) {
      consolAtr = parseInt(msg.atr).toFixed(2) * .618;
      output += inConsolidation(msg);
      output += `\nWhile in consolidation the trade range may decrease to ${consolAtr} points/ticks/pips.\n`;
    } else {
      output += inConsolidation(msg);
    }
  }

  if (msg.timePeriod == "D") {
    if (msg.consolDD == 1 || msg.consolDD == 4) {
      consolAtr = parseInt(msg.atr).toFixed(2) * .618;
      output += inConsolidation(msg);
      output += `\nWhile in consolidation the trade range may decrease to ${consolAtr} points/ticks/pips.\n`;
    } else {
      output += inConsolidation(msg);
    }
  }


  return output;
}

function inConsolidation(msg) {
  var output = "";
  switch (msg.consolDD) {
    case "1":
      output += `Prices are currently caught in consolidation between ${msg.consolL} and ${msg.consolH}.`;
      break;
    case "2":
      output += `Prices have broken through the high value of the consolidaiton range.`;
      break;
    case "3":
      output += `Prices have broken through the low value of the consolidation range.`;
      break;
    case "4":
      output += `Prices have re-established the previous consolidation range and consolidation is now between ${msg.month.consolL} and ${msg.month.consolH}. `;
      break;
    case "5":
      output += `Prices currently are trending and not in consolidation.`;
      break;
    default:
      output += `There is a fault in our monthly stars!`;
      break;
  }
  return output;
}
