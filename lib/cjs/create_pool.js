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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPool = void 0;
var web3_js_1 = require("@solana/web3.js");
var global_1 = require("./global");
var spl_token_1 = require("@solana/spl-token");
var raydium_sdk_1 = require("@raydium-io/raydium-sdk");
var serum_1 = require("@project-serum/serum");
var utiles = __importStar(require("./utility"));
var bn_js_1 = require("bn.js");
var createPool = function (connection, token_owner, token_address, input_token_amount, input_quote_amount) { return __awaiter(void 0, void 0, void 0, function () {
    var token_mint, mint_info, base_token, quote_token_info, quote_token, accounts, market_id, start_time, base_amount, quote_amount, wallet_token_accounts, _a, innerTransactions, address, txns, _b, error_1;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 7, , 8]);
                if (token_address.length <= 0) {
                    console.log("Error: [Create Pool] invalid argument for create pool");
                    return [2 /*return*/, { result: global_1.SPL_ERROR.E_INVALID_ARGUE, value: undefined }];
                }
                console.log("<---------------------[Create Pool]-----------------------");
                token_mint = new web3_js_1.PublicKey(token_address);
                return [4 /*yield*/, (0, spl_token_1.getMint)(connection, token_mint)];
            case 1:
                mint_info = _d.sent();
                base_token = new raydium_sdk_1.Token(spl_token_1.TOKEN_PROGRAM_ID, token_address, mint_info.decimals);
                quote_token_info = global_1.EnvironmentManager.getQuoteTokenInfo();
                quote_token = new raydium_sdk_1.Token(spl_token_1.TOKEN_PROGRAM_ID, quote_token_info.address, quote_token_info.decimal, quote_token_info.symbol, quote_token_info.name);
                return [4 /*yield*/, serum_1.Market.findAccountsByMints(connection, base_token.mint, quote_token.mint, global_1.EnvironmentManager.getProgramID().OPENBOOK_MARKET)];
            case 2:
                accounts = _d.sent();
                if (accounts.length === 0) {
                    throw "Get market account failed";
                }
                console.log("Market Found");
                market_id = accounts[0].publicKey;
                start_time = Math.floor(Date.now() / 1000);
                base_amount = utiles.xWeiAmount(input_token_amount, base_token.decimals);
                quote_amount = utiles.xWeiAmount(input_quote_amount, quote_token.decimals);
                return [4 /*yield*/, utiles.getWalletAccounts(connection, token_owner.publicKey)];
            case 3:
                wallet_token_accounts = _d.sent();
                if (!wallet_token_accounts || wallet_token_accounts.length <= 0) {
                    throw "Get wallet account failed";
                }
                return [4 /*yield*/, raydium_sdk_1.Liquidity.makeCreatePoolV4InstructionV2Simple({
                        connection: connection,
                        programId: global_1.EnvironmentManager.getProgramID().AmmV4,
                        marketInfo: {
                            marketId: market_id,
                            programId: global_1.EnvironmentManager.getProgramID().OPENBOOK_MARKET
                        },
                        baseMintInfo: base_token,
                        quoteMintInfo: quote_token,
                        baseAmount: base_amount,
                        quoteAmount: quote_amount,
                        startTime: new bn_js_1.BN(start_time),
                        ownerInfo: {
                            feePayer: token_owner.publicKey,
                            wallet: token_owner.publicKey,
                            tokenAccounts: wallet_token_accounts,
                            useSOLBalance: true
                        },
                        makeTxVersion: raydium_sdk_1.TxVersion.V0,
                        associatedOnly: false,
                        checkCreateATAOwner: true,
                        feeDestinationId: global_1.EnvironmentManager.getFeeDestinationId()
                    })];
            case 4:
                _a = _d.sent(), innerTransactions = _a.innerTransactions, address = _a.address;
                _b = raydium_sdk_1.buildSimpleTransaction;
                _c = {
                    connection: connection,
                    makeTxVersion: raydium_sdk_1.TxVersion.V0,
                    payer: token_owner.publicKey,
                    innerTransactions: innerTransactions,
                    addLookupTableInfo: global_1.EnvironmentManager.getCacheLTA()
                };
                return [4 /*yield*/, connection.getLatestBlockhash()];
            case 5: return [4 /*yield*/, _b.apply(void 0, [(_c.recentBlockhash = (_d.sent()).blockhash,
                        _c)])];
            case 6:
                txns = _d.sent();
                console.log("Success: [Create Pool] made transaction successfully");
                return [2 /*return*/, { result: global_1.SPL_ERROR.E_OK, value: txns }];
            case 7:
                error_1 = _d.sent();
                console.error("Error: [Create Pool] err: ", error_1);
                return [2 /*return*/, { result: global_1.SPL_ERROR.E_FAIL, value: undefined }];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.createPool = createPool;
