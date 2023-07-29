import { CardModel } from "../Card";
import { IPileModel } from "../Pile";

export interface IDeckModel extends IPileModel {
  Cards: CardModel[];
  Shuffle(): void;
  Draw(count: number): Promise<CardModel[]>;
  Create(): void;
}

export default IDeckModel;
