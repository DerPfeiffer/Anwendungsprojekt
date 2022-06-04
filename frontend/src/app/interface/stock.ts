import {Product} from "./product";

export interface Stock {
  id: number,
  product: Product
  amount: number,
  lastIncoming: Date,
  lastOutgoing: Date,
  shelf: number,
  floor: number
}
