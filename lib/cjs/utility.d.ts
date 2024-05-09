/// <reference types="bn.js" />
/// <reference types="jito-ts/node_modules/@solana/web3.js" />
import { Commitment, Connection, PublicKey } from "@solana/web3.js";
import { Token } from "@raydium-io/raydium-sdk";
export declare function checkFileExists(filePath: string): Promise<boolean>;
export declare const xWeiAmount: (amount: number, decimals: number) => any;
export declare const getConnection: (commitment: Commitment) => Connection;
export declare const getWalletAccounts: (connection: Connection, wallet: PublicKey) => Promise<{
    pubkey: PublicKey;
    programId: PublicKey;
    accountInfo: {
        mint: PublicKey;
        delegate: PublicKey;
        owner: PublicKey;
        state: number;
        amount: import("bn.js");
        delegateOption: number;
        isNativeOption: number;
        isNative: import("bn.js");
        delegatedAmount: import("bn.js");
        closeAuthorityOption: number;
        closeAuthority: PublicKey;
    };
}[]>;
export declare const getAvailablePoolKeyAndPoolInfo: (connection: Connection, baseToken: Token, quoteToken: Token, marketAccounts: any) => Promise<{
    poolKeys: any;
    poolInfo: any;
}>;
export declare function getATAAddress(programId: PublicKey, owner: PublicKey, mint: PublicKey): {
    publicKey: PublicKey;
    nonce: number;
};
export declare const sleep: (ms: number) => Promise<unknown>;
