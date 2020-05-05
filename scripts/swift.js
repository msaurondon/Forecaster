const swiftMsg = {
  date:'',
  symbol:'',
  trendMA: 0,
  high:0,
  low:0,
  close:0,
  atr:0,
  sar:0,
  hmaDD:0,
  consolH:0,
  consolL:0,
  priceProjection:0.0,
  trendDirection:0,
  priceTarget:0,
  stops:'',
  hmaHighAdder:0,
  hmaLowAdder:0
}

let message = swiftMsg;

function Swift() {


    message.date = document.getElementById("s1").value;
    message.symbol= document.getElementById("s2").value;
    message.trendMA = document.getElementById("s3").value;
    message.high = document.getElementById("s4").value;
    message.low = document.getElementById("s5").value;
    message.close= document.getElementById("s6").value;
    message.atr= document.getElementById("s7").value;
    message.sar= document.getElementById("s8").value;
    message.hmaDD= document.getElementById("s9").value;
    message.consolH= document.getElementById("s10").value;
    message.consolL= document.getElementById("s11").value;
    message.priceProjection= document.getElementById("s12").value;
    build();
  };

  function build(){
    trendDirection();
    takeProfitTarget();
    hmaCalculation();
    stops();

    title();
    body();
  };

  function trendDirection (){
    if(message.close > message.trendMA) message.trendDirection = 1;
  };

  function takeProfitTarget (){
    var percentATR = parseFloat(message.atr * .07).toFixed(2);
    var answer = 0.0;
    var projection = parseFloat(message.priceProjection).toFixed(2);

    if(message.trendDirection == 1) {
      answer = parseFloat(projection) - parseFloat(percentATR);
    } else {
      answer = (parseFloat(projection) + parseFloat(percentATR));
    }
    message.priceTarget = answer;
  };

  function priceProjection(){
    console.log("s12");
    var high = document.getElementById("s4").value;
    var low = document.getElementById("s5").value;
    var close = document.getElementById("s6").value;
    var range = 0, projection = 0, target = 0; bearRange = 0, perRange = 0;
    var s12 = document.getElementById("s12");

    if(!(typeof close === undefined) && !isNaN(close)){
      range = parseFloat(high) - parseFloat(low);
      bearRange = parseFloat(high) - parseFloat(close);
      perRange = parseFloat(bearRange) / parseFloat(range);
      projection = range * .618;
      if(perRange > .5){
        target = parseFloat(close) - parseFloat(projection);
      } else {
        target = parseFloat(close) + parseFloat(projection);
      }
      if(!isNaN(target)) {
        s12.value = parseFloat(target).toFixed(2);
      } else {s12.value = '';}

    }
  }

  function stops(){
    var output = "";
    if(message.trendDirection == 1){
      var atr15 = parseFloat(message.close) - (parseFloat(message.atr) * 1.5);
      output += `\nSuggested stops in a Bullish environment.`;
      output += `\nLast Price - (ATR * 1.5): ${parseFloat(atr15).toFixed(2)}`;
      output += `\nThe trend moving average: ${parseFloat(message.trendMA)}\n`;
      if(message.close > message.sar) {
        output += `SAR: ${message.sar}`;
      }
    } else {
      var atr15 = parseFloat(message.close) + (parseFloat(message.atr) * 1.5);
      output += `\nSuggested stops in a Bearish environment.`;
      output += `\nLast Price + (ATR * 1.5): ${parseFloat(atr15).toFixed(2)}`;
      output += `\nThe trend moving average: ${parseFloat(message.trendMA)}\n`;
      if(message.close < message.sar) {
        output += `SAR: ${message.sar}`;
      }
    }
    message.stops = output;
  }

  function body(){
    var output = '';
    var trend = 'bear';
    var bodyBox = document.getElementById("bodyBox");
    if(message.trendDirection == 1) trend = 'bull';

    output += `A swift evaluation is conducted based on a single day without look back.`;
    output +=`\n${message.symbol} is currently in a ${trend} trend.`;
    output += `\nPrices are trading in a range of approximately ${message.atr} points/ticks/pips per trade period.`
    output += `\nPrice strength is suggesting a possible follow on range of ${parseFloat(parseFloat(message.close) + parseFloat(message.hmaLowAdder)).toFixed(2)} - ${ parseFloat(parseFloat(message.close) + parseFloat(message.hmaHighAdder)).toFixed(2)}.`;
    if(message.consolH > 0.0){
      output += `\nPrices are consolidating between ${message.consolL} - ${message.consolH}.`;
    }
    output += `\nIf strength and trend continue, ${message.symbol} is trying to reach ${parseFloat(message.priceTarget).toFixed(2)}.`;
    output += `\n${message.stops}`;
    if(document.getElementById("comments").value.length > 0)
    {
      output += `\n\n------Additional Comments:`
      output += `\n${document.getElementById("comments").value}`;
    }

    bodyBox.value = output;
  }

  function title(){
    var output = `${message.date} swift evaluation of ${message.symbol}`;
    var titleBox = document.getElementById("titleBox");
    titleBox.value = output;

  }

  function hmaCalculation() {
    var multipliers = { vs: 1.382, s: 0.618, b: 0.5 };
    var hmaValues = [
      { key: 8, bull: message.atr * multipliers.vs, bear: 0 },
      { key: 7, bull: message.atr, bear: 0 },
      {
        key: 6,
        bull: message.atr * multipliers.s,
        bear: message.atr * multipliers.b * -1
      },
      {
        key: 5,
        bull: message.atr * multipliers.s,
        bear: message.atr * multipliers.s * -1
      },
      {
        key: 4,
        bull: message.atr * multipliers.s,
        bear: message.atr * multipliers.s * -1
      },
      {
        key: 3,
        bull: message.atr * multipliers.b,
        bear: message.atr * multipliers.s * -1
      },
      { key: 2, bull: 0, bear: message.atr * -1 },
      { key: 1, bull: 0, bear: message.atr * multipliers.vs * -1 }
    ];

  validateHMAdd();

    var hmaCalc = hmaValues.find(m => m.key == message.hmaDD);
    message.hmaHighAdder = hmaCalc.bull;
    message.hmaLowAdder = hmaCalc.bear;

  }

  function validateHMAdd() {
    if (message.consolH > 0.0) {
      if (message.hmaDD > 5) message.hmaDD--;
      if (message.hmaDD < 4) message.hmaDD++;
    }
  }
