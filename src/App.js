import './App.css';
import {useEffect} from 'react';
import Chat from './components/Chat';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import { useStateValue } from './components/StateProvider';
import {auth} from './components/firebase';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
function App() {
  const [{user},dispatch] = useStateValue();
  useEffect(()=>{
    auth.onAuthStateChanged(authUser => {
      console.log("USER ->", authUser);
      if(authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else{
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  },[]);
    useEffect(()=>{

    },[user])
  return (
    <div className="App">
      {user?(
        <Router>
          <Switch>
          <Route path="/user/:userid">
              <Sidebar/>
              <Chat/>
            </Route>
            <Route path="/">
              <Sidebar/>
            </Route>
          </Switch>

        </Router>
      ):(
        <Login/>
      )}
    </div>
  );
}

export default App;
