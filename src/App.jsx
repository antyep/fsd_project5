
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { MainRouter } from "./pages/MainRouter";

function App() {
  return (
    <>
      <Header />
      <MainRouter />
      <Footer />
    </>
  );
}

export default App;
