import { solve } from './stocks.solve';

describe('solve function tests', () => {
  const createMockStockDataBuffer = (
    stockData: { timestamp: number; price: number }[],
  ) => {
    const bufferLength = stockData.length * 2 * Float64Array.BYTES_PER_ELEMENT;
    const sharedBuffer = new SharedArrayBuffer(bufferLength);
    const bufferView = new Float64Array(sharedBuffer);

    for (let i = 0; i < stockData.length; i++) {
      bufferView[i * 2] = stockData[i].timestamp;
      bufferView[i * 2 + 1] = stockData[i].price;
    }

    return bufferView;
  };

  const baseTimestamp = 1609459200;
  const hourInMs = 1000 * 60 * 60;

  it('calculates maximum profit correctly under normal conditions', () => {
    const mockStockData = [
      { timestamp: baseTimestamp, price: 10 },
      { timestamp: baseTimestamp + hourInMs, price: 20 },
      { timestamp: baseTimestamp + hourInMs * 2, price: 5 },
      { timestamp: baseTimestamp + hourInMs * 3, price: 15 },
    ];
    const bufferView = createMockStockDataBuffer(mockStockData);
    const solveDto = {
      startUnixTimestamp: baseTimestamp,
      endUnixTimestamp: baseTimestamp + hourInMs * 3,
      funds: 50,
    };

    const result = solve(solveDto, bufferView);

    expect(result.profit).toBe(100);
    expect(result.sharesBought).toBe(10);
    expect(result.buyPrice).toBe(5);
    expect(result.sellPrice).toBe(15);
    expect(result.buyDate).toBeDefined();
    expect(result.sellDate).toBeDefined();
  });

  it('should return the closest/shortest of two identical solutions', () => {
    const mockStockData = [
      { timestamp: baseTimestamp, price: 10 },
      { timestamp: baseTimestamp + hourInMs, price: 100 },
      { timestamp: baseTimestamp + hourInMs * 2, price: 5 },
      { timestamp: baseTimestamp + hourInMs * 3, price: 50 },
    ];
    const bufferView = createMockStockDataBuffer(mockStockData);
    const solveDto = {
      startUnixTimestamp: baseTimestamp,
      endUnixTimestamp: baseTimestamp + hourInMs * 3,
      funds: 10,
    };

    const result = solve(solveDto, bufferView);

    expect(result.profit).toBe(90);
    expect(result.sharesBought).toBe(1);
    expect(result.buyPrice).toBe(10);
    expect(result.sellPrice).toBe(100);
    expect(result.buyDate).toBeDefined();
    expect(result.sellDate).toBeDefined();
  });

  it('handles no profit scenario correctly', () => {
    const mockStockData = [
      { timestamp: baseTimestamp, price: 20 },
      { timestamp: baseTimestamp + hourInMs, price: 20 },
      { timestamp: baseTimestamp + hourInMs * 2, price: 15 },
      { timestamp: baseTimestamp + hourInMs * 3, price: 10 },
    ];
    const bufferView = createMockStockDataBuffer(mockStockData);
    const solveDto = {
      startUnixTimestamp: baseTimestamp,
      endUnixTimestamp: baseTimestamp + hourInMs * 3,
      funds: 50,
    };

    const result = solve(solveDto, bufferView);

    expect(result.profit).toEqual(0);
    expect(result.sharesBought).toEqual(0);
    expect(result.buyPrice).toEqual(0);
    expect(result.sellPrice).toEqual(0);
    expect(result.buyDate).toBeDefined();
    expect(result.sellDate).toBeDefined();
  });

  it('handles insufficient funds to buy any stock', () => {
    const mockStockData = [
      { timestamp: baseTimestamp, price: 100 },
      { timestamp: baseTimestamp + hourInMs, price: 150 },
      { timestamp: baseTimestamp + hourInMs * 2, price: 50 },
      { timestamp: baseTimestamp + hourInMs * 3, price: 200 },
    ];
    const bufferView = createMockStockDataBuffer(mockStockData);
    const solveDto = {
      startUnixTimestamp: baseTimestamp,
      endUnixTimestamp: baseTimestamp + hourInMs * 3,
      funds: 25, // Not enough
    };

    const result = solve(solveDto, bufferView);

    expect(result.profit).toEqual(0);
    expect(result.sharesBought).toEqual(0);
    expect(result.buyPrice).toEqual(0);
    expect(result.sellPrice).toEqual(0);
  });

  it('handles case with only two entries', () => {
    const mockStockData = [
      { timestamp: baseTimestamp, price: 50 },
      { timestamp: baseTimestamp + hourInMs, price: 100 },
    ];
    const bufferView = createMockStockDataBuffer(mockStockData);
    const solveDto = {
      startUnixTimestamp: baseTimestamp,
      endUnixTimestamp: baseTimestamp + hourInMs,
      funds: 100,
    };

    const result = solve(solveDto, bufferView);

    expect(result.profit).toBeGreaterThan(0);
    expect(result.sharesBought).toBeCloseTo(2);
    expect(result.buyPrice).toBe(50);
    expect(result.sellPrice).toBe(100);
  });

  it('handles very high prices and funds', () => {
    const mockStockData = [
      { timestamp: baseTimestamp, price: 10000 },
      { timestamp: baseTimestamp + hourInMs, price: 20000 },
      { timestamp: baseTimestamp + hourInMs * 2, price: 15000 },
      { timestamp: baseTimestamp + hourInMs * 3, price: 25000 },
    ];
    const bufferView = createMockStockDataBuffer(mockStockData);
    const solveDto = {
      startUnixTimestamp: baseTimestamp,
      endUnixTimestamp: baseTimestamp + hourInMs * 3,
      funds: 100000, // High funds
    };

    const result = solve(solveDto, bufferView);

    expect(result.profit).toBeGreaterThan(0);
    expect(result.sharesBought).toBeCloseTo(10);
    expect(result.buyPrice).toBe(10000);
    expect(result.sellPrice).toBe(25000);
  });
});
