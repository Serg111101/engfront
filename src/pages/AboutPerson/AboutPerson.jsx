import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAboutOutTeam } from '../../store/action/AboutAction';
import {useNavigate} from "react-router-dom";
import "./AboutPerson.scss"
const AboutPerson = () => {
    let loacal;
  if(localStorage?.getItem('language')){
    let languageLocal = localStorage?.getItem('language');
    loacal = JSON.parse(languageLocal)
  }
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const {AboutOurTeam} = useSelector((state)=>state?.AboutOurTeam)
    
    useEffect(()=>{
      dispatch(getAboutOutTeam())
    },[dispatch]);



    return (
    <div className='AboutPerson' >
     <div className="button">
        <button onClick={()=>{navigate("/about")}} >{loacal==="AM" ? "Հետ":"Go back"}</button>
     </div>
         <div className='AboutPersons'>
     <div className='aboutPersonCont' >  
        {
        AboutOurTeam?.map((el)=>{
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

    </div>
  )
}

export default AboutPerson