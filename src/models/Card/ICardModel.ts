import { CardModel } from ".";
import { Rank, SuitModel } from "../Suit";

export interface ICardModel {
  /**
   * The rank of the card. 1 is Ace, 13 is King.
   */
  Rank: Rank;
  /**
   * The suit of the card.
   * @see SuitModel
   */
  Suit: SuitModel;
  /**
   * Whether the card is face up or face down.
   * @default false
   */
  Revealed: boolean;
  /**
   * Flips the card over, returning itself.
   */
  Flip(): CardModel;
}
