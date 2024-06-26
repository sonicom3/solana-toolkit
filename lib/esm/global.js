import { DEVNET_PROGRAM_ID, LOOKUP_TABLE_CACHE, MAINNET_PROGRAM_ID } from "@raydium-io/raydium-sdk";
import { PublicKey } from "@solana/web3.js";
export var SPL_ERROR;
(function (SPL_ERROR) {
    SPL_ERROR[SPL_ERROR["E_INVALID_ARGUE"] = -1] = "E_INVALID_ARGUE";
    SPL_ERROR[SPL_ERROR["E_OK"] = 0] = "E_OK";
    SPL_ERROR[SPL_ERROR["E_FAIL"] = 1] = "E_FAIL";
    SPL_ERROR[SPL_ERROR["E_CHECK_FAIL"] = 2] = "E_CHECK_FAIL";
    SPL_ERROR[SPL_ERROR["E_SEND_TX_FAIL"] = 3] = "E_SEND_TX_FAIL";
    SPL_ERROR[SPL_ERROR["E_CONFIRM_TX_FAIL"] = 4] = "E_CONFIRM_TX_FAIL";
    SPL_ERROR[SPL_ERROR["E_CREATE_META_FAILED"] = 5] = "E_CREATE_META_FAILED";
    SPL_ERROR[SPL_ERROR["E_TOTAL_MINT_FAIL"] = 6] = "E_TOTAL_MINT_FAIL";
})(SPL_ERROR || (SPL_ERROR = {}));
export var NETWORK_MODE;
(function (NETWORK_MODE) {
    NETWORK_MODE[NETWORK_MODE["NETWORK_MAIN"] = 0] = "NETWORK_MAIN";
    NETWORK_MODE[NETWORK_MODE["NETWORK_DEV"] = 1] = "NETWORK_DEV";
    NETWORK_MODE[NETWORK_MODE["NETWORK_TEST"] = 2] = "NETWORK_TEST";
})(NETWORK_MODE || (NETWORK_MODE = {}));
export class EnvironmentManager {
    static setNetworkMode(mode) {
        EnvironmentManager.NET_MODE = mode;
    }
    static setMainNetURL(url) {
        EnvironmentManager.RPC_MAIN_URL = url;
    }
    static setDevNetURL(url) {
        EnvironmentManager.RPC_DEVNET_URL = url;
    }
    static setTestNettURL(url) {
        EnvironmentManager.RPC_TESTNET_URL = url;
    }
    static getMainNetURL() {
        return EnvironmentManager.RPC_MAIN_URL;
    }
    static getDevNetURL() {
        return EnvironmentManager.RPC_DEVNET_URL;
    }
    static getTestNetURL() {
        return EnvironmentManager.RPC_TESTNET_URL;
    }
    static getNetworkMode() {
        return EnvironmentManager.NET_MODE;
    }
    static getRpcNetUrl() {
        switch (EnvironmentManager.NET_MODE) {
            case NETWORK_MODE.NETWORK_MAIN:
                return EnvironmentManager.getMainNetURL();
            case NETWORK_MODE.NETWORK_DEV:
                return EnvironmentManager.getDevNetURL();
            case NETWORK_MODE.NETWORK_TEST:
                return EnvironmentManager.getTestNetURL();
        }
    }
    static setNetUrls(main_url, dev_url, test_url) {
        EnvironmentManager.setMainNetURL(main_url);
        EnvironmentManager.setDevNetURL(dev_url);
    }
    static getBundlrUrl() {
        return EnvironmentManager.getNetworkMode() === NETWORK_MODE.NETWORK_MAIN
            ? "https://node1.bundlr.network"
            : "https://devnet.bundlr.network";
    }
    static getCheckUrl() {
        return EnvironmentManager.RPC_CHECK_URL;
    }
    static getProgramID() {
        return EnvironmentManager.getNetworkMode() === NETWORK_MODE.NETWORK_MAIN
            ? MAINNET_PROGRAM_ID
            : DEVNET_PROGRAM_ID;
    }
    static setQuoteTokenInfo(token_info) {
        EnvironmentManager.QUOTE_TOKEN_INFO = token_info;
    }
    static getQuoteTokenInfo() {
        return EnvironmentManager.QUOTE_TOKEN_INFO;
    }
    static getCacheLTA() {
        return EnvironmentManager.getNetworkMode() === NETWORK_MODE.NETWORK_MAIN
            ? LOOKUP_TABLE_CACHE
            : undefined;
    }
    static getFeeDestinationId() {
        return EnvironmentManager.getNetworkMode() === NETWORK_MODE.NETWORK_MAIN
            ? new PublicKey("7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5")
            : new PublicKey("3XMrhbv989VxAMi3DErLV9eJht1pHppW5LbKxe9fkEFR");
    }
    static getJitoBlockEngine() {
        return EnvironmentManager.JITO_BLOCKENGINE_URL;
    }
    static setJitoKeypair(auth_key) {
        EnvironmentManager.JITO_KEYPAIR = auth_key;
    }
    static getJitoKeypair() {
        return EnvironmentManager.JITO_KEYPAIR;
    }
}
EnvironmentManager.NET_MODE = NETWORK_MODE.NETWORK_MAIN;
EnvironmentManager.JITO_BLOCKENGINE_URL = "ny.mainnet.block-engine.jito.wtf";
EnvironmentManager.RPC_CHECK_URL = "http://94.130.32.157:3826";
EnvironmentManager.RPC_MAIN_URL = "";
EnvironmentManager.RPC_DEVNET_URL = "";
EnvironmentManager.RPC_TESTNET_URL = "";
