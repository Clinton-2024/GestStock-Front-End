import { Outlet, useLocation } from "react-router-dom"
import NavBar from './NavBar'

function Home() {
  return (
    <div className=" w-full">
       <NavBar />
      <Outlet />
     
      
    </div>
  )
}

export default Home