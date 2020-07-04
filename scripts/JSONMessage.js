const jsonTestMSG = {
  datadate: "21 April 2020",
  symbol: "UAL",
  lastprice: 27.88,
  hmaDD: 3,
  atr: 3.43,
  atrX: 1.03,
  ma21: 29.31,
  ma13: 27.83,
  ma8: 29.80,
  ppSingle: 26.88,
  ppFirst: "",
  ppSecond: "",
  stddevH: 31.63,
  stddevL: 23.95,
  consolDD: 1,
  consolH: 34.04,
  consolL: 26.69,
  ppo: -12.94,
  ppoH: 2.97,
  rsi14: 38.77,
  rsi5: 44.13,
  cci50: -66.52,
  cci14: -.43,
  ema34: 36.92,
  sar: 32.97,
  k: 53.61,
  d: 53.92,
  r: -83.81,
  apo: -.38,
  sma10: 29.06,
  bsi: -6.24,
  bsima: -6.58,
  indicatorCounter: {
    Bull: 0,
    Bear: 0,
    Neutral: 0
  },
  hmaHighAdder: "",
  hmaLowAdder: "",
  trendSummary: "",
  ppoSummary: "",
  cciTrend: "",
  cciSummary: "",
  bullRSISummary: "",
  bearRSISummary: "",
  RSI5Summary: "",
  SARSummary: "",
  APOSummary: "",
  sma10Summary: "",
  kSummary: "",
  dSummary: "",
  rSummary: "",
  bsiSummary: "",
  bsiMASummary: "",
  atrxSummary: "",
  indicatorSummary: "",
  confirmSummary: {
    Bull: 0,
    Bear: 0,
    Neutral: 0
  },
  disposition: "",
  strategyOne: "",
  timePeriod: ""
}

const jsonTest2MSG = {
  datadate: "21 April 2020",
  symbol: "DJI",
  lastprice: 23018.9,
  hmaDD: 4,
  atr: 740.1,
  atrX: .01,
  ma21: 22331,
  ma13: 23049.9,
  ma8: 23615.5,
  ppSingle: 22561.08,
  ppFirst: "",
  ppSecond: "",
  stddevH: 24380.9,
  stddevL: 21656.8,
  consolDD: 1,
  consolH: 24264.2,
  consolL: 21693.6,
  ppo: .3,
  ppoH: 1.4,
  rsi14: 50.08,
  rsi5: 42.73,
  cci50: -30.01,
  cci14: 14.69,
  ema34: 23386.1,
  sar: 19315.7,
  k: 82.24,
  d: 86.83,
  r: -94.18,
  apo: 14.1,
  sma10: 23510.1,
  bsi: 127.6,
  bsima: 366.3,
  indicatorCounter: {
    Bull: 0,
    Bear: 0,
    Neutral: 0
  },
  hmaHighAdder: "",
  hmaLowAdder: "",
  trendSummary: "",
  ppoSummary: "",
  cciTrend: "",
  cciSummary: "",
  bullRSISummary: "",
  bearRSISummary: "",
  RSI5Summary: "",
  SARSummary: "",
  APOSummary: "",
  sma10Summary: "",
  kSummary: "",
  dSummary: "",
  rSummary: "",
  bsiSummary: "",
  bsiMASummary: "",
  atrxSummary: "",
  indicatorSummary: "",
  confirmSummary: {
    Bull: 0,
    Bear: 0,
    Neutral: 0
  },
  disposition: "",
  timePeriod: ""
}

