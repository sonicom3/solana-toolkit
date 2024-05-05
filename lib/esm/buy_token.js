"use strict";
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
exports.buyToken = void 0;
var web3_js_1 = require("@solana/web3.js");
var global_1 = require("./global");
var spl_token_1 = require("@solana/spl-token");
var raydium_sdk_1 = require("@raydium-io/raydium-sdk");
var utility_1 = require("./utility");
var buyToken = function (connection, buyer, token_address, base_amount, quote_amount, pool_key) { return __awaiter(void 0, void 0, void 0, function () {
    var token_mint, token_info, base_token, quote_info, quote_token, base_token_amount, quote_token_amount, wallet_token_accounts, innerTransactions, transactions, _a, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (token_address.length <= 0 || base_amount <= 0) {
                    console.error("Error: [Buy Token] invalid argument iput!!!");
                    return [2 /*return*/, { result: global_1.SPL_ERROR.E_INVALID_ARGUE, value: undefined }];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 7, , 8]);
                token_mint = new web3_js_1.PublicKey(token_address);
                return [4 /*yield*/, (0, spl_token_1.getMint)(connection, token_mint)];
            case 2:
                token_info = _c.sent();
                base_token = new raydium_sdk_1.Token(spl_token_1.TOKEN_PROGRAM_ID, token_address, token_info.decimals);
                quote_info = global_1.EnvironmentManager.getQuoteTokenInfo();
                quote_token = new raydium_sdk_1.Token(spl_token_1.TOKEN_PROGRAM_ID, quote_info.address, quote_info.decimal, quote_info.symbol, quote_info.name);
                base_token_amount = new raydium_sdk_1.TokenAmount(base_token, base_amount * 0.95, false);
                quote_token_amount = new raydium_sdk_1.TokenAmount(quote_token, quote_amount, false);
                return [4 /*yield*/, (0, utility_1.getWalletAccounts)(connection, buyer.publicKey)];
            case 3:
                wallet_token_accounts = _c.sent();
                return [4 /*yield*/, raydium_sdk_1.Liquidity.makeSwapInstructionSimple({
                        connection: connection,
                        poolKeys: pool_key,
                        userKeys: {
                            tokenAccounts: wallet_token_accounts,
                            owner: buyer.publicKey,
                        },
                        amountIn: quote_token_amount,
                        amountOut: base_token_amount,
                        fixedSide: "in",
                        makeTxVersion: raydium_sdk_1.TxVersion.V0,
                    })];
            case 4:
                innerTransactions = (_c.sent()).innerTransactions;
                _a = raydium_sdk_1.buildSimpleTransaction;
                _b = {
                    connection: connection,
                    makeTxVersion: raydium_sdk_1.TxVersion.V0,
                    payer: buyer.publicKey,
                    innerTransactions: innerTransactions,
                    addLookupTableInfo: global_1.EnvironmentManager.getCacheLTA()
                };
                return [4 /*yield*/, connection.getLatestBlockhash()];
            case 5: return [4 /*yield*/, _a.apply(void 0, [(_b.recentBlockhash = (_c.sent()).blockhash,
                        _b)])];
            case 6:
                transactions = _c.sent();
                return [2 /*return*/, { result: global_1.SPL_ERROR.E_OK, value: transactions }];
            case 7:
                error_1 = _c.sent();
                console.error("Error: [buy Tokens] error code: ", error_1);
                return [2 /*return*/, { result: global_1.SPL_ERROR.E_FAIL, value: undefined }];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.buyToken = buyToken;
