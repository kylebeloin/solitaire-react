import S from "./styles.module.css";
import { useState, useMemo, useEffect, FC } from "react";
import { Pile } from "../Pile";
import { usePile } from "../../hooks";
import { PileType, DeckModel } from "../../models";

export const Stock: FC = () => {
  const [deck, setDeck] = useState<DeckModel | null>(null);
  const { addPile, getPile, updatePile } = usePile();
  const ref = useMemo(() => getPile(deck?.id ?? "")?.ref, [getPile, deck?.id]);

  /**
   * When the stock is clicked, we want to draw a card from the stock
   * and place it on the waste pile.
   * @returns
   */
  const handleClick = async () => {
    if (deck) {
      const card = await deck.Draw(3);
      const waste = getPile(PileType.Waste);
      if (waste) {
        if (card.length > 0) {
          waste.pile.Add(card);
        } else {
          deck.Add(waste.pile.Pick(waste.pile.Cards.length, true));
        }
        updatePile();
      }
    }
  };

  useEffect(() => {
    if (!getPile(deck?.id ?? "") && !deck) {
      const _deck = new DeckModel();
      addPile(_deck);
      setDeck(_deck);
    }
  }, [deck, addPile, getPile]);

  return (
    <div className={S.stock} onClick={handleClick}>
      {deck && <Pile id={deck.id} direction="overlap" ref={ref} />}
    </div>
  );
};

export default Stock;
