import { getSummary } from './kin-burn';

describe('getSummary', () => {
  it('should return a summary', async () => {
    const summary = await getSummary();
    expect(summary.burnt).toBeGreaterThan(135362);
    expect(summary.max).toEqual(10000000000000);
    expect(summary.percentage).toBeGreaterThan(0.00000134);
    expect(summary.total).toBeLessThan(9999999864639);
  });
});
