import React, { useEffect, useState } from 'react';
import './PupilExperince.scss';


export function PupilExperince() {
  const [experience,setExperience] =useState(localStorage.getItem('attempts')||[])

  useEffect(()=>{
    if (localStorage.getItem('attempts')) {
      const loc = localStorage.getItem('attempts');
      const cou = JSON.parse(loc);
      setExperience(cou)
    }
  },[localStorage.getItem('attempts')])

  return (
    <div className="PupilExperince">
     
      <div>
        <h1>Chisht Patasxanerr</h1>
          { experience?.correct?.map((el) => (
              <div>
                <h1>{el.question}</h1>
                <p>{el.answer}</p>
              </div>
            ))}
            </div>
            <div>
        <h1>sxal Patasxanerr</h1>
          { experience?.incorrect?.map((el) => (
              <div>
                <h1>{el.question}</h1>
                <p>{el.answer}</p>
              </div>
            ))}
            </div>
            
             <button
              onClick={() => {
                navigate("/Lessons");
              }}
            ></button>
    </div>
  );
}
