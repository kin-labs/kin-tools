import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import { MEMO_V1_TOKEN_ID } from '../constants';
import { GenerateMemoInstruction } from '../interfaces';

export function generateMemoInstruction({
  memoContent,
}: GenerateMemoInstruction): TransactionInstruction {
  return new TransactionInstruction({
    keys: [],
    programId: new PublicKey(MEMO_V1_TOKEN_ID),
    data: Buffer.from(memoContent),
  });
}
