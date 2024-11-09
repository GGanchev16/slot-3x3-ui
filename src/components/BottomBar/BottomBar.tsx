import { useState } from "react";
import { BetDropdown } from "../";
import { useSim } from "../../hooks";
import { ISimResponse } from "../../types";

import "./bottom-bar.css";

interface IBottomBar {
  bet: number;
  setBet: (bet: number) => void;
  lastWin: number;
  currentWin: number;
  handleSpin: () => void;
  isBtnDisabled: boolean;
  balance: number;
  setBalance: (balance: number) => void;
}

export const BottomBar = ({
  bet,
  setBet,
  lastWin,
  currentWin,
  handleSpin,
  isBtnDisabled,
  balance,
  setBalance,
}: IBottomBar) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [simWin, setSimWin] = useState<number | null>(null);

  const onSuccess = (data: ISimResponse) => {
    setSimWin(data.netResult);
    setBalance(balance + data.netResult);
  };
  const onError = (err: any) => {
    console.error(err);
  };
  const simMutation = useSim(onSuccess, onError);

  const handleSim = () => {
    setIsDialogOpen(true);
  };

  const handleSimOption = (count: number) => {
    if (count * bet > balance) {
      alert("Insufficient balance");
      return;
    }
    simMutation.mutate({ count, bet });
  };

  return (
    <>
      <div className="bottom-bar-wrapper">
        <div className="bottom-bar">
          <div className="bet-container">
            <BetDropdown bet={bet} setBet={setBet} />
            <p>
              Last Win: ${lastWin.toFixed(2)}, Curr: ${currentWin.toFixed(2)}
            </p>
          </div>
          <div className="btns-container">
            <button
              onClick={handleSpin}
              disabled={isBtnDisabled}
              className="spin-button"
            >
              SPIN
            </button>
            <button
              onClick={handleSim}
              disabled={simMutation.isPending}
              className="sim-button"
            >
              SIM
            </button>
          </div>
          <p className="balance-display">Balance: ${balance.toFixed(2)}</p>
        </div>
      </div>

      {isDialogOpen && (
        <div className="sim-dialog">
          <p>{!simWin ? "Select Simulation Count" : "Result"}</p>
          <div className="sim-options">
            {!simWin ? (
              [10, 20, 50].map((option) => (
                <button
                  key={option}
                  onClick={() => handleSimOption(option)}
                  className="sim-option-button"
                >
                  {option}
                </button>
              ))
            ) : (
              <p>
                {simWin < 0
                  ? `Oops. This time you lost $${Math.abs(
                      simWin
                    )}. Good luck next time!`
                  : `Congratulations you won: $${simWin}`}
              </p>
            )}
          </div>
          <button
            onClick={() => {
              setSimWin(null);
              setIsDialogOpen(false);
            }}
            className="close-dialog"
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
};
