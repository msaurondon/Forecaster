// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © LonesomeTheBlue
// Target equations added by PriceProphet

//@version=4
study("Parabolic SAR with Target", "SAR", overlay = true)

start = input(title = "Start", defval = 0.02, step = 0.001)
increment = input(title = "Increment", defval = 0.02, step = 0.001)
maximum = input(title = "Max Value", defval = 0.2, step = 0.01)
putlabel = input(title = "Put Labels", defval = true)

int trend = 0
float sar = 0.0
float ep = 0.0
float af = 0.0
float trendMA = 0.0
float diff1 = 0.0
float diff2 = 0.0
float diff3 = 0.0
float target = 0.0
float target2 = 0.0
float gap = 0.0
float highestHigh = 0.0
float lowestLow = 0.0
float rangePercent = 0.0
float gain = 0.0
bool bullConsolidation = false
bool bearConsolidation = false
string targetText = ''
bool debug = true
string mode = ''

truncate(number, decimals) =>
    factor = pow(10, decimals)
    int(number * factor) / factor

trend := nz(trend[1])
ep := nz(ep[1])
af :=nz(af[1])
sar := sar[1]
trendMA := ema(hl2,21)

if trend == 0 and not na(high[1])
    trend := high >= high[1] or low >= low[1] ? 1 : -1
    sar := trend > 0 ? low[1] : high[1]
    ep := trend > 0 ? high[1] : low[1]
    af := start
else
    nextsar = sar
    if trend > 0 // bull trend
        if high[1] > ep
            ep := high[1]
            af := min(maximum, af + increment)

        nextsar := sar + af * (ep - sar)
        nextsar := min(min(low[1], low[2]), nextsar)

        //Reversal
        if nextsar > low
            trend := -1
            nextsar := ep
            ep := low
            af := start
    else // bear trend
        if low[1] < ep
            ep := low[1]
            af := min(maximum, af + increment)

        nextsar := sar + af * (ep - sar)
        nextsar := max(max(high[1], high[2]), nextsar)

        //Reversal
        if nextsar < high
            trend := 1
            nextsar := ep
            ep := high
            af := start
    sar := nextsar



plot(sar, title = "Parabolic SAR", color = trend > 0 ? color.green : color.lime, linewidth = 2, style = plot.style_circles)
plot(trendMA, title="Trend MA", color = color.white)

alertcondition(change(trend) > 0, title='PSAR Trend UP', message='PSAR Trend UP')
alertcondition(change(trend) < 0, title='PSAR Trend DOWN', message='PSAR Trend DOWN')

highestHigh := highest(high,10)
lowestLow := lowest(low,10)

bullConsolidation := (highestHigh[1] >= close[0]  and close[0] >= lowestLow[1]) ? true : false
bearConsolidation := (highestHigh[1] >= close[0]  and close[0] >= lowestLow[1]) ? true : false
rangePercent := (high[0]-close[0])/(high[0] - low[0])

