"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolManager = void 0;
var raydium_sdk_1 = require("@raydium-io/raydium-sdk");
var global_1 = require("./global");
var web3_js_1 = require("@solana/web3.js");
var bn_js_1 = require("bn.js");
var utility_1 = require("./utility");
var PoolManager = /** @class */ (function () {
    function PoolManager(base_token_info, quote_token_info, base_amount, quote_amount, market_id) {
        this.base_token_info = base_token_info;
        this.quote_token_info = quote_token_info;
        this.base_amount = base_amount;
        this.quote_amount = quote_amount;
        this.market_id = market_id;
        var _a = this.getPairToken(), base_token = _a.base_token, quote_token = _a.quote_token;
        this.pool_keys = raydium_sdk_1.Liquidity.getAssociatedPoolKeys({
            version: 4,
            marketVersion: 3,
            baseMint: base_token.mint,
            quoteMint: quote_token.mint,
            baseDecimals: base_token.decimals,
            quoteDecimals: quote_token.decimals,
            marketId: this.market_id,
            programId: global_1.EnvironmentManager.getProgramID().AmmV4,
            marketProgramId: global_1.EnvironmentManager.getProgramID().OPENBOOK_MARKET
        });
        this.pool_info = {
            status: new bn_js_1.BN(0),
            baseDecimals: this.base_token_info.decimal,
            lpDecimals: this.quote_token_info.decimal,
            quoteDecimals: this.quote_token_info.decimal,
            baseReserve: (0, utility_1.xWeiAmount)(this.base_amount, this.base_token_info.decimal),
            quoteReserve: (0, utility_1.xWeiAmount)(this.quote_amount, this.quote_token_info.decimal),
            lpSupply: new bn_js_1.BN(base_amount),
            startTime: new bn_js_1.BN(0)
        };
    }
    PoolManager.prototype.initializePoolInfo = function (market_id) {
        this.market_id = market_id;
        var _a = this.getPairToken(), base_token = _a.base_token, quote_token = _a.quote_token;
        this.pool_keys = raydium_sdk_1.Liquidity.getAssociatedPoolKeys({
            version: 4,
            marketVersion: 3,
            baseMint: base_token.mint,
            quoteMint: quote_token.mint,
            baseDecimals: base_token.decimals,
            quoteDecimals: quote_token.decimals,
            marketId: this.market_id,
            programId: global_1.EnvironmentManager.getProgramID().AmmV4,
            marketProgramId: global_1.EnvironmentManager.getProgramID().OPENBOOK_MARKET
        });
        this.pool_info = {
            status: new bn_js_1.BN(0),
            baseDecimals: this.base_token_info.decimal,
            lpDecimals: this.quote_token_info.decimal,
            quoteDecimals: this.quote_token_info.decimal,
            baseReserve: (0, utility_1.xWeiAmount)(this.base_amount, this.base_token_info.decimal),
            quoteReserve: (0, utility_1.xWeiAmount)(this.quote_amount, this.quote_token_info.decimal),
            lpSupply: new bn_js_1.BN(this.base_amount),
            startTime: new bn_js_1.BN(0)
        };
        console.log("Simulated Pool baseReserve: ", this.pool_info.baseReserve.toString());
        console.log("Simulated Pool quoteReserve: ", this.pool_info.quoteReserve.toString());
    };
    PoolManager.prototype.computeSolAmount = function (base_amount, in_out) {
        var _a = this.getPairToken(), base_token = _a.base_token, quote_token = _a.quote_token;
        // console.log("Simulated PoolInfo: ", this.pool_info);
        if (in_out) {
            var maxAmountIn = raydium_sdk_1.Liquidity.computeAmountIn({
                poolKeys: this.pool_keys,
                poolInfo: this.pool_info,
                amountOut: new raydium_sdk_1.TokenAmount(base_token, base_amount, false),
                currencyIn: quote_token,
                slippage: new raydium_sdk_1.Percent(1, 100)
            }).maxAmountIn;
            return maxAmountIn;
        }
        else {
            var minAmountOut = raydium_sdk_1.Liquidity.computeAmountOut({
                poolKeys: this.pool_keys,
                poolInfo: this.pool_info,
                amountIn: new raydium_sdk_1.TokenAmount(base_token, base_amount, false),
                currencyOut: quote_token,
                slippage: new raydium_sdk_1.Percent(1, 100)
            }).minAmountOut;
            return minAmountOut;
        }
    };
    PoolManager.prototype.computeCurrentPrice = function () {
        return this.quote_amount / this.base_amount;
    };
    PoolManager.prototype.buyToken = function (base_amount) {
        var sol_input = this.computeSolAmount(base_amount, true);
        var _a = this.getPairToken(), base_token = _a.base_token, quote_token = _a.quote_token;
        var amountOut = raydium_sdk_1.Liquidity.computeAmountOut({
            poolKeys: this.pool_keys,
            poolInfo: this.pool_info,
            amountIn: sol_input,
            currencyOut: base_token,
            slippage: new raydium_sdk_1.Percent(1, 100)
        }).amountOut;
        this.quote_amount += sol_input.raw
            .div(new bn_js_1.BN(Math.pow(10, this.quote_token_info.decimal)))
            .toNumber();
        this.base_amount -= base_amount;
        this.pool_info = __assign(__assign({}, this.pool_info), { baseReserve: this.pool_info.baseReserve.sub(amountOut.raw), quoteReserve: this.pool_info.quoteReserve.add(sol_input.raw) });
        console.log("Simulated Pool baseReserve: ", this.pool_info.baseReserve.toString());
        console.log("Simulated Pool quoteReserve: ", this.pool_info.quoteReserve.toString());
        // this.initializePoolInfo(this.market_id);
    };
    PoolManager.prototype.sellToken = function (base_amount) {
        var sol_input = this.computeSolAmount(base_amount, false);
        this.quote_amount -= sol_input.raw
            .div(new bn_js_1.BN(Math.pow(10, this.quote_token_info.decimal)))
            .toNumber();
        this.base_amount += base_amount;
        this.initializePoolInfo(this.market_id);
    };
    PoolManager.prototype.getPairToken = function () {
        var base_mint = new web3_js_1.PublicKey(this.base_token_info.address);
        var base = new raydium_sdk_1.Token(raydium_sdk_1.TOKEN_PROGRAM_ID, base_mint, this.base_token_info.decimal, this.base_token_info.symbol, this.base_token_info.name);
        var quote = new raydium_sdk_1.Token(raydium_sdk_1.TOKEN_PROGRAM_ID, new web3_js_1.PublicKey(this.quote_token_info.address), this.quote_token_info.decimal, this.quote_token_info.symbol, this.quote_token_info.name);
        return { base_token: base, quote_token: quote };
    };
    return PoolManager;
}());
exports.PoolManager = PoolManager;
