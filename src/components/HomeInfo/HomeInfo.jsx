import React from 'react'
import "./HomeInfo.scss";
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

export  function HomeInfo() {
    const {HomeInfo} = useSelector((state)=>state.HomeInfo)
    const navigate=useNavigate()
    let LocalValue;
    if (localStorage.getItem("language")) {
      let local = localStorage.getItem("language");
      LocalValue = JSON.parse(local);
    }

  return (
    <div className='HomeInfo'  >
        <div className='homeInfoContainer' id='homeInfoContainer' >
            {
                HomeInfo?.map((el,index)=>{
            return <div className='homeInfoItem' key={index} >
                    <p className='homeInfoTitle'>{el?.title}</p>
                    <div className='homeInfoImageDiv'><img src={el?.logo} alt={el?.title}/></div>
                    <div className='homeInfoButton' ><button onClick={()=>{
                        if(index===1){
                            sessionStorage.setItem('friend','true');
                            navigate(`/about/${LocalValue}`);
                            setTimeout(()=>{
                                sessionStorage.removeItem('friend')
                            },5000)
                        }}
                    }>{el?.readmore}</button></div>

            </div>

                })
            }

        </div>

    </div>
  )
}
