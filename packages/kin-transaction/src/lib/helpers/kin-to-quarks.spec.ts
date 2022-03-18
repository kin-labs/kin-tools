import BigNumber from 'bignumber.js';
import { kinToQuarks } from './kin-to-quarks';

describe('kinToQuarks', () => {
  it('should convert kin to quarks', async () => {
    const kin = '1000';
    const quarks = kinToQuarks(kin);
    expect(quarks).toEqual(new BigNumber('100000000'));
  });
});
