
export interface TransactionType {
  id: string;
  type: string;
  time: string;
  paymentMethod: string;
  value: string;
  attachment?: File | null;
}