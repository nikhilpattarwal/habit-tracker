import React from 'react';
import {MdError} from "react-icons/md";
import styles from "./errorElement.module.css"
import { Link } from 'react-router-dom';

export const ErrorElement = ({ error }) => {
  return (
    <div className={styles.errorContainerStyle}>
      <div className={styles.errorIconStyle}>
       <MdError className={styles.errorIcon}/>
      </div>
      <div className={styles.errorTextContainerStyle}>
        <h1 className={styles.errorTitleStyle}>Oops! Something went wrong.</h1>
       
        <p className={styles.errorMessageStyle}>
        <Link to="/"><div className={styles.backIcon}><h3>Back to Home</h3></div> </Link>
        </p> 
    
      </div>
    </div>
  );
};

