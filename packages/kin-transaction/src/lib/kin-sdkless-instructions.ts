import { TransactionType } from '@kin-tools/kin-memo';
import { createTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import {
  generateKinMemoInstruction,
  getPublicKey,
  kinToQuarks,
} from './helpers';
import {
  GenerateKreTransactionInstructions,
  GenerateTransferInstruction,
} from './interfaces';

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
  const appIndexMemoInstruction = generateKinMemoInstruction({
    appIndex,
    type,
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
