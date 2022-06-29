import { KIN_MINT_MAINNET } from '@kin-tools/kin-transaction';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';

export interface BurnSummary {
  burnt: number;
  max: number;
  percentage: number;
  total: number;
}

export async function getSummary({
  connection = new Connection(clusterApiUrl('mainnet-beta')),
  mint = KIN_MINT_MAINNET,
}: {
  connection?: Connection;
  mint?: string;
} = {}): Promise<BurnSummary> {
  const max = 10_000_000_000_000;
  const total = await connection
    .getTokenSupply(new PublicKey(mint))
    .then((res) => res.value.uiAmount);
  const burnt = max - total;
  const percentage = Number(((burnt * 100) / max).toFixed(8));

  return {
    burnt,
    max,
    percentage,
    total,
  };
}
