import React from 'react'
import "./HomeInfo.scss";
import { useSelector } from 'react-redux';

export  function HomeInfo() {
    const {HomeInfo} = useSelector((state)=>state.HomeInfo)

    

  return (
    <div className='HomeInfo'  >
        <div className='homeInfoContainer' id='homeInfoContainer' >
            {
                HomeInfo?.map((el,index)=>{
            return <div className='homeInfoItem' key={index} >
                    <p className='homeInfoTitle'>{el?.title}</p>
                    <div className='homeInfoImageDiv'><img src={el?.logo} alt={el?.title}/></div>
                    <div className='homeInfoButton' ><button>{el?.readmore}</button></div>

            </div>

                })
            }

        </div>

    </div>
  )
}
