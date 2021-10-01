import { Client } from '@kinecosystem/kin-sdk-v2';
import { getKinBalance } from './get-kin-balance';

export function getKinBalances(
  client: Client,
  publicKeys: string[]
): Promise<number> {
  return Promise.all(
    publicKeys.map((publicKey) => getKinBalance(client, publicKey))
  ).then((res) => res.map((a) => parseFloat(a)).reduce((a, b) => a + b));
}
