import S from "./styles.module.css";
import { useState, useMemo, useEffect, FC } from "react";

import { IPileAction, Pile } from "../Pile";
import { usePile, useHand } from "../../hooks";
import { FoundationModel, SuitValue, Suits } from "../../models";

interface FoundationProps {
  suit: SuitValue;
}

export const Foundation: FC<FoundationProps> = ({ suit }) => {
  const [foundation] = useState(new FoundationModel(suit));
  const { addPile, getPile, updatePile } = usePile();
  const { cards, updateHand } = useHand();

  const foundationRef = useMemo(
    () => getPile(foundation.id)?.ref,
    [getPile, foundation.id]
  );

  const handleAction: IPileAction = () => {
    if (cards.length && foundation.CanAdd(cards[cards.length - 1])) {
      foundation.Add([cards.pop()!]);
      updateHand({ cards: cards, ref: undefined });
    }
    updatePile(foundation.id, foundation);
  };

  useEffect(() => {
    if (!getPile(foundation.id)) {
      addPile(foundation);
    }
  }, [foundation, addPile, getPile]);

  return (
    <div key={`foundation-${foundation.id}`} className={S.foundation}>
      <div className={S.suit}>{Suits[suit].name}</div>
      <Pile
        id={foundation.id}
        handleClick={handleAction}
        handleDrop={handleAction}
        direction="overlap"
        ref={foundationRef}
      />
    </div>
  );
};

export default Foundation;
