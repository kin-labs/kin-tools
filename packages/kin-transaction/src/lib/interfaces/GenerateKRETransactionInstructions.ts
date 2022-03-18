import { TransactionType } from '@kin-tools/kin-memo';
import { PublicKeyString } from './PublicKeyString';

export interface GenerateKRETransactionInstructions {
  amount: string;
  appIndex: number;
  from: PublicKeyString;
  fromTokenAccount: PublicKeyString;
  toTokenAccount: PublicKeyString;
  type: TransactionType;
}
