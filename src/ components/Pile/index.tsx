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
  MutableRefObject,
} from "react";
import type { PileContext } from "../../hooks";
import { CardModel } from "../../models";
import { usePile } from "../../hooks";
import { Card } from "../Card";

type direction = "left" | "right" | "overlap" | "down";

export type action = MouseEvent | DragEvent | FocusEvent;

export interface IAction {
  (e: action, ref: MutableRefObject<HTMLDivElement | null>): void;
}

interface PileProps {
  direction: direction;
  max?: number;
  id: string;
  actionStart?: IAction;
  actionEnd?: IAction;
  handleClick?: IAction;
  handleDrop?: IAction;
  draggable?: boolean;
}

/**
 * A Pile is a container for cards.
 * @param direction - The direction of the pile (determines offset.)
 * @returns
 */
export const Pile = forwardRef<HTMLDivElement, PileProps>(
  (
    {
      direction,
      id,
      actionStart = () => {},
      actionEnd = () => {},
      handleClick = () => {},
      handleDrop = () => {},
      max = 1,
      draggable = false,
    },
    ref
  ) => {
    const { getPile } = usePile();
    const [pile, setPile] = useState<PileContext | null>(null);
    const cards = useMemo(
      () => pile?.model?.Cards ?? ([] as CardModel[]),
      [pile]
    );

    const onClick = useCallback(
      (event: action) => {
        if (!(typeof ref === "function") && ref?.current)
          handleClick(event, ref);
      },
      [handleClick, ref]
    );

    const onDrop = useCallback(
      (event: action) => {
        if (!(typeof ref === "function") && ref?.current)
          handleDrop(event, ref);
      },
      [handleDrop, ref]
    );

    const handleStart = useCallback(
      (event: action) => {
        if (!(typeof ref === "function") && ref?.current)
          actionStart(event, ref);
      },
      [actionStart, ref]
    );

    const handleEnd = useCallback(
      (event: action) => {
        event.stopPropagation();
        event.preventDefault();
        if (!(typeof ref === "function") && ref?.current) actionEnd(event, ref);
      },
      [actionEnd, ref]
    );

    useEffect(() => {
      if (id && getPile(id) && !pile) {
        setPile(getPile(id) as PileContext);
      }
    }, [id, getPile]);

    return (
      <div
        id={pile?.model.id}
        className={`${S.pile} ${S[direction]}`}
        ref={ref}
        itemType={`${pile?.model.type}`}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={onDrop}
      >
        <div
          className={S.base}
          onClick={(e) => (cards.length ? null : onClick(e))}
        />
        {cards.map((card, i) => (
          <div
            tabIndex={0}
            draggable={draggable}
            key={`card-${i}-container`}
            className={`${S.card}${card.Revealed ? ` ${S.revealed}` : ""}`}
            style={{ "--count": `${i % max}` } as CSSProperties}
            onDragStart={handleStart}
            onDragEnd={handleEnd}
            onClick={onClick}
          >
            <Card card={card} key={`${pile?.model.id}-card-${i}`} />
          </div>
        ))}
      </div>
    );
  }
);

export default Pile;
