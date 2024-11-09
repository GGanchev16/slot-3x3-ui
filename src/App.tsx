import { Home } from "./pages/Home";

import "./App.css";

function App() {
  const balance = Number(sessionStorage.getItem("balance")) || 0;

  if (!balance) {
    sessionStorage.setItem("balance", "1000");
  }

  return <Home />;
}

export default App;
