import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { Route } from 'react-router-dom';
import EditContact from './component/EditContact/index'
import AddPost from "./component/AddContact"
import Home from './component/Home';
import Navbar from './component/Navbar/index';
import axios from 'axios';
import { connect } from 'react-redux';
// import "../styles.css"


const App=( { getContact } )=> {
  
  const [data,setData]=useState([])
  useEffect (( )=>{
    axios
    .get(`http://localhost:8000/notes/`)
    .then(res=>{
      
      setData(res.data)
      getContact(res.data)
    }).catch(err=>{console.log(err)
    })
  }, [])
  console.log("bcdk",data)


  return (

    <div className="App">
      <ToastContainer />
      <Navbar />
      
      <Route exact path="/" component={() => <Home />} />
      <Route exact path="/add" component={() => <AddPost />} />
      <Route exact path="/edit/:id" component={() => <EditContact />} />
    </div>
  );
}


// console.log('xdfcgvbhnjmk',contacts)
const mapDispatchToProps = dispatch => ({
getContact: data => {

    dispatch({ type: "FETCH_CONTACT", payload: data });

  },
});


export default connect(null, mapDispatchToProps)(App);
