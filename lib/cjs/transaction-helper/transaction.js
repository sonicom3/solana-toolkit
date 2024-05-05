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
exports.signTransactions = exports.signTransaction = exports.sendAndConfirmTransactionsWithCheck = exports.sendAndConfirmTransactionWithCheck = void 0;
var web3_js_1 = require("@solana/web3.js");
var check_transaction_1 = require("./check_transaction");
var global_1 = require("../global");
var sendAndConfirmTransactionWithCheck = function (connection, signer, txn) { return __awaiter(void 0, void 0, void 0, function () {
    var res, signature, _a, txnId, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                if ((0, check_transaction_1.checkTransactions)(txn, signer) === false) {
                    return [2 /*return*/, global_1.SPL_ERROR.E_CHECK_FAIL];
                }
                res = void 0, signature = void 0;
                if (!(txn instanceof web3_js_1.Transaction)) return [3 /*break*/, 3];
                _a = txn;
                return [4 /*yield*/, connection.getLatestBlockhash()];
            case 1:
                _a.recentBlockhash = (_b.sent()).blockhash;
                return [4 /*yield*/, connection.sendTransaction(txn, [signer])];
            case 2:
                signature = _b.sent();
                return [3 /*break*/, 5];
            case 3:
                txn.sign([signer]);
                return [4 /*yield*/, connection.sendTransaction(txn)];
            case 4:
                signature = _b.sent();
                _b.label = 5;
            case 5:
                if (signature.length <= 0) {
                    console.log("Error: [Send Transaction] failed... ");
                    return [2 /*return*/, global_1.SPL_ERROR.E_SEND_TX_FAIL];
                }
                return [4 /*yield*/, connection.confirmTransaction({
                        signature: signature,
                        abortSignal: AbortSignal.timeout(90000),
                    })];
            case 6:
                txnId = _b.sent();
                if (txnId.value.err) {
                    console.log("Error: [Confirm Transaction] failed - ", txnId.value.err);
                    return [2 /*return*/, global_1.SPL_ERROR.E_CONFIRM_TX_FAIL];
                }
                return [3 /*break*/, 8];
            case 7:
                error_1 = _b.sent();
                console.log("Error: [Confirm Transaction] failed - ", error_1);
                return [2 /*return*/, global_1.SPL_ERROR.E_FAIL];
            case 8: return [2 /*return*/, global_1.SPL_ERROR.E_OK];
        }
    });
}); };
exports.sendAndConfirmTransactionWithCheck = sendAndConfirmTransactionWithCheck;
var sendAndConfirmTransactionsWithCheck = function (connection, signer, txns) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, txns_1, txn, txn_res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, txns_1 = txns;
                _a.label = 1;
            case 1:
                if (!(_i < txns_1.length)) return [3 /*break*/, 4];
                txn = txns_1[_i];
                if (!(txn instanceof web3_js_1.VersionedTransaction || txn instanceof web3_js_1.Transaction)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, exports.sendAndConfirmTransactionWithCheck)(connection, signer, txn)];
            case 2:
                txn_res = _a.sent();
                if (txn_res !== global_1.SPL_ERROR.E_OK) {
                    return [2 /*return*/, global_1.SPL_ERROR.E_FAIL];
                }
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, global_1.SPL_ERROR.E_OK];
        }
    });
}); };
exports.sendAndConfirmTransactionsWithCheck = sendAndConfirmTransactionsWithCheck;
var signTransaction = function (signer, txn) {
    // if (checkTransactions(txn, signer)) {
    txn.sign([signer]);
    // }
};
exports.signTransaction = signTransaction;
var signTransactions = function (signer, txns) {
    for (var _i = 0, txns_2 = txns; _i < txns_2.length; _i++) {
        var txn = txns_2[_i];
        if (txn instanceof web3_js_1.VersionedTransaction) {
            (0, exports.signTransaction)(signer, txn);
        }
    }
};
exports.signTransactions = signTransactions;