if change(trend) > 0
    if close[0] > trendMA[0] and close[1] > trendMA[1] // (1) close today and yesterday are both above the trend line
        diff1 := high[0] - low[1] // range for bullish calculation
        gap := low[0] - high[1]
        mode := mode + '1'
        if not bullConsolidation
            mode := mode + '-'
            if high[0] > high[1] and low[0] > low[1] // (a)high now > high yesterday and low now > low yesterday and not in consol
                if close[0] > high[1] // (b)close greater than yesterdays high
                    if rangePercent < .5
                        target := gap < 0 ? close[0] + diff1 : close[0] + (diff1 - gap)
                    else
                        target := close[0] - ((diff1 * .382) - gap)
                        target2 := target + (diff1 * 1.618)
                if close[0] <= high[1] and close[0] >= close[1] //(1) close less than yesterdays high and greater than yesterdays close
                    if rangePercent > .5 // heading down before up because closed in lower 50% of own bar
                        target := close[0] - (diff1 * .382)
                        target2 := target + diff1
                    else
                        target := close[0] + diff1
                if close[0] <= high[1] and close[0] <= close[1] // (2)close lower than yesterdays high and close
                    if rangePercent > .5
                        target := close[0] - (diff1 * .618)
                        target2 := close + diff1
                    else
                        target := close[0] + diff1
            if high[0] > high[1] and low[0] < low[1] // engulfing bar
                if close[0] < high[1] and close[0] > low[1] // close between yesterdays values
                    target := close[0] + (diff1 * .618)
                if close[0] < low[1]
                    target := close[0] - diff1
                if close[0] > high[1]
                    target := close[0] + (diff1 * 1.618)

        if bullConsolidation
            mode := mode + '+'
            if high[0] > high[1] and low[0] > low[1]// (a) high now > high yesterday and low now > low yesterday and in consol
                mode := mode + 'a'
                if close[0] > high[1] // (i)close greater than yesterdays high
                    mode := mode + 'i'
                    if rangePercent < .5
                        target := gap < 0 ? close[0] + (diff1 * .618) : close[0] + ((diff1 * .618) - gap)
                    else
                        target := close[0] - ((diff1 * .382) - gap)
                        target2 := target + (diff1 * .618)
                if close[0] <= high[1] and close[0] >= close[1] // (ii) close less than yesterdays high and greater than yesterdays close
                    mode := mode + 'ii'
                    if rangePercent > .5 // heading down before up because closed in lower 50% of own bar
                        target := close[0] - (diff1 * .382)
                        target2 := target + diff1
                    else
                        target := close[0] + diff1
                if close[0] <= high[1] and close[0] <= close[1] // (iii) close lower than yesterdays high and close
                    mode := mode + 'iii'
                    if rangePercent > .5
                        target := close[0] - (diff1 * .618)
                        target2 := close + diff1
                    else
                        target := close[0] + diff1
            if high[0] > high[1] and low[0] < low[1] // (b) engulfing bar
                mode := mode + 'b'
                if close[0] < high[1] and close[0] > low[1] // close between yesterdays values
                    target := close[0] + (diff1 * .618)
                if close[0] < low[1]
                    target := close[0] - diff1
                if close[0] > high[1]
                    target := close[0] + (diff1 * 1.618)

    if close[0] < trendMA[0] and close[1] > trendMA[1]  //  (2) transition bars - yesterday closed above trend, today has closed below trend
        diff1 := high[0] - low[1] // range for bullish calculation
        gap := low[0] - high[1]
        mode := mode + '2'
        if high[0] > high[1] and low[0] < low[1] // engulfing bar
            if close[0] < high[1] and close[0] > low[1] // close between yesterdays values
                if close[0] < close[1]
                    target := close[0] - (diff1 * .618)
                else
                    target := close[0] + (diff1 * .618)
            if close[0] < low[1]
                target := close[0] - (diff1 * 1.618)
            if close[0] > high[1]
                target := close[0] + (diff1 * .618)

    if close[0] > trendMA[0] and close[1] < trendMA[1] // (3) close today is above and yesterday is below trend line
        diff1 := high[0] - low[1] // range for bullish calculation
        gap := low[0] - high[1]
        mode := mode + '3'
        if not bullConsolidation
            if high[0] > high[1] and low[0] > low[1] // high now > high yesterday and low now > low yesterday and not in consol
                if close[0] > high[1] // close greater than yesterdays high
                    if rangePercent < .5
                        target := gap < 0 ? close[0] + diff1 : close[0] + (diff1 - gap)
                    else
                        target := close[0] - ((diff1 * .382) - gap)
                        target2 := target + (diff1 * 1.618)
                if close[0] <= high[1] and close[0] >= close[1] // close less than yesterdays high and greater than yesterdays close
                    if rangePercent > .5 // heading down before up because closed in lower 50% of own bar
                        target := close[0] - (diff1 * .382)
                        target2 := target + diff1
                    else
                        target := close[0] + diff1
                if close[0] <= high[1] and close[0] <= close[1] // close lower than yesterdays high and close
                    if rangePercent > .5
                        target := close[0] - (diff1 * .618)
                        target2 := close + diff1
                    else
                        target := close[0] + diff1
            if high[0] > high[1] and low[0] < low[1] // engulfing bar
                if close[0] < high[1] and close[0] > low[1] // close between yesterdays values
                    target := close[0] + (diff1 * .618)
                if close[0] < low[1]
                    target := close[0] - diff1
                if close[0] > high[1]
                    target := close[0] + (diff1 * 1.618)

        if bullConsolidation
            if high[0] > high[1] and low[0] > low[1]// high now > high yesterday and low now > low yesterday and in consol
                if close[0] > high[1] // close greater than yesterdays high
                    if rangePercent < .5
                        target := gap < 0 ? close[0] + (diff1 * .618) : close[0] + ((diff1 *.618) - gap)
                    else
                        target := close[0] - ((diff1 * .382) - gap)
                        target2 := target + (diff1 * .618)
                if close[0] <= high[1] and close[0] >= close[1] // close less than yesterdays high and greater than yesterdays close
                    if rangePercent > .5 // heading down before up because closed in lower 50% of own bar
                        target := close[0] - (diff1 * .382)
                        target2 := target + diff1
                    else
                        target := close[0] + diff1
                if close[0] <= high[1] and close[0] <= close[1] // close lower than yesterdays high and close
                    if rangePercent > .5
                        target := close[0] - (diff1 * .618)
                        target2 := close + diff1
                    else
                        target := close[0] + diff1
            if high[0] > high[1] and low[0] < low[1] // engulfing bar
                if close[0] < high[1] and close[0] > low[1] // close between yesterdays values
                    target := close[0] + (diff1 * .618)
                if close[0] < low[1]
                    target := close[0] - diff1
                if close[0] > high[1]
                    target := close[0] + (diff1 * 1.618)

    if close[0] < trendMA[0] and close[1] < trendMA[1] // (4) close today and yesterday are both below the trend line
        diff1 := high[0] - low[1] // range for bullish calculation
        gap := low[0] - high[1]
        mode := mode + '4'
        if not bullConsolidation
            mode := mode + '-'
            if high[0] > high[1] and low[0] > low[1] // (a)high now > high yesterday and low now > low yesterday and not in consol
                mode := mode + 'a'
                if close[0] > high[1] // (i) close greater than yesterdays high
                    mode := mode + 'i'
                    if rangePercent < .5
                        target := gap < 0 ? close[0] + diff1 : close[0] + (diff1 - gap)
                    else
                        target := close[0] - ((diff1 * .382) - gap)
                        target2 := target + (diff1 * 1.618)
                if close[0] <= high[1] and close[0] >= close[1] // (ii)close less than yesterdays high and greater than yesterdays close
                    mode := mode + 'ii'
                    if rangePercent > .5 // heading down before up because closed in lower 50% of own bar
                        target := close[0] - (diff1 * .382)
                        target2 := target + diff1
                    else
                        target := close[0] + diff1
                if close[0] <= high[1] and close[0] <= close[1] // (iii) close lower than yesterdays high and close
                    mode := mode + 'iii'
                    if rangePercent > .5
                        target := close[0] - (diff1 * .618)
                        target2 := close + diff1
                    else
                        target := close[0] + diff1
            if high[0] > high[1] and low[0] < low[1] // (b) engulfing bar
                mode := mode + 'b'
                if close[0] < high[1] and close[0] > low[1] // close between yesterdays values
                    target := close[0] + (diff1 * .618)
                if close[0] < low[1]
                    target := close[0] - diff1
                if close[0] > high[1]
                    target := close[0] + (diff1 * 1.618)

        if bullConsolidation
            mode := mode + '+'
            if high[0] > high[1] and low[0] > low[1]// (a) high now > high yesterday and low now > low yesterday and in consol
                mode := mode + 'a'
                if close[0] > high[1] // (i) close greater than yesterdays high
                    mode := mode + 'i'
                    if rangePercent < .5
                        target := gap < 0 ? close[0] + (diff1 * .618) : close[0] + ((diff1 * .618) - gap)
                    else
                        target := close[0] - ((diff1 * .382) - gap)
                        target2 := target + (diff1 * .618)
                if close[0] <= high[1] and close[0] >= close[1] // (ii) close less than yesterdays high and greater than yesterdays close
                    mode := mode + 'ii'
                    if rangePercent > .5 // heading down before up because closed in lower 50% of own bar
                        target := close[0] - (diff1 * .382)
                        target2 := target + diff1
                    else
                        target := close[0] + diff1
                if close[0] <= high[1] and close[0] <= close[1] // (iii) close lower than yesterdays high and close
                    mode := mode + 'iii'
                    if rangePercent > .5
                        target := close[0] - (diff1 * .618)
                        target2 := close + diff1
                    else
                        target := close[0] + diff1
            if high[0] > high[1] and low[0] < low[1] // (b) engulfing bar
                mode := mode + 'b'
                if close[0] < high[1] and close[0] > low[1] // close between yesterdays values
                    target := close[0] + (diff1 * .618)
                if close[0] < low[1]
                    target := close[0] - diff1
                if close[0] > high[1]
                    target := close[0] + (diff1 * 1.618)

    if close[0] > trendMA[0] and close[1] < trendMA[1] // (5) transition - close today above MA, close yesterday below MA
        diff1 := high[0] - low[1] // range for bullish calculation
        gap := low[0] - high[1]
        mode := mode + '5'
        if bullConsolidation
            mode := mode + '+'
            if close[0] <= high[1] and close[0] >= low[1]
                if rangePercent < .5
                    target := close[0] + (diff1 * .618)
                else
                    target := close[0] - (diff1 * .382)
                    target2 := target + (diff1 * .618)
        if not bullConsolidation
            mode := mode + '-'



