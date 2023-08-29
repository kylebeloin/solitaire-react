import type { CardModel } from "../Card";
import type { IPile } from ".";

export interface IPileModel extends IPile {
  id: string;
  Cards: Array<CardModel>;
  Add(cards: CardModel[]): void;
  Pick(number: number, flip?: boolean): Array<CardModel>;
}

export default IPileModel;
