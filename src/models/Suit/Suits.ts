export enum Colors {
  Red = "red",
  Black = "black",
}

export enum SuitValue {
  Spades = 1,
  Hearts = 2,
  Clubs = 3,
  Diamonds = 4,
}

export enum SuitName {
  Spades = "♠",
  Hearts = "♥",
  Clubs = "♣",
  Diamonds = "♦",
}

export type SuitInfo = {
  name: SuitName;
  color: Colors;
};

export const Suits: Record<SuitValue, SuitInfo> = {
  [SuitValue.Spades]: {
    name: SuitName.Spades,
    color: Colors.Black,
  },
  [SuitValue.Hearts]: {
    name: SuitName.Hearts,
    color: Colors.Red,
  },
  [SuitValue.Clubs]: {
    name: SuitName.Clubs,
    color: Colors.Black,
  },
  [SuitValue.Diamonds]: {
    name: SuitName.Diamonds,
    color: Colors.Red,
  },
};

export type Suit = keyof typeof Suits;

export default Suits;
