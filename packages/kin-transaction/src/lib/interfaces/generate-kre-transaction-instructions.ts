import { TransactionType } from '@kin-tools/kin-memo';
import { PublicKeyString } from './public-key-string';

export interface GenerateKreTransactionInstructions {
  amount: string;
  appIndex: number;
  from: PublicKeyString;
  fromTokenAccount: PublicKeyString;
  toTokenAccount: PublicKeyString;
  type: TransactionType;
}
