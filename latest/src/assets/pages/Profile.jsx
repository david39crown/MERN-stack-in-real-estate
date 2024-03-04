import React from 'react'
import { useSelector } from 'react-redux'
import {useRef,useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {
  getStorage, 
  uploadBytesResumable,
  ref, 
  getDownloadURL} from 'firebase/storage'

import { app } from '../../firebase'
import {
   updateUserStart,
   updateUserSuccess,
   updateUserFailure, 
   deleteUserFailure, 
   deleteUserStart,
   deleteUserSuccess,
   signOutUserStart,  
   signOutUserSuccess,
   signOutUserFailure,} from '../../redux/user/userSlice'
import { useDispatch } from 'react-redux'

export default function Profile() {
  const fileRef=useRef(null)
  const {currentUser,isLoading,error}=useSelector((state)=>state.user)
  const [file,setFile]=useState(undefined)
  const [filePerc,setFilePer]=useState(0)
  const [fileUploadError,setFileUplaodError]=useState(false)
  const [formData, setformData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false)
  const [userListings, setUserListings] = useState([]);
  /* console.log(fileUploadError) */
  /* console.log(formData) */
  /* console.log(filePerc) */
  
  const dispatch=useDispatch()
  //firebase Storage
  /*  allow read;
  allow write: 	if
  request.resource.size<2*1024*1024 &&
  request.resource.contentType.matches('image/.*')
   */

      useEffect(()=>
      {
        if(file)
        {
          handleFileUpload(file)
        }
      },[file]
      )
      const handleFileUpload=(file)=>{

          const storage=getStorage(app)
          const fileName=new Date().getTime()+file.name
          const storageRef=ref(storage,fileName);//folder name avatar
          const uploadTask=uploadBytesResumable(storageRef,file)

          uploadTask.on('state_changed',(snapshot)=>{
              const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
              console.log('upload is' +progress +'% done')
              setFilePer(Math.round(progress))
          },  

          (error)=>{
            setFileUplaodError(true)
          },
          ()=>
          {
              getDownloadURL(uploadTask.snapshot.ref).then
              ((downloadURL)=>{
                 setformData({...formData,avatar:downloadURL})
              })
          } )
      }
/* ***************************************** */
      const handleChange= (e)=>{
        setformData({...formData,[e.target.id]:e.target.value})
      }
/* ***************************************** */
      const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/Api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(res);
      const data = await res.json();
      console.log(data)
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

/* ***************************************** */
  const handleDeleteUser=async()=>
  {
    try 
    {
      dispatch(signOutUserStart())
      const res=await fetch(`/Api/user/delete/${currentUser._id}`,
      {
        method:"DELETE",
      })
      const data=await res.json()
      if(data.success==false)
      {
        dispatch(signOutUserFailure(data.message))
        return
      }
        dispatch(signOutUserSuccess(data))
    } 
    catch 
    (error) {
      dispatch(signOutUserFailure(error.message))
    }

  }
  /* ***************************************** */
  const handleSignOut=async()=>
  {
   try
    {
      dispatch(signOutUserStart())
      const res=await fetch('/Api/auth/signout')
      const data=await res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    
   }
    catch (error) {
      dispatch(deleteUserFailure(data.message));
   }
  }
  const handleShowListings=async()=>
  {
    try {
      setShowListingsError(false)
      const res=await fetch(`/Api/user/listings/${currentUser._id}`)
      const data=await res.json()
        if(data.success=== false)
        {
          setShowListingsError(true)
          return
        }
        setUserListings(data)
      
    } catch (error) {
      setShowListingsError(error)
    }
    
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-3xl font-semibold text-center my-7'>profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
        <input 
        onChange={(e)=>setFile(e.target.files[0])}
        type="file" 
        ref={fileRef}
         hidden 
         accept='image/*'/>
        <img 
              onClick={()=>fileRef.current.click()}
              src={formData.avatar||currentUser.avatar} alt="profile" 
              className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
              {console.log(currentUser.avatar)}
      
      <p className='text-sm self-center'>

        {fileUploadError ? (
          <span className='text-red-700 font-bold'>Error image Upload</span>

        ):
        filePerc>0 &&filePerc<100 ?
        (
          <span className='text-slate-700 font-bold'>{`uploading ${filePerc}%`}</span>
          
        ):filePerc===100 ?(
          <span className='text-green-700 font-bold'> Succesfully uploaded!</span>
        ):(
          ''
        )
        }
      </p>
      
        <input 
              type="text" placeholder='username' id='username'
              defaultValue={currentUser.username}
              onChange={handleChange}
              className='sn border p-3 rounded-lg'/>
        <input
              type="text" placeholder='email' id='email'
              defaultValue={currentUser.email}
              onChange={handleChange}
              className='sn border p-3 rounded-lg'/>
        <input 
              type="password" placeholder='password' id='password'
              onChange={handleChange}
              className='sn border p-3 rounded-lg'/>
        <button 
        disabled={isLoading}
        className='bg-blue-500 p-3 rounded-lg uppercase hover:opacity-95
                   text-white disabled:opacity-95'>{isLoading? 'Loading...':'Update'}</button>
       <Link className='bg-slate-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={"/create listing"}>Create Listing</Link>
        </form>   
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='sn border rounded-lg p-2  bg-red-700 text-white'>Delete account</span>
        <span onClick={handleSignOut} className='sn border rounded-lg p-2 bg-red-700 text-white'>sign out</span>

      </div>
      <p className='text-red-700 mt-5'>{error ? error : ''} </p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
        <button 
        onClick={handleShowListings} 
         className='text-green-700 w-full'>Show Listing</button>
         <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
        </p>
        {userListings &&userListings.length>0 &&
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 mb-7 text-2xl font-semibold'>Your Listings</h1>
          {
            userListings.map((listing)=>(
              <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'>

                <Link to={`/listing/${listing._id}`}>
                  <img
                   src={listing.imageUrls[0]}
                    alt="listing cover"
                    className='h-16 w-16 object-contain' />
                </Link>
                <Link 
                to={`/listing/${listing._id}`}

                className='text-slate-700 font-semibold hover:underline truncate flex-1'>
                 <p>{listing.name}</p>
                </Link>
                <div className="flex flex-col item-center">
                  <button className='text-red-700 uppercase'>Delete</button>
                  <button className='text-green-700 uppercase'>Edit</button>
                </div>

              </div>
            ))
          }
          </div>}
      
    </div>
  )
}

