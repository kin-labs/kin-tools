import { TransactionType } from '@kin-tools/kin-memo';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { KIN_MINT_MAINNET, MEMO_V1_TOKEN_ID } from './constants';
import { demoKinTxWithAppIndex } from './fixtures/demo-tx.fixtures';
import { parseKinTransaction } from './parse-kin-transaction';

describe('parseKinTransaction', () => {
  it('should parse a raw transaction', async () => {
    const parsed = parseKinTransaction(demoKinTxWithAppIndex);

    // Verify the mint
    expect(parsed.mint).toEqual(KIN_MINT_MAINNET);

    // Verify the raw memo
    expect(parsed.memo.programId.toString()).toEqual(MEMO_V1_TOKEN_ID);
    expect(parsed.memo.program).toEqual('spl-memo');
    expect(parsed.memo.parsed).toEqual(
      'JeACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA='
    );

    // Verify the parsed memo
    expect(parsed.memoParsed.appIndex()).toEqual(184);
    expect(parsed.memoParsed.version()).toEqual(1);
    expect(parsed.memoParsed.transactionType()).toEqual(TransactionType.Earn);

    // Verify the token transfer
    expect(parsed.tokenTransfer.parsed?.type).toEqual('transfer');
    expect(parsed.tokenTransfer.program).toEqual('spl-token');
    expect(parsed.tokenTransfer.programId).toEqual(TOKEN_PROGRAM_ID);
  });
});
