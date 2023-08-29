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
  model: PileModel;
  ref: React.RefObject<HTMLDivElement>;
};

interface PileContextProps {
  piles: PileContext[];
  addPile: (pile?: PileModel) => string;
  getPile: (key: string | PileType) => PileContext | undefined;
  updatePile: (key: string, pile: PileModel) => void;
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
      setPiles([...piles, { model: pile, ref: ref }]);
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
    return piles.find(
      (pile) => pile.model.id === key || pile.model.type === key
    );
  };

  const updatePile = (key: string, model: PileModel) => {
    let index = piles.findIndex((pile) => pile.model.id === key);
    if (index !== -1) {
      let _piles = [...piles];
      _piles[index].model = model;
      setPiles(_piles);
    }
  };

  return { piles, addPile, getPile, updatePile };
};

const PileProvider: FC<PileProviderProps> = ({ children, number = 1 }) => {
  const value = usePileContext(number);
  return <PileContext.Provider value={value}>{children}</PileContext.Provider>;
};

export { PileProvider, usePile };
