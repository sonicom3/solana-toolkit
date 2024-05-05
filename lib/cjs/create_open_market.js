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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOpenBookMarket = void 0;
var web3_js_1 = require("@solana/web3.js");
var global_1 = require("./global");
var raydium_sdk_1 = require("@raydium-io/raydium-sdk");
var spl_token_1 = require("@solana/spl-token");
var bn_js_1 = __importDefault(require("bn.js"));
var transactions = __importStar(require("./transaction-helper/transaction"));
function makeCreateMarketInstruction(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        function getVaultOwnerAndNonce() {
            var vaultSignerNonce = new bn_js_1.default(0);
            while (true) {
                try {
                    var vaultOwner_1 = web3_js_1.PublicKey.createProgramAddressSync([
                        market.publicKey.toBuffer(),
                        vaultSignerNonce.toArrayLike(Buffer, "le", 8)
                    ], dexProgramId);
                    return { vaultOwner: vaultOwner_1, vaultSignerNonce: vaultSignerNonce };
                }
                catch (e) {
                    vaultSignerNonce.iaddn(1);
                    if (vaultSignerNonce.gt(new bn_js_1.default(25555)))
                        throw Error("find vault owner error");
                }
            }
        }
        function initializeMarketInstruction(_a) {
            var programId = _a.programId, marketInfo = _a.marketInfo;
            var dataLayout = (0, raydium_sdk_1.struct)([
                (0, raydium_sdk_1.u8)("version"),
                (0, raydium_sdk_1.u32)("instruction"),
                (0, raydium_sdk_1.u64)("baseLotSize"),
                (0, raydium_sdk_1.u64)("quoteLotSize"),
                (0, raydium_sdk_1.u16)("feeRateBps"),
                (0, raydium_sdk_1.u64)("vaultSignerNonce"),
                (0, raydium_sdk_1.u64)("quoteDustThreshold")
            ]);
            var keys = [
                { pubkey: marketInfo.id, isSigner: false, isWritable: true },
                { pubkey: marketInfo.requestQueue, isSigner: false, isWritable: true },
                { pubkey: marketInfo.eventQueue, isSigner: false, isWritable: true },
                { pubkey: marketInfo.bids, isSigner: false, isWritable: true },
                { pubkey: marketInfo.asks, isSigner: false, isWritable: true },
                { pubkey: marketInfo.baseVault, isSigner: false, isWritable: true },
                { pubkey: marketInfo.quoteVault, isSigner: false, isWritable: true },
                { pubkey: marketInfo.baseMint, isSigner: false, isWritable: false },
                { pubkey: marketInfo.quoteMint, isSigner: false, isWritable: false },
                // Use a dummy address if using the new dex upgrade to save tx space.
                {
                    pubkey: marketInfo.authority
                        ? marketInfo.quoteMint
                        : web3_js_1.SYSVAR_RENT_PUBKEY,
                    isSigner: false,
                    isWritable: false
                }
            ]
                .concat(marketInfo.authority
                ? { pubkey: marketInfo.authority, isSigner: false, isWritable: false }
                : [])
                .concat(marketInfo.authority && marketInfo.pruneAuthority
                ? {
                    pubkey: marketInfo.pruneAuthority,
                    isSigner: false,
                    isWritable: false
                }
                : []);
            var data = Buffer.alloc(dataLayout.span);
            dataLayout.encode({
                version: 0,
                instruction: 0,
                baseLotSize: marketInfo.baseLotSize,
                quoteLotSize: marketInfo.quoteLotSize,
                feeRateBps: marketInfo.feeRateBps,
                vaultSignerNonce: marketInfo.vaultSignerNonce,
                quoteDustThreshold: marketInfo.quoteDustThreshold
            }, data);
            return new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: data
            });
        }
        var market, requestQueue, eventQueue, bids, asks, baseVault, quoteVault, feeRateBps, quoteDustThreshold, _c, vaultOwner, vaultSignerNonce, ZERO, baseLotSize, quoteLotSize, ins1, accountLamports, EVENT_QUEUE_ITEMS, REQUEST_QUEUE_ITEMS, ORDERBOOK_ITEMS, eventQueueSpace, requestQueueSpace, orderBookSpace, ins2, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, ins;
        var _s, _t, _u, _v, _w, _x;
        var connection = _b.connection, wallet = _b.wallet, baseInfo = _b.baseInfo, quoteInfo = _b.quoteInfo, lotSize = _b.lotSize, // 1
        tickSize = _b.tickSize, // 0.01
        dexProgramId = _b.dexProgramId, makeTxVersion = _b.makeTxVersion, lookupTableCache = _b.lookupTableCache;
        return __generator(this, function (_y) {
            switch (_y.label) {
                case 0:
                    market = (0, raydium_sdk_1.generatePubKey)({
                        fromPublicKey: wallet,
                        programId: dexProgramId
                    });
                    requestQueue = (0, raydium_sdk_1.generatePubKey)({
                        fromPublicKey: wallet,
                        programId: dexProgramId
                    });
                    eventQueue = (0, raydium_sdk_1.generatePubKey)({
                        fromPublicKey: wallet,
                        programId: dexProgramId
                    });
                    bids = (0, raydium_sdk_1.generatePubKey)({
                        fromPublicKey: wallet,
                        programId: dexProgramId
                    });
                    asks = (0, raydium_sdk_1.generatePubKey)({
                        fromPublicKey: wallet,
                        programId: dexProgramId
                    });
                    baseVault = (0, raydium_sdk_1.generatePubKey)({
                        fromPublicKey: wallet,
                        programId: spl_token_1.TOKEN_PROGRAM_ID
                    });
                    quoteVault = (0, raydium_sdk_1.generatePubKey)({
                        fromPublicKey: wallet,
                        programId: spl_token_1.TOKEN_PROGRAM_ID
                    });
                    feeRateBps = 0;
                    quoteDustThreshold = new bn_js_1.default(100);
                    _c = getVaultOwnerAndNonce(), vaultOwner = _c.vaultOwner, vaultSignerNonce = _c.vaultSignerNonce;
                    ZERO = new bn_js_1.default(0);
                    baseLotSize = new bn_js_1.default(Math.round(Math.pow(10, baseInfo.decimals) * lotSize));
                    quoteLotSize = new bn_js_1.default(Math.round(lotSize * Math.pow(10, quoteInfo.decimals) * tickSize));
                    if (baseLotSize.eq(ZERO))
                        throw Error("lot size is too small");
                    if (quoteLotSize.eq(ZERO))
                        throw Error("tick size or lot size is too small");
                    ins1 = [];
                    return [4 /*yield*/, connection.getMinimumBalanceForRentExemption(165)];
                case 1:
                    accountLamports = _y.sent();
                    ins1.push(web3_js_1.SystemProgram.createAccountWithSeed({
                        fromPubkey: wallet,
                        basePubkey: wallet,
                        seed: baseVault.seed,
                        newAccountPubkey: baseVault.publicKey,
                        lamports: accountLamports,
                        space: 165,
                        programId: spl_token_1.TOKEN_PROGRAM_ID
                    }), web3_js_1.SystemProgram.createAccountWithSeed({
                        fromPubkey: wallet,
                        basePubkey: wallet,
                        seed: quoteVault.seed,
                        newAccountPubkey: quoteVault.publicKey,
                        lamports: accountLamports,
                        space: 165,
                        programId: spl_token_1.TOKEN_PROGRAM_ID
                    }), (0, spl_token_1.createInitializeAccountInstruction)(baseVault.publicKey, baseInfo.mint, vaultOwner), (0, spl_token_1.createInitializeAccountInstruction)(quoteVault.publicKey, quoteInfo.mint, vaultOwner));
                    EVENT_QUEUE_ITEMS = 128;
                    REQUEST_QUEUE_ITEMS = 63;
                    ORDERBOOK_ITEMS = 201;
                    eventQueueSpace = EVENT_QUEUE_ITEMS * 88 + 44 + 48;
                    requestQueueSpace = REQUEST_QUEUE_ITEMS * 80 + 44 + 48;
                    orderBookSpace = ORDERBOOK_ITEMS * 80 + 44 + 48;
                    ins2 = [];
                    _e = (_d = ins2).push;
                    _g = (_f = web3_js_1.SystemProgram).createAccountWithSeed;
                    _s = {
                        fromPubkey: wallet,
                        basePubkey: wallet,
                        seed: market.seed,
                        newAccountPubkey: market.publicKey
                    };
                    return [4 /*yield*/, connection.getMinimumBalanceForRentExemption(raydium_sdk_1.MARKET_STATE_LAYOUT_V2.span)];
                case 2:
                    _h = [_g.apply(_f, [(_s.lamports = _y.sent(),
                                _s.space = raydium_sdk_1.MARKET_STATE_LAYOUT_V2.span,
                                _s.programId = dexProgramId,
                                _s)])];
                    _k = (_j = web3_js_1.SystemProgram).createAccountWithSeed;
                    _t = {
                        fromPubkey: wallet,
                        basePubkey: wallet,
                        seed: requestQueue.seed,
                        newAccountPubkey: requestQueue.publicKey
                    };
                    return [4 /*yield*/, connection.getMinimumBalanceForRentExemption(requestQueueSpace)];
                case 3:
                    _h = _h.concat([_k.apply(_j, [(_t.lamports = _y.sent(),
                                _t.space = requestQueueSpace,
                                _t.programId = dexProgramId,
                                _t)])]);
                    _m = (_l = web3_js_1.SystemProgram).createAccountWithSeed;
                    _u = {
                        fromPubkey: wallet,
                        basePubkey: wallet,
                        seed: eventQueue.seed,
                        newAccountPubkey: eventQueue.publicKey
                    };
                    return [4 /*yield*/, connection.getMinimumBalanceForRentExemption(eventQueueSpace)];
                case 4:
                    _h = _h.concat([_m.apply(_l, [(_u.lamports = _y.sent(),
                                _u.space = eventQueueSpace,
                                _u.programId = dexProgramId,
                                _u)])]);
                    _p = (_o = web3_js_1.SystemProgram).createAccountWithSeed;
                    _v = {
                        fromPubkey: wallet,
                        basePubkey: wallet,
                        seed: bids.seed,
                        newAccountPubkey: bids.publicKey
                    };
                    return [4 /*yield*/, connection.getMinimumBalanceForRentExemption(orderBookSpace)];
                case 5:
                    _h = _h.concat([_p.apply(_o, [(_v.lamports = _y.sent(),
                                _v.space = orderBookSpace,
                                _v.programId = dexProgramId,
                                _v)])]);
                    _r = (_q = web3_js_1.SystemProgram).createAccountWithSeed;
                    _w = {
                        fromPubkey: wallet,
                        basePubkey: wallet,
                        seed: asks.seed,
                        newAccountPubkey: asks.publicKey
                    };
                    return [4 /*yield*/, connection.getMinimumBalanceForRentExemption(orderBookSpace)];
                case 6:
                    _e.apply(_d, _h.concat([_r.apply(_q, [(_w.lamports = _y.sent(),
                                _w.space = orderBookSpace,
                                _w.programId = dexProgramId,
                                _w)]),
                        initializeMarketInstruction({
                            programId: dexProgramId,
                            marketInfo: {
                                id: market.publicKey,
                                requestQueue: requestQueue.publicKey,
                                eventQueue: eventQueue.publicKey,
                                bids: bids.publicKey,
                                asks: asks.publicKey,
                                baseVault: baseVault.publicKey,
                                quoteVault: quoteVault.publicKey,
                                baseMint: baseInfo.mint,
                                quoteMint: quoteInfo.mint,
                                baseLotSize: baseLotSize,
                                quoteLotSize: quoteLotSize,
                                feeRateBps: feeRateBps,
                                vaultSignerNonce: vaultSignerNonce,
                                quoteDustThreshold: quoteDustThreshold
                            }
                        })]));
                    ins = {
                        address: {
                            marketId: market.publicKey,
                            requestQueue: requestQueue.publicKey,
                            eventQueue: eventQueue.publicKey,
                            bids: bids.publicKey,
                            asks: asks.publicKey,
                            baseVault: baseVault.publicKey,
                            quoteVault: quoteVault.publicKey,
                            baseMint: baseInfo.mint,
                            quoteMint: quoteInfo.mint
                        },
                        innerTransactions: [
                            {
                                instructions: ins1,
                                signers: [],
                                instructionTypes: [
                                    raydium_sdk_1.InstructionType.createAccount,
                                    raydium_sdk_1.InstructionType.createAccount,
                                    raydium_sdk_1.InstructionType.initAccount,
                                    raydium_sdk_1.InstructionType.initAccount
                                ]
                            },
                            {
                                instructions: ins2,
                                signers: [],
                                instructionTypes: [
                                    raydium_sdk_1.InstructionType.createAccount,
                                    raydium_sdk_1.InstructionType.createAccount,
                                    raydium_sdk_1.InstructionType.createAccount,
                                    raydium_sdk_1.InstructionType.createAccount,
                                    raydium_sdk_1.InstructionType.createAccount,
                                    raydium_sdk_1.InstructionType.initMarket
                                ]
                            }
                        ]
                    };
                    _x = {
                        address: ins.address
                    };
                    return [4 /*yield*/, (0, raydium_sdk_1.splitTxAndSigners)({
                            connection: connection,
                            makeTxVersion: makeTxVersion,
                            computeBudgetConfig: undefined,
                            payer: wallet,
                            innerTransaction: ins.innerTransactions,
                            lookupTableCache: lookupTableCache
                        })];
                case 7: return [2 /*return*/, (_x.innerTransactions = _y.sent(),
                        _x)];
            }
        });
    });
}
var createOpenBookMarket = function (connection_1, token_owner_1, token_address_1) {
    var args_1 = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args_1[_i - 3] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([connection_1, token_owner_1, token_address_1], args_1, true), void 0, function (connection, token_owner, token_address, min_order_size, tick_size) {
        var token_mint, mint_info, base_token, quote_token_info, quote_token, _a, innerTransactions, address, txns, txn_result, error_1;
        if (min_order_size === void 0) { min_order_size = 1; }
        if (tick_size === void 0) { tick_size = 0.01; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (token_owner.publicKey.toBase58().length <= 0 ||
                        token_address.length <= 0) {
                        console.log("Error: [Create Open Book Market] invalid argument for create open book market");
                        return [2 /*return*/, global_1.SPL_ERROR.E_INVALID_ARGUE];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    token_mint = new web3_js_1.PublicKey(token_address);
                    return [4 /*yield*/, (0, spl_token_1.getMint)(connection, token_mint)];
                case 2:
                    mint_info = _b.sent();
                    base_token = new raydium_sdk_1.Token(spl_token_1.TOKEN_PROGRAM_ID, token_address, mint_info.decimals);
                    quote_token_info = global_1.EnvironmentManager.getQuoteTokenInfo();
                    quote_token = new raydium_sdk_1.Token(spl_token_1.TOKEN_PROGRAM_ID, quote_token_info.address, quote_token_info.decimal, quote_token_info.symbol, quote_token_info.name);
                    console.log("[Create Open Book Market]<--------------------make marekt instruction");
                    return [4 /*yield*/, makeCreateMarketInstruction({
                            connection: connection,
                            wallet: token_owner.publicKey,
                            baseInfo: base_token,
                            quoteInfo: quote_token,
                            lotSize: min_order_size,
                            tickSize: tick_size,
                            dexProgramId: global_1.EnvironmentManager.getProgramID().OPENBOOK_MARKET,
                            makeTxVersion: raydium_sdk_1.TxVersion.V0,
                            lookupTableCache: global_1.EnvironmentManager.getCacheLTA()
                        })];
                case 3:
                    _a = _b.sent(), innerTransactions = _a.innerTransactions, address = _a.address;
                    console.log("[Create Open Book Market]<--------------------create simple transaction");
                    return [4 /*yield*/, (0, raydium_sdk_1.buildSimpleTransaction)({
                            connection: connection,
                            makeTxVersion: raydium_sdk_1.TxVersion.V0,
                            payer: token_owner.publicKey,
                            innerTransactions: innerTransactions,
                            addLookupTableInfo: global_1.EnvironmentManager.getCacheLTA()
                        })];
                case 4:
                    txns = _b.sent();
                    console.log("[Create Open Book Market]<--------------------send and confirm transaction");
                    return [4 /*yield*/, transactions.sendAndConfirmTransactionsWithCheck(connection, token_owner, txns)];
                case 5:
                    txn_result = _b.sent();
                    if (txn_result !== global_1.SPL_ERROR.E_OK) {
                        console.error("Error: [Create Open Book Market] failed to send and confirm transaction");
                        return [2 /*return*/, global_1.SPL_ERROR.E_FAIL];
                    }
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _b.sent();
                    console.error("Error: [Create Open Book Market] error occured: ", error_1);
                    return [2 /*return*/, global_1.SPL_ERROR.E_FAIL];
                case 7:
                    console.log("Success: [Create Open Book Market] Success to create open book market id");
                    return [2 /*return*/, global_1.SPL_ERROR.E_OK];
            }
        });
    });
};
exports.createOpenBookMarket = createOpenBookMarket;
