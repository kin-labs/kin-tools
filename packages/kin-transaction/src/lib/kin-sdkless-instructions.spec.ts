import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import {
  generateKRETransactionInstructions,
  GenerateKRETransactionInstructions,
} from './kin-sdkless-instructions';
import { MEMO_V1_TOKEN_ID_MAINNET } from './kin-transaction-constants';

describe('generateKRETransactionInstructions', () => {
  it('should generate two transaction instructions', async () => {
    const options: GenerateKRETransactionInstructions = {
      type: 'P2P',
      appIndex: 360,
      from: new PublicKey('BQJi5K2s4SDDbed1ArpXjb6n7yVUfM34ym9a179MAqVo'),
      fromTokenAccount: new PublicKey(
        '9guRAtmksTgMdRmr23dfEJp8dbKAzWzhp5NRBNTctGgy'
      ),
      toTokenAccount: new PublicKey(
        '9b8RvXYYNxFoTNAMBwGDfqWHKpJvX7hYgdginQKmwrFL'
      ),
      amount: 1000,
      solanaNetwork: 'Mainnet',
    };
    const instructionsKRE = await generateKRETransactionInstructions(options);

    // Verify the instructions
    expect(instructionsKRE.length).toEqual(2);
    const appIndexMemoInstruction = instructionsKRE[0];
    expect(appIndexMemoInstruction.programId.toBase58()).toEqual(
      MEMO_V1_TOKEN_ID_MAINNET
    );
    const transferInstruction = instructionsKRE[1];
    expect(transferInstruction.programId.toBase58()).toEqual(TOKEN_PROGRAM_ID.toBase58());
  });
});
