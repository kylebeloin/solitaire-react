import {
  createContext,
  useContext,
  useState,
  useCallback,
  MutableRefObject,
} from "react";
import { CardModel } from "../models";

const DEFAULT_HAND: IHand = {
  ref: undefined,
  cards: [],
};

export type HandContext = {
  ref?: MutableRefObject<HTMLDivElement | null>;
  cards: Array<CardModel>;
  updateHand: (hand: IHand) => void;
};

export interface IHand {
  ref?: MutableRefObject<HTMLDivElement | null>;
  cards: Array<CardModel>;
}

interface HandProviderProps {
  children: React.ReactNode;
}

const HandContext = createContext({} as HandContext);

const useHand = () => {
  const context = useContext(HandContext);
  return context;
};

const useHandContext = () => {
  const [hand, setHand] = useState<IHand>(DEFAULT_HAND);

  const updateHand = useCallback(
    (hand: IHand) => {
      const { ref, cards } = hand;

      setHand(() => ({
        ref: ref,
        cards: cards,
      }));
    },
    [hand.cards.length, hand.ref, hand]
  );
  return {
    cards: hand.cards,
    ref: hand.ref,
    updateHand,
  };
};

const HandProvider: React.FC<HandProviderProps> = ({ children }) => {
  const value = useHandContext();
  return <HandContext.Provider value={value}>{children}</HandContext.Provider>;
};

export { useHand, HandProvider };
