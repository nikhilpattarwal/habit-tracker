import React, { useState,useEffect } from 'react';
import './App.css';
import { Home } from './components/home/home';
import { NavBar } from './components/navBar/navBar';
import { Habit } from './components/habit/habit';
import { Completed } from './components/completed/completed';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {ErrorElement} from './components/errorElement/errorElement';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from './firebase_setup/firebase';
import { useDispatch } from 'react-redux';
import { habitAction } from './redux/reducers/homeTaskReducer';


function App() {
  const [isForm, setIsForm] = useState(false);
  const [showAddBtn, setShowAddBtn] = useState(true);
  const dispatch = useDispatch();
   
  //getting data from firestore
  const getHabitData = () => {
    const unsub = onSnapshot(
      query(collection(db, "habit"), orderBy("id", "desc")),
      (snapshot) => {
        const habit = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        dispatch(habitAction.GET_DATA(habit));
      }
    );
  }
  
  useEffect(() => {
    getHabitData(); 
  },[]);
  
  const router = createBrowserRouter([
    {path:"/", element:<NavBar setIsForm={{setIsForm,showAddBtn}}/>, errorElement:<ErrorElement/>, children:[
      {index:true, element:<Home form={{isForm,setIsForm,setShowAddBtn}} />},
      {path:"/habit/:id", element:<Habit setShowAddBtn={setShowAddBtn} />},
      {path:"/completed", element:<Completed setShowAddBtn={setShowAddBtn}/>}
    ]},
  ])
  return (
   <>
    <RouterProvider router={router} />
   </>
  )
}

export default App;
