/// <reference types="jito-ts/node_modules/@solana/web3.js" />
import { Connection, Keypair } from "@solana/web3.js";
import { SPL_ERROR } from "./global";
export declare const createAndSendBundleTransaction: (connection: Connection, fee: number, bundleTransactions: any, payer: Keypair) => Promise<boolean | SPL_ERROR.E_FAIL>;
