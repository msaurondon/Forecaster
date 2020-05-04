function summarizePPO(msg) {
  var bulls = 0;
  var bears = 0;
  var summary = 0;

  if (msg.ppo > 0.0) bulls = bulls + 3;
  if (msg.ppoH > 0.0) bulls = bulls + 2;
  summary = bulls + bears;
  //TDOD:  Some refinement can be done to the PPO rules.  Good for the moment.

  switch (summary) {
    case 5:
      msg.ppoSummary = "Bullish trend present";
      msg.indicatorCounter.Bull++;
      break;
    case 3:
      msg.ppoSummary =
        "Bullish trend with profit taking/consolidation happening/Directional reversal";
      msg.indicatorCounter.Neutral++;
      break;
    case 2:
      msg.ppoSummary =
        "Bearish trend with profit taking/consolidation happening/Directional reversal";
      msg.indicatorCounter.Neutral++;
      break;
    case 0:
      msg.ppoSummary = "Bearish trend present";
      msg.indicatorCounter.Bear++;
      break;
  }
  console.log("ppo:" + summary);
  return msg;
}
