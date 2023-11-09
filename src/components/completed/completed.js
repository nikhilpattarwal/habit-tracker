import { useSelector } from "react-redux"
import { habitSelector } from "../../redux/reducers/homeTaskReducer"
import { useEffect, useState } from "react";
import styles from "./completed.module.css"
import {IoCheckmarkCircleOutline} from "react-icons/io5"
import {BiSolidErrorCircle} from "react-icons/bi"
import { Link } from "react-router-dom";
export const Completed = ({setShowAddBtn}) =>{

    const {habits} = useSelector(habitSelector);
    console.log(habits);
    const [data, setData] = useState([]);
  
    //Showing completed tasks
    useEffect(() => {
        const filteredHabits = habits.filter((item, ind) => habits[ind]?.count > 6);
        setData(filteredHabits);
      }, [habits]);

      useEffect(() => {
        setShowAddBtn(false)
      }, [setShowAddBtn]);

    return (
        <>
        {data.length>0?(
        <div className={styles.mainCont}>
          <div className={styles.innerCont}>
            {data.map((item, i)=>(
              <div key={i} className={styles.items}>
                 <div className={styles.habitAndIcon}>
                   <h3>{item.habit}</h3>
                   <IoCheckmarkCircleOutline className={styles.tickIcon}/>
                 </div>
                 {console.log("Item.lastupdated",item)}
                <h4>Last Updated: {item.lastUpdated}</h4>
              </div>
            ))}
          </div>
        </div>
        ): <>
            <div className={styles.cont}>
              <div className={styles.iconText}>
                <BiSolidErrorCircle className={styles.icon}/>
                <h3>Nothing to Show</h3>
              </div>
              <Link to="/"><h3>Back to Home</h3></Link>
            </div>
           </>
        }
        </>
    )
}