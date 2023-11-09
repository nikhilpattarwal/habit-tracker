import { NavLink, Outlet } from 'react-router-dom';
import styles from "./navBar.module.css";
import {BiSolidPlusCircle} from "react-icons/bi";

export const NavBar = ({setIsForm}) =>{
    return(
        <>
          <div className={styles.mainCntainer}>
            <div className={styles.innerContainer}>
                <nav className={styles.navBar}>
                    <NavLink to="/" className={styles.home}>Home</NavLink>
                    <div className={styles.createTask}>
                        {setIsForm.showAddBtn?(
                        <div className={styles.iconHead}  onClick={() => setIsForm.setIsForm((prevIsForm) => !prevIsForm)}>
                             <BiSolidPlusCircle className={styles.iconSize}/>
                             <h4>Add New Habit </h4>
                        </div>
                        ):null}
                        <div className={styles.switchoptions}>
                            <NavLink to="/completed" className={styles.barLinks}>Completed</NavLink>
                        </div>
                    </div>
                   
                </nav>
            </div>
          </div>
          <Outlet/>
        </>
    )
}