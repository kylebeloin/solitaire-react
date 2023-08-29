import S from "./styles.module.css";
import { useDrag } from "../../hooks/useDrag";

import { FC, useRef } from "react";

import { Stock } from "../Stock";
import { Foundation } from "../Foundation";
import { Waste } from "../Waste";
import { Tableau } from "../Tableau";

import { Suits, SuitValue } from "../../models";
import { PileProvider, HandProvider } from "../../hooks";

const SUITS = Object.keys(Suits) as unknown as SuitValue[];
const TABLEAUS = [1, 2, 3, 4, 5, 6, 7];

export const Board: FC = () => {
  const { parentRef } = useDrag();

  return (
    <HandProvider>
      <PileProvider>
        <div className={S.board} ref={parentRef}>
          <div className={S.row}>
            <div className={S.hand}>
              <Stock />
              <Waste />
            </div>
            <div className={S.foundations}>
              {SUITS.map((suit: SuitValue) => (
                <Foundation key={`${suit}-foundation`} suit={suit} />
              ))}
            </div>
          </div>
          <div className={S.row}>
            <div className={S.tableaus}>
              {TABLEAUS.map((number) => (
                <Tableau key={`${number}-tableau`} number={number} />
              ))}
            </div>
          </div>
        </div>
      </PileProvider>
    </HandProvider>
  );
};

export default Board;
