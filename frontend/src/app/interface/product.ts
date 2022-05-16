import {Producer} from "./producer";

export interface Product {
  id: number,
  name: string,
  producer: Producer
}
