import { React, useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Switch, Route } from 'react-router-dom';
import Header from './Components/Header';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Main from './Components/Main';
import Results from './Components/Results';

function App() {
  const [user, setUser] = useState({})

  const sampleMatches = [
    {
    "id": 10,
    "image_alt": "View of the Alcatraz Lighthouse and Island from the water",
    "image_url": "https://www.nps.gov/common/uploads/structured_data/2514A14F-D5E3-BB31-4A0C4175BF61216A.jpg",
    "name": "Alcatraz Island",
    "states": "CA"
    },
    {
    "id": 100,
    "image_alt": "View of Independence Monument with Grand Valley in background. Taken from Rim Rock Rock Drive.",
    "image_url": "https://www.nps.gov/common/uploads/structured_data/3C823606-1DD8-B71B-0BF5770F63271B19.jpg",
    "name": "Colorado National Monument",
    "states": "CO"
    },
    {
    "id": 111,
    "image_alt": "People in bright orange kayaks paddle around a bend in a river, past green trees and a rocky shore.",
    "image_url": "https://www.nps.gov/common/uploads/structured_data/F7425874-D97F-BFD6-36581A36C8A7FF0D.jpg",
    "name": "Cuyahoga Valley National Park",
    "states": "OH"
    }
  ]


  const [parkMatches, setParkMatches] = useState(sampleMatches)

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
      </Switch>
    </ChakraProvider>
  );
}

export default App;
