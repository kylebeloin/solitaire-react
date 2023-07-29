import type { CardModel, SuitValue, IPileModel } from "..";

export interface IFoundationModel extends IPileModel {
  Suit: SuitValue;
  CanAdd(card: CardModel): boolean;
  IsComplete(): boolean;
}
