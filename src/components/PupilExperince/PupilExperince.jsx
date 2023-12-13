import React, { useEffect, useState } from 'react';
import './PupilExperince.scss';

export function PupilExperince() {
  const [experience, setExperience] = useState([]);
  const [arr, setArr] = useState({});

  useEffect(() => {
    if (localStorage.getItem('attempts')) {
      const loc = localStorage.getItem('attempts');
      const cou = JSON.parse(loc);
      setExperience([cou]);
    }
  }, [localStorage.getItem('attempts')]);

  return (
    <div className="PupilExperience">
      <table>
        <thead>
          <tr>
            <th>Lesson</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Attempts</th>
          </tr>
        </thead>
        <tbody>
          {experience?.map((el, index) => {
            const rows = [];
            for (let i = 1; i <= (el.incorrect?.length + el.correct?.length); i++) {
              el?.correct?.forEach((item, indexx) => {
                if (item?.question?.split(".")[0] == i) {
                  rows.push(
                    <tr key={indexx}>
                      <td>{el?.lesson}</td>
                      <td>{item?.question}</td>
                      <td>{item?.answer}</td>
                      <td>{el.attempts}</td>
                    </tr>
                  );
                }
              });

              el?.incorrect?.forEach((item, indexx) => {
                if (+item?.question?.split(".")[0] === i) {
                  rows.push(
                    <tr key={indexx}>
                      <td>{el.lesson}</td>
                      <td style={{color:"red"}} >{item?.question}</td>
                      <td style={{color:"red"}} >{item?.answer}</td>
                      <td>{el?.attempts}</td>
                    </tr>
                  );
                }
              });
            }

            return rows;
          })}
        </tbody>
      </table>

      <button onClick={() => { /* Handle button click */ }}>
        Go to Lessons
      </button>
    </div>
  );
}
