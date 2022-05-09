import { TransactionType } from '@kin-tools/kin-memo';

export interface GenerateKinMemoInstruction {
  appIndex: number;
  type: TransactionType;
}
