import { KinMemo } from './kin-memo';
import { createKinMemo } from './create-kin-memo';
import { TransactionType } from './transaction-type';

const appIndex = 1;
describe('createKinMemo', () => {
  it('create memo, type None', () => {
    const memo = createKinMemo({ appIndex });
    const parsed = KinMemo.fromB64String(memo);

    expect(memo).toEqual('BQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=');
    expect(parsed.transactionType()).toEqual(TransactionType.None);
    expect(parsed.appIndex()).toEqual(1);
  });

  it('create memo, type Spend', () => {
    const memo = createKinMemo({ appIndex, type: TransactionType.Spend });
    const parsed = KinMemo.fromB64String(memo);

    expect(memo).toEqual('RQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=');
    expect(parsed.transactionType()).toEqual(TransactionType.Spend);
    expect(parsed.appIndex()).toEqual(1);
  });

  it('create memo, type Earn', () => {
    const memo = createKinMemo({ appIndex, type: TransactionType.Earn });
    const parsed = KinMemo.fromB64String(memo);

    expect(memo).toEqual('JQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=');
    expect(parsed.transactionType()).toEqual(TransactionType.Earn);
    expect(parsed.appIndex()).toEqual(1);
  });

  it('create memo, type P2P', () => {
    const memo = createKinMemo({ appIndex, type: TransactionType.P2P });
    const parsed = KinMemo.fromB64String(memo);

    expect(memo).toEqual('ZQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=');
    expect(parsed.transactionType()).toEqual(TransactionType.P2P);
    expect(parsed.appIndex()).toEqual(1);
  });
});
