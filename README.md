[![Build Status](https://travis-ci.org/bitrinjani/bitflyer-fx.svg?branch=master)](https://travis-ci.org/bitrinjani/bitflyer-fx) [![Coverage Status](https://coveralls.io/repos/github/bitrinjani/bitflyer-fx/badge.svg?branch=master)](https://coveralls.io/github/bitrinjani/bitflyer-fx?branch=master) [![npm version](https://badge.fury.io/js/%40bitr%2Fbitflyer-fx.svg)](https://badge.fury.io/js/%40bitr%2Fbitflyer-fx)
# bitFlyer BTC-FX/JPY plugin for R2 Bitcoin Arbitrager
This is an optional broker plugin for [R2](https://github.com/bitrinjani/r2). The plugin adds bitFlyer BTC-FX/JPY as a broker in R2.

# Install

Install from npm repository.

```bash
npm install @bitr/bitflyer-fx
#or
yarn add @bitr/bitflyer-fx
```

Then set your key/secret in broker section in config.json.

```
...
    {
      "broker": "BitflyerFX",
      "npmPath": "@bitr/bitflyer-fx",
      "enabled": true,
      "key": "xxxxxx",
      "secret": "xxxxxxx",
      "maxLongPosition": 0.02,
      "maxShortPosition": 0.02,
      "cashMarginType": "NetOut",
      "commissionPercent": 0
    },
...
```

# ⚠️Caution

- Do not enable both bitFlyer BTC/JPY (Bitflyer broker) and bitFlyer BTC-FX/JPY (BitflyerFX broker) at the same time in R2. Or you may encounter API usage limits from the exchange.
- BTC-FX/JPY price is totally different from BTC/JPY price, and they are not correlated (for now). If you do not fully understand how the config parameters work such as minTargetProfitPercent, please do not use this plugin.

# ⚠️注意
- 標準のBitflyerブローカーとこのBitflyerFXブローカーを同時に有効にしないでください。取引所のAPI使用回数制限に達する可能性があります。
- 現在のところ、BTC-FX/JPY価格はBTC/JPY価格とまったく異なり、その価格変動は相関していません。minTargetProfitPercent等のパラメタータ設定が難しいため、その動作について十分に理解していない方はこのプラグインを使用しないでください。
