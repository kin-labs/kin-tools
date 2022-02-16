import { KinMemo } from '@kin-tools/kin-memo';
import { ParsedInstruction, ParsedTransactionWithMeta } from '@solana/web3.js';

export interface KinParsedTransaction {
  tx: ParsedTransactionWithMeta;
  mint: string;
  memo?: ParsedInstruction;
  parsedMemo?: KinMemo;
  tokenTransfer?: ParsedInstruction;
}
