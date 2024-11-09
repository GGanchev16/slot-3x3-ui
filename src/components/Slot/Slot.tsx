import { useEffect, useRef } from "react";
import image1 from "../../assets/1.png";
import image2 from "../../assets/2.png";
import image3 from "../../assets/3.png";
import image4 from "../../assets/4.png";
import image5 from "../../assets/5.png";
import "./slot.css";

interface ISlot {
  resultMatrix?: number[][] | null;
  rows: number[][];
  setRows: (rows: number[][]) => void;
}

export const Slot = ({ resultMatrix, rows, setRows }: ISlot) => {
  const slotRef = useRef<HTMLDivElement>(null);

  const symbolToImage = {
    1: image1,
    2: image2,
    3: image3,
    4: image4,
    5: image5,
  };

  const generateRandomRow = (): number[] => {
    return Array.from({ length: 3 }, () => Math.floor(Math.random() * 5) + 1);
  };

  const generateRandomRowsForScroll = (numRows: number) => {
    return Array.from({ length: numRows }, () => generateRandomRow());
  };

  useEffect(() => {
    if (resultMatrix) {
      const randomRowsForScroll = generateRandomRowsForScroll(100);
      const finalRows = [...randomRowsForScroll, ...resultMatrix];
      setRows(finalRows);
    }
  }, [resultMatrix, setRows]);

  const scrollDistance = resultMatrix
    ? (rows.length - resultMatrix.length) * 100
    : 0;

  return (
    <div className="slot-machine-container">
      <div
        ref={slotRef}
        className="slot-machine-grid"
        style={{
          transform: `translateY(-${scrollDistance}px)`,
        }}
      >
        {rows.map((row, rowIndex) => (
          <div className="slot-row" key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className="slot-item">
                <img
                  className="slot-item-image"
                  src={symbolToImage[cell]}
                  alt={`symbol-${cell}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
