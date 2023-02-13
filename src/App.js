import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Header from './components/Header';
import { useEffect } from 'react';
import { getUserAuth } from './actions';
import { connect } from 'react-redux';

function App(props) {

  useEffect(() => {
    props.getUserAuth();
  }, [])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element = {<Login />} />
          <Route exact path='/home'  element= {<div><Home /> <Header/></div>}/>
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
