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
exports.createToken = void 0;
var web3_js_1 = require("@solana/web3.js");
var global_1 = require("./global");
var spl_token_1 = require("@solana/spl-token");
var js_1 = require("@metaplex-foundation/js");
var fs_1 = require("fs");
var utility_1 = require("./utility");
var mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
var transaction = __importStar(require("./transaction-helper/transaction"));
var totalSupplyMint = function (connection, token_owner, token_addr, total_supply) { return __awaiter(void 0, void 0, void 0, function () {
    var token_mint, mint_info, owner_token_account, token_amount, mint_result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token_mint = new web3_js_1.PublicKey(token_addr);
                return [4 /*yield*/, (0, spl_token_1.getMint)(connection, token_mint)];
            case 1:
                mint_info = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, (0, spl_token_1.getOrCreateAssociatedTokenAccount)(connection, token_owner, token_mint, token_owner.publicKey)];
            case 3:
                owner_token_account = _a.sent();
                if (owner_token_account.address.toBase58().length <= 0) {
                    console.log("Error: [Total Supply Mint] failed to create associated token account");
                    return [2 /*return*/, global_1.SPL_ERROR.E_TOTAL_MINT_FAIL];
                }
                token_amount = (0, utility_1.xWeiAmount)(total_supply, mint_info.decimals);
                return [4 /*yield*/, (0, spl_token_1.mintTo)(connection, token_owner, token_mint, owner_token_account.address, token_owner, BigInt(token_amount.toString()))];
            case 4:
                mint_result = _a.sent();
                if (mint_result.length <= 0) {
                    console.log("Error: [Total Supply Mint] failed to mint to owner wallet");
                    return [2 /*return*/, global_1.SPL_ERROR.E_TOTAL_MINT_FAIL];
                }
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log("Error: [Total Supply Mint] failed to mint to owner wallet");
                return [2 /*return*/, global_1.SPL_ERROR.E_TOTAL_MINT_FAIL];
            case 6: return [2 /*return*/, global_1.SPL_ERROR.E_OK];
        }
    });
}); };
var createTokenMetaData = function (connection, token_owner, token_addr, name, symbol, token_logo, rpc_url, description) { return __awaiter(void 0, void 0, void 0, function () {
    var metaplex, buffer, file, logo_url, metaplex_data, uri, token_mint, metadata_PDA, token_meta_data, txn, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                metaplex = js_1.Metaplex.make(connection)
                    .use((0, js_1.keypairIdentity)(token_owner))
                    .use((0, js_1.bundlrStorage)({
                    address: global_1.EnvironmentManager.getBundlrUrl(),
                    providerUrl: rpc_url,
                    timeout: 60000
                }));
                buffer = (0, fs_1.readFileSync)(token_logo);
                file = (0, js_1.toMetaplexFile)(buffer, "token-logo.png");
                return [4 /*yield*/, metaplex.storage().upload(file)];
            case 1:
                logo_url = _a.sent();
                if (logo_url.length <= 0) {
                    console.log("Error: [Create Token Meta Data] failed to load metapelx data!!!");
                    return [2 /*return*/, global_1.SPL_ERROR.E_FAIL];
                }
                metaplex_data = {
                    name: name,
                    symbol: symbol,
                    image: logo_url,
                    description: description
                };
                return [4 /*yield*/, metaplex.nfts().uploadMetadata(metaplex_data)];
            case 2:
                uri = (_a.sent()).uri;
                if (uri.length <= 0) {
                    console.log("Error: [Create Token Meta Data] failed to upload metaplex data!!!");
                    return [2 /*return*/, global_1.SPL_ERROR.E_FAIL];
                }
                token_mint = new web3_js_1.PublicKey(token_addr);
                metadata_PDA = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("metadata"), mpl_token_metadata_1.PROGRAM_ID.toBuffer(), token_mint.toBuffer()], mpl_token_metadata_1.PROGRAM_ID)[0];
                token_meta_data = {
                    name: name,
                    symbol: symbol,
                    uri: uri,
                    sellerFeeBasisPoints: 0,
                    creators: null,
                    collection: null,
                    uses: null
                };
                txn = new web3_js_1.Transaction().add((0, mpl_token_metadata_1.createCreateMetadataAccountV3Instruction)({
                    metadata: metadata_PDA,
                    mint: token_mint,
                    mintAuthority: token_owner.publicKey,
                    payer: token_owner.publicKey,
                    updateAuthority: token_owner.publicKey
                }, {
                    createMetadataAccountArgsV3: {
                        data: token_meta_data,
                        isMutable: true,
                        collectionDetails: null
                    }
                }));
                return [4 /*yield*/, transaction.sendAndConfirmTransactionWithCheck(connection, token_owner, txn)];
            case 3:
                if ((_a.sent()) !== global_1.SPL_ERROR.E_OK) {
                    return [2 /*return*/, global_1.SPL_ERROR.E_FAIL];
                }
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.log("Error: [Create Token Meta Data] failed to create meta data -", error_2);
                return [2 /*return*/, global_1.SPL_ERROR.E_FAIL];
            case 5: return [2 /*return*/, global_1.SPL_ERROR.E_OK];
        }
    });
}); };
var createToken = function (connection, token_owner, name, symbol, decimal, total_supply, token_logo, description) { return __awaiter(void 0, void 0, void 0, function () {
    var token_mint, meta_result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (name.length <= 0 ||
                    symbol.length <= 0 ||
                    token_logo.length <= 0 ||
                    token_owner.publicKey.toBase58().length <= 0 ||
                    global_1.EnvironmentManager.getRpcNetUrl().length <= 0 ||
                    decimal <= 0 ||
                    total_supply <= 0) {
                    console.log("Error: [Create Token] invalid argument to create token!!!");
                    return [2 /*return*/, { result: global_1.SPL_ERROR.E_INVALID_ARGUE, value: undefined }];
                }
                return [4 /*yield*/, (0, utility_1.checkFileExists)(token_logo)];
            case 1:
                if ((_a.sent()) === false) {
                    console.log("Error: [Create Token] invalid argument to create token - token logo path invalid!!!");
                    return [2 /*return*/, { result: global_1.SPL_ERROR.E_INVALID_ARGUE, value: undefined }];
                }
                console.log("<-----------------[Create Token]---------------------");
                console.log("Name: ", name, "Symbol: ", symbol, "Decimal: ", decimal, "Total Supply: ", total_supply, "Token Logo: ", token_logo, "Token Description: ", description);
                console.log("<-----------------[Create Token]---------------------");
                return [4 /*yield*/, (0, spl_token_1.createMint)(connection, token_owner, token_owner.publicKey, token_owner.publicKey, decimal)];
            case 2:
                token_mint = _a.sent();
                if (token_mint.toBase58().length <= 0) {
                    console.log("Error: [Create Token] failed to create mint!!!");
                    return [2 /*return*/, { result: global_1.SPL_ERROR.E_FAIL, value: undefined }];
                }
                console.log("<-----------------[Create Token Meta Data]---------------------");
                return [4 /*yield*/, createTokenMetaData(connection, token_owner, token_mint.toBase58(), name, symbol, token_logo, global_1.EnvironmentManager.getRpcNetUrl(), description)];
            case 3:
                meta_result = _a.sent();
                if (meta_result !== global_1.SPL_ERROR.E_OK) {
                    console.log("Error: [Create Token] failed to create meta data!!!");
                    return [2 /*return*/, { result: global_1.SPL_ERROR.E_CREATE_META_FAILED, value: undefined }];
                }
                console.log("<-----------------[Token mint]---------------------");
                return [4 /*yield*/, totalSupplyMint(connection, token_owner, token_mint.toBase58(), total_supply)];
            case 4:
                if ((_a.sent()) !== global_1.SPL_ERROR.E_OK) {
                    console.log("Error: [Create Token] failed to mint total supply!!!");
                    return [2 /*return*/, { result: global_1.SPL_ERROR.E_TOTAL_MINT_FAIL, value: undefined }];
                }
                console.log("Success: [Create Token] Mint Address: ", token_mint.toBase58());
                return [2 /*return*/, { result: global_1.SPL_ERROR.E_OK, value: token_mint.toBase58() }];
        }
    });
}); };
exports.createToken = createToken;
