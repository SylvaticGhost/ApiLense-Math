import { NumericStatAnalizer } from './../numericStatAnalizer.ts';

Deno.test('getMin returns NaN for empty array', () => {
  const stat = new NumericStatAnalizer([]);
  if (!Number.isNaN(stat.getMin())) throw new Error('Expected NaN');
});

Deno.test('getMin returns minimum for positive numbers', () => {
  const stat = new NumericStatAnalizer([3, 1, 4, 2]);
  if (stat.getMin() !== 1) throw new Error('Expected 1');
});

Deno.test('getMin returns minimum for negative numbers', () => {
  const stat = new NumericStatAnalizer([-5, -2, -10]);
  if (stat.getMin() !== -10) throw new Error('Expected -10');
});

Deno.test('getMin returns minimum for mixed numbers', () => {
  const stat = new NumericStatAnalizer([-1, 0, 1]);
  if (stat.getMin() !== -1) throw new Error('Expected -1');
});

Deno.test('getMax returns NaN for empty array', () => {
  const stat = new NumericStatAnalizer([]);
  if (!Number.isNaN(stat.getMax())) throw new Error('Expected NaN');
});

Deno.test('getMax returns maximum for positive numbers', () => {
  const stat = new NumericStatAnalizer([3, 1, 4, 2]);
  if (stat.getMax() !== 4) throw new Error('Expected 4');
});

Deno.test('getMax returns maximum for negative numbers', () => {
  const stat = new NumericStatAnalizer([-5, -2, -10]);
  if (stat.getMax() !== -2) throw new Error('Expected -2');
});

Deno.test('getMax returns maximum for mixed numbers', () => {
  const stat = new NumericStatAnalizer([-1, 0, 1]);
  if (stat.getMax() !== 1) throw new Error('Expected 1');
});

Deno.test('getAverage returns average for numbers', () => {
  const stat = new NumericStatAnalizer([1, 2, 3, 4]);
  if (stat.getAverage() !== 2.5) throw new Error('Expected 2.5');
});

Deno.test('getAverage returns NaN for empty array', () => {
  const stat = new NumericStatAnalizer([]);
  if (!Number.isNaN(stat.getAverage())) throw new Error('Expected NaN');
});

Deno.test('getAverage returns correct average for single element', () => {
  const stat = new NumericStatAnalizer([42]);
  if (stat.getAverage() !== 42) throw new Error('Expected 42');
});

Deno.test('getPercentile returns correct percentiles', () => {
  const stat = new NumericStatAnalizer([1, 2, 3, 4, 5]);
  if (stat.getPercentile(0) !== 1) throw new Error('Expected 1');
  if (stat.getPercentile(100) !== 5) throw new Error('Expected 5');
  if (stat.getPercentile(50) !== 3) throw new Error('Expected 3');
  if (stat.getPercentile(25) !== 2) throw new Error('Expected 2');
  if (stat.getPercentile(75) !== 4) throw new Error('Expected 4');
});

Deno.test('getPercentile returns NaN for empty array', () => {
  const stat = new NumericStatAnalizer([]);
  if (!Number.isNaN(stat.getPercentile(50))) throw new Error('Expected NaN');
});

Deno.test('getMedian returns median for odd length', () => {
  const stat = new NumericStatAnalizer([1, 3, 2]);
  if (stat.getMedian() !== 2) throw new Error('Expected 2');
});

Deno.test('getMedian returns median for even length', () => {
  const stat = new NumericStatAnalizer([1, 2, 3, 4]);
  if (stat.getMedian() !== 2.5) throw new Error('Expected 2.5');
});

Deno.test('getMedian returns NaN for empty array', () => {
  const stat = new NumericStatAnalizer([]);
  if (!Number.isNaN(stat.getMedian())) throw new Error('Expected NaN');
});

Deno.test('getQ1 and getQ3 return correct values', () => {
  const stat = new NumericStatAnalizer([1, 2, 3, 4, 5]);
  if (stat.getQ1() !== 2) throw new Error('Expected Q1 2');
  if (stat.getQ3() !== 4) throw new Error('Expected Q3 4');
});

