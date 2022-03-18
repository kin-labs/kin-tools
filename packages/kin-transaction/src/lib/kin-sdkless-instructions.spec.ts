import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { TransactionType } from '@kin-tools/kin-memo';

import { generateKRETransactionInstructions } from './kin-sdkless-instructions';
import { GenerateKRETransactionInstructions } from './interfaces';
import { MEMO_V1_TOKEN_ID } from './constants';

describe('generateKRETransactionInstructions', () => {
  it('should generate two transaction instructions', async () => {
    const options: GenerateKRETransactionInstructions = {
      amount: '1000',
      appIndex: 360,
      from: 'BQJi5K2s4SDDbed1ArpXjb6n7yVUfM34ym9a179MAqVo',
      fromTokenAccount: '9guRAtmksTgMdRmr23dfEJp8dbKAzWzhp5NRBNTctGgy',
      toTokenAccount: '9b8RvXYYNxFoTNAMBwGDfqWHKpJvX7hYgdginQKmwrFL',
      type: TransactionType.P2P,
    };
    const instructionsKRE = await generateKRETransactionInstructions(options);

    // Verify the instructions
    expect(instructionsKRE.length).toEqual(2);
    const appIndexMemoInstruction = instructionsKRE[0];
    expect(appIndexMemoInstruction.programId.toBase58()).toEqual(
      MEMO_V1_TOKEN_ID
    );
    const transferInstruction = instructionsKRE[1];
    expect(transferInstruction.programId.toBase58()).toEqual(
      TOKEN_PROGRAM_ID.toBase58()
    );
  });
});
