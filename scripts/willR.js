function summarizeWilliamR(msg) {
  var r = msg.r;
  var attitude = 'Neutral';
  msg.indicatorCounter.Neutral++;
  msg.confirmSummary.Neutral++;
  if (r > -37) {
    attitude = 'Bull';
    msg.indicatorCounter.Bull++;
    msg.indicatorCounter.Neutral--;
    msg.confirmSummary.Bull++;
    msg.confirmSummary.Neutral--;
  };
  if (r < -63) {
    attitude = 'Bear';
    msg.indicatorCounter.Bear++;
    msg.indicatorCounter.Neutral--;
    msg.confirmSummary.Bear++;
    msg.confirmSummary.Neutral--;
  };

  msg.rSummary = attitude;
  return msg;
}
