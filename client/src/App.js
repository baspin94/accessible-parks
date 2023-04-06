import { React, useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Switch, Route } from 'react-router-dom';
import Header from './Components/Header';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Main from './Components/Main';

function App() {
  const [user, setUser] = useState({})

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
      <Header setUser={setUser}/>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
       <Route path='/signup'>
        <Signup />
       </Route>
       <Route exact path='/'>
        <Main user={user}/>
       </Route>
      </Switch>
    </ChakraProvider>
  );
}

export default App;
