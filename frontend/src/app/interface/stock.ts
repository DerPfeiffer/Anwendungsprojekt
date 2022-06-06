import {Product} from "./product";

export interface Stock {
  id: number,
  product: Product
  amount: number,
  thresholdAmount: number,
  stockWarning: boolean,
  lastIncoming: Date,
  lastOutgoing: Date,
  shelf: number,
  floor: number
}
