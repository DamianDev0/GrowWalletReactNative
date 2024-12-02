export interface WalletRequest {
  balance: number;
}

export interface WalletResponse {
  code: number;
  message: string;
  data: {
    id: string;
    balance: number;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
