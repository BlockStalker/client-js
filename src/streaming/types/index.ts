export interface IBlockEvent {
    blockStream: string;
    round: number;
    keyType: number;
    keyIdentity: number;
    key: string;
    keyEvent: number;
    loggedAt: string;
    sourceFilter: number;
    content: Record<string, unknown>;
}

export interface IAssetTransfer {
    NS: string;
    Asset: IAsset;
    Amount: number;
    Sender: string;
    Receiver: string;
}

export interface IAsset {
    NS: string;
    Id: number;
    Creator: string;
    Decimals: number;
    UnitName: string;
    Name: string;
    URL: string;
    Clawback: string;
    Freeze: string;
}