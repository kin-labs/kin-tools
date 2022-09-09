import { TransactionType } from '@kin-tools/kin-memo'
import { MEMO_V1_TOKEN_ID } from '../constants'
import { generateKinMemoInstruction } from './generate-kin-memo-instruction'

describe('generateMemoInstruction', () => {
  it('should create a Memo Instruction', async () => {
    const memo = generateKinMemoInstruction({
      appIndex: 1,
      type: TransactionType.Spend,
    });

    expect(memo.programId.toBase58()).toEqual(MEMO_V1_TOKEN_ID);
    expect(memo).toMatchSnapshot();
  });
});
