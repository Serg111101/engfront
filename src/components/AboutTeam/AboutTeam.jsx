import React, { useEffect } from 'react';
import './AboutTeam.scss';
import { useSelector } from 'react-redux';

export function AboutTeam({ show, setShow, id }) {
  const { About } = useSelector((state) => state.About);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(!show);
      }, 50000);
    }
  }, [show, setShow]);

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
                      <button onClick={() => setShow(!show)}>{el?.more}</button>
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
