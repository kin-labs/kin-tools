import { PublicKey } from '@solana/web3.js';
import { getPublicKey } from './get-public-key';

describe('getPublicKey', () => {
  it('should convert a string to a Solana Public Key or just return a Public Key', async () => {
    const string = 'BQJi5K2s4SDDbed1ArpXjb6n7yVUfM34ym9a179MAqVo';
    const publicKey = new PublicKey(string);

    expect(getPublicKey(string)).toEqual(publicKey);
    expect(getPublicKey(publicKey)).toEqual(publicKey);

    let error = null;
    try {
      getPublicKey('sdklfjsdlkfjsldkjf');
    } catch (err) {
      error = err;
    }
    expect(error).not.toBeNull();
  });
});
