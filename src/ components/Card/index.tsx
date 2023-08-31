import { FC } from "react";
import { CardArt } from "./CardArt";
import S from "./styles.module.css";

import { CardModel } from "../../models";

interface CardProps {
  card: CardModel;
  style?: React.CSSProperties;
}

export const Card: FC<CardProps> = ({ card, style }) => {
  return (
    <div style={{ ...style }} className={`${S.card} ${S[card.Suit.Color]}`}>
      {card.Revealed ? (
        <>
          <div className={S.top}>
            <div className={`${S.value}`}>{card.Name}</div>
            <div className={`${S.suit}`}>{card.Suit.Icon}</div>
          </div>
          <div className={S.middle}>
            <CardArt card={card} />
          </div>
          <div className={S.bottom}>
            <div className={`${S.value}`}>{card.Name}</div>
            <div className={`${S.suit}`}>{card.Suit.Icon}</div>
          </div>
        </>
      ) : (
        <div className={S.back} />
      )}
    </div>
  );
};
