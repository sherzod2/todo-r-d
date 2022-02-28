import { React } from "react";
import "./App.css";
import Todos from "./components/todos/todos";

function App() {
  return (
    <main>
      <section className="sec">
        <Todos />
      </section>
    </main>
  );
}

export default App;
