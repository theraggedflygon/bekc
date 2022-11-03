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

if (require.main === module) {
  const xVals = Array.from(Array(25).keys());
  const yVals = evalLogistic(10, 0.5, 10, xVals);
  for (let i = 0; i < xVals.length; i++) {
    process.stdout.write(`(${xVals[i]}, ${yVals[i]}), `);
  }
}
