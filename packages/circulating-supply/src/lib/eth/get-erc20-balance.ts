import { Etherscan } from 'etherscan-ts';
import { KIN_TOKEN_ERC20 } from '../circulating-supply.constants';

export function getErc20Balance(
  client: Etherscan,
  publicKey: string
): Promise<number> {
  return client
    .getERC20TokenBalance(KIN_TOKEN_ERC20, publicKey)
    .then((o) => o.result / 10e17);
}
