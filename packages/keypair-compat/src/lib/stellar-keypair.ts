import * as nacl from 'tweetnacl';
import { StrKey } from './str-key';

export class StellarKeypair {
  private readonly type: 'ed25519';
  private readonly _secretSeed: Buffer;
  private readonly _secretKey?: Buffer;
  private readonly _publicKey: Buffer;

  constructor(keys: {
    type: 'ed25519';
    secretKey: Buffer;
    publicKey?: string;
  }) {
    if (keys.type != 'ed25519') {
      throw new Error('Invalid keys type');
    }

    this.type = keys.type;

    if (keys.secretKey) {
      keys.secretKey = Buffer.from(keys.secretKey);

      if (keys.secretKey.length != 32) {
        throw new Error('secretKey length is invalid');
      }

      const secretKeyUint8 = new Uint8Array(keys.secretKey);
      const naclKeys = nacl.sign.keyPair.fromSeed(secretKeyUint8);

      this._secretSeed = keys.secretKey;
      this._secretKey = Buffer.from(naclKeys.secretKey);
      this._publicKey = Buffer.from(naclKeys.publicKey);

      if (
        keys.publicKey &&
        !this._publicKey.equals(Buffer.from(keys.publicKey))
      ) {
        throw new Error('secretKey does not match publicKey');
      }
    } else {
      this._publicKey = Buffer.from(keys.publicKey);

      if (this._publicKey.length != 32) {
        throw new Error('publicKey length is invalid');
      }
    }
  }

  /**
   * Creates a new `Keypair` instance from secret. This can either be secret key or secret seed depending
   * on underlying public-key signature system. Currently `Keypair` only supports ed25519.
   * @param {string} secret secret key (ex. `SDAKFNYEIAORZKKCYRILFQKLLOCNPL5SWJ3YY5NM3ZH6GJSZGXHZEPQS`)
   * @returns {StellarKeypair}
   */
  static fromSecretKeypair(secret: string): StellarKeypair {
    const rawSecret = StrKey.decodeEd25519SecretSeed(secret);
    return this.fromRawEd25519Seed(rawSecret);
  }

  /**
   * Creates a new `Keypair` object from ed25519 secret key seed raw bytes.
   *
   * @param {Buffer} rawSeed Raw 32-byte ed25519 secret key seed
   * @returns {StellarKeypair}
   */
  static fromRawEd25519Seed(rawSeed: Buffer): StellarKeypair {
    return new this({ type: 'ed25519', secretKey: rawSeed });
  }

  /**
   * Returns raw public key
   * @returns {Buffer}
   */
  rawPublicKey(): Buffer {
    return this._publicKey;
  }

  /**
   * Returns secret key associated with this `Keypair` object
   * @returns {string}
   */
  secret(): string {
    if (!this._secretSeed) {
      throw new Error('no secret key available');
    }

    if (this.type == 'ed25519') {
      return StrKey.encodeEd25519SecretSeed(this._secretSeed);
    }

    throw new Error('Invalid Keypair type');
  }
}
