import {useState} from 'react'
import { Link,useNavigate } from "react-router-dom"

export default function SignUp() {

  const [formData, setformData] = useState({})
   const [error, seterror] = useState(null)
   const [isLoading, setisLoading] = useState(false)
   const navigate=useNavigate()


    //*******HANDLE CHANGE METHOD********/
       const handleChange=(e)=>
           {
            setformData(
              {
                 ...formData,                 //spread operator
                [e.target.id]:e.target.value //adding or updating the key with
              })
                
          }
     //*****END HANDLE CHANGE METHOD*****/

     //**************Handlesubmit******** */
              const handleSubmit=async(e)=> 
              {
                e.preventDefault()

                try 
                {
                  setisLoading(true)
                  const res=await fetch('/Api/auth/signup',
                  {
                    method:'POST',
                    headers:
                    {
                      'Content-Type':'application/json',
                    },
                    body:JSON.stringify(formData),
                  })
                    const data =await res.json()
                    console.log(data)
                    if(data.success===false)
                    {
                      setisLoading(false)
                      seterror(data.message)
                      return
                    }
                     setisLoading(false)
                     seterror(null)
                     navigate('/sign-up')
                    } 
                    catch (error) 
                    {
                      setisLoading(false)
                      seterror(error.message)
                    }
              }
              /* console.log(formData); */
     //*************End Handlesubmit********* */


  return (
    //*********************CRAETE SIGNUP PAGE**********************/
    <div className=' p-3 max-w-lg mx-auto'>
         <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input type="text" placeholder='username'  className='sn  border p-3 rounded-lg' id='username'
                onChange={handleChange} />
          <input type="email" placeholder='email'  className='sn border p-3 rounded-lg' id='email'
                onChange={handleChange} />
          <input type="password" placeholder='password'  className='sn border p-3 rounded-lg' id='password'
                 onChange={handleChange}/>
          {/*  BUTTON */}
          <button disabled={isLoading} className='bg-green-700  rounded-lg text-white p-3 uppercase hover:opacity-95'>
            {isLoading ?'Loading.....':'Signup'}
          </button>
        </form>
       
        <div className='flex gap-2 mt-3'>
            <p>Have an account?</p>
            <Link to={'sign-in'}>
              <span className='text-blue-700'>Signin</span>
            </Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
    //********************ENDING SIGNUP PAGE**********************/
  )
}


