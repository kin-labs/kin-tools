import { PublicKey } from '@kinecosystem/kin-sdk-v2';

export function getPublicKey(publicKey: string): PublicKey {
  try {
    return PublicKey.fromBase58(publicKey);
  } catch (_) {
    return PublicKey.fromString(publicKey);
  }
}
