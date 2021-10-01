import { Etherscan } from 'etherscan-ts';
import { getErc20Balance } from './get-erc20-balance';

export function getErc20Balances(
  client: Etherscan,
  publicKeys: string[]
): Promise<number> {
  return Promise.all(
    publicKeys.map((publicKey) => getErc20Balance(client, publicKey))
  ).then((res) => res.reduce((a, b) => a + b));
}
