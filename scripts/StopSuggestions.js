function suggestedStops(msg){
  var message = '';
  if(msg.month.timePeriod == "M"){
      message = determineStops(msg.month);
  }
  if(msg.week.timePeriod == "W"){
    message += determineStops(msg.week);
  }
  if(msg.day.timePeriod == "D"){
    message += determineStops(msg.day);
  }
  return message;
}

function determineStops(msg){

  var atr = msg.atr;
  var sar = parseFloat(msg.sar).toFixed(2);
  var lastprice = msg.lastprice;
  var ma21 = msg.ma21;
  var ma13 = msg.ma13;
  var consolDD = msg.consolDD;
  var consolL = msg.consolL;
  var consolH = msg.consolH;
  var breakLow = parseFloat(consolL - (atr * .5)).toFixed(2);
  var breakHigh = parseFloat(consolH + (atr * .5)).toFixed(2);

  var output = '\nSuggested stop placement:';

  var stopAtr = parseFloat(atr).toFixed(2) * 1.5;

  if(lastprice > ma21){
    var atrStop = parseFloat(lastprice).toFixed(2) - parseFloat(stopAtr).toFixed(2);
    if(msg.timePeriod == "M"){
        output = '\nSuggested stops based on long positions on the monthly chart: ';
        if(sar < lastprice) output += '\nSAR value at: ' + sar;
        if(consolDD == 1 || consolDD == 4){

          output += `\nIn consolidation and bullish (Consolidation Low - (ATR * .5)): ${breakLow}`;
        }
        output += '\nClose - (ATR * 1.5) at: '+atrStop;
        if(lastprice > ma13) { output+=`\nSMA 13 at: ${ma13}`;}
    }
    if(msg.timePeriod == "W"){
      output = '\nSuggested stops based on long positions on weekly chart: ';
      if(sar < lastprice) output += '\nSAR value at: ' + sar;
      if(consolDD == 1 || consolDD == 4){

        output += `\nIn consolidation and bullish (Consolidation Low - (ATR * .5)): ${breakLow}`;
      }
      output += '\nClose - (ATR * 1.5) at: '+atrStop;
      if(lastprice > ma13) { output+=`\nSMA 13 at: ${ma13}`;}
    }
    if(msg.timePeriod == "D"){
      output = '\nSuggested stops based on long positions on daily charts: ';
      if(sar < lastprice) output += '\nSAR value at: ' + sar;
      if(consolDD == 1 || consolDD == 4){

        output += `\nIn consolidation and bullish (Consolidation Low - (ATR * .5)): ${breakLow}`;
      }
      output += '\nClose - (ATR * 1.5) at: '+atrStop;
      if(lastprice > ma13) { output+=`\nSMA 13 at: ${ma13}`;}
    }
  }
  if(lastprice < ma21){
    var atrStop = lastprice + stopAtr;
    if(msg.timePeriod == "M"){
        output = '\nSuggested stops base on monthly chart: ';
        if(sar > lastprice) output += '\nSAR value at: ' + sar;
        if(consolDD == 1 || consolDD == 4){

          output += `\nIn consolidation and bearish (Consolidation High + (ATR * .5)): ${breakHigh}`;
        }
        output += '\nClose - (ATR * 1.5) at: '+atrStop;
        if(lastprice < ma13) { output+=`\nSMA 13 at: ${ma13}`;}
    }
    if(msg.timePeriod == "W"){
      output = '\nSuggested stops base on weekly chart: ';
      if(sar > lastprice) output += '\nSAR value at: ' + sar;
      if(consolDD == 1 || consolDD == 4){

        output += `\nIn consolidation and bearish (Consolidation High + (ATR * .5)): ${breakHigh}`;
      }
      output += '\nClose - (ATR * 1.5) at: '+atrStop;
      if(lastprice < ma13) { output+=`\nSMA 13 at: ${ma13}`;}
    }
    if(msg.timePeriod == "D"){
      output = '\nSuggested stops base on daily charts: ';
      if(sar > lastprice) output += '\nSAR value at: ' + sar;
      if(consolDD == 1 || consolDD == 4){

        output += `\nIn consolidation and bearish (Consolidation High + (ATR * .5)): ${breakHigh}`;
      }
      output += '\nClose - (ATR * 1.5) at: '+atrStop;
      if(lastprice < ma13) { output+=`\nSMA 13 at: ${ma13}`;}
    }
  }

  return output;

}