Deno.test('getQ1 and getQ3 return NaN for empty array', () => {
  const stat = new NumericStatAnalizer([]);
  if (!Number.isNaN(stat.getQ1())) throw new Error('Expected Q1 NaN');
  if (!Number.isNaN(stat.getQ3())) throw new Error('Expected Q3 NaN');
});

Deno.test('getIQR returns correct IQR', () => {
  const stat = new NumericStatAnalizer([1, 2, 3, 4, 5]);
  if (stat.getIQR() !== 2) throw new Error('Expected IQR 2');
});

Deno.test('getIQR returns NaN for empty array', () => {
  const stat = new NumericStatAnalizer([]);
  if (!Number.isNaN(stat.getIQR())) throw new Error('Expected NaN');
});

Deno.test('getStdDev returns correct standard deviation', () => {
  const stat = new NumericStatAnalizer([2, 4, 4, 4, 5, 5, 7, 9]);
  if (Math.abs(stat.getStdDev() - 2) > 1e-5) throw new Error('Expected ~2');
});

Deno.test('getStdDev returns NaN for empty array', () => {
  const stat = new NumericStatAnalizer([]);
  if (!Number.isNaN(stat.getStdDev())) throw new Error('Expected NaN');
});

Deno.test('getStdDev returns 0 for single element', () => {
  const stat = new NumericStatAnalizer([42]);
  if (stat.getStdDev() !== 0) throw new Error('Expected 0');
});

Deno.test('CV returns correct coefficient of variation', () => {
  const stat = new NumericStatAnalizer([10, 10, 10]);
  if (stat.CV() !== 0) throw new Error('Expected 0');
});

Deno.test('CV returns NaN for empty array', () => {
  const stat = new NumericStatAnalizer([]);
  if (!Number.isNaN(stat.CV())) throw new Error('Expected NaN');
});

Deno.test('getNumericStatistics returns all statistics for known array', () => {
  const stat = new NumericStatAnalizer([1, 2, 3, 4, 5]);
  const report = stat.getNumericStatistics();
  if (report.min !== 1) throw new Error('Expected min 1');
  if (report.max !== 5) throw new Error('Expected max 5');
  if (report.average !== 3) throw new Error('Expected average 3');
  if (report.median !== 3) throw new Error('Expected median 3');
  if (Math.abs(report.stdDev - Math.sqrt(2)) > 1e-5) throw new Error('Expected stdDev sqrt(2)');
  if (report.Q1 !== 2) throw new Error('Expected Q1 2');
  if (report.Q3 !== 4) throw new Error('Expected Q3 4');
  if (report.IQR !== 2) throw new Error('Expected IQR 2');
  if (Math.abs(report.P95 - 4.8) > 1e-5) throw new Error('Expected P95 4.8');
  if (Math.abs(report.P99 - 4.96) > 1e-5) throw new Error('Expected P99 4.96');
});

Deno.test('getNumericStatistics returns NaN for all fields on empty array', () => {
  const stat = new NumericStatAnalizer([]);
  const report = stat.getNumericStatistics();
  Object.values(report).forEach(val => {
    if (!Number.isNaN(val)) throw new Error('Expected NaN');
  });
});

// Additional tests

Deno.test('getMin and getMax for single element', () => {
  const stat = new NumericStatAnalizer([7]);
  if (stat.getMin() !== 7) throw new Error('Expected min 7');
  if (stat.getMax() !== 7) throw new Error('Expected max 7');
});

Deno.test('getPercentile for repeated values', () => {
  const stat = new NumericStatAnalizer([5, 5, 5, 5, 5]);
  if (stat.getPercentile(0) !== 5) throw new Error('Expected 5');
  if (stat.getPercentile(100) !== 5) throw new Error('Expected 5');
  if (stat.getPercentile(50) !== 5) throw new Error('Expected 5');
});

Deno.test('getStdDev for two elements', () => {
  const stat = new NumericStatAnalizer([1, 3]);
  if (Math.abs(stat.getStdDev() - 1) > 1e-5) throw new Error('Expected stdDev 1');
});

Deno.test('getAverage for negative numbers', () => {
  const stat = new NumericStatAnalizer([-2, -4, -6]);
  if (stat.getAverage() !== -4) throw new Error('Expected average -4');
});
