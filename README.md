
# bitFlyer BTC-FX/JPY plugin for R2 Bitcoin Arbitrager
This is a broker plugin for [R2](https://github.com/bitrinjani/r2).

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

# Caution

- Do not enable both bitFlyer BTC/JPY (Bitflyer broker) and bitFlyer BTC-FX/JPY (BitflyerFX broker) at the same time in R2. Or you may encounter API usage limits from the exchange.
- BTC-FX/JPY price is totally different from BTC/JPY price, and they are not correlated (for now). If you do not fully understand how the config parameters work, please do not use this plugin.

- 標準のBitflyerブローカーとこのBitflyerFXブローカーを同時に有効にしないでください。取引所のAPI使用回数制限にひっかかる可能性があります。
- 現在のところ、BTC-FX/JPY価格はBTC/JPY価格とまったく異なり、その価格変動は相関していません。設定値の動作について理解していない方は、このプラグインを使わないほうがよいです。