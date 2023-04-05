import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Switch, Route } from 'react-router-dom';
import Header from './Components/Header';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Main from './Components/Main';

function App() {
  return (
    <ChakraProvider>
      <ColorModeSwitcher />
      <Header />
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
       <Route path='/signup'>
        <Signup />
       </Route>
       <Route exact path='/'>
        <Main />
       </Route>
      </Switch>
    </ChakraProvider>
  );
}

export default App;
