import S from "./styles.module.css";
import { useState, useMemo, useEffect, FC } from "react";
import { usePile, useHand } from "../../hooks";

import { Pile, IPileAction } from "../Pile";
import { PileModel, PileType } from "../../models";

export const Waste: FC = () => {
  const [waste] = useState(new PileModel([], PileType.Waste));
  const { addPile, getPile, updatePile } = usePile();
  const { cards, updateHand } = useHand();
  const wasteRef = useMemo(() => getPile(waste.id)?.ref, [getPile, waste.id]);

  const handleActionStart: IPileAction = (_, ref) => {
    let card = waste?.Cards?.[waste.Cards.length - 1] ?? [];
    if (ref?.current) {
      updateHand({ cards: [card], ref });
      updatePile(waste.id, waste);
    }
  };

  const handleActionEnd: IPileAction = (_, ref) => {
    if (!(typeof ref === "function") && ref?.current) {
      if (cards.length == 0) {
        waste.Pick(1);
      }
      updatePile(waste.id, waste);
    }
  };

  useEffect(() => {
    if (!getPile(waste.id)) {
      addPile(waste);
    }
  }, [waste, addPile, getPile]);

  return (
    <div className={S.waste}>
      <Pile
        id={waste.id}
        direction="right"
        actionStart={handleActionStart}
        actionEnd={handleActionEnd}
        draggable={true}
        max={3}
        ref={wasteRef}
      />
    </div>
  );
};

export default Waste;
