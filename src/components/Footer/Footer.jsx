import { FacebookFilled, InstagramOutlined, LinkedinOutlined, TwitterOutlined } from "@ant-design/icons";
import "./Footer.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFetchLogo } from "../../store/action/LogoAction";
import { getFetchFooter } from "../../store/action/FooterAction";

export function Footer() {
const dispatch = useDispatch();
useEffect(()=>{
  dispatch(getFetchLogo());
  dispatch(getFetchFooter());
},[dispatch]);

const {Footer} = useSelector((state)=>state.Footer);



  return (
    <section className="globalFooter" >
    <div className="footer">
      <div className="containerFooter" >
        <div className="imageFooter">
        <img src={Footer[0]?.logo} alt={Footer[0]?.title} />
        </div>
        <div className="titleFooter"><p>{Footer[0]?.text}</p></div>
        <div className="  " id="socialItem" >
          <div className="socialLogo" title="Facebook"><a href="https://www.facebook.com/arenmehrabyanfoundation1/"target="_black" ><FacebookFilled   style={{color:"#68abea"}} /></a></div>
          <div className="socialLogo" title="Twitter" ><a href="https://twitter.com/" target="_black" ><TwitterOutlined style={{color:"#68abea"}} /></a></div>
          <div className="socialLogo" title="Instagram"><a href="https://www.instagram.com/" target="_black" ><InstagramOutlined style={{color:"#68abea"}} /></a></div>
          <div className="socialLogo" title="LinkeDin"><a href="https://www.linkedin.com/" target="_black" ><LinkedinOutlined style={{color:"#68abea"}} /></a></div>
        </div>
      </div>
     
    </div>
    </section>
  );
}
