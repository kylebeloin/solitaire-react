import S from "./styles.module.css";
import {
  CSSProperties,
  useState,
  useEffect,
  useMemo,
  useCallback,
  forwardRef,
  MouseEvent,
  DragEvent,
  FocusEvent,
  ForwardedRef,
} from "react";
import type { PileContext } from "../../hooks";
import { CardModel } from "../../models";
import { usePile } from "../../hooks";
import { Card } from "../Card";

type direction = "left" | "right" | "overlap" | "down";

type action = MouseEvent | DragEvent | FocusEvent;

interface PileProps {
  direction: direction;
  max?: number;
  id: string;
  actionStart?: (e: action, ref: ForwardedRef<HTMLDivElement>) => void;
  actionEnd?: (e: action | Event, ref: ForwardedRef<HTMLDivElement>) => void;
}

/**
 * A Pile is a container for cards.
 * @param direction - The direction of the pile (determines offset.)
 * @returns
 */
export const Pile = forwardRef<HTMLDivElement, PileProps>(
  (
    { direction, id, actionStart = () => {}, actionEnd = () => {}, max = 1 },
    ref
  ) => {
    const { getPile, updatePile } = usePile();
    const [pile, setPile] = useState<PileContext | null>(null);
    const _cards = useMemo(
      () => pile?.pile?.Cards ?? ([] as CardModel[]),
      [pile]
    );

    const handleStart = useCallback(
      (event: action) => {
        event.stopPropagation();
        actionStart(event, ref);
      },
      [actionStart, ref]
    );

    const handleEnd = useCallback(
      (event: action) => {
        event.stopPropagation();
        event.preventDefault();
        actionEnd(event, ref);
        updatePile();
      },
      [actionEnd, ref]
    );

    useEffect(() => {
      if (id && getPile(id) && !pile) {
        setPile(getPile(id) as PileContext);
      }
    }, [id, getPile]);

    return (
      <div className={`${S.pile} ${S[direction]}`} ref={ref}>
        <div className={S.base} />
        {_cards.map((c, i) => (
          <div
            tabIndex={0}
            draggable={true}
            key={`card-${i}-container`}
            className={S.card}
            style={{ "--count": `${i % max}` } as CSSProperties}
            onDragStart={handleStart}
            onDragEnd={handleEnd}
          >
            <Card card={c} key={`card-${i}`} />
          </div>
        ))}
      </div>
    );
  }
);

export default Pile;
