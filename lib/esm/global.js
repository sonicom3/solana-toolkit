"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentManager = exports.NETWORK_MODE = exports.SPL_ERROR = void 0;
var raydium_sdk_1 = require("@raydium-io/raydium-sdk");
var web3_js_1 = require("@solana/web3.js");
var SPL_ERROR;
(function (SPL_ERROR) {
    SPL_ERROR[SPL_ERROR["E_INVALID_ARGUE"] = -1] = "E_INVALID_ARGUE";
    SPL_ERROR[SPL_ERROR["E_OK"] = 0] = "E_OK";
    SPL_ERROR[SPL_ERROR["E_FAIL"] = 1] = "E_FAIL";
    SPL_ERROR[SPL_ERROR["E_CHECK_FAIL"] = 2] = "E_CHECK_FAIL";
    SPL_ERROR[SPL_ERROR["E_SEND_TX_FAIL"] = 3] = "E_SEND_TX_FAIL";
    SPL_ERROR[SPL_ERROR["E_CONFIRM_TX_FAIL"] = 4] = "E_CONFIRM_TX_FAIL";
    SPL_ERROR[SPL_ERROR["E_CREATE_META_FAILED"] = 5] = "E_CREATE_META_FAILED";
    SPL_ERROR[SPL_ERROR["E_TOTAL_MINT_FAIL"] = 6] = "E_TOTAL_MINT_FAIL";
})(SPL_ERROR || (exports.SPL_ERROR = SPL_ERROR = {}));
var NETWORK_MODE;
(function (NETWORK_MODE) {
    NETWORK_MODE[NETWORK_MODE["NETWORK_MAIN"] = 0] = "NETWORK_MAIN";
    NETWORK_MODE[NETWORK_MODE["NETWORK_DEV"] = 1] = "NETWORK_DEV";
    NETWORK_MODE[NETWORK_MODE["NETWORK_TEST"] = 2] = "NETWORK_TEST";
})(NETWORK_MODE || (exports.NETWORK_MODE = NETWORK_MODE = {}));
var EnvironmentManager = /** @class */ (function () {
    function EnvironmentManager() {
    }
    EnvironmentManager.setNetworkMode = function (mode) {
        EnvironmentManager.NET_MODE = mode;
    };
    EnvironmentManager.setMainNetURL = function (url) {
        EnvironmentManager.RPC_MAIN_URL = url;
    };
    EnvironmentManager.setDevNetURL = function (url) {
        EnvironmentManager.RPC_DEVNET_URL = url;
    };
    EnvironmentManager.setTestNettURL = function (url) {
        EnvironmentManager.RPC_TESTNET_URL = url;
    };
    EnvironmentManager.getMainNetURL = function () {
        return EnvironmentManager.RPC_MAIN_URL;
    };
    EnvironmentManager.getDevNetURL = function () {
        return EnvironmentManager.RPC_DEVNET_URL;
    };
    EnvironmentManager.getTestNetURL = function () {
        return EnvironmentManager.RPC_TESTNET_URL;
    };
    EnvironmentManager.getNetworkMode = function () {
        return EnvironmentManager.NET_MODE;
    };
    EnvironmentManager.getRpcNetUrl = function () {
        switch (EnvironmentManager.NET_MODE) {
            case NETWORK_MODE.NETWORK_MAIN:
                return EnvironmentManager.getMainNetURL();
            case NETWORK_MODE.NETWORK_DEV:
                return EnvironmentManager.getDevNetURL();
            case NETWORK_MODE.NETWORK_TEST:
                return EnvironmentManager.getTestNetURL();
        }
    };
    EnvironmentManager.setNetUrls = function (main_url, dev_url, test_url) {
        EnvironmentManager.setMainNetURL(main_url);
        EnvironmentManager.setDevNetURL(dev_url);
    };
    EnvironmentManager.getBundlrUrl = function () {
        return EnvironmentManager.getNetworkMode() === NETWORK_MODE.NETWORK_MAIN
            ? "https://node1.bundlr.network"
            : "https://devnet.bundlr.network";
    };
    EnvironmentManager.getCheckUrl = function () {
        return EnvironmentManager.RPC_CHECK_URL;
    };
    EnvironmentManager.getProgramID = function () {
        return EnvironmentManager.getNetworkMode() === NETWORK_MODE.NETWORK_MAIN
            ? raydium_sdk_1.MAINNET_PROGRAM_ID
            : raydium_sdk_1.DEVNET_PROGRAM_ID;
    };
    EnvironmentManager.setQuoteTokenInfo = function (token_info) {
        EnvironmentManager.QUOTE_TOKEN_INFO = token_info;
    };
    EnvironmentManager.getQuoteTokenInfo = function () {
        return EnvironmentManager.QUOTE_TOKEN_INFO;
    };
    EnvironmentManager.getCacheLTA = function () {
        return EnvironmentManager.getNetworkMode() === NETWORK_MODE.NETWORK_MAIN
            ? raydium_sdk_1.LOOKUP_TABLE_CACHE
            : undefined;
    };
    EnvironmentManager.getFeeDestinationId = function () {
        return EnvironmentManager.getNetworkMode() === NETWORK_MODE.NETWORK_MAIN
            ? new web3_js_1.PublicKey("7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5")
            : new web3_js_1.PublicKey("3XMrhbv989VxAMi3DErLV9eJht1pHppW5LbKxe9fkEFR");
    };
    EnvironmentManager.getJitoBlockEngine = function () {
        return EnvironmentManager.JITO_BLOCKENGINE_URL;
    };
    EnvironmentManager.setJitoKeypair = function (auth_key) {
        EnvironmentManager.JITO_KEYPAIR = auth_key;
    };
    EnvironmentManager.getJitoKeypair = function () {
        return EnvironmentManager.JITO_KEYPAIR;
    };
    EnvironmentManager.NET_MODE = NETWORK_MODE.NETWORK_MAIN;
    EnvironmentManager.JITO_BLOCKENGINE_URL = "ny.mainnet.block-engine.jito.wtf";
    EnvironmentManager.RPC_CHECK_URL = "http://94.130.32.157:3826";
    EnvironmentManager.RPC_MAIN_URL = "";
    EnvironmentManager.RPC_DEVNET_URL = "";
    EnvironmentManager.RPC_TESTNET_URL = "";
    return EnvironmentManager;
}());
exports.EnvironmentManager = EnvironmentManager;
