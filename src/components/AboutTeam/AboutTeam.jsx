import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutTeam.scss';
import { useSelector } from 'react-redux';

export function AboutTeam() {
  const { About } = useSelector((state) => state.About);
  let LocalValue;
  if (localStorage.getItem("language")) {
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }
  const navigate = useNavigate();
 
  return (
    <div className="AboutTeam">
      <section className="aboutSection">
        <div className="aboutSectionContainer">
          <div className="bigimg">
            <img src={About[0]?.image} alt="AboutImage" />
          </div>
          <div className="items">
            {About.map((el, index) => {
              if (el.id !== 1) {
                return (
                  <div key={index} className="aboutInfoBlock">
                    <img src={el?.image} alt={el?.text} />
                    {el.text !== null && (
                      <h3 className="InfoBlockTitle">{el?.title}</h3>
                    )}
                    <p className="InfoBlockparagraph">{el?.text}</p>
                    {el.id === 2 ? (
                      <button onClick={() => {navigate(`/aboutPersons/${LocalValue}`)}}>{el?.more}</button>
                    ) : (
                      
                      <button>{el?.more}</button>
                    )}
                  </div>
                );
              }
              return null; // Return null for the skipped element
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
