const lsErrorCalc = (yVals, yPreds) => {
  if (yVals.length !== yPreds.length) {
    throw "Data and predictions must have the same number of values!";
  }
  let errorSum = 0;
  for (let i = 0; i < yVals.length; i++) {
    errorSum += Math.pow(yVals[i] - yPreds[i], 2);
  }
  return errorSum;
};

const evalLogistic = (L, k, x0, xVals) => {
  return xVals.map((x) => L / (1 + Math.pow(Math.E, -1 * k * (x - x0))));
};

const fitLogistic = (xVals, yVals) => {
  let kStep = 0.1;
  let LStep = 10000;
  let x0Step = 10;
  let kGuess = 0;
  let LGuess = 1000;
  let x0Guess = 0;

  minStep = 0.0001;
  threshold = -0.0001;

  let ctr = 1;
  while (true) {
    const ls0 = lsErrorCalc(
      yVals,
      evalLogistic(LGuess, kGuess, x0Guess, xVals)
    );
    const lsDeltas = new Array(27);
    const lsCombos = new Array(27);
    let i = 0;
    for (
      let ki = kGuess - kStep, kIdx = 0;
      ki <= kGuess + kStep;
      ki += kStep, kIdx++
    ) {
      for (
        let Li = LGuess - LStep, LIdx = 0;
        Li <= LGuess + LStep;
        Li += LStep, LIdx++
      ) {
        for (
          let x0i = x0Guess - x0Step, x0Idx = 0;
          x0i <= x0Guess + x0Step;
          x0i += x0Step, x0Idx++
        ) {
          const lsTrial = lsErrorCalc(yVals, evalLogistic(Li, ki, x0i, xVals));
          lsDeltas[i] = lsTrial - ls0;
          lsCombos[i] = kIdx * 100 + LIdx * 10 + x0Idx;
          i++;
        }
      }
    }
    const minDelta = Math.min(...lsDeltas);
    const minCombo = lsCombos[lsDeltas.indexOf(minDelta)];

    kGuess += kStep * (Math.floor(minCombo / 100) - 1);
    LGuess += LStep * (Math.floor((minCombo % 100) / 10) - 1);
    x0Guess += x0Step * (Math.floor(minCombo % 10) - 1);

    console.log(ctr, minDelta);

    if (minDelta > threshold) {
      if (kStep === minStep && LStep === minStep && x0Step === minStep) break;
      if (kStep > minStep) kStep /= 10;
      if (LStep > minStep) LStep /= 10;
      if (x0Step > minStep) x0Step /= 10;
    }
    ctr++;
  }
  return { k: kGuess, L: LGuess, x0: x0Guess };
};

if (require.main === module) {
  const xVals = [
    0, 8.011, 16.026, 24.033, 32.048, 40.053, 48.061, 56.062, 64.08, 72.094,
    80.105, 88.127, 96.132, 104.134, 112.145, 120.16, 128.162, 136.174, 144.188,
    152.192, 160.199, 168.212, 176.219, 184.221, 192.233, 200.247, 208.248,
    216.255, 224.259, 232.258, 240.261, 248.274, 256.278, 264.291, 272.308,
    280.31, 288.322, 296.329, 304.33, 312.332, 320.333, 328.353, 336.368,
    344.37, 352.385, 360.387, 368.389, 376.39, 384.406, 392.405, 400.407,
    408.413, 416.427, 424.442, 432.448, 440.453, 448.469, 456.484, 464.488,
    472.489, 480.502, 488.505, 496.511, 504.535, 512.552, 520.557, 528.558,
    536.561, 544.564, 552.579, 560.583, 568.599, 576.607, 584.613, 592.614,
    600.617, 608.634, 616.637, 624.654, 632.659,
  ];
  const yVals = [
    3100, 4550, 6074, 7892, 9637, 11422, 12974, 14368, 15970, 17541, 19409,
    21115, 23052, 24698, 26197, 27635, 29225, 30663, 31808, 33344, 34584, 35477,
    36630, 37889, 38376, 39593, 39812, 40531, 41055, 41611, 42063, 42362, 43230,
    43197, 44056, 43790, 44306, 44602, 44722, 44771, 44635, 44898, 45134, 45135,
    44794, 45136, 45192, 45560, 45760, 45629, 45884, 45634, 45948, 45545, 45368,
    45270, 45391, 45628, 45641, 45581, 45566, 45504, 45448, 45637, 45445, 45508,
    45326, 45711, 46041, 45764, 45876, 45681, 45355, 45448, 45567, 45614, 45711,
    45670, 45628, 45426,
  ];
  const coeffs = fitLogistic(xVals, yVals);
  // const yPreds = evalLogistic(10, 0.5, 10, xVals);
  // for (let i = 0; i < xVals.length; i++) {
  //   process.stdout.write(`(${xVals[i]}, ${yVals[i]}), `);
  // }
}
