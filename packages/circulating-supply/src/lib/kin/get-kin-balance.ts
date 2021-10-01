import { Client, quarksToKin } from '@kinecosystem/kin-sdk-v2';
import { getPublicKey } from './get-public-key';

export function getKinBalance(
  client: Client,
  publicKey: string
): Promise<string> {
  return client.getBalance(getPublicKey(publicKey)).then((s) => quarksToKin(s));
}

