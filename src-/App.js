import { makeStyles, } from '@material-ui/core';
import './App.css';
import { useState } from 'react';
import { Route, BrowserRouter, useHistory } from 'react-router-dom';
import LayerBar from './Pages/Creator/LayerBar/LayerBar.js';
import ImagesSection from './Pages/Creator/ImagesSection/ImagesSection.js';

import DetailsBar from './Pages/Creator/DetailsBar/DetailsBar.js';
import Creator from './Pages/Creator';
import All from './Pages/Preview/Preview/All';
import { HashRouter } from 'react-router-dom';
import MainPage from './Pages/MainPage';
const AppSwitches = () => {
  return <div>
    <BrowserRouter >
      <Route exact path="/" component={() => <MainPage />} />
    </BrowserRouter>
  </div>
}

const userStyle = makeStyles((theme) => ({
  modelbox: {
    width: "300px",
    height: "100vh",
    backgroundColor: "white",
    float: "left"
  },
  modalbtngroup: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px"
  },
  singleButton: {
    width: "100%",
    borderBottom: "1px solid black",
    cursor: "pointer",
    '&:hover': {
      backgroundColor: "black",
      color: "white"
    }
  },
  centrebut: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    height: "40px"
  },
  largebtns: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    height: "40px"
  },
  languageSelector: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  singleLanguageEN: {
    border: "1px solid #c5c5c5",
    padding: "10px",
    backgroundColor: (props) => (props.language == "en" ? "black" : "white"),
    color: (props) => (props.language == "en" ? "white" : "black"),
    cursor: "pointer"
  },
  singleLanguageSi: {
    border: "1px solid #c5c5c5",
    padding: "10px",
    backgroundColor: (props) => (props.language == "si" ? "black" : "white"),
    color: (props) => (props.language == "si" ? "white" : "black"),
    cursor: "pointer"
  },

  logoname: {
    fontSize: "30px",
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px"
  },
  closebtn: {
    padding: "5px",
    float: "right",
    fontSize: "50px"
  },

}));

function App() {
  const [language, setLanguage] = useState("si");
  const [tooglesidebar, setTogglesidebar] = useState(false);



  const classes = userStyle({ language: language });


  const logindetais = localStorage.getItem('logindetais');
  const username = localStorage.getItem('username');
  const userid = localStorage.getItem('userid');

  const history = useHistory();

  const gotoprivacy = () => {
    window.location.replace("/privacy-policy");
  }
  const loginaction = () => {
    window.location.replace("/login");
  }
  console.log( window.btoa( window.location.hostname) )
  //YXBwLmdlbmVyYXRlLW5mdC54eXo=
  if ( window.btoa( window.location.hostname ) !== "bG9jYWxob3N0" ) { return AppSwitches } else {
    return (
      <div>
        <BrowserRouter >
          <Route exact path="/" component={() => <Creator />} />
          <Route exact path="/payments" component={() => <All />} />
        </BrowserRouter>
      </div>
    );
  }





}

export default App;
