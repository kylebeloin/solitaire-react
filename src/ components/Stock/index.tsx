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
  const handleClick = () => {
    console.log(deck);
    if (deck) {
      const card = deck.Draw(3);
      const waste = getPile(PileType.Waste);
      if (waste) {
        if (card.length > 0) {
          waste.model.Add(card);
          updatePile(waste.model.id, waste.model);
        } else {
          deck.Add(waste.model.Pick(waste.model.Cards.length, true).reverse());
          deck.Flip(deck);
          updatePile(deck.id, deck);
        }
      }
    }
  };

  useEffect(() => {
    if (!getPile(deck?.id ?? "") && !deck) {
      setDeck(new DeckModel());
    } else if (deck && !getPile(deck.id)) {
      addPile(deck);
    }
  }, [deck, addPile, getPile]);

  return (
    <div className={S.stock}>
      {deck && (
        <Pile
          id={deck.id}
          handleClick={handleClick}
          direction="overlap"
          ref={ref}
          draggable={true}
        />
      )}
    </div>
  );
};

export default Stock;
