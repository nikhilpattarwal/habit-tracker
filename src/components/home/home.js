import {useEffect, useState } from "react";
import styles from "./home.module.css"
import {AiFillDelete} from "react-icons/ai";
import { habitAction, habitSelector } from "../../redux/reducers/homeTaskReducer";
import {useSelector, useDispatch} from "react-redux";
import {BsEmojiFrown} from "react-icons/bs"
import { NavLink } from "react-router-dom";
import {BiSolidPlusCircle} from "react-icons/bi";

export const Home = ({form}) =>{
    const [newHabit, setnewHabit] = useState("");
    const dispatch = useDispatch();
    const {habits} = useSelector(habitSelector);
   console.log(habits,"habithome")
    // addnew habit or task
    const handleNewtask = () => {
        try {
          if (newHabit.trim() !== "") {
            const task = {
              id: new Date().getTime().toString(),
              habit: newHabit,
              createdOn: new Date().toDateString().slice(4)
            };
            dispatch(habitAction.ADD(task)); 
          }
          form.setIsForm((prev) => !prev);
        } catch (error) {
          console.log(error);
        }
    }

    useEffect(()=>{
      form.setShowAddBtn(true)
    },[form])

    return(
        <>
          <div className={styles.mainContainer}>
                <div className={styles.itemsContainer}>
                    {habits?.length !== 0 ? (
                     habits?.map((key, i)=>(
                        <div className={styles.item} key={i}>
                            <div className={styles.checkHeading} >
                               <NavLink to={`/habit/${key.id}`}><h3 className={styles.inputHeading}>{key.habit}</h3></NavLink> 
                                <AiFillDelete onClick={()=>dispatch(habitAction.DELETE(key.id))} className={styles.delIcon}/>
                            </div>
                            <h1>{habits[i]?.count?habits[i]?.count:0}/7</h1>
                            <p>Created on <b>{key.createdOn}</b></p>
                            <p className={styles.lastUpdated}>Last Updated <b>{habits[i]?.lastUpdated?habits[i]?.lastUpdated:key.createdOn}</b></p> 
                        </div>
                     ))
                    ):( <div className={styles.emojiText}>
                          <BsEmojiFrown className={styles.emojiIcon}/>
                          <div className={styles.iconHead}  onClick={() => form.setIsForm((prevIsForm) => !prevIsForm)}>
                             <BiSolidPlusCircle className={styles.iconSize}/>
                             <h4>Add a Habit </h4>
                          </div>                          
                        </div>
                      )}
                </div>
                 
                {/* add new task */}
                {form.isForm?(
                  <div className={styles.formCont}>
                  <div className={styles.form}>
                      <input type="text" placeholder='Enter a Habit' maxLength={30} onChange={(e)=>setnewHabit(e.target.value)}/>
                      <button onClick={()=>{handleNewtask(); setnewHabit("");}} className={styles.button}>Done</button>
                  </div>
               </div>):null}
          </div>
        </>
    )
}