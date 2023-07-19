import React, { useEffect } from 'react';
import "./AboutPerson.scss";
import { useDispatch, useSelector } from 'react-redux';
import { getAboutOutTeam } from '../../store/action/AboutAction';

export function AboutPersons({id}) {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAboutOutTeam())
  },[dispatch])

  const {AboutOurTeam} = useSelector((state)=>state?.AboutOurTeam)
    

    
  return (
    
    <div className='AboutPersons' id={id}>
     <div className='aboutPersonCont' >  
        {
        AboutOurTeam?.map((el,index)=>{
      return  <div className='itemPeople' key={el.id} >
            <div className='imageDiv' >
              
                <img  src={el?.image} alt={el?.name} />
            </div>
            <div className='PersonTitle' >
                <p>
                {el?.name}
                </p>
            </div>
            <div className='infoPerson'>
                <p>
                {el?.text}
                </p>
            </div>


        </div>

        })
}
</div>



    </div>
  )
}
