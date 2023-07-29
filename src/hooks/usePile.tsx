import {
  createContext,
  useContext,
  useState,
  FC,
  createRef,
  useCallback,
} from "react";
import { PileModel, PileType } from "../models";

export type PileContext = {
  pile: PileModel;
  ref: React.RefObject<HTMLDivElement>;
};

interface PileContextProps {
  piles: PileContext[];
  addPile: (pile?: PileModel) => string;
  getPile: (key: string | PileType) => PileContext | undefined;
  updatePile: () => void;
}

interface PileProviderProps {
  children: React.ReactNode;
  number?: number;
}

const PileContext = createContext({} as PileContextProps);

const usePile = () => {
  const context = useContext(PileContext);
  return context;
};

const usePileContext = (number: number = 1) => {
  const [piles, setPiles] = useState<PileContext[]>([]);

  const addPile = useCallback(
    (pile = new PileModel()): string => {
      const ref = createRef<HTMLDivElement>();
      setPiles([...piles, { pile, ref: ref }]);
      return pile.id;
    },
    [piles]
  );

  /**
   *
   * @param key - The id or type of the pile.
   * @returns
   */
  const getPile = (key: string | PileType) => {
    return piles.find((p) => p.pile.id === key || p.pile.type === key);
  };

  const updatePile = () => {
    setPiles([...piles]);
  };

  return { piles, addPile, getPile, updatePile };
};

const PileProvider: FC<PileProviderProps> = ({ children, number = 1 }) => {
  const value = usePileContext(number);
  return <PileContext.Provider value={value}>{children}</PileContext.Provider>;
};

export { PileProvider, usePile };
