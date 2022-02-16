import { ParsedTransactionWithMeta, PublicKey } from '@solana/web3.js';

export const demoKinTxWithAppIndex: ParsedTransactionWithMeta = {
  blockTime: 1644912566,
  meta: {
    err: null,
    fee: 10000,
    innerInstructions: [],
    logMessages: [
      'Program Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo invoke [1]',
      'Program Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo consumed 374 of 200000 compute units',
      'Program Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo success',
      'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]',
      'Program log: Instruction: Transfer',
      'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2743 of 200000 compute units',
      'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
    ],
    postBalances: [
      345401736653,
      342930520,
      2039280,
      2039280,
      121159680,
      953185920,
    ],
    postTokenBalances: [
      {
        accountIndex: 2,
        mint: 'kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6',
        owner: 'HSC3rrZf8hwiyayKMwNz9HPk5ZFvrBH6YvyPugRK7eFV',
        uiTokenAmount: {
          amount: '1666054560602',
          decimals: 5,
          uiAmount: 16660545.60602,
          uiAmountString: '16660545.60602',
        },
      },
      {
        accountIndex: 3,
        mint: 'kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6',
        owner: '4gSyGCp2nDtJ64Tzowz2e73P2qEbsnLcsdr6vKcGG6fX',
        uiTokenAmount: {
          amount: '3070200000',
          decimals: 5,
          uiAmount: 30702,
          uiAmountString: '30702',
        },
      },
    ],
    preBalances: [
      345401746653,
      342930520,
      2039280,
      2039280,
      121159680,
      953185920,
    ],
    preTokenBalances: [
      {
        accountIndex: 2,
        mint: 'kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6',
        owner: 'HSC3rrZf8hwiyayKMwNz9HPk5ZFvrBH6YvyPugRK7eFV',
        uiTokenAmount: {
          amount: '1666153460602',
          decimals: 5,
          uiAmount: 16661534.60602,
          uiAmountString: '16661534.60602',
        },
      },
      {
        accountIndex: 3,
        mint: 'kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6',
        owner: '4gSyGCp2nDtJ64Tzowz2e73P2qEbsnLcsdr6vKcGG6fX',
        uiTokenAmount: {
          amount: '2971300000',
          decimals: 5,
          uiAmount: 29713,
          uiAmountString: '29713',
        },
      },
    ],
  },
  slot: 120917735,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: new PublicKey('agsWhfJ5PPGjmzMieWY8BR5o1XRVszUBQ5uFz4CtDiJ'),
          signer: true,
          writable: true,
        },
        {
          pubkey: new PublicKey('HSC3rrZf8hwiyayKMwNz9HPk5ZFvrBH6YvyPugRK7eFV'),
          signer: true,
          writable: false,
        },
        {
          pubkey: new PublicKey('A2Ka8LjhFwkDhUe8xsu1Hr1utNrnqoYNsGi5RDpnjAwe'),
          signer: false,
          writable: true,
        },
        {
          pubkey: new PublicKey('6g1G8NKqgDhFvzE4pcxyTyf3jm4Cs73kupym65wmTuHi'),
          signer: false,
          writable: true,
        },
        {
          pubkey: new PublicKey('Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo'),
          signer: false,
          writable: false,
        },
        {
          pubkey: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
          signer: false,
          writable: false,
        },
      ],
      instructions: [
        {
          parsed: 'JeACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
          program: 'spl-memo',
          programId: new PublicKey(
            'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo'
          ),
        },
        {
          parsed: {
            info: {
              amount: '98900000',
              authority: 'HSC3rrZf8hwiyayKMwNz9HPk5ZFvrBH6YvyPugRK7eFV',
              destination: '6g1G8NKqgDhFvzE4pcxyTyf3jm4Cs73kupym65wmTuHi',
              source: 'A2Ka8LjhFwkDhUe8xsu1Hr1utNrnqoYNsGi5RDpnjAwe',
            },
            type: 'transfer',
          },
          program: 'spl-token',
          programId: new PublicKey(
            'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
          ),
        },
      ],
      recentBlockhash: 'CZDS2HaBotuuwny3fHSiTnweheeiHs3EMY2YoLx3Syau',
    },
    signatures: [
      '4ikpiH1EbWGJFzau5hpyjHep4cJG4vWcPvzCqGH4YdJuv5smbaYuVnv8spU8vWx1vzjahZrnAaNgCQ3jdRU5G1M5',
      '4R7nSa53FGVchDJRF5Xhx8s6LKXzKqWegqXfLygU71g4fujojH8YP1kXG5yHx6wZfapkMMqHXXAYjt2PjRXm38Yv',
    ],
  },
};
