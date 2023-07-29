import type { IPileModel, CardModel } from "..";

export interface ITableauModel extends IPileModel {
  CanAdd(card: CardModel[]): boolean;
  FaceUp(): CardModel[];
}
