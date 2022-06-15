import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useNavigate, Routes, Route } from "react-router-dom";
import Nav from './components/nav.jsx';
import MainContainer from './containers/maincontainer.jsx';
import DropdownList from './components/dropdownlist';
import Home from './components/home';
import Graph from './components/graph';
import Holdings from './components/holdings';
import Transactions from './components/transactions';
import jwt_decode from "jwt-decode";
import { Button } from '@mui/material';
import logo from './docs/logo/WW_1.jpg';

const App = () => {
  // Function for using useNavigate hook in class component MainContainer
  const [user, setUser] = useState({})
  const navigate = useNavigate();

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential)
    let userObject = jwt_decode(response.credential);
    console.log(userObject)
    setUser(userObject)
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "759793236416-42karral6mqhc994tqbuqf7tmfugnjhi.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"), 
      { theme: "outline", size: "large" }
    )
  }, [user]) // [variable x] <-- whenever variable x changes state, invoke useEffect
            // if the dependency array is empty, then useEffect will only run once, on mount

  let statePlaceHolder = undefined;
  function navigateToComp(route, state) {
    console.log('inside the navigateToComp');
    statePlaceHolder = state;
    return navigate(route, state)
  }
  function handleSignOut(e) {
    setUser({});
}
  


  return (
    <div id="app">
    
        { Object.keys(user).length === 0 &&
        <div id='brandingWrapperHome'>
          <div>
          <h1 id='whale'>W H A L E</h1> 
          </div>
          <div>
          <img src={logo} id='whaleLogoHome' /> 
          </div>
        <div id="signInDiv"/>
        </div>
        }
        
      { Object.keys(user).length !== 0 &&
      <div> 
        <Button variant="outlined" onClick={ (e) => handleSignOut(e)}>Sign Out</Button>
      <Nav user={user}/>
        <div id='dropdownWrapper'>
          <DropdownList navigate={navigateToComp} />
        </div>
        <div id='appContainer'>
          <MainContainer navigate={navigateToComp} /> {/* prop drill down the function to be invoked */}
          <div id='componentWrapper'>
            <Routes>
              <Route exact path='/transactions' element={<Transactions parsedState={statePlaceHolder} />}></Route>
              {/* <Route path='/holdings' element={<Holdings parsedState={statePlaceHolder} />}> */}
              <Route path='holdings' >
                <Route exact path=':id' element={<Holdings parsedState={statePlaceHolder} />}></Route>
              </Route>

              <Route exact path='/graph' element={<Graph parsedState={statePlaceHolder} />}></Route>
              <Route exact path='/' element={<Home />}></Route>
            </Routes>
          </div>
      </div>
      </div>
    }
      </div>
  )
};

export default App;