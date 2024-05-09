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
exports.createAndSendBundleTransaction = void 0;
var web3_js_1 = require("@solana/web3.js");
var searcher_1 = require("jito-ts/dist/sdk/block-engine/searcher");
var global_1 = require("./global");
var types_1 = require("jito-ts/dist/sdk/block-engine/types");
var utils = require("./utility");
var transaction_1 = require("./transaction-helper/transaction");
var bs58_1 = require("bs58");
var createAndSendBundleTransaction = function (connection, fee, bundleTransactions, payer) { return __awaiter(void 0, void 0, void 0, function () {
    var seacher, _tipAccount, tipAccount, transactionsConfirmResult, breakCheckTransactionStatus, recentBlockhash, bundleTransaction, i, bundleTx, trxHash, result, error_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                seacher = (0, searcher_1.searcherClient)(global_1.EnvironmentManager.getJitoBlockEngine(), global_1.EnvironmentManager.getJitoKeypair());
                return [4 /*yield*/, seacher.getTipAccounts()];
            case 1:
                _tipAccount = (_a.sent())[0];
                tipAccount = new web3_js_1.PublicKey(_tipAccount);
                transactionsConfirmResult = false;
                breakCheckTransactionStatus = false;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 12, , 14]);
                return [4 /*yield*/, connection.getLatestBlockhash("finalized")];
            case 3:
                recentBlockhash = (_a.sent())
                    .blockhash;
                bundleTransaction = [];
                for (i = 0; i < bundleTransactions.length; i++) {
                    bundleTransactions[i].txn.message.recentBlockhash = recentBlockhash;
                    (0, transaction_1.signTransaction)(bundleTransactions[i].signer, bundleTransactions[i].txn);
                    bundleTransaction.push(bundleTransactions[i].txn);
                }
                bundleTx = new types_1.Bundle(bundleTransaction, 5);
                bundleTx.addTipTx(payer, fee, tipAccount, recentBlockhash);
                seacher.onBundleResult(function (bundleResult) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        console.log(bundleResult);
                        if (bundleResult.rejected) {
                            try {
                                if (bundleResult.rejected.simulationFailure.msg.includes("custom program error") ||
                                    bundleResult.rejected.simulationFailure.msg.includes("Error processing Instruction")) {
                                    breakCheckTransactionStatus = true;
                                }
                                else if (bundleResult.rejected.simulationFailure.msg.includes("This transaction has already been processed") ||
                                    bundleResult.rejected.droppedBundle.msg.includes("Bundle partially processed")) {
                                    transactionsConfirmResult = true;
                                    breakCheckTransactionStatus = true;
                                }
                            }
                            catch (error) { }
                        }
                        return [2 /*return*/];
                    });
                }); }, function (error) {
                    console.log("Bundle error:", error);
                    breakCheckTransactionStatus = true;
                });
                return [4 /*yield*/, seacher.sendBundle(bundleTx)];
            case 4:
                _a.sent();
                setTimeout(function () {
                    breakCheckTransactionStatus = true;
                }, 20000);
                trxHash = bs58_1.default.encode(bundleTransaction[bundleTransaction.length - 1].signatures[0]);
                _a.label = 5;
            case 5:
                if (!!breakCheckTransactionStatus) return [3 /*break*/, 11];
                return [4 /*yield*/, utils.sleep(2000)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                _a.trys.push([7, 9, , 10]);
                return [4 /*yield*/, connection.getSignatureStatus(trxHash, {
                        searchTransactionHistory: true,
                    })];
            case 8:
                result = _a.sent();
                if (result && result.value && result.value.confirmationStatus) {
                    transactionsConfirmResult = true;
                    breakCheckTransactionStatus = true;
                }
                return [3 /*break*/, 10];
            case 9:
                error_1 = _a.sent();
                transactionsConfirmResult = false;
                breakCheckTransactionStatus = true;
                return [3 /*break*/, 10];
            case 10: return [3 /*break*/, 5];
            case 11: return [2 /*return*/, transactionsConfirmResult];
            case 12:
                error_2 = _a.sent();
                console.error("Creating and sending bundle failed...", error_2);
                return [4 /*yield*/, utils.sleep(10000)];
            case 13:
                _a.sent();
                return [2 /*return*/, global_1.SPL_ERROR.E_FAIL];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.createAndSendBundleTransaction = createAndSendBundleTransaction;
