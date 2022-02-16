import { KinParsedTransaction } from './kin-parsed-transaction';
import { KIN_MINT_MAINNET } from './kin-transaction-constants';
import { KinValidateTransaction } from './kin-validate-transaction';

export function validateKinTransaction(
  tx: KinParsedTransaction,
  mint = KIN_MINT_MAINNET
): KinValidateTransaction {
  return {
    mint: tx.mint && tx.mint === mint,
    memo: tx.memo && tx.parsedMemo && tx.parsedMemo?.version() === 1,
  };
}
