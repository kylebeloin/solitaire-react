import {
  MutableRefObject,
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  createRef,
  RefObject,
} from "react";

import { action } from "../ components/Pile";

const DEFAULT_DRAG: IDraggable = {
  x: 0,
  y: 0,
  dragging: false,
  ref: undefined,
};

export interface IDragContext {
  parentRef: RefObject<HTMLDivElement>;
  childRef?: IDraggable;
  updateDrag: (e: action) => void;
}

export interface IDraggable {
  x: number;
  y: number;
  dragging: boolean;
  ref?: MutableRefObject<EventTarget | Element | undefined>;
}

const DragContext = createContext({} as IDragContext);

export const useDrag = () => {
  const context = useContext(DragContext);
  return context;
};

const useDragContext = () => {
  const [drag, setDrag] = useState<IDraggable>(DEFAULT_DRAG);
  const parentRef = createRef<HTMLDivElement>();
  const childRef = useRef<EventTarget | Element>();

  const updateDrag = useCallback(
    (e: action) => {
      if (childRef)
        if (e.target && e.target !== childRef.current) {
          childRef.current = e.target;
        }

      let dragging: boolean;
      let x: number = 0;
      let y: number = 0;
      if (e instanceof DragEvent) {
        console.log(e.offsetX, e.offsetY);
        x = e.clientX;
        y = e.clientY;
      }

      switch (e.type) {
        case "dragstart":
          x = 0;
          y = 0;
          dragging = true;
          break;
        case "dragend":
          x = 0;
          y = 0;
          dragging = false;
          break;
        case "drag":
          if (e instanceof DragEvent) {
            console.log(e.offsetX, e.offsetY);
            x = e.clientX - drag.x;
            y = e.clientY - drag.y;
          }
          dragging = true;
          break;
        default:
          x = 0;
          y = 0;
          dragging = false;
          break;
      }

      if (childRef.current instanceof HTMLDivElement) {
        childRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      setDrag(() => ({
        x,
        y,
        ref: childRef,
        dragging,
      }));
      console.log(drag);
    },
    [drag.dragging, drag.ref?.current, drag, drag.x, drag.y]
  );

  return {
    parentRef,
    childRef: drag,
    updateDrag,
  };
};

export const DragProvider = ({ children }: { children: React.ReactNode }) => {
  const drag = useDragContext();
  return <DragContext.Provider value={drag}>{children}</DragContext.Provider>;
};
