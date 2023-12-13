import React, { useEffect, useState } from 'react';
import './PupilExperince.scss';


export function PupilExperince() {
  const [experience,setExperience] =useState([localStorage.getItem('attempts')]||[])

  useEffect(()=>{
    if (localStorage.getItem('attempts')) {
      const loc = localStorage.getItem('attempts');
      const cou = JSON.parse(loc);
      setExperience([cou])
    }
  },[localStorage.getItem('attempts')])

  return (
//     <div className="PupilExperince">
// {experience?.map((el)=><div>
//        <h1>{el?.lesson}</h1>
//        <span>{el?.attempts}</span>
//       <div>
//         <h1>Chisht Patasxanerr</h1>
//           { el?.correct?.map((item) => (
//               <div>
//                 <h1>{item?.question}</h1>
//                 <p>{item?.answer}</p>
//               </div>
//             ))}
//             </div>
//             <div>
//         <h1>sxal Patasxanerr</h1>
//           { el?.incorrect?.map((item) => (
//               <div>
//                 <h1>{item?.question}</h1>
//                 <p>{item?.answer}</p>
//               </div>
//             ))}
//             </div>
//             </div>
//             )}
//              <button
//               onClick={() => {
//                 navigate("/Lessons");
//               }}
//             ></button>
//     </div>
<div className="PupilExperience">
<table>
  <thead>
    <tr>
      <th>Lesson</th>
      <th>Attempts</th>
    </tr>
  </thead>
  <tbody>
    {experience?.map((el) => (
      <tr key={el.lesson}>
        <td>{el?.lesson}</td>
        <td>{el?.attempts}</td>
      </tr>
    ))}
  </tbody>
</table>

{experience?.map((el) => (
  <div key={el.lesson}>
    <h1>Chisht Patasxanerr</h1>
    <table>
      <thead>
        <tr>
          <th>Question</th>
          <th>Answer</th>
        </tr>
      </thead>
      <tbody>
        {el?.correct?.map((item) => (
          <tr key={item.question}>
            <td>{item?.question}</td>
            <td>{item?.answer}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <h1>sxal Patasxanerr</h1>
    <table>
      <thead>
        <tr>
          <th>Question</th>
          <th>Answer</th>
        </tr>
      </thead>
      <tbody>
        {el?.incorrect?.map((item) => (
          <tr key={item.question}>
            <td>{item?.question}</td>
            <td>{item?.answer}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
))}

<button onClick={() => { /* Handle button click */ }}>
  Go to Lessons
</button>
</div>
  );
}
