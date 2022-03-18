import { PublicKeyString } from './PublicKeyString';


export interface GenerateTransferInstruction {
  amount: string;
  from: PublicKeyString;
  fromTokenAccount: PublicKeyString;
  toTokenAccount: PublicKeyString;
}
