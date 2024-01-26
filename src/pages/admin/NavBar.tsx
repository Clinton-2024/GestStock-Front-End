import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className='flex justify-end w-full    bg-white  items-end pt-4 pr-5'>
        
          <Link to='/admin'><span className='text-black font-bold font-sans  text-sm    px-3 py-2 '>Home</span></Link>
          <Link to='/admin/categories'><span className='text-black font-bold font-sans  text-sm    px-3 py-2 '>Catégories</span></Link>
          <Link to='/admin/marchandises'><span className='text-black font-bold font-sans  text-sm    px-3 py-2 '>Marchandises</span></Link>
          <Link to='/admin/operations'><span className='text-black font-bold font-sans  text-sm   px-3 py-2  '>Opérations</span></Link>
          <Link to='/admin/inventaire'><span className='text-black font-bold font-sans px-3 py-2   text-sm   '>Inventaire</span></Link>
       
    </div>
  )
}

export default NavBar