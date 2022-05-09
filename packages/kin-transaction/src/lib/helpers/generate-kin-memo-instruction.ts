import { createKinMemo } from '@kin-tools/kin-memo';
import { TransactionInstruction } from '@solana/web3.js';
import { GenerateKinMemoInstruction } from '../interfaces';
import { generateMemoInstruction } from './generate-memo-instruction';

/**
 * Method to format a correct Kin Memo Instruction based on appIndex and Type
 * @param {number} appIndex
 * @param {TransactionType} type
 * @returns {TransactionInstruction}
 */
export function generateKinMemoInstruction({
  appIndex,
  type,
}: GenerateKinMemoInstruction): TransactionInstruction {
  // Create correctly formatted memo string, including your App Index
  const memoContent = createKinMemo({ appIndex, type });
  // Create Memo Instruction for KRE Ingestion - Must be Memo Program v1, not v2
  return generateMemoInstruction({ memoContent });
}
