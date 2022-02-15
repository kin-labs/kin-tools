import {
  MAGIC_BYTE,
  MAX_APP_INDEX,
  MAX_TRANSACTION_TYPE,
  MAX_VERSION,
} from './kin-memo-constants';

describe('Constants', () => {
  it('should verify values', () => {
    expect(MAGIC_BYTE).toEqual(0x1);
    expect(MAX_TRANSACTION_TYPE).toEqual(3);
    expect(MAX_APP_INDEX).toEqual(Math.pow(2, 16) - 1);
    expect(MAX_VERSION).toEqual(1);
  });
});
