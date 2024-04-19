import React, { useEffect, useState } from 'react';
import './HomeNextRoute.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/AdminHooks/useAuth';
import { getFetchChildren } from '../../store/action/ChildrenAction';

export function HomeNextRoute() {
  const navigate = useNavigate();
  const { HomeNextRout } = useSelector((state) => state.HomeNextRout);
 const [cou,setCou] = useState(1);
 const {Children} = useSelector((state)=>state?.Children);
 const dispatch = useDispatch();


 const {auth} =useAuth();

   useEffect(() => {
    if(auth?.role === "admin"){
      setCou(41000)
    }
     if(auth&&auth?.role === "children"){
       const fill =  Children?.filter((el)=>el?.id === auth?.id);
       setCou(fill[0]?.level)
     }
   }, [auth,Children]);
 
   useEffect(() => {
     if(auth?.teacher_id&&auth?.classNumber&&auth?.role === "children"){
 
       dispatch(getFetchChildren({id:auth?.teacher_id,name:auth?.classNumber}))
     }
   }, [dispatch,auth]);



  let LocalValue;
  if (localStorage.getItem("language")) {
    let local = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }
  function navigateTo(id) {
    if (id === 0) {
      navigate(`/Lessons/${LocalValue}`);
    } else if (id === 1) {
      navigate(`/UsefulMaterials/${LocalValue}`);
    } else if (id === 2) {
      navigate(`/Satellites/${LocalValue}`);
    } else if (id === 3) {
      if (cou < 4) {
       Swal.fire({
        title:LocalValue==="AM" ? "Խնդրում եմ անցեք 4 դասերը" :"Please go through the 4 lessons",
        icon: 'error',
        confirmButtonText:(LocalValue==="AM"? 'Լավ':"OK"),
      }).then(()=>{
        navigate(`/Lessons/${LocalValue}`)
      })
      }else{
        navigate(`/UserSatelite/${LocalValue}`)
        
        
      }
    } else {
      navigate(`/home/${LocalValue}`)
    }
  }

  return (
    <div className="HomeNextRoute">
      <div className="nextRouteContainer">
        {HomeNextRout?.map((el, index) => (
          <div key={index}>
              <div
                onClick={() => navigateTo(index)}
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
          </div>
        ))}
      </div>
    </div>
  );
}