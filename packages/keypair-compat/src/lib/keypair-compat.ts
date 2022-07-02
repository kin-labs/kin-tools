import { Keypair } from '@kin-kinetic/keypair';
import * as bs58 from 'bs58';
import * as hexTo32 from 'hex-to-32';
import { base64ToBytArray } from './base64';

import { StellarKeypair } from './stellar-keypair';
import { StrKey } from './str-key';

export class KeypairCompat {
  static fromSecret(secret: string): StellarKeypair {
    try {
      return this.fromString(secret);
    } catch (_) {
      return this.fromBase58(secret);
    }
  }

  static fromString(seed: string): StellarKeypair {
    if (seed[0] == 'S' && seed.length == 56) {
      return StellarKeypair.fromSecretKeypair(seed);
    }

    return StellarKeypair.fromRawEd25519Seed(Buffer.from(seed, 'hex'));
  }

  static fromBase58(seed: string): StellarKeypair {
    const decoded58 = bs58.decode(seed);

    if (decoded58.length == 32) {
      return StellarKeypair.fromRawEd25519Seed(Buffer.from(decoded58));
    }

    throw new Error('seed is not a valid base58-encoded secret seed');
  }

  static getKeypair(secretKey: string): Keypair {
    const skp = this.fromSecret(secretKey);
    const publicKey = StrKey.encodeEd25519PublicKey(skp.rawPublicKey());

    const secretHex = hexTo32.decode(skp.secret());
    const publicHex = hexTo32.decode(publicKey);
    const secretHexCut = secretHex.slice(2, -4);
    const publicHexCut = publicHex.slice(2, -4);

    const joined = secretHexCut + publicHexCut;
    const joined64 = Buffer.from(joined, 'hex').toString('base64');

    return Keypair.fromByteArray(base64ToBytArray(joined64));
  }
}
