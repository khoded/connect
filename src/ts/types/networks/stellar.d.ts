// Stellar types from stellar-sdk
// https://github.com/stellar/js-stellar-base

export interface StellarAsset {
    type: 0 | 1 | 2; // 0: native, 1: credit_alphanum4, 2: credit_alphanum12
    code: string;
    issuer?: string;
}

export interface StellarCreateAccountOperation {
    type: 'createAccount'; // Proto: "StellarCreateAccountOp"
    source?: string; // Proto: "source_account"
    destination: string; // Proto: "new_account",
    startingBalance: string; // Proto: "starting_balance"
}

export interface StellarPaymentOperation {
    type: 'payment'; // Proto: "StellarPaymentOp"
    source?: string; // Proto: "source_account"
    destination: string; // Proto: "destination_account"
    asset?: StellarAsset | typeof undefined; // Proto: ok
    amount: string; // Proto: ok
}

export interface StellarPathPaymentOperation {
    type: 'pathPayment'; // Proto: "StellarPathPaymentOp"
    source?: string; // Proto: "source_account"
    sendAsset: StellarAsset; // Proto: "send_asset"
    sendMax: string; // Proto: "send_max"
    destination: string; // Proto: "destination_account"
    destAsset: StellarAsset; // Proto: "destination_asset"
    destAmount: string; // Proto "destination_amount"
    path?: StellarAsset[]; // Proto: "paths"
}

export interface StellarPassiveOfferOperation {
    type: 'createPassiveOffer'; // Proto: "StellarCreatePassiveOfferOp"
    source?: string; // Proto: "source_account"
    buying: StellarAsset; // Proto: "buying_asset"
    selling: StellarAsset; // Proto: "selling_asset"
    amount: string; // Proto: ok
    price: { n: number; d: number }; // Proto: "price_n" and "price_d"
}

export interface StellarManageOfferOperation {
    type: 'manageOffer'; // Proto: "StellarManageOfferOp"
    source?: string; // Proto: "source_account"
    buying: StellarAsset; // Proto: "buying_asset"
    selling: StellarAsset; // Proto: "selling_asset"
    amount: string; // Proto: ok
    offerId?: string; // Proto: "offer_id" // not found in stellar-sdk
    price: { n: number; d: number }; // Proto: "price_n" and "price_d"
}

export interface StellarSetOptionsOperation {
    type: 'setOptions'; // Proto: "StellarSetOptionsOp"
    source?: string; // Proto: "source_account"
    signer?: {
        type: 0 | 1 | 2;
        key: string | Buffer;
        weight?: number;
    };
    inflationDest?: string; // Proto: "inflation_destination_account"
    clearFlags?: number; // Proto: "clear_flags"
    setFlags?: number; // Proto: "set_flags"
    masterWeight?: number | string; // Proto: "master_weight"
    lowThreshold?: number | string; // Proto: "low_threshold"
    medThreshold?: number | string; // Proto: "medium_threshold"
    highThreshold?: number | string; // Proto: "high_threshold"
    homeDomain?: string; // Proto: "home_domain"
}

export interface StellarChangeTrustOperation {
    type: 'changeTrust'; // Proto: "StellarChangeTrustOp"
    source?: string; // Proto: "source_account"
    line: StellarAsset; // Proto: ok
    limit?: string; // Proto: ok
}

export interface StellarAllowTrustOperation {
    type: 'allowTrust'; // Proto: "StellarAllowTrustOp"
    source?: string; // Proto: "source_account"
    trustor: string; // Proto: "trusted_account"
    assetCode: string; // Proto: "asset_code"
    assetType: number; // Proto: "asset_type" // TODO not found in stellar-sdk
    authorize?: boolean | typeof undefined; // Proto: "is_authorized" > parse to number
}

export interface StellarAccountMergeOperation {
    type: 'accountMerge'; // Proto: "StellarAccountMergeOp"
    source?: string; // Proto: "source_account"
    destination: string; // Proto: "destination_account"
}

export interface StellarManageDataOperation {
    type: 'manageData'; // Proto: "StellarManageDataOp"
    source?: string; // Proto: "source_account"
    name: string; // Proto: "key"
    value?: string | Buffer; // Proto: "value"
}

// (?) Missing in stellar API but present in Proto messages
export interface StellarBumpSequenceOperation {
    type: 'bumpSequence'; // Proto: "StellarBumpSequenceOp"
    source?: string; // Proto: "source_account"
    bumpTo: string; // Proto: "bump_to"
}

// (?) Missing in Proto messages, but present in Stellar API
export interface StellarInflationOperation {
    type: 'inflation';
    source?: string; // Proto: "source_account"
}

export type StellarOperation =
    | StellarCreateAccountOperation
    | StellarPaymentOperation
    | StellarPathPaymentOperation
    | StellarPassiveOfferOperation
    | StellarManageOfferOperation
    | StellarSetOptionsOperation
    | StellarChangeTrustOperation
    | StellarAllowTrustOperation
    | StellarAccountMergeOperation
    | StellarInflationOperation
    | StellarManageDataOperation
    | StellarBumpSequenceOperation;

export interface StellarTransaction {
    source: string; // Proto: "source_account"
    fee: number; // Proto: ok
    sequence: string | number; // Proto: "sequence_number"
    timebounds?: {
        minTime: number; // Proto: "timebounds_start"
        maxTime: number; // Proto: "timebounds_end"
    };
    memo?: {
        type: 0 | 1 | 2 | 3 | 4; // Proto: "memo_type"
        id?: string; // Proto: "memo_id"
        text?: string; // Proto: "memo_text"
        hash?: string | Buffer; // Proto: "memo_hash"
    };
    operations: StellarOperation[]; // Proto: calculated array length > "num_operations"
}

export interface StellarSignTransaction {
    path: string | number[];
    networkPassphrase: string;
    transaction: StellarTransaction;
}

export interface StellarSignedTx {
    publicKey: string;
    signature: string;
}

// get address

export interface StellarGetAddress {
    path: string | number[];
    address?: string;
    showOnTrezor?: boolean;
}

export interface StellarAddress {
    address: string;
    path: number[];
    serializedPath: string;
}