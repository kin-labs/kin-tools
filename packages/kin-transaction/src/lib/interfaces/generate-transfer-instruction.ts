import { PublicKeyString } from './public-key-string';

export interface GenerateTransferInstruction {
  amount: string;
  from: PublicKeyString;
  fromTokenAccount: PublicKeyString;
  toTokenAccount: PublicKeyString;
}
