import { Client, Environment } from '@kinecosystem/kin-sdk-v2';
import { Etherscan } from 'etherscan-ts';
import { CirculatingSupplyConfig } from './circulating-supply.config';
import {
  KIN_TOKEN_MAX,
  KIN_TOKEN_PRESALES,
  KIN_TOKEN_VESTING,
} from './circulating-supply.constants';
import { getErc20Balances } from './eth/get-erc20-balances';
import { getKinBalances } from './kin/get-kin-balances';

export async function circulatingSupply(
  config: CirculatingSupplyConfig
): Promise<number> {
  const etherscan = new Etherscan(config.etherscanApiKey);
  const kin = new Client(Environment.Prod);

  const [currentBalance, pendingPresale] = await Promise.all([
    getKinBalances(kin, KIN_TOKEN_VESTING),
    getErc20Balances(etherscan, KIN_TOKEN_PRESALES),
  ]);

  return KIN_TOKEN_MAX - currentBalance - pendingPresale;
}
