import { AboutPersons } from "../../components/AboutPersons/AboutPersons";
import { AboutTeam } from "../../components/AboutTeam/AboutTeam";
import { getAboutOutTeam, getFetchAbout } from "../../store/action/AboutAction";
import "./About.scss";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getFetchLogo } from "../../store/action/LogoAction";
import { getfetchHomeAuthor } from "../../store/action/HomeAction";
import { Loading } from "../../components/Loading/Loading";



export function About() {
  const { HomeAuthor } = useSelector((state) => state?.HomeAuthor); 
  const Background = HomeAuthor?.logo;
  const [show,setShow] = useState(false);
  const {About,loading} = useSelector((state)=>state.About)
  

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getFetchAbout());
    dispatch(getAboutOutTeam());
    dispatch(getFetchLogo());
    dispatch(getfetchHomeAuthor());
  },[dispatch])
  const id = "linkIdentifikator"
  
  return (
    <>
    {
      loading ? <Loading/>
      :
      <div className="about" style={{ backgroundImage: `url(${Background})`}}>
        
      <h1 className="aboutTitle" >{About[About.length - 1]?.title}</h1>
      {
    
    !sessionStorage.getItem('friend')&&<div className="componentTheam" > <AboutTeam show={show} setShow = {setShow} id = {id}/></div>
      }
      {
    
    (sessionStorage.getItem('friend')||show) &&  <div className="personComponent" >  <AboutPersons id={id} show={show} setShow = {setShow} /> </div>
   }
   
    </div>
    }
   
   </>

  );
}