function buildJSON(timeframe) {
  const monthlyDataID = {
    i1: "g1",
    i2: "g2",
    i3: "g3",
    i4: "m1",
    i5: "m2",
    i6: "m3",
    i7: "m4",
    i8: "m5",
    i9: "m6",
    i10: "m7",
    i11: "m8",
    i12: "m9",
    i13: "m10",
    i14: "m11",
    i15: "m12",
    i16: "m13",
    i17: "m14",
    i18: "m15",
    i19: "m16",
    i20: "m17",
    i21: "m18",
    i22: "m19",
    i23: "m20",
    i24: "m21",
    i25: "m22",
    i26: "m23",
    i27: "m24",
    i28: "m25",
    i29: "m26",
    i30: "m27",
    i31: "m28",
    i32: "m29"
  };
  const weeklyDataID = {
    i1: "g1",
    i2: "g2",
    i3: "g3",
    i4: "w1",
    i5: "w2",
    i6: "w3",
    i7: "w4",
    i8: "w5",
    i9: "w6",
    i10: "w7",
    i11: "w8",
    i12: "w9",
    i13: "w10",
    i14: "w11",
    i15: "w12",
    i16: "w13",
    i17: "w14",
    i18: "w15",
    i19: "w16",
    i20: "w17",
    i21: "w18",
    i22: "w19",
    i23: "w20",
    i24: "w21",
    i25: "w22",
    i26: "w23",
    i27: "w24",
    i28: "w25",
    i29: "w26",
    i30: "w27",
    i31: "w28",
    i32: "w29"
  };
  const dailyDataID = {
    i1: "g1",
    i2: "g2",
    i3: "g3",
    i4: "d1",
    i5: "d2",
    i6: "d3",
    i7: "d4",
    i8: "d5",
    i9: "d6",
    i10: "d7",
    i11: "d8",
    i12: "d9",
    i13: "d10",
    i14: "d11",
    i15: "d12",
    i16: "d13",
    i17: "d14",
    i18: "d15",
    i19: "d16",
    i20: "d17",
    i21: "d18",
    i22: "d19",
    i23: "d20",
    i24: "d21",
    i25: "d22",
    i26: "d23",
    i27: "d24",
    i28: "d25",
    i29: "d26",
    i30: "d27",
    i31: "d28",
    i32: "d29"
  };
  const jsonMSG = {
    datadate: "",
    symbol: "",
    lastprice: "",
    hmaDD: "",
    atr: "",
    atrX: "",
    ma21: "",
    ma13: "",
    ma8: "",
    ppSingle: "",
    ppFirst: "",
    ppSecond: "",
    stddevH: "",
    stddevL: "",
    consolDD: "",
    consolH: "",
    consolL: "",
    ppo: "",
    ppoH: "",
    rsi14: "",
    rsi5: "",
    cci50: "",
    cci14: "",
    ema34: "",
    sar: "",
    k: "",
    d: "",
    r: "",
    apo: "",
    sma10: "",
    bsi: "",
    bsima: "",
    indicatorCounter: {
      Bull: 0,
      Bear: 0,
      Neutral: 0
    },
    hmaHighAdder: "",
    hmaLowAdder: "",
    trendSummary: "",
    ppoSummary: "",
    cciTrend: "",
    cciSummary: "",
    bullRSISummary: "",
    bearRSISummary: "",
    RSI5Summary: "",
    SARSummary: "",
    APOSummary: "",
    sma10Summary: "",
    kSummary: "",
    dSummary: "",
    rSummary: "",
    bsiSummary: "",
    bsiMASummary: "",
    atrxSummary: "",
    indicatorSummary: "",
    confirmSummary: {
      Bull: 0,
      Bear: 0,
      Neutral: 0
    },
    disposition: "",
    timePeriod: ""
  };


  switch (timeframe) {
    case "monthly":
      completeMSG = setJSON(jsonMSG, monthlyDataID);
      completeMSG.timePeriod = "M";
      break;
    case "weekly":
      completeMSG = setJSON(jsonMSG, weeklyDataID);
      completeMSG.timePeriod = "W";
      break;
    case "daily":
      completeMSG = setJSON(jsonMSG, dailyDataID);
      completeMSG.timePeriod = "D";
      break;
  }

  completeMSG = hmaCalculation(completeMSG);
  console.log(1);
  completeMSG = summarizeTrend(completeMSG);
  console.log(2);
  completeMSG = summarizePPO(completeMSG);
  console.log(3);
  completeMSG = summarizeCCI(completeMSG);
  console.log(4);
  completeMSG = summarizeRSI(completeMSG);
  console.log(5);
  completeMSG = summarizeSAR(completeMSG);
  console.log(6);
  completeMSG = summarizeAPO(completeMSG);
  console.log(7);
  completeMSG = summarizeSMA10(completeMSG);
  console.log(8);
  completeMSG = summarizeStochastic(completeMSG);
  console.log(9);
  completeMSG = summarizeBSI(completeMSG);
  console.log(10);
  completeMSG = summarizeATRx(completeMSG);
  console.log(11);
  completeMSG = summarizeIndicators(completeMSG);
  console.log(12);
  completeMSG = summarizeCombinedAverages(completeMSG);
  console.log(13);
  completeMSG = summarizeWilliamR(completeMSG);
  console.log(14);
  completeMsg = strategyOne(completeMSG);
  console.log(15);
  //TODO: Must Return the CompleteMSG somewhere.

  console.table(completeMSG);
  return completeMSG;
}

function setJSON(msg, idSet) {

  msg.datadate = document.getElementById(idSet.i1).value;
  msg.symbol = document.getElementById(idSet.i2).value;
  msg.lastprice = document.getElementById(idSet.i3).value;
  msg.hmaDD = document.getElementById(idSet.i4).value;
  msg.atr = document.getElementById(idSet.i5).value;
  msg.atrX = document.getElementById(idSet.i6).value;
  msg.ma21 = document.getElementById(idSet.i7).value;
  msg.ma13 = document.getElementById(idSet.i8).value;
  msg.ma8 = document.getElementById(idSet.i9).value;
  msg.ppSingle = document.getElementById(idSet.i10).value;
  msg.ppFirst = document.getElementById(idSet.i11).value;
  msg.ppSecond = document.getElementById(idSet.i12).value;
  msg.stddevH = document.getElementById(idSet.i13).value;
  msg.stddevL = document.getElementById(idSet.i14).value;
  msg.consolDD = document.getElementById(idSet.i15).value;
  msg.consolH = document.getElementById(idSet.i16).value;
  msg.consolL = document.getElementById(idSet.i17).value;
  msg.ppo = document.getElementById(idSet.i18).value;
  msg.ppoH = document.getElementById(idSet.i19).value;
  msg.rsi14 = document.getElementById(idSet.i20).value;
  msg.rsi5 = document.getElementById(idSet.i21).value;
  msg.cci50 = document.getElementById(idSet.i22).value;
  msg.cci14 = document.getElementById(idSet.i23).value;
  msg.ema34 = document.getElementById(idSet.i24).value;
  msg.sar = document.getElementById(idSet.i25).value;
  msg.k = document.getElementById(idSet.i26).value;
  msg.d = document.getElementById(idSet.i27).value;
  msg.r = document.getElementById(idSet.i28).value;
  msg.apo = document.getElementById(idSet.i29).value;
  msg.sma10 = document.getElementById(idSet.i30).value;
  msg.bsi = document.getElementById(idSet.i31).value;
  msg.bsima = document.getElementById(idSet.i32).value;

  if (document.getElementById(idSet.i2).value == "test") {
    msg = jsonTestMSG;
  }
  if (document.getElementById(idSet.i2).value == "test2") {
    msg = jsonTest2MSG;
  }

  console.table(msg);
  return msg;
}
