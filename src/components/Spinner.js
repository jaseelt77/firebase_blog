import React from 'react';
import "react-loading-skeleton/dist/skeleton.css";

function Spinner() {
  return (
    <div className="spinner-border text-primary mt-5 spinner">
        <span className="visually-hidden">Loading...</span>
    </div>
  )
}

export default Spinner;

