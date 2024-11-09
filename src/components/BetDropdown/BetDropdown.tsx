import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons
import "./bet-dropdown.css";

interface IBetDropdown {
  bet: number;
  setBet: (bet: number) => void;
}

export const BetDropdown = ({ bet, setBet }: IBetDropdown) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const betOptions = [10, 20, 50, 100];

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLParagraphElement | null>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectBet = (selectedBet: number) => {
    setBet(selectedBet);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="bet-container" ref={dropdownRef}>
      <p className="bet-value" onClick={toggleDropdown} ref={buttonRef}>
        Bet: ${bet}{" "}
        {isDropdownOpen ? (
          <FaChevronDown className="dropdown-icon" />
        ) : (
          <FaChevronUp className="dropdown-icon" />
        )}
      </p>
      {isDropdownOpen && (
        <div className="bet-dropdown animate-slide-down">
          {betOptions.map((option) => (
            <div
              key={option}
              className="bet-option"
              onClick={() => handleSelectBet(option)}
            >
              ${option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
