import { KinMemo } from '@kin-tools/kin-memo';
import { ParsedInstruction, ParsedTransactionWithMeta } from '@solana/web3.js';
import { KinParsedTransaction } from './kin-parsed-transaction';
import { MEMO_V1_TOKEN_ID } from './constants';

export function getMintAddress(tx: ParsedTransactionWithMeta) {
  return tx?.meta?.postTokenBalances?.find((items) => items.mint)?.mint;
}

export function parseKinTransaction(
  tx: ParsedTransactionWithMeta
): KinParsedTransaction {
  const mint = getMintAddress(tx);
  const instructions = tx?.transaction?.message
    ?.instructions as ParsedInstruction[];

  const solTransfer = instructions.find(
    (item) => item.program === 'system' && item.parsed?.type === 'transfer'
  );

  const tokenTransfer = instructions.find(
    (item) => item.program === 'spl-token'
  );

  const memos = instructions.filter((item) => item.program === 'spl-memo');
  const memo = memos.find(
    (item) => item.programId?.toString() === MEMO_V1_TOKEN_ID
  );

  const memoParsed = memo?.parsed
    ? KinMemo.fromB64String(memo.parsed)
    : undefined;

  return {
    tx,
    mint,
    memo,
    memoCount: memos?.length,
    memoParsed,
    solTransfer,
    tokenTransfer,
  };
}
