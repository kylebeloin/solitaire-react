import type { IPileModel } from ".";

abstract class Pile {
  /**
   * @description Flips all cards passed in as a parameter.
   * @param pile
   */
  public Flip(pile: IPileModel): void {
    pile.Cards.forEach((card) => card.Flip());
  }
}

export default Pile;
