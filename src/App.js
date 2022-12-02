import Header from './Component/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Cards from "./Component/cards";
import CardsDetails from './Component/CardsDetails';
import { Routes, Route } from "react-router-dom"
function App() {
  return (
    <>

      <Header />

      <Routes>
        <Route path="/" element={<Cards/>}/>
        <Route path="/cart/:id" element={<CardsDetails/>}/>
      </Routes>
    </>
  )

}

export default App;
