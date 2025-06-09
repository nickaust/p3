function coinCombo(amount) {
  const coins = [100, 50, 25, 10, 5, 1]; // Order matters for combination generation
  const combinations = [];

  // Recursive helper to find all combinations
  function findCombos(remaining, index, current) {
    if (remaining === 0) {
      combinations.push({
        pennies: current[1],
        nickels: current[5],
        dimes: current[10],
        quarters: current[25],
        halves: current[50],
        dollars: current[100],
      });
      return;
    }

    if (index >= coins.length) return;

    const coin = coins[index];
    const max = Math.floor(remaining / coin);

    for (let i = max; i >= 0; i--) {
      findCombos(remaining - i * coin, index + 1, { ...current, [coin]: i });
    }
  }

  if (typeof amount === "number" && amount >= 0) {
    findCombos(amount, 0, { 1: 0, 5: 0, 10: 0, 25: 0, 50: 0, 100: 0 });
  }

  return {
    amount: amount,
    combinations: combinations,
    totalCombinations: combinations.length,
  };
}

function coinValue(coinCounts) {
  const {
    pennies = 0,
    nickels = 0,
    dimes = 0,
    quarters = 0,
    halves = 0,
    dollars = 0,
  } = coinCounts || {};

  const totalCents =
    Number(pennies) * 1 +
    Number(nickels) * 5 +
    Number(dimes) * 10 +
    Number(quarters) * 25 +
    Number(halves) * 50 +
    Number(dollars) * 100;

  return {
    coins: { pennies, nickels, dimes, quarters, halves, dollars },
    totalCents: totalCents,
    totalDollars: Number((totalCents / 100).toFixed(2)),
  };
}

// ----------------------------
// Manual Test Cases
// ----------------------------
if (require.main === module) {
  console.log("\n===== Manual Tests for coinCombo() =====");
  const testCombo1 = coinCombo(5);
  console.log(`Test 1 - coinCombo(5)`);
  console.log(
    `Expected combinations > 0, Actual: ${testCombo1.totalCombinations}`
  );
  console.log("Sample:", testCombo1.combinations.slice(0, 3));

  const testCombo2 = coinCombo(0);
  console.log(`\nTest 2 - coinCombo(0)`);
  console.log(`Expected: 1 combination with all zeros`);
  console.log("Actual:", testCombo2.combinations);

  const testCombo3 = coinCombo(-5);
  console.log(`\nTest 3 - coinCombo(-5)`);
  console.log(`Expected: 0 combinations`);
  console.log("Actual:", testCombo3.totalCombinations);

  console.log("\n===== Manual Tests for coinValue() =====");
  const testValue1 = coinValue({
    pennies: 4,
    nickels: 1,
    dimes: 2,
    quarters: 1,
    halves: 0,
    dollars: 1,
  });
  console.log(`Test 1 - coinValue({4p,1n,2d,1q,0h,1$})`);
  console.log(`Expected cents: 4 + 5 + 20 + 25 + 0 + 100 = 154`);
  console.log(
    "Actual:",
    testValue1.totalCents,
    `($${testValue1.totalDollars})`
  );

  const testValue2 = coinValue({});
  console.log(`\nTest 2 - coinValue({})`);
  console.log(`Expected: 0 cents`);
  console.log(
    "Actual:",
    testValue2.totalCents,
    `($${testValue2.totalDollars})`
  );

  const testValue3 = coinValue({ pennies: "10", nickels: "2", dollars: "1" });
  console.log(`\nTest 3 - coinValue(string inputs)`);
  console.log(`Expected: 10 + 10 + 100 = 120`);
  console.log(
    "Actual:",
    testValue3.totalCents,
    `($${testValue3.totalDollars})`
  );
}

module.exports = { coinCombo, coinValue };
