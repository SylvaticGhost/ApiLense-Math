import type { NumericStartReport } from "./numericStatReport.ts";

export class NumericStatAnalizer {
  constructor(private readonly data: number[]) {}

  private sorted: number[] | null = null;

  private sortedData(): number[] {
    if (!this.sorted) this.sorted = [...this.data].sort((a, b) => a - b);
    return this.sorted;
  }

  getMin(): number {
    if (this.data.length === 0) return NaN;
    if (this.sorted) return this.sorted[0];
    let min = this.data[0];
    for (const value of this.data) {
      if (value < min) min = value;
    }
    return min;
  }

  getMax(): number {
    if (this.data.length === 0) return NaN;

    if (this.sorted) return this.sorted[this.sorted.length - 1];
    let max = this.data[0];
    for (const value of this.data) {
      if (value > max) max = value;
    }
    return max;
  }

  getAverage(): number {
    const sum = this.data.reduce((a, b) => a + b, 0);
    return sum / this.data.length;
  }

  getPercentile(percentile: number): number {
    const sorted = this.sortedData();
    const index = (percentile / 100) * (sorted.length - 1);
    if (Math.floor(index) === index) {
      return sorted[index];
    } else {
      const lower = sorted[Math.floor(index)];
      const upper = sorted[Math.ceil(index)];
      return lower + (upper - lower) * (index - Math.floor(index));
    }
  }

  getMedian(): number {
    return this.getPercentile(50);
  }

  getQ1(): number {
    return this.getPercentile(25);
  }

  getQ3(): number {
    return this.getPercentile(75);
  }

  getIQR(): number {
    return this.getQ3() - this.getQ1();
  }

  getStdDev(): number {
    const avg = this.getAverage();
    const squareDiffs = this.data.map((value) => {
      const diff = value - avg;
      return diff * diff;
    });
    const avgSquareDiff =
      squareDiffs.reduce((a, b) => a + b, 0) / this.data.length;
    return Math.sqrt(avgSquareDiff);
  }

  CV(): number {
    return this.getStdDev() / this.getAverage();
  }

  getNumericStatistics(): NumericStartReport {
    return {
      min: this.getMin(),
      max: this.getMax(),
      average: this.getAverage(),
      median: this.getMedian(),
      stdDev: this.getStdDev(),
      Q1: this.getQ1(),
      Q3: this.getQ3(),
      IQR: this.getIQR(),
      P95: this.getPercentile(95),
      P99: this.getPercentile(99),
    };
  }
}
