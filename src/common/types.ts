export interface IBlockEvent {
    round: number;
    blockStream: string;
    sourceFilter: number;
    key: string;
    keyType: number;
    keyGroup: number;
    keyEvent: number;
    loggedAt: string;
    content: any;  // one of the Docs below based on keyEvent
}

export interface INamespacedDoc {
    NS: string;
}

export interface PayDoc extends INamespacedDoc {
    ItemDesc: string
    Sender: string
    Receiver: string
    Amount: number
    Note: string
}

export interface KeyRegDoc extends INamespacedDoc {
    Online: boolean
    Actor: string
}

export interface HeartbeatDoc extends INamespacedDoc {
    Actor: string
}

export interface GovernanceDoc extends INamespacedDoc {
    Governor: string
    RawJson: string
}

export interface AssetDoc extends INamespacedDoc {
    Id: number
    Creator: string
    Total: number
    Decimals: number
    UnitName: string
    Name: string
    URL: string
    Reserve: string
    Clawback: string
    Freeze: string
}

export interface AssetVerificationDoc extends INamespacedDoc {
    Asset: AssetDoc
}

export interface AssetXferDoc extends INamespacedDoc {
    Asset: AssetDoc
    Amount: number
    Sender: string
    Receiver: string
}

export interface AssetAcceptDoc extends INamespacedDoc {
    Actor: string
    Asset: AssetDoc
}

export interface AssetConfigDoc extends INamespacedDoc {
    Actor: string
    Asset: AssetDoc
}

export interface AssetClawbackDoc extends INamespacedDoc {
    Asset: AssetDoc
    Actor: string
    Amount: number
    From: string
    To: string
}

export interface AssetFreezeDoc extends INamespacedDoc {
    Asset: AssetDoc
    Actor: string
    Target: string
    Frozen: boolean
}

export interface ApplicationDoc extends INamespacedDoc {
    Id: number
    Name: string
}

export interface NFTDoc extends INamespacedDoc {
    NFT: AssetDoc
}

export interface MarketplaceListingDoc extends INamespacedDoc {
    TxGroup: string
    Market: string
    Price: number
    Currency: string
    Seller: string
    NFT: AssetDoc

}

export interface MarketplaceSaleDoc extends INamespacedDoc {
    TxGroup: string
    Market: string
    Price: number
    Currency: string
    Seller: string
    Buyer: string
    NFT: AssetDoc
}

export interface PoolDoc extends INamespacedDoc {
    DEX: string
    Actor: string
    Pool: string
    Asset1: AssetDoc
    Asset2: AssetDoc
    Supply1: number
    Supply2: number
    Price: number

}

export interface LotteryDoc extends INamespacedDoc {
    Actor?: string
    App?: ApplicationDoc
    Tickets?: number
    Numbers?: number[][]
    Prize?: number
}

export interface CertDoc extends INamespacedDoc {
    Actor: string
}