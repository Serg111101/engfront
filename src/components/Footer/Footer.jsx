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
                
  <div className="socialItem" id="socialItem">
          {Footer?.map((el, index) => {
            return (
              index > 0 && (
                <div key={index}>
                  <div className="socialLogo" title={el?.title}>
                    <a href={el?.text} target="_black">
                      <img src={el?.logo} alt={el?.title} />
                    </a>
                  </div>
                </div>
              )
            );
          })}
          </div>
      </div>
     
    </div>
    </section>
  );
}
