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
  priceTarget:0
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
