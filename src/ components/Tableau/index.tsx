import { FC, useState, useEffect, useMemo } from "react";
import { usePile, useHand } from "../../hooks";
import { PileType, DeckModel } from "../../models";
import { TableauModel } from "../../models/Tableau/TableauModel";
import { Pile } from "../Pile";

interface TableauProps {
  /**
   * The number of cards to deal.
   */
  number: number;
}

export const Tableau: FC<TableauProps> = ({ number }) => {
  const { addPile, getPile, updatePile } = usePile();
  const { cards, setCards } = useHand();
  const deck = useMemo(
    () => getPile(PileType.Stock)?.pile as DeckModel,
    [getPile]
  );
  const [tableau, setTableau] = useState<TableauModel | null>(null);

  const _ref = useMemo(
    () => getPile(tableau?.id ?? "")?.ref,
    [getPile, tableau?.id]
  );

  const handleAction = (e: unknown) => {
    if (tableau) {
      if (tableau.CanAdd(cards)) {
        tableau.Add(cards);
        setCards([]);
        updatePile();
      }
    }
  };

  const handleDragStart = (e: unknown, ref: unknown) => {
    if (tableau) {
      const _cards = tableau.FaceUp();
      // If we have cards, set them to the hand.
      if (_cards) {
        setCards(_cards);
        updatePile();
      }
    }
  };

  const handleDragEnd = (
    e: unknown,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    if (!(typeof ref === "function")) {
      if (ref?.current && tableau) {
        /**
         * If hand is empty, cards have been moved to another pile.
         */
        if (cards.length == 0) {
          tableau.Pick(tableau.FaceUp().length);
          setCards([]);
        }
        updatePile();
      }
    }
  };

  useEffect(() => {
    // If we have a deck and no tableau, create a tableau from the deck.
    if (!tableau && deck) {
      setTableau(new TableauModel(deck.Pick(number, false)));
    }
    // if tableau is set and we don't have a pile, add the pile.
    else if (tableau && !getPile(tableau.id)) {
      addPile(tableau);
    }
  }, [deck, number, addPile, tableau]);

  return (
    <>
      {tableau && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={handleAction}
        >
          <Pile
            id={tableau.id}
            direction="down"
            actionStart={handleDragStart}
            actionEnd={handleDragEnd}
            max={tableau.Cards.length}
            ref={_ref}
          />
        </div>
      )}
    </>
  );
};
