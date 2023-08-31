import { FC } from "react";
import { CardModel } from "../../models";

const style = (card: CardModel) => {
  return {
    "--suit": card.Suit.Icon,
    "--color": card.Suit.Color,
  } as React.CSSProperties;
};

interface CardArtProps {
  card: CardModel;
}

export const CardArt: FC<CardArtProps> = ({ card }) => {
  return <div className={`rank-${card.Rank}`} style={{ ...style(card) }}></div>;
};
