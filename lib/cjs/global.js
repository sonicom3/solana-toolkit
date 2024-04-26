const dotenv = require('dotenv');
const bs58 = require('bs58');
const BigNumber = require('bignumber.js');
const BN = require('bn.js');
var colors = require('colors');
const { Connection, clusterApiUrl } = require('@solana/web3.js');
const {
  getKeypairFromEnvironment,
} = require('@solana-developers/node-helpers');
const { TOKEN_PROGRAM_ID } = require('@solana/spl-token');
const {
  DEVNET_PROGRAM_ID,
  MAINNET_PROGRAM_ID,
  TxVersion,
  LOOKUP_TABLE_CACHE,
} = require('@raydium-io/raydium-sdk');
const { TransactionMessage } = require('@solana/web3.js/lib/index.cjs');

dotenv.config();

const DEVNET_MODE = process.env.DEVNET_MODE === 'true';
const NET_URL = DEVNET_MODE
  ? clusterApiUrl('devnet')
  : process.env.MAINNET_RPC_URL;
const connection = new Connection(NET_URL, 'confirmed');
const BUNDLR_URL =
  DEVNET_MODE === false
    ? 'https://node1.bundlr.network'
    : 'https://devnet.bundlr.network';
const PROGRAMIDS = DEVNET_MODE ? DEVNET_PROGRAM_ID : MAINNET_PROGRAM_ID;
const addLookupTableInfo = DEVNET_MODE ? undefined : LOOKUP_TABLE_CACHE;

const USING_JITO = process.env.USING_JITO_BUNDLE === 'true' ? true : false;

const owner = getKeypairFromEnvironment('OWNER_PRIVATE_KEY');

const makeTxVersion = TxVersion.V0; // LEGACY

const xWeiAmount = (amount, decimals) => {
  return new BN(
    new BigNumber(amount.toString() + 'e' + decimals.toString()).toFixed(0)
  );
};

const xReadableAmount = (amount, decimals) => {
  return new BN(
    new BigNumber(amount.toString() + 'e-' + decimals.toString()).toFixed(0)
  );
};

const getWalletTokenAccount = async (wallet) => {
  const walletTokenAccount = await connection.getTokenAccountsByOwner(wallet, {
    programId: TOKEN_PROGRAM_ID,
  });
  return walletTokenAccount.value.map((i) => ({
    pubkey: i.pubkey,
    programId: i.account.owner,
    accountInfo: SPL_ACCOUNT_LAYOUT.decode(i.account.data),
  }));
};

const getWalletTokenBalance = async (wallet, tokenAddress, tokenDecimals) => {
  let walletPub = wallet;
  if (typeof wallet === 'string') {
    walletPub = new PublicKey(wallet);
  }

  const walletTokenAccounts = await getWalletTokenAccount(walletPub);

  let tokenBalance = 0;
  if (walletTokenAccounts && walletTokenAccounts.length > 0) {
    for (const acc of walletTokenAccounts) {
      if (acc.accountInfo.mint.toBase58() === tokenAddress.toBase58()) {
        tokenBalance = Number(acc.accountInfo.amount) / 10 ** tokenDecimals;
        break;
      }
    }
  }

  return tokenBalance;
};

const getWalletSOLBalance = async (wallet) => {
  try {
    let balance = (await connection.getBalance(wallet)) / LAMPORTS_PER_SOL;
    return balance;
  } catch (error) {
    console.log(error);
  }

  return 0;
};

module.exports = {
  dotenv,
  bs58,
  colors,
  connection,
  owner,
  BUNDLR_URL,
  NET_URL,
  PROGRAMIDS,
  BN,
  addLookupTableInfo,
  USING_JITO,
  DEVNET_MODE,
  makeTxVersion,
  xWeiAmount,
  xReadableAmount,
  getWalletTokenBalance,
  getWalletSOLBalance,
  getWalletTokenAccount,
};
