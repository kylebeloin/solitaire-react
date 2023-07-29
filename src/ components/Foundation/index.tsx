import S from "./styles.module.css";
import { useState, useMemo, useEffect, FC } from "react";

import { Pile } from "../Pile";
import { usePile, useHand } from "../../hooks";
import { FoundationModel, SuitValue } from "../../models";

interface FoundationProps {
  suit: SuitValue;
}

export const Foundation: FC<FoundationProps> = ({ suit }) => {
  const [foundation] = useState(new FoundationModel(suit));
  const { addPile, getPile, updatePile } = usePile();
  const { setCards, pickCard } = useHand();

  const _ref = useMemo(
    () => getPile(foundation.id)?.ref,
    [getPile, foundation.id]
  );

  const handleAction = (e: unknown) => {
    const _card = pickCard()?.[0];
    if (_card) {
      if (foundation.CanAdd(_card)) {
        foundation.Add([_card]);
        setCards([]);
      } else {
        setCards([_card]);
      }
    }
    updatePile();
  };

  useEffect(() => {
    if (!getPile(foundation.id)) {
      addPile(foundation);
    }
  }, [foundation, addPile, getPile]);

  return (
    <div
      key={"foundation"}
      className={S.foundation}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={handleAction}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleAction(e);
      }}
    >
      <Pile id={foundation.id} direction="overlap" ref={_ref} />
    </div>
  );
};

export default Foundation;
