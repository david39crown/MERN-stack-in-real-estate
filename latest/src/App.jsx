import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './assets/pages/Home'
import SignIn from './assets/pages/SignIn'
import SignUp from './assets/pages/SignUp'
import Profile from './assets/pages/Profile'
import About from './assets/pages/About'
import Header from './components/Header'
import PrivateRoute from './components/privateRoute'
import CreateListing from './assets/pages/CreateListing'
import UpdateListing from './assets/pages/UpdateListing'
export default function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/sign-in" element={<SignIn />}/>
      <Route path="/sign-up" element={<SignUp />}/>
      <Route path="/about" element={<About />}/>
      <Route  element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile />}/>
         <Route path="/create-listing" element={<CreateListing />}/>
         <Route path="/update-listing/:listingId" element={<UpdateListing />}/>
      </Route>
  </Routes> 
  </BrowserRouter> 
  
  )
}



/* 
return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="*" element={<Home />}/>
      <Route path="/sign-in" element={<SignIn />}/>
      <Route path="/sign-up" element={<SignUp />}/>
      <Route path="/about" element={<About />}/>
      <Route  element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/create listing" element={<CreateListing />}/>
      </Route>
  </Routes> 
  </BrowserRouter> 
  
  )
}
 */









/* 
 return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExploreWithoutNavbar />} />
        <Route element={<Header />}>
          <Route path="/home" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function ExploreWithoutNavbar() {
  return (
    <Routes>
      <Route path="/" element={<Explore />} />
    </Routes>
  )
}


*/