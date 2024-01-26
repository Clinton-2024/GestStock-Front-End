import { Routes, Route } from "react-router-dom";
import Marchandises from "./pages/admin/Marchandises";
import Home from "./pages/admin/Home";
import ErrorPage from "./pages/admin/ErrorPage";
import NewForm from "./components/operations/NewForm";
import Operations from "./pages/admin/Operations";
import Inventaire from "./pages/admin/Inventaire";
import NewFormMarchandise from "./components/marchandises/NewFormMarchandise";
import Categories from "./pages/admin/Categories";
function App() {


  return (
    <div className='App'>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<ErrorPage />} />
        <Route path="/admin" element={<Home />} >        
          <Route path="categories" element={<Categories />} />
          <Route path="inventaire" element={<Inventaire />} />
          <Route path="operations" element={<Operations />} />
          <Route path="operations/add" element={<NewForm />} />
          <Route path="marchandises" element={<Marchandises />} />
          <Route path="marchandises/add" element={<NewFormMarchandise />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
