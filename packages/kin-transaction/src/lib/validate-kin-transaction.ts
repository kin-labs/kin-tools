import { KinParsedTransaction } from './kin-parsed-transaction';
import { KIN_MINT_MAINNET } from './constants';
import { KinValidateTransaction } from './kin-validate-transaction';

export function validateKinTransaction(
  tx: KinParsedTransaction,
  mint = KIN_MINT_MAINNET
): KinValidateTransaction {
  const isSolTransfer = !!tx.solTransfer;
  const isTokenTransfer = !!tx.tokenTransfer;

  return {
    mint: tx.mint && tx.mint === mint,
    memo: tx.memo && tx.memoParsed && tx.memoParsed?.version() === 1,
    isSolTransfer,
    isTokenTransfer,
  };
}
