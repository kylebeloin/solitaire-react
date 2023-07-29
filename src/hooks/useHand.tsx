import { createContext, useContext, useState } from "react";
import { CardModel } from "../models";

export type HandContext = {
  cards: CardModel[];
  pickCard: () => CardModel[] | undefined;
  setCards: (cards: CardModel[]) => void;
};

interface HandProviderProps {
  children: React.ReactNode;
}

const HandContext = createContext({} as HandContext);

const useHand = () => {
  const context = useContext(HandContext);
  return context;
};

const useHandContext = () => {
  const [cards, setCards] = useState<CardModel[]>([]);

  const pickCard = () => {
    const _cards = [...cards];
    setCards([...cards]);
    return _cards;
  };

  return { cards, pickCard, setCards };
};

const HandProvider: React.FC<HandProviderProps> = ({ children }) => {
  const value = useHandContext();
  return <HandContext.Provider value={value}>{children}</HandContext.Provider>;
};

export { useHand, HandProvider };
