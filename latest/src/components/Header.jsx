import {FaSearch} from 'react-icons/fa'
import { Link ,useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useEffect, useState } from 'react';

export default function Header() { 
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);


 const {currentUser}=useSelector(state=>state.user)




  return (
    <header className='bg-emerald-500 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3 '>
          <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl '>{/* flex flex-wrap */}
                <span className='text-slate-800'>House of  </span>
                <span className='text-white'>Villas</span>
            </h1>
            </Link>

            <form 
            onSubmit={handleSubmit}
            className='bg-slate-100 p-3 rounded-lg flex items-center'
            >
                <input 
                   type='text' 
                   placeholder='Search...' 
                   className='bg-transparent focus:outline-none w-24 sm:w-64'
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   />
                   <button>
                     <FaSearch className='text-slate-600' />
                   </button>
            </form>
            <ul  className='flex gap-4'>
                 <Link to='/'>   <li className='hidden sm:inline text-neutral-950 font-bold hover:text-white'>Home</li></Link>
                 <Link to='about'>  <li className='hidden sm:inline text-neutral-950 font-bold  hover:text-white'>About</li></Link>
                
                 <Link to='profile'> 
                 {currentUser ? 
                 (
                    <img
                      className='rounded-full h-7 w-7 object-cover'
                      src={currentUser.avatar} 
                      alt="profile" />
                    
                 ):
                  <li className='text-neutral-950 font-bold hover:text-white'>
                    Sign In</li>
                 }
                    
                  </Link>
                 {/*  console.log(currentUser.avatar) */}
                </ul>
        </div>
    </header>
  )
}
