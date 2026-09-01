
import { describe, it, expect } from "vitest";
import { calculateComfortIndex } from "./comfortIndex";

describe("Comfort Index", () => {
  
  it("returns a score between 0 and 100", () => {
    const score = calculateComfortIndex({
      temperature: 25,
      humidity: 60,
      windSpeed: 10,
      cloudiness: 20,
    });

    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("returns a high score for comfortable weather", () => {
    const score = calculateComfortIndex({
      temperature: 24,
      humidity: 50,
      windSpeed: 5,
      cloudiness: 10,
    });

    expect(score).toBeGreaterThan(70);
  });

  it("returns a lower score for uncomfortable weather", () => {
    const score = calculateComfortIndex({
      temperature: 35,
      humidity: 90,
      windSpeed: 20,
      cloudiness: 90,
    });

    expect(score).toBeLessThan(70);
  });

  it("reduces the score when temperature becomes very hot", () => {
    const comfortable = calculateComfortIndex({
      temperature: 24,
      humidity: 50,
      windSpeed: 5,
      cloudiness: 10,
    });

    const hot = calculateComfortIndex({
      temperature: 40,
      humidity: 50,
      windSpeed: 5,
      cloudiness: 10,
    });

    expect(hot).toBeLessThan(comfortable);
  });

  it("reduces the score when humidity becomes very high", () => {
    const comfortable = calculateComfortIndex({
      temperature: 24,
      humidity: 50,
      windSpeed: 5,
      cloudiness: 10,
    });

    const humid = calculateComfortIndex({
      temperature: 24,
      humidity: 95,
      windSpeed: 5,
      cloudiness: 10,
    });

    expect(humid).toBeLessThan(comfortable);
  });

  it("reduces the score when wind speed becomes very strong", () => {
    const comfortable = calculateComfortIndex({
      temperature: 24,
      humidity: 50,
      windSpeed: 5,
      cloudiness: 10,
    });

    const windy = calculateComfortIndex({
      temperature: 24,
      humidity: 50,
      windSpeed: 30,
      cloudiness: 10,
    });

    expect(windy).toBeLessThan(comfortable);
  });

  it("reduces the score when cloudiness increases", () => {
    const clear = calculateComfortIndex({
      temperature: 24,
      humidity: 50,
      windSpeed: 5,
      cloudiness: 10,
    });

    const cloudy = calculateComfortIndex({
      temperature: 24,
      humidity: 50,
      windSpeed: 5,
      cloudiness: 100,
    });

    expect(cloudy).toBeLessThan(clear);
  });

  it("returns the maximum score for ideal conditions", () => {
    const score = calculateComfortIndex({
      temperature: 22,
      humidity: 50,
      windSpeed: 2,
      cloudiness: 0,
    });

    expect(score).toBe(100);
  });

  it("never returns a score below 0", () => {
    const score = calculateComfortIndex({
      temperature: 100,
      humidity: 100,
      windSpeed: 100,
      cloudiness: 100,
    });

    expect(score).toBeGreaterThanOrEqual(0);
  });

  it("returns an integer score", () => {
    const score = calculateComfortIndex({
      temperature: 27,
      humidity: 63,
      windSpeed: 7,
      cloudiness: 35,
    });

    expect(Number.isInteger(score)).toBe(true);
  });
});

