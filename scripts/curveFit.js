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

export const getMaxSlope = (L, k, x0, D, xVals) => {
  const yVals = evalLogistic(L, k, x0, D, xVals);
  const midY = (L + D) / 2;
  let midXIdx = 0;
  let midX = null;
  const factor = k < 0 ? -1 : 1;
  while (midXIdx < xVals.length - 1 && yVals[midXIdx] * factor < midY) {
    midXIdx++;
  }
  if (yVals[midXIdx - 1] < midY && yVals[midXIdx] > midY) {
    midX = xVals[midXIdx];
  }

  return { slope: (L * k) / 4, ptX: midX, ptY: midY };
};

// evaluates a specific logistic function for a series of values for the independent variable
export const evalLogistic = (L, k, x0, D, xVals) => {
  return xVals.map((x) => L / (1 + Math.pow(Math.E, -1 * k * (x - x0))) + D);
};

export const fitLogistic = (xVals, yVals) => {
  let kStep = 0.1;
  let LStep = 10000;
  let x0Step = 10;
  let DStep = 10000;
  let kGuess = 0;
  let LGuess = 1000;
  let x0Guess = 0;
  let DGuess = 1000;

  let minSteps = { k: 0.0001, x0: 0.001, L: 10, D: 1 };
  let threshold = -0.0001;

  while (true) {
    const ls0 = lsErrorCalc(
      yVals,
      evalLogistic(LGuess, kGuess, x0Guess, DGuess, xVals)
    );
    const lsDeltas = new Array(81);
    const lsCombos = new Array(81);
    let i = 0;
    for (let ki = kGuess - kStep, kIdx = 0; kIdx < 3; ki += kStep, kIdx++) {
      for (let Li = LGuess - LStep, LIdx = 0; LIdx < 3; Li += LStep, LIdx++) {
        for (
          let x0i = x0Guess - x0Step, x0Idx = 0;
          x0Idx < 3;
          x0i += x0Step, x0Idx++
        ) {
          for (
            let Di = DGuess - DStep, DIdx = 0;
            DIdx < 3;
            Di += DStep, DIdx++
          ) {
            const lsTrial = lsErrorCalc(
              yVals,
              evalLogistic(Li, ki, x0i, Di, xVals)
            );
            lsDeltas[i] = lsTrial - ls0;
            lsCombos[i] = kIdx * 1000 + LIdx * 100 + x0Idx * 10 + DIdx;
            i++;
          }
        }
      }
    }
    const minDelta = Math.min(...lsDeltas);
    const minCombo = lsCombos[lsDeltas.indexOf(minDelta)];

    kGuess += kStep * (Math.floor(minCombo / 1000) - 1);
    LGuess += LStep * (Math.floor((minCombo % 1000) / 100) - 1);
    x0Guess += x0Step * (Math.floor(minCombo % 100) / 10 - 1);
    DGuess += DStep * (Math.floor(minCombo % 10) - 1);

    if (minDelta > threshold) {
      if (
        kStep === minSteps.k &&
        LStep === minSteps.L &&
        x0Step === minSteps.x0 &&
        DStep === minSteps.D
      ) {
        break;
      }
      if (kStep > minSteps.k) kStep /= 10;
      if (LStep > minSteps.L) LStep /= 10;
      if (x0Step > minSteps.x0) x0Step /= 10;
      if (DStep > minSteps.D) DStep /= 10;
    }
  }
  return { k: kGuess, L: LGuess, x0: x0Guess, D: DGuess };
};

export const fitLogisticRangeFixed = (xVals, yVals, minBound, maxBound) => {
  let kStep = 1;
  let x0Step = 1;
  let kGuess = 0;
  let x0Guess = 0;

  let minSteps = { k: 0.0001, x0: 0.001 };
  let threshold = -0.0001;

  while (true) {
    const ls0 = lsErrorCalc(
      yVals,
      evalLogistic(maxBound, kGuess, x0Guess, minBound, xVals)
    );
    const lsDeltas = new Array(9);
    const lsCombos = new Array(9);
    let i = 0;
    for (let ki = kGuess - kStep, kIdx = 0; kIdx < 3; ki += kStep, kIdx++) {
      for (
        let x0i = x0Guess - x0Step, x0Idx = 0;
        x0Idx < 3;
        x0i += x0Step, x0Idx++
      ) {
        const lsTrial = lsErrorCalc(
          yVals,
          evalLogistic(minBound, ki, x0i, maxBound, xVals)
        );
        lsDeltas[i] = lsTrial - ls0;
        lsCombos[i] = kIdx * 10 + x0Idx;
        i++;
      }
    }
    const minDelta = Math.min(...lsDeltas);
    const minCombo = lsCombos[lsDeltas.indexOf(minDelta)];

    kGuess += kStep * (Math.floor(minCombo / 10) - 1);
    x0Guess += x0Step * (Math.floor(minCombo % 10) - 1);

    if (minDelta > threshold) {
      if (kStep === minSteps.k && x0Step === minSteps.x0) {
        break;
      }
      if (kStep > minSteps.k) kStep /= 10;
      if (x0Step > minSteps.x0) x0Step /= 10;
    }
  }
  return { k: kGuess, L: maxBound, x0: x0Guess, D: minBound };
};
