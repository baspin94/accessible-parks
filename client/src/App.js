import { React, useState, useEffect, createContext } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Switch, Route } from 'react-router-dom';
import Header from './Components/Header';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Main from './Components/Main';
import Results from './Components/Results';
import ParkDetail from './Components/ParkDetail';

const UserContext = createContext({})

function App() {
  const [user, setUser] = useState({})

  const [parkMatches, setParkMatches] = useState([])

  useEffect( () => {
    fetch('/authorized')
    .then(response => {
      if (response.ok) {
        response.json()
        .then(userData => setUser(userData))
      } else {
        response.json()
        .then(error => console.log(error))
      }
    })
  }, [])

  return (
    <ChakraProvider>
      <Header user={user} setUser={setUser}/>
      <Switch>
        <Route path='/login'>
          <Login setUser={setUser}/>
        </Route>
       <Route path='/signup'>
        <Signup setUser={setUser}/>
       </Route>
       <Route exact path='/'>
        <Main user={user} setParks={setParkMatches}/>
       </Route>
       <Route path = '/results'>
          <Results parks={parkMatches}/>
       </Route>
       <Route path='/park/:id'>
          <UserContext.Provider value={user}>
            <ParkDetail/>
          </UserContext.Provider>
       </Route>
      </Switch>
    </ChakraProvider>
  );
}

export default App;
export { UserContext };
