import { createKinMemo, TransactionType } from '@kin-tools/kin-memo';
import { createTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey, TransactionInstruction } from '@solana/web3.js';

import { MEMO_V1_TOKEN_ID } from './constants';
import { getPublicKey, kinToQuarks } from './helpers';
import {
  GenerateKreTransactionInstructions,
  GenerateMemoInstruction,
  GenerateTransferInstruction,
} from './interfaces';

function generateMemoInstruction({
  memoContent,
}: GenerateMemoInstruction): TransactionInstruction {
  return new TransactionInstruction({
    keys: [],
    programId: new PublicKey(MEMO_V1_TOKEN_ID),
    data: Buffer.from(memoContent),
  });
}

async function generateTransferInstruction({
  amount,
  from,
  fromTokenAccount,
  toTokenAccount,
}: GenerateTransferInstruction) {
  // Amount
  const quarks = kinToQuarks(amount);

  // Instruction
  return createTransferInstruction(
    getPublicKey(fromTokenAccount),
    getPublicKey(toTokenAccount),
    getPublicKey(from),
    Number(quarks),
    [],
    TOKEN_PROGRAM_ID
  );
}

export async function generateKreTransactionInstructions({
  amount,
  appIndex,
  from,
  fromTokenAccount,
  toTokenAccount,
  type = TransactionType.None,
}: GenerateKreTransactionInstructions) {
  // Create correctly formatted memo string, including your App Index
  const appIndexMemo = createKinMemo({
    appIndex,
    type,
  });
  // Create Memo Instruction for KRE Ingestion - Must be Memo Program v1, not v2
  const appIndexMemoInstruction = generateMemoInstruction({
    memoContent: appIndexMemo,
  });

  // Create Transfer Instruction
  const transferInstruction = await generateTransferInstruction({
    amount,
    from,
    fromTokenAccount,
    toTokenAccount,
  });

  return [appIndexMemoInstruction, transferInstruction];
}
