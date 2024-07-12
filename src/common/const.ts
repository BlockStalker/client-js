export const KeyEvent = {
    Unknown: 0,
    AccountSend: 1,
    AccountRecv: 2,
    AccountAssetOptIn: 3,
    AccountAssetOptOut: 4,
    AccountAssetCloseTo: 5,
    AccountAssetSend: 6,
    AccountAssetRecv: 7,
    AccountAssetConfig: 8,
    AccountAssetClawback: 9,
    AccountAssetFreeze: 10,
    AccountKeyreg: 11,
    AssetOptIn: 50,
    AssetOptOut: 51,
    AssetXfer: 52,
    AssetCreate: 53,
    AssetUpdate: 54,
    AssetDestroy: 55,
    AssetClawback: 56,
    AssetFreeze: 57,
    MarketplaceSale: 201,
    MarketplaceListing: 202,
    MarketplaceOffer: 209,
    NFTMinted: 203,
    NFTBought: 204,
    NFTSold: 205,
    NFTListed: 206,
    NFTSentOffer: 207,
    NFTRecvOffer: 208,
    GovernanceTx: 401,
    ExchangeDeposit: 402,
    ExchangeWithdrawal: 403,
    LoftySale: 404,
    LoftyBuyback: 405,
    TinymanV11Swap: 406,
    TinymanV11Bootstrap: 407,
    TinymanV11Mint: 408,
    TinymanV11Burn: 409,
    TinymanV2Bootstrap: 410,
    TinymanV2InitLiquidity: 411,
    TinymanV2AddLiquidity: 412,
    TinymanV2RemoveLiquidity: 413,
    TinymanV2Swap: 414,
    TinymanV2FlashLoan: 415,
    TinymanV2FlashSwap: 416,
    TinymanV2SetFee: 417,
    AssetVerification: 430,
    NFDomainsSale: 432,
    RugNinjaCreateCoin: 450,
    RugNinjaDeployCoin: 451
};

export const KeyGroup = {
    Base: 0,
    Algorand: 1,
    Governance: 2,
    NFT: 3,
    NFTCollection: 4,
    AlgorandFoundation: 5,
    AlgoExplorer: 6,
    BlockStalker: 7,
    Pera: 8,
    CentralExchange: 10,
    TinymanV11: 20,
    Algofi: 21,
    Yieldly: 22,
    Lofty: 23,
    NFDomains: 24,
    TinymanV2: 25,
    RandGallery: 26,
    Dartroom: 27,
    AlgoGems: 28,
    Trilem: 29,
    ExaMarket: 30,
    AB2Gallery: 31,
    AlgoXNFT: 32,
    RugNinja: 34
};

export const KeyType = {
    Account: 1,
    Asset: 2,
    Application: 3
}