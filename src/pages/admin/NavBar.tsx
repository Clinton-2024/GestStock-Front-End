import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className='flex w-full p-3  bg-white justify-end px-10 items-center '>
        <div className='flex gap-4 items-center'>
          <Link to='/admin'><span className='text-black font-bold  text-xs '>Home</span></Link>
          <Link to='/admin/marchandises'><span className='text-black font-bold  text-xs '>Marchandises</span></Link>
        </div>
    </div>
  )
}

export default NavBar