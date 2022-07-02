import { KeypairCompat } from './keypair-compat';

describe('keypairCompat', () => {
  it('should work with Stellar seed', () => {
    const kp = KeypairCompat.getKeypair(
      'SBB3CCFLL5WKQE2ZPRHSULEFL2623BNDYPHTJVEEXJCTOYNBOZHZUFEF'
    );
    expect(kp.publicKey).toEqual(
      'HeDZgu4ee1PJiU7EB2oBFFphBAcUDk5MXgaDBzmDrTEQ'
    );
  });

  it('should work with Stellar seed (bs58 encoded)', () => {
    const kp = KeypairCompat.getKeypair(
      '9huFHrW6zfQvHsJXLvzDuQGFRyWL7YJ39vTkib63CDXj'
    );

    expect(kp.publicKey).toEqual(
      'FrHoAVJXuXtkfHuyzG8uvfRherAK1pRehu9kGkvcgj6r'
    );
  });
});
