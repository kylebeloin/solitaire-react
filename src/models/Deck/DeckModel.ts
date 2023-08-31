import { CardModel } from "../Card";
import type { IDeckModel } from "./IDeckModel";
import { Ranks, Suits, SuitValue, RankValue, PileModel, PileType } from "..";

const SUITS = Object.keys(Suits) as unknown as SuitValue[];
const RANKS = Object.keys(Ranks) as unknown as RankValue[];

export class DeckModel extends PileModel implements IDeckModel {
  constructor() {
    super([], PileType.Stock);
    // Lets make create an async function that will create a deck of cards
    this.Create();
  }

  public Draw(count: number = 1): CardModel[] {
    const cards = this.Pick(count);
    cards.forEach((card) => card.Flip());
    return cards;
  }

  public Shuffle(): void {
    for (let i = this.Cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = this.Cards[i];
      this.Cards[i] = this.Cards[j];
      this.Cards[j] = temp;
    }
  }

  public Create(): void {
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        this.Add([new CardModel(rank, suit)]);
      }
    }
  }
}

export default DeckModel;
