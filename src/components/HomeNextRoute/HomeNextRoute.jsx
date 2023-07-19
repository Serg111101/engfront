import React from 'react';
import './HomeNextRoute.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export function HomeNextRoute() {
  const navigate = useNavigate();
  const { HomeNextRout } = useSelector((state) => state.HomeNextRout);
  let cou;
  if (sessionStorage.getItem('count')) {
    const loc = sessionStorage.getItem('count');
    cou = JSON.parse(loc);
  }

  function navigateTo(val) {
    if (val === 'Դասնթացներ' || val === 'Courses') {
      navigate('/Lessons');
    } else if (val === 'Օգտակար նյութեր') {
      navigate('/');
    } else if (val === 'Արբանյակ' || val === 'Satellites') {
      navigate('/Satellites');
    } else if (val === 'Արբանյակի կառավարում' || val === 'Satellite control') {
      if (cou < 4) {
        Swal.fire('', 'Խնդրում եմ անցեք 4 դասերը', 'error');
      }
    } else {
      navigate('/');
    }
  }

  return (
    <div className="HomeNextRoute">
      <div className="nextRouteContainer">
        {HomeNextRout?.map((el, index) => (
          <div key={index}>
            {(el?.title === 'Արբանյակի կառավարում' || el?.title === 'Satellite control') && cou>=4 ? (
              <a
                href="http://cubesat.local/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  onClick={() => navigateTo(el?.title)}
                  className="nextRouteItem"
                  style={{ backgroundColor: el.color }}
                >
                  <div className="nextRouteIcon">
                    <img style={{ background: el.color }} src={el?.logo} alt={el?.title} />
                  </div>
                  <div className="nextRouteTitle">
                    <p>{el?.title}</p>
                  </div>
                </div>
              </a>
            ) : (
              <div
                onClick={() => navigateTo(el?.title)}
                className="nextRouteItem"
                style={{ backgroundColor: el.color }}
              >
                <div className="nextRouteIcon">
                  <img style={{ background: el.color }} src={el?.logo} alt={el?.title} />
                </div>
                <div className="nextRouteTitle">
                  <p>{el?.title}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
