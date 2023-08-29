import { FC, useState, useEffect, useMemo } from "react";
import { usePile, useHand } from "../../hooks";
import { PileType } from "../../models";
import { TableauModel } from "../../models/Tableau/TableauModel";
import { IPileAction, Pile, action } from "../Pile";

interface TableauProps {
  /**
   * The number of cards to deal.
   */
  number: number;
}

export const Tableau: FC<TableauProps> = ({ number }) => {
  const { addPile, getPile, updatePile } = usePile();
  const { cards, ref, updateHand } = useHand();

  const [tableau, setTableau] = useState<TableauModel | null>(null);

  const tableauRef = useMemo(
    () => getPile(tableau?.id ?? "")?.ref,
    [getPile, tableau?.id]
  );

  /**
   *
   *
   */
  const handleClick: IPileAction = (e, clickedRef) => {
    if (clickedRef?.current && tableau) {
      updateHand({ cards: tableau.FaceUp(), ref: clickedRef });
      updatePile(tableau.id, tableau);

      if (tableau.CanAdd(cards) && ref?.current) {
        const pile = getPile(ref.current.id);
        if (pile) {
          tableau.Add(pile.model.Pick(cards.length));
          updateHand({ cards: [], ref: undefined });
          updatePile(tableau.id, tableau);
        }
      }
    }
  };

  const handleDrop: IPileAction = (e) => {
    if (tableau && tableau.CanAdd(cards)) {
      tableau.Add(cards);
      updateHand({ cards: [], ref: undefined });
      updatePile(tableau.id, tableau);
    }
  };

  const handleDragStart: IPileAction = (e, ref) => {
    if (ref?.current && tableau) {
      updateHand({ cards: tableau.FaceUp(), ref });
      updatePile(tableau.id, tableau);
    }
  };

  const handleDragEnd: IPileAction = (e, ref) => {
    if (ref?.current && tableau) {
      /**
       * If hand is empty, cards have been moved to another pile.
       */
      if (cards.length == 0) {
        tableau.Pick(tableau.FaceUp().length);
        updateHand({ cards: [], ref: undefined });
      }
      updatePile(tableau.id, tableau);
    }
  };

  useEffect(() => {
    // If we have a deck and no tableau, create a tableau from the deck.
    const deck = getPile(PileType.Stock)?.model;
    if (!tableau && deck) {
      setTableau(new TableauModel(deck.Pick(number, false)));
    }
    // if tableau is set and we don't have a pile, add the pile.
    else if (tableau && !getPile(tableau.id)) {
      addPile(tableau);
    }
  }, [getPile, addPile, tableau]);

  return (
    <>
      {tableau && (
        <Pile
          id={tableau.id}
          direction="down"
          draggable={true}
          actionStart={handleDragStart}
          actionEnd={handleDragEnd}
          handleClick={handleClick}
          handleDrop={handleDrop}
          max={tableau.Cards.length}
          ref={tableauRef}
        />
      )}
    </>
  );
};
