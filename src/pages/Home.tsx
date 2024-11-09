import { useEffect, useState } from "react";
import { usePlay } from "../hooks";
import { IPlayResponse } from "../types";
import { Slot, BottomBar } from "../components";

import "./home.css";

export const Home = () => {
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [balance, setBalance] = useState(
    Number(sessionStorage.getItem("balance")) || 0
  );

  const [resultMatrix, setResultMatrix] = useState<number[][] | null>(null);
  const [lastWin, setLastWin] = useState(0);
  const [bet, setBet] = useState(10);
  const [rows, setRows] = useState<number[][]>([
    [1, 2, 3],
    [4, 5, 1],
    [2, 3, 4],
  ]);
  const [currentWin, setCurrentWin] = useState(0);

  const onSuccess = (data: IPlayResponse) => {
    setResultMatrix(data.matrix);
    setTimeout(() => {
      setBalance(balance + data.winnings);
      setCurrentWin(data.winnings);
      data.winnings > 0 && setLastWin(data.winnings);
      setIsBtnDisabled(false);
    }, 3000);
  };

  const onError = (error: any) => {
    setBalance(balance + bet);
    console.log(error);
    setIsBtnDisabled(false);
  };

  const spinMutation = usePlay(onSuccess, onError);

  const handleSpin = () => {
    if (balance < bet) {
      alert("Insufficient balance");
      return;
    }
    setBalance(balance - bet);
    setIsBtnDisabled(true);
    setResultMatrix(null);

    spinMutation.mutate(bet);
  };

  useEffect(() => {
    sessionStorage.setItem("balance", balance.toString());
  }, [balance]);

  return (
    <div className="home-container">
      <h1 className="home-heading">Lucky Halloween</h1>
      <Slot resultMatrix={resultMatrix} rows={rows} setRows={setRows} />
      <BottomBar
        bet={bet}
        setBet={setBet}
        lastWin={lastWin}
        handleSpin={handleSpin}
        balance={balance}
        isBtnDisabled={isBtnDisabled}
        setBalance={setBalance}
        currentWin={currentWin}
      />
    </div>
  );
};
