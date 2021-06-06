import { Provider } from "react-redux";
import { TrelloBoard } from "../src/screens/components";
import store from "./store";
import "./style/app.css";
import "./style/margin.css";
import "./style/flex.css";
import "./style/padding.css";
import "./style/text.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <TrelloBoard />
      </Provider>
    </div>
  );
}

export default App;
