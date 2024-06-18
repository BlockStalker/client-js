export interface IRegistryResult {
    blockItem:           IBlockItem;
    eventFiltersEnabled: boolean;
    events:              number[];
    query:               string;
    identity:            IKeyIdentity;
}

export interface IBlockItem {
    description: string;
    key:         string;
    keyGroup: number;
    keyType:     number;
}

export interface IKeyIdentity {
    keyGroup: number;
    keyType:     number;
}

export interface IDisplayMode {
    mode: string;
    name: string;
}

export interface IStream {
    id: string;
    name: string;
}

export interface IStreamsInfo {
    bufferSize: number;
    displayModes: IDisplayMode[];
    streams: IStream[];
}

export interface IStreamUpdateOptions {
    id: string;
    name?: string;
    description?: string;
    isPublic?: boolean;
}

export interface IStreamsResponse {
    id: string;
}

export interface IFiltersResponse {
    id: string;
}

export interface IFilter {
    condition: any[];
    enabled: boolean;
    id: number;
    key: string;
    keyEvent: number;
    keyGroup: number;
    keyType: number;
    lastExecuted: Date;
    matchCount: number;
    systemOff: boolean;
    targetBlockStream: string;
}

export type IFiltersList = IFilter[];

export enum StringCondition {
    Any = 0,
    Equal = 1,
    Contains = 5
}

export enum NumericCondition {
    Any = 0,
    Equal = 2,
    GreaterOrEqual = 3,
    LessOrEqual = 4,
}

export interface IFilterForm {
    action: string;
    stream: string;
    key?: string;
    keyGroup?: number;
    keyType?: number;
    keyEvent: number;
    // Addresses
    receiver?: string;
    sender?: string;
    actor?: string;
    // Amounts
    amount?: number;
    price?: number;
    // Generic Strings
    market?: string;
    // Asset / App Ids
    asset?: number;
    asset1?: number;
    asset2?: number;
}

const hasConditionType = [
    'receiver',
    'sender',
    'actor',
    'amount',
    'price',
    'market'
];

export class FilterFormBuilder {
    private filterForm: Partial<IFilterForm> = {};

    keyFilter(key: string = '', keyEvent: number = 0) {
        this.filterForm = {
            action: 'create',
            key,
            keyEvent,
        };
        return this;
    }

    idFilter(keyGroup: number = 0, keyType: number = 0, keyEvent: number = 0) {
        this.filterForm = {
            action: 'create',
            keyGroup,
            keyType,
            keyEvent,
        };
        return this;
    }

    private set<T extends keyof IFilterForm>(key: T, value: IFilterForm[T], conditionType?: StringCondition | NumericCondition) {
        this.filterForm[key] = value;
        if (hasConditionType.includes(key)) {
            const defaultCondition = typeof key === 'string' ? StringCondition.Equal : NumericCondition.Equal;
            this.filterForm[key + 'ConditionType'] = conditionType ?? defaultCondition;
        }
        return this;
    }

    // Primitive
    subscribe(keyEvent : number) {
        if (this.filterForm.keyEvent > 0) {
            console.warn("[WARNING] keyEvent already set, overwriting with subscribe()");
        }
        return this.set('keyEvent', keyEvent); 
    }
    // String Fields
    stream(streamGuid: string) { return this.set('stream', streamGuid); }
    receiver(account: string, conditionType?: StringCondition) { return this.set('receiver', account, conditionType); }
    sender(account: string, conditionType?: StringCondition) { return this.set('sender', account, conditionType); }
    actor(account: string, conditionType?: StringCondition) { return this.set('actor', account, conditionType); }
    market(marketName: string, conditionType?: StringCondition) { return this.set('market', marketName, conditionType); }
    // Numerics
    amount(amount: number, conditionType?: NumericCondition) { return this.set('amount', amount, conditionType); }
    price(price: number, conditionType?: NumericCondition) { return this.set('price', price, conditionType); }
    asset(assetId: number) { return this.set('asset', assetId); }
    asset_1(assetId: number) { return this.set('asset1', assetId); }
    asset_2(assetId: number) { return this.set('asset2', assetId); }

    build(): IFilterForm {
        if (!this.filterForm.action) throw new Error("Filter must have an action.");
        if (!this.filterForm.stream) throw new Error("Filter must specify a target stream.");
        if (!this.filterForm.keyEvent) throw new Error("Filter must specify a key event.");
        if (!(this.filterForm.key || (this.filterForm.keyGroup && this.filterForm.keyType))) {
            throw new Error("Filters must have either: [(key) or (keyGroup + keyType)] and keyEvent");
        }
        return this.filterForm as IFilterForm;
    }
}