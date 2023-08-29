import { CardModel } from "../Card";
import { IPileModel } from "../Pile";

export interface IDeckModel extends IPileModel {
  Cards: Array<CardModel>;
  Shuffle(): void;
  Draw(count: number): Array<CardModel>;
  Create(): void;
}

export default IDeckModel;
