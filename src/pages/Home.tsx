import { useEffect, useState } from "react";
import { usePlay } from "../hooks";
import { IPlayResponse } from "../types";
import { Slot, BottomBar } from "../components";

import "./home.css";

export const Home = () => {
  const [balance, setBalance] = useState(
    Number(sessionStorage.getItem("balance")) || 0
  );
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [resultMatrix, setResultMatrix] = useState<number[][] | null>(null);
  const [bet, setBet] = useState(10);
  const [lastWin, setLastWin] = useState(0);
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
    console.error(error);
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
      <Slot resultMatrix={resultMatrix} />
      <BottomBar
        bet={bet}
        setBet={setBet}
        balance={balance}
        setBalance={setBalance}
        handleSpin={handleSpin}
        isBtnDisabled={isBtnDisabled}
        lastWin={lastWin}
        currentWin={currentWin}
      />
    </div>
  );
};
