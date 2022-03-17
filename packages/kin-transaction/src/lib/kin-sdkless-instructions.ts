import BigNumber from 'bignumber.js';

import { TOKEN_PROGRAM_ID, createTransferInstruction } from '@solana/spl-token';
import { PublicKey, TransactionInstruction } from '@solana/web3.js';

import { createKinMemo, TransactionType } from '@kin-tools/kin-memo';
import {
  KIN_MINT_MAINNET,
  KIN_MINT_DEVNET,
  MEMO_V1_TOKEN_ID_MAINNET,
  MEMO_V1_TOKEN_ID_DEVNET,
  MEMO_V2_TOKEN_ID_MAINNET,
  MEMO_V2_TOKEN_ID_DEVNET,
} from './kin-transaction-constants';

export type TransactionTypeName = 'Earn' | 'Spend' | 'P2P' | 'None';
export const transactionTypeNames: TransactionTypeName[] = [
  'Earn',
  'Spend',
  'P2P',
  'None',
];
export type SolanaNetwork = 'Mainnet' | 'Devnet';
export const solanaNetworks: SolanaNetwork[] = ['Mainnet', 'Devnet'];

export const solanaAddresses = {
  Mainnet: {
    kinMint: KIN_MINT_MAINNET,
    memoV1ProgramId: MEMO_V1_TOKEN_ID_MAINNET,
    memoV2ProgramId: MEMO_V2_TOKEN_ID_MAINNET,
  },
  Devnet: {
    kinMint: KIN_MINT_DEVNET,
    memoV1ProgramId: MEMO_V1_TOKEN_ID_DEVNET,
    memoV2ProgramId: MEMO_V2_TOKEN_ID_DEVNET,
  },
};

function kinToQuarks(amount: string): BigNumber {
  const b = new BigNumber(amount).decimalPlaces(5, BigNumber.ROUND_DOWN);
  return b.multipliedBy(1e5);
}

interface GenerateMemoInstruction {
  memoContent: string;
  memoVersion: number;
  solanaNetwork: SolanaNetwork;
}
export function generateMemoInstruction({
  memoContent,
  memoVersion = 1,
  solanaNetwork,
}: GenerateMemoInstruction): TransactionInstruction {
  const memoProgramId =
    memoVersion === 1
      ? solanaAddresses[solanaNetwork].memoV1ProgramId
      : solanaAddresses[solanaNetwork].memoV2ProgramId;
  if (!memoProgramId) throw new Error('No Memo Program Id!');

  return new TransactionInstruction({
    keys: [],
    programId: new PublicKey(memoProgramId),
    data: Buffer.from(memoContent),
  });
}
interface GenerateTransferInstruction {
  from: PublicKey;
  fromTokenAccount: PublicKey;
  toTokenAccount: PublicKey;
  amount: string;
}
export async function generateTransferInstruction({
  from,
  fromTokenAccount,
  toTokenAccount,
  amount,
}: GenerateTransferInstruction) {

  // Amount
  const quarks = kinToQuarks(amount);

  // Instruction
  return createTransferInstruction(
    fromTokenAccount,
    toTokenAccount,
    from,
    Number(quarks),
    [],
    TOKEN_PROGRAM_ID
  );
}

export interface GenerateKRETransactionInstructions {
  type: TransactionTypeName;
  appIndex: number;
  from: PublicKey;
  fromTokenAccount: PublicKey;
  toTokenAccount: PublicKey;
  amount: string;
  solanaNetwork: SolanaNetwork;
}

export async function generateKRETransactionInstructions({
  type = 'None',
  appIndex,
  from,
  fromTokenAccount,
  toTokenAccount,
  amount,
  solanaNetwork,
}: GenerateKRETransactionInstructions) {
  // Transaction Type
  let transactionType = TransactionType.None;
  if (type === 'Earn') transactionType = TransactionType.Earn;
  if (type === 'Spend') transactionType = TransactionType.Spend;
  if (type === 'P2P') transactionType = TransactionType.P2P;

  // Create correctly formatted memo string, including your App Index
  const appIndexMemo = createKinMemo({
    appIndex,
    type: transactionType,
  });
  // Create Memo Instruction for KRE Ingestion - Must be Memo Program v1, not v2
  const appIndexMemoInstruction = generateMemoInstruction({
    memoContent: appIndexMemo,
    solanaNetwork,
    memoVersion: 1,
  });

  // Create Transfer Instruction
  const transferInstruction = await generateTransferInstruction({
    from,
    fromTokenAccount,
    toTokenAccount,
    amount,
  });

  return [appIndexMemoInstruction, transferInstruction];
}
