export enum RankValue {
  Ace = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
  Ten = 10,
  Jack = 11,
  Queen = 12,
  King = 13,
}

export enum RankName {
  Ace = "A",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Ten = "10",
  Jack = "J",
  Queen = "Q",
  King = "K",
}

export const Ranks: Record<RankValue, RankName> = {
  [RankValue.Ace]: RankName.Ace,
  [RankValue.Two]: RankName.Two,
  [RankValue.Three]: RankName.Three,
  [RankValue.Four]: RankName.Four,
  [RankValue.Five]: RankName.Five,
  [RankValue.Six]: RankName.Six,
  [RankValue.Seven]: RankName.Seven,
  [RankValue.Eight]: RankName.Eight,
  [RankValue.Nine]: RankName.Nine,
  [RankValue.Ten]: RankName.Ten,
  [RankValue.Jack]: RankName.Jack,
  [RankValue.Queen]: RankName.Queen,
  [RankValue.King]: RankName.King,
};

export type Rank = RankValue;

export default Ranks;
