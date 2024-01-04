import { Routes, Route } from "react-router-dom";
import Marchandises from "./pages/admin/Marchandises";
import Home from "./pages/admin/Home";
function App() {


  return (
    <div className='App'>
      <Routes>
        <Route path="/admin" element={<Home />} >
          <Route path="marchandises" element={<Marchandises />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
