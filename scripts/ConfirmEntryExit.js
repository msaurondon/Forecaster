function buildConfirmSuggestion(msg) {

  var bull = 0;
  var bear = 0;
  var output = "\n\nConfirmation Signal\n6 indicators combined to confirm entry/exit.";


  if(msg.month.timePeriod == "M"){
    bull = msg.month.confirmSummary.Bull;
    bear = msg.month.confirmSummary.Bear;
    output += "\nMonthly " + confirmMessage(bear, bull, msg.month.lastprice, msg.month.ma21);
  }
  if(msg.week.timePeriod == "W"){
    bull = msg.week.confirmSummary.Bull;
    bear = msg.week.confirmSummary.Bear;
    output += "\nWeekly " +confirmMessage(bear, bull, msg.week.lastprice, msg.week.ma21);
  }
  if(msg.day.timePeriod == "D"){
    bull = msg.day.confirmSummary.Bull;
    bear = msg.day.confirmSummary.Bear;
    output += "\nDaily " +confirmMessage(bear, bull, msg.day.lastprice, msg.day.ma21);
  }

  return output;
}

function confirmMessage(bear, bull, lastprice, ma21){

  var direction = 'Bearish -';
  var message = '';
  var confirm = (Math.round(bear) / 6).toFixed(4);

  if (lastprice > ma21) {
    direction = 'Bullish -';
    confirm = (Math.round(bull) / 6).toFixed(4);
  }
  console.log("confirm: "+ confirm);
  if (confirm > .83) {
    direction += ' Open directional trades';
  }
  if (confirm > .66 && confirm < .83) {
    direction += ' Close/Cover directional trades';
  }
  if (confirm < .66) {
    direction += ' Close/Cover directional trades, profit taking/trend switch in process.';
  }

  message += direction;

  return message;
}
