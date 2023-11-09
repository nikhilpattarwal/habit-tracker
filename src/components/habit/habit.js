import { useDispatch, useSelector } from "react-redux";
import styles from "./habit.module.css";
import { habitAction, habitSelector } from "../../redux/reducers/homeTaskReducer";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const Habit = ({setShowAddBtn}) => {
 
  const currentTimestamp = Date.now(); 
  const currentDate = new Date(currentTimestamp); 
  const dayOfWeek = currentDate.getDay();// Get the day of the week (0-6)
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // Reorder the daysOfWeek array to start from the current day
  const reorderedDays = [...daysOfWeek.slice(dayOfWeek), ...daysOfWeek.slice(0, dayOfWeek)];
  const {habits} = useSelector(habitSelector);
  const {id} = useParams();
  const getId =habits.find((ItemID)=> ItemID.id === id);
  console.log("getId", getId);
  
  const [newDetails, setNewDetails] = useState({details:[], count:0});
  const dispatch = useDispatch();

  useEffect(() => {
    if (getId?.details && getId?.details.length > 0) {
      setNewDetails((prevDetails) => ({
        ...prevDetails,
        details: getId.details
      }));
    }
    setShowAddBtn(false);
  }, [getId.details,setShowAddBtn]);

  //passing all data to reducer
  const setData = () => {
    console.log("newDetails",newDetails)
    dispatch(habitAction.UPDATE(newDetails)); 
  }

  //function to mark status done, not done, none
  const handleCompare = (day, status) => {
    let result = false; 
    if (newDetails && newDetails.details && newDetails.details.length > 0) {
      for (let i = 0; i < newDetails.details.length; i++) {
        if (newDetails.details[i].day === day && newDetails.details[i].status === status) {
          result = true;
          break;
        }
      }
    } else if (habits && habits.length > 0) {
      for (let j = 0; j < habits.length; j++) {
        if(getId.id === habits[j].id){
        if (habits[j].details && habits[j].details.length > 0) {
          for (let i = 0; i < habits[j].details.length; i++) {
            if (habits[j].details[i].day === day && habits[j].details[i].status === status) {
              result = true;
              break;
            }
          }
        }
      }
      }
    }
    return result;
  };
  
  
  // function to update details
  const updateDetails = (day, status) => {
 
    let updatedDetails = [...newDetails.details]; 
    const index = updatedDetails.findIndex((newDay) => newDay.day === day);

    if (index === -1) {
      updatedDetails.push({ day, status });
    
    } else {
      updatedDetails =  updatedDetails.map((item, ci)=>{
        if(ci === index){
          return{...item, status: status}
        }
        return item;
      })
    }

    var options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    setNewDetails((prevDetails) => ({
      ...prevDetails,
      id: getId.id,
      lastUpdated: new Date().toLocaleString('en-US', options),
      details: updatedDetails,
    }));
    
  };


  return (
    <div className={styles.mainCont}>
      <div className={styles.titleButton}>
        <h1>{getId.habit}</h1>
        <Link to="/">
          <button className={styles.button} onClick={setData}> Save Changes</button>
          </Link>
      </div>
      <div className={styles.itemCont}>
        <div className={styles.items}>
          {reorderedDays.map((day, index) => (
           <>
            <div key={index} className={`${styles.day} ${index === 0 ? styles.currentDay : ''}`}>
            <h2>{index === 0 ? `${day} (Today)` : day}</h2>
              <div className={styles.inputChecks}>
                <label >
                    <input type="radio"
                    name={day} 
                    onChange={()=>updateDetails(day,"Done")}
                    checked={handleCompare(day, "Done")} 
                    />
                    <p style={{ color: 'green' }}>Done</p>
                </label>

                <label>
                    <input type="radio" 
                    name={day}
                    onChange={()=>updateDetails(day,"Not Done")} 
                    checked={handleCompare(day, "Not Done")} 
                    />
                    <p style={{ color: 'Red' }}>Not Done</p> 
                </label>
                <label> 
                    <input type="radio" 
                    name={day}
                    onChange={()=>updateDetails(day,"None")}
                    checked={handleCompare(day, "None")} 
                    /> 
                    <p style={{ color: 'Orange' }}>None</p> 
                </label>
              </div>
            </div>
           </>
          ))}
        </div>
      </div>
    </div>
  );
};
