"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.getATAAddress = exports.getAvailablePoolKeyAndPoolInfo = exports.getWalletAccounts = exports.getConnection = exports.xWeiAmount = exports.checkFileExists = void 0;
var bn_js_1 = __importDefault(require("bn.js"));
var fs = __importStar(require("fs"));
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var web3_js_1 = require("@solana/web3.js");
var global_1 = require("./global");
var spl_token_1 = require("@solana/spl-token");
var raydium_sdk_1 = require("@raydium-io/raydium-sdk");
var serum_1 = require("@project-serum/serum");
function checkFileExists(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs.promises.access(filePath, fs.constants.F_OK)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true]; // File exists
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, false]; // File doesn't exist
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.checkFileExists = checkFileExists;
var xWeiAmount = function (amount, decimals) {
    return new bn_js_1.default(new bignumber_js_1.default(amount.toString() + "e" + decimals.toString()).toFixed(0));
};
exports.xWeiAmount = xWeiAmount;
var getConnection = function (commitment) {
    return new web3_js_1.Connection(global_1.EnvironmentManager.getRpcNetUrl(), commitment);
};
exports.getConnection = getConnection;
var getWalletAccounts = function (connection, wallet) { return __awaiter(void 0, void 0, void 0, function () {
    var wallet_token_account;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, connection.getTokenAccountsByOwner(wallet, {
                    programId: spl_token_1.TOKEN_PROGRAM_ID
                })];
            case 1:
                wallet_token_account = _a.sent();
                return [2 /*return*/, wallet_token_account.value.map(function (i) { return ({
                        pubkey: i.pubkey,
                        programId: i.account.owner,
                        accountInfo: raydium_sdk_1.SPL_ACCOUNT_LAYOUT.decode(i.account.data)
                    }); })];
        }
    });
}); };
exports.getWalletAccounts = getWalletAccounts;
var getAvailablePoolKeyAndPoolInfo = function (connection, baseToken, quoteToken, marketAccounts) { return __awaiter(void 0, void 0, void 0, function () {
    var bFound, count, poolKeys, poolInfo, marketInfo, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bFound = false;
                count = 0;
                _a.label = 1;
            case 1:
                if (!(bFound === false && count < marketAccounts.length)) return [3 /*break*/, 6];
                marketInfo = serum_1.MARKET_STATE_LAYOUT_V3.decode(marketAccounts[count].accountInfo.data);
                poolKeys = raydium_sdk_1.Liquidity.getAssociatedPoolKeys({
                    version: 4,
                    marketVersion: 3,
                    baseMint: baseToken.mint,
                    quoteMint: quoteToken.mint,
                    baseDecimals: baseToken.decimals,
                    quoteDecimals: quoteToken.decimals,
                    marketId: marketAccounts[count].publicKey,
                    programId: global_1.EnvironmentManager.getProgramID().AmmV4,
                    marketProgramId: global_1.EnvironmentManager.getProgramID().OPENBOOK_MARKET
                });
                poolKeys.marketBaseVault = marketInfo.baseVault;
                poolKeys.marketQuoteVault = marketInfo.quoteVault;
                poolKeys.marketBids = marketInfo.bids;
                poolKeys.marketAsks = marketInfo.asks;
                poolKeys.marketEventQueue = marketInfo.eventQueue;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, raydium_sdk_1.Liquidity.fetchInfo({
                        connection: connection,
                        poolKeys: poolKeys
                    })];
            case 3:
                poolInfo = _a.sent();
                bFound = true;
                console.log("Success to get pool infos...");
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                bFound = false;
                poolInfo = undefined;
                poolKeys = undefined;
                console.log("Failed to get pool infos...");
                return [3 /*break*/, 5];
            case 5:
                count++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/, {
                    poolKeys: poolKeys,
                    poolInfo: poolInfo
                }];
        }
    });
}); };
exports.getAvailablePoolKeyAndPoolInfo = getAvailablePoolKeyAndPoolInfo;
function getATAAddress(programId, owner, mint) {
    var _a = (0, raydium_sdk_1.findProgramAddress)([owner.toBuffer(), programId.toBuffer(), mint.toBuffer()], new web3_js_1.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL")), publicKey = _a.publicKey, nonce = _a.nonce;
    return { publicKey: publicKey, nonce: nonce };
}
exports.getATAAddress = getATAAddress;
var sleep = function (ms) { return new Promise(function (r) { return setTimeout(r, ms); }); };
exports.sleep = sleep;
