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

// evaluates a specific logistic function for a series of values for the independent variable
export const evalLogistic = (L, k, x0, xVals) => {
  return xVals.map((x) => L / (1 + Math.pow(Math.E, -1 * k * (x - x0))));
};

export const fitLogistic = (xVals, yVals) => {
  let kStep = 0.1;
  let LStep = 10000;
  let x0Step = 10;
  let kGuess = 0;
  let LGuess = 1000;
  let x0Guess = 0;

  let minSteps = { k: 0.0001, x0: 0.001, L: 10 };
  let threshold = -0.0001;

  while (true) {
    const ls0 = lsErrorCalc(
      yVals,
      evalLogistic(LGuess, kGuess, x0Guess, xVals)
    );
    const lsDeltas = new Array(27);
    const lsCombos = new Array(27);
    let i = 0;
    for (let ki = kGuess - kStep, kIdx = 0; kIdx < 3; ki += kStep, kIdx++) {
      for (let Li = LGuess - LStep, LIdx = 0; LIdx < 3; Li += LStep, LIdx++) {
        for (
          let x0i = x0Guess - x0Step, x0Idx = 0;
          x0Idx < 3;
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

    if (minDelta > threshold) {
      if (
        kStep === minSteps.k &&
        LStep === minSteps.L &&
        x0Step === minSteps.x0
      ) {
        break;
      }
      if (kStep > minSteps.k) kStep /= 10;
      if (LStep > minSteps.L) LStep /= 10;
      if (x0Step > minSteps.x0) x0Step /= 10;
    }
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
    863, 797, 801, 822, 787, 791, 831, 816, 803, 814, 811, 748, 775, 771, 743,
    752, 740, 739, 727, 716, 725, 726, 710, 682, 729, 688, 685, 693, 679, 681,
    665, 656, 656, 664, 646, 662, 626, 641, 645, 644, 648, 636, 634, 607, 621,
    604, 618, 617, 616, 618, 625, 624, 623, 597, 601, 590, 602, 609, 588, 579,
    571, 593, 588, 584, 596, 576, 612, 577, 593, 584, 591, 564, 569, 593, 554,
    557, 577, 549, 570, 568,
  ];
  const coeffs = fitLogistic(xVals, yVals);
  console.log(coeffs);
  // const yPreds = evalLogistic(10, 0.5, 10, xVals);
  for (let i = 0; i < xVals.length; i++) {
    process.stdout.write(`(${xVals[i]}, ${yVals[i]}), `);
  }
}
