import { useDispatch, useSelector } from "react-redux";
import "./Home.scss";
import { useEffect } from "react";
import { getFetchLogo } from "../../store/action/LogoAction";
import { HomeHeader } from "../../components/HomeHeader/HomeHeader";
import { getfetchContact, getfetchHomeAuthor, getfetchHomeHeader, getfetchHomeInfo, getfetchHomeNextRout, getfetchSendMail } from "../../store/action/HomeAction";
import { HomeNextRoute } from "../../components/HomeNextRoute/HomeNextRoute";
import { HomeAuthorComponent } from "../../components/HomeAuthorComponent";
import { HomeInfo } from "../../components/HomeInfo/HomeInfo";
import { Contact } from "../../components/Contact/Contact";
import { Info } from "../../components/Info";

export function Home() {

 const dispatch = useDispatch()

 useEffect(()=>{
  dispatch(getFetchLogo());
  dispatch(getfetchHomeHeader());
  dispatch(getfetchHomeNextRout());
  dispatch(getfetchHomeAuthor());
  dispatch(getfetchHomeInfo());
  dispatch(getfetchContact());
  dispatch(getfetchSendMail())
 },[dispatch]);
 const { HomeAuthor } = useSelector((state) => state.HomeAuthor); 
 const Background = HomeAuthor?.logo;
 
  return (
    <div className="home"  >
       <div className="homeHeaderPage" >
        <HomeHeader/>
        </div>



      <div className="homePageBottom" style={{ backgroundImage: `url(${Background})`}}>
        <HomeNextRoute/>
        <HomeAuthorComponent/>
        <HomeInfo/>
        <Contact/> 
          <Info/>
        </div>



      

    </div>
  )
}
  