import { parseKinTransaction } from '@kin-tools/kin-transaction';
import { demoKinTxWithAppIndex } from './fixtures/demo-tx.fixtures';
import { validateKinTransaction } from './validate-kin-transaction';

describe('validateKinTransaction', () => {
  it('should parse a raw transaction', async () => {
    const parsed = parseKinTransaction(demoKinTxWithAppIndex);
    const valid = validateKinTransaction(parsed);

    // Verify the mint
    expect(valid.mint).toEqual(true);

    // Verify the raw memo
    expect(valid.memo).toEqual(true);
    // Verify the transfers
    expect(valid.isSolTransfer).toEqual(false);
    expect(valid.isTokenTransfer).toEqual(true);
  });
});
