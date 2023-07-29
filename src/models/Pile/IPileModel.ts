import { CardModel } from "../Card";

export interface IPileModel {
  id: string;
  Cards: CardModel[];
  Add(cards: CardModel[]): void;
  Pick(number: number, flip?: boolean): CardModel[];
}

export default IPileModel;