if change(trend) < 0
    if close[0] > trendMA[0] and close[1] > trendMA[1] // (1)close today and yesterday are both above the trend line
        diff1 := high[1] - low[0] // range for bullish calculation
        gap := low[1] - high[0]
        mode := mode + '1'
        if not bearConsolidation
            mode := mode + '-'
            if high[1] > high[0] and low[1] > low[0] // (a) high and low yesterday is lower than today
                mode := mode + 'a'
                if close[0] > low[1] and high[1] > close[0] // between the high and low
                    if rangePercent > .5
                        target := close[0] - (diff1 * 1.618)
                    else
                        target := close[0] - (diff1)
                if close[0] < low[1]
                    target := close[0] - (diff1 * .618)
        if bearConsolidation
            mode := mode + '+'
            if high[1] > high[0] and low[1] > low[0] // (a) high and low yesterday is lower than today
                mode := mode + 'a'
                if close[0] > low[1] and high[1] > close[0] // between the high and low
                    mode := mode + 'i'
                    if rangePercent > .5
                        target := close[0] - (diff1 * .618)
                    else
                        target := close[0] - (diff1 * .382)
                        target2 := target + diff1
                if close[0] < low[1]
                    mode := mode + 'ii'
                    target := close[0] - (diff1 * .382)
            if high[0] > high[1] and low[0] < low[1] // (b)engulfing bar
                mode := mode + 'b'
                if close[0] < high[1] and close[0] > low[1] // close between yesterdays values
                    target := close[0] + (diff1 * .618)
                if close[0] < low[1]
                    target := close[0] - diff1
                if close[0] > high[1]
                    target := close[0] + (diff1 * 1.618)

    if close[0] < trendMA[0] and close[1] > trendMA[1] // (2) transition bars yesterday closed above trend and today below
        diff1 := high[1] - low[0] // range for bullish calculation
        gap := low[1] - high[0]
        mode := mode + '2'
        if high[0] >= high[1] and low[0] <= low[1] // (a) engfulfing bar
            mode := mode + 'a'
            if close[0] < high[1] and close[0] > low[1] // close between yesterdays value
                if close[0] < close[1] // consolidation with trend
                    target := close[0] - (diff1 * .618)
                if close[0] > close[1] // consolidation against trend
                    target := close[0] + (diff1 * .382)
            if close[0] < low[1]
                target := close[0] - (diff1 * 1.618)
            if close[0] > high[1]
                target := close[0] + (diff1 * .618)
        if high[1] > high[0] and low[1] > low[0] // (b) transition
            mode := mode + 'b'
            if not bearConsolidation
                target := close[0] - (diff1 * .618)
            if bearConsolidation
                target := close[0] - (diff1 * .382)
    if close[0] < trendMA[0] and close[1] < trendMA[1] // (3) both are below trend MA
        diff1 := high[1] - low[0] // range for bearish calculation
        gap := low[1] - high[0]
        mode := mode + '3'
        if not bearConsolidation
            mode := mode + '-'
            target := close[0] - (diff1 * 1.618)
        if bearConsolidation
            mode := mode + '+'
            if close[0] < low[1]
                target := close[0] - (diff1 * .618)
            if close[0] >= low[1] and close[0] <= high[1] // double consolidation
                if rangePercent < .5
                    target := close[0] + (diff1 * .382)
                    target2 := target - (diff1 * .618)





if target2 > 0
    gain := ((target2/target) -1) * 100
    gain := truncate(gain,2)
    target := truncate(target,2)
    target2 := truncate(target2,2)
    targetText := 'Price Target\n(1) ~' + tostring(target) + '\n(2) ~' + tostring(target2) + '\n~' + tostring(gain) + '%'
    targetText := debug ? targetText + '\ndebug ' + mode : targetText
else
    gain := ((target/close) -1) * 100
    gain := truncate(gain,2)
    target := truncate(target,2)
    targetText := 'Price Target:\n~' + tostring(target) + '\n~' + tostring(gain) + '%'
    targetText := debug ? targetText + '\ndebug ' + mode: targetText

if change(trend) > 0 and putlabel
    colorPicker = target > close[0] ? color.lime : color.yellow
    label.new(bar_index, sar, color = colorPicker, style=label.style_labelup, size = size.normal, text=targetText)
if change(trend) < 0 and putlabel
    colorPicker = target > close[0] ? color.yellow : color.red
    label.new(bar_index, sar, color = colorPicker, style=label.style_labeldown, size = size.normal, text=targetText)
