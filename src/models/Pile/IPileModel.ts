import type { CardModel } from "../Card";
import type { IPile } from ".";

export interface IPileModel extends IPile {
  id: string;
  Cards: Array<CardModel>;
  Add(cards: CardModel[]): void;
  Pick(number: number, from?: 0 | -1): Array<CardModel>;
}

export default IPileModel;
