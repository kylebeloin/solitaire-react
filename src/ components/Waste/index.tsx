import S from "./styles.module.css";
import { useState, useMemo, useEffect, FC } from "react";
import { usePile, useHand } from "../../hooks";

import { Pile } from "../Pile";
import { PileModel, PileType } from "../../models";

export const Waste: FC = () => {
  const [waste] = useState(new PileModel([], PileType.Waste));
  const { addPile, getPile, updatePile } = usePile();
  const { cards, setCards } = useHand();
  const _ref = useMemo(() => getPile(waste.id)?.ref, [getPile, waste.id]);

  const handleActionStart = (e: unknown, ref: unknown) => {
    const _cards = waste?.Cards?.[waste.Cards.length - 1] ?? null;
    if (_cards) {
      setCards([_cards]);
      updatePile();
    }
  };

  const handleActionEnd = (
    e: unknown,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    if (!(typeof ref === "function")) {
      if (ref?.current) {
        if (cards.length == 0) {
          waste.Pick(1);
        }
        updatePile();
      }
    }
  };

  useEffect(() => {
    if (!getPile(waste.id)) {
      addPile(waste);
    }
  }, [waste, addPile, getPile]);

  return (
    <div className={S.stock} onFocus={(e) => handleActionStart(e, _ref)}>
      <Pile
        id={waste.id}
        direction="left"
        actionStart={handleActionStart}
        actionEnd={handleActionEnd}
        max={3}
        ref={_ref}
      />
    </div>
  );
};

export default Waste;
