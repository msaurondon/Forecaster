function suggestedProfit(msg){
  var message = '';
  if(msg.month.timePeriod == "M"){
      message = determineProfit(msg.month);
  }
  if(msg.week.timePeriod == "W"){
    message += determineProfit(msg.week);
  }
  if(msg.day.timePeriod == "D"){
    message += determineProfit(msg.day);
  }
  return message;
}

function determineProfit(msg){
  message = '';
  var atr = msg.atr;
  var atr2 = atr * .93;
  var consolDD = msg.consolDD;

  
}
