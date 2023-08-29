import type { IPileModel } from ".";

export default interface IPile {
  Flip(pile: IPileModel): void;
}
