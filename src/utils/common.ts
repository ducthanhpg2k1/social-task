export enum TYPE_ASSETS {
  DOMAIN = "domain",
  PHONE_NUMBER = "phone_number",
  TELEGRAM_HANDLE = "Telegram",
  STICKER = "Sticker",
}
export const mintToken = "FN1sTzFiNSapxxrRrWWz4pthtyWAb8c9Bn3w5xQb5nwS";

export enum EOrderStatus {
  DRAFT = "draft",
  CONFIRM_TRANSACTION_ERROR = "confirm_transaction_error",
  WAITING_FOR_TRANSFER = "waiting_for_transfer",
  RECEIVED_CODE = "received_code",
  PURCHASE_COMPLETED = "purchase_completed",
  TRANSFER_ERROR = "transfer_error",
  CANCELLED = "cancelled",
  CLOSED = "closed",
  FORCE_CANCEL = "force_cancel",
}
export enum EOfferStatus {
  INACTIVE = "inactive",
  ACTIVE = "active",
  FILLED = "filled",
  WAITING_FOR_BUYER_CLAIM = "waiting_for_buyer_claim",
  SETTLED = "settled",
  CANCELLED = "cancelled",
  SELL_COMPLETED = "sell_completed",
}

export enum ETypeOffer {
  ON_SELL = "on-sell",
  AUCTION = "auction",
}

export enum EReportStatus {
  IN_PROGRESS = "in_progress",
  RESOLVED = "resolved",
}

export enum EStatusUser {
  ACTIVE = "active",
  SUSPENDED = "suspended",
}

export const STATUS_OFFERS = [
  {
    key: EOfferStatus?.ACTIVE,
    label: "Listing",
  },
  {
    key: EOfferStatus?.INACTIVE,
    label: "Delisted",
  },

  {
    key: EOfferStatus?.FILLED,
    label: "Waiting for code submission",
  },
  {
    key: EOfferStatus?.WAITING_FOR_BUYER_CLAIM,
    label: "Waiting for buyer to claim",
  },
  {
    key: EOfferStatus?.SELL_COMPLETED,
    label: "Completed",
  },
  {
    key: EOfferStatus?.SETTLED,
    label: "Settling",
  },
];

export const STATUS_ORDERS = [
  {
    key: EOrderStatus?.PURCHASE_COMPLETED,
    label: "Completed",
  },
  {
    key: EOrderStatus?.RECEIVED_CODE,
    label: "Received code",
  },

  {
    key: EOrderStatus?.TRANSFER_ERROR,
    label: "Settling",
  },
  // {
  //   key: EOrderStatus?.CANCELLED,
  //   label: "Cancelled",
  // },
  {
    key: EOrderStatus?.FORCE_CANCEL,
    label: "Force Cancelled",
  },
  {
    key: EOrderStatus?.WAITING_FOR_TRANSFER,
    label: "Waiting for authorization code",
  },
];

export const assetId = "9a314c8f-314b-4425-8383-e8f23634a2b1";

export const renderTextStatusOffer = (status: string) => {
  let text: string = "";
  switch (status) {
    case EOfferStatus?.INACTIVE:
      text = "Delisted";
      break;
    case EOfferStatus?.ACTIVE:
      text = "Listing";
      break;
    case EOfferStatus?.FILLED:
      text = "Waiting for code submission";
      break;
    case EOfferStatus?.WAITING_FOR_BUYER_CLAIM:
      text = "Waiting for buyer to claim";
      break;
    case EOfferStatus?.SELL_COMPLETED:
      text = "Completed";
      break;
    case EOfferStatus?.SETTLED:
      text = "Settling";
      break;
  }

  return text;
};

export const renderTextStatusOrder = (status: string) => {
  let text: string = "";
  switch (status) {
    case EOrderStatus?.WAITING_FOR_TRANSFER:
      text = "Waiting for authorization code";
      break;
    case EOrderStatus?.RECEIVED_CODE:
      text = "Received code";
      break;
    case EOrderStatus?.PURCHASE_COMPLETED:
      text = "Completed";
      break;
    case EOrderStatus?.TRANSFER_ERROR:
      text = "Settling";
      break;
    case EOrderStatus?.CANCELLED:
      text = "Cancelled";
      break;
    case EOrderStatus?.FORCE_CANCEL:
      text = "Force Cancel";
      break;
  }

  return text;
};

export const renderTextReport = (status: string) => {
  let text: string = "";
  switch (status) {
    case EReportStatus?.IN_PROGRESS:
      text = "In Progress";
      break;
    case EReportStatus?.RESOLVED:
      text = "Resolved";
      break;
  }

  return text;
};
export const renderTextUsers = (status: string) => {
  let text: string = "";
  switch (status) {
    case EStatusUser?.ACTIVE:
      text = "Active";
      break;
    case EStatusUser?.SUSPENDED:
      text = "Suspended";
      break;
  }

  return text;
};

export const capitalized = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const endsWithDomain = (domain: string, ending: string) => {
  return domain.endsWith(ending);
};

export const DEPOSIT_FEE = 5 / 100;

export enum SortEnum {
  ASC = "ASC",
  DESC = "DESC",
}

export enum ERoleUser {
  USER = 2,
  ADMIN = 1,
  SUPER_ADMIN = 0,
}

export enum EFilterDuration {
  BY_DAY = "BY_DAY",
  BY_MONTH = "BY_MONTH",
  BY_WEEK = "BY_WEEK",
  BY_YEAR = "BY_YEAR",
}
