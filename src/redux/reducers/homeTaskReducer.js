
import { createSlice } from "@reduxjs/toolkit";
import { doc, setDoc,updateDoc, deleteDoc } from "firebase/firestore"; 
import { db } from "../../firebase_setup/firebase";

const initialState={
  habits:[]
}

const habitSlice = createSlice({
    name: "tasks",
    initialState,
    reducers:{
        ADD: (state, action)=>{ //addtask to state and firestore
          console.log("payload",  action.payload)
           state.habits.unshift(action.payload);
           console.log("initialState11111",initialState);
           setDoc(doc(db, "habit", action.payload.id), action.payload);
        },
        DELETE:(state, action)=>{// del task from firestore
          const id = action.payload;
          deleteDoc(doc(db, "habit", id));
        },
        UPDATE: (state, action) =>{ // add tracking details to firestore and state
          console.log("returning updated payload",action.payload);
          const id = state.habits.findIndex((index)=>index.id === action.payload.id);
          if(id!== -1){
          state.habits[id] = {
            ...state.habits[id],
            ...action.payload
          }
              // Calculate and update the count here
          state.habits[id].count = state.habits[id].details.filter((item) => item.status === "Done").length;
           //updating firestore
          const index = action.payload.id;
          const washingtonRef = doc(db, "habit", index);
          updateDoc(washingtonRef, {
          details: state.habits[id].details,
          count: state.habits[id].count,
          lastUpdated:state.habits[id].lastUpdated
          });
        }
        },
        GET_DATA:(state, action)=>{ // getting data from firestore
           state.habits= action.payload;
        }
         }
        })

export const habitReducer = habitSlice.reducer;
export const habitAction = habitSlice.actions;
export const habitSelector = (state) => state.habitReducer;