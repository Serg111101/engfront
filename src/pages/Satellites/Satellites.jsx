import "./Satellites.scss"
import { useEffect, }                  from 'react';
import   ReactPlayer                   from 'react-player';
import { useSelector, useDispatch }    from 'react-redux';
import { getFetchSatellites }          from "../../store/action/SatellitesAction";
import { getFetchQuizSatelite }        from "../../store/action/QuizSateliteAction";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";

export function Satellites() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { Satellites,loading } = useSelector((state) => state.Satellites)
  const background = Satellites?.background;
  let loacal;
  if(localStorage?.getItem('language')){
    let languageLocal = localStorage?.getItem('language');
    loacal = JSON.parse(languageLocal)
  }

  useEffect(() => {
    dispatch(getFetchSatellites());
    dispatch(getFetchQuizSatelite());
  }, [dispatch]);
  return (
    <>
    {
      loading? <Loading/>:
    <div className='Satellites'
    style={{background:`url(${background})`}}
    >
      <div className="text_bg">
      <h1>{Satellites?.title}</h1>
      {
        Satellites?.text1?.map((el,index) => <p key={index}>{el}</p>)
      }
      </div>
      {/* <div></div> */}
      <ReactPlayer
        // key={1}
        url={Satellites?.animationCubeSat1}
        width="100%"
        height="600px"
        controls={true}
        // autoplayer={'true'}
      />
        <div className="text_bg">
      {
        Satellites?.text2?.map((el,index) => <p key={index}>{el}</p>)
      }
      {
        Satellites?.margin_text1?.map((el,index) => <p key={index} className="margin_text">{el}</p>)
      }

      </div>
      <ReactPlayer
        // key={2}
        url={Satellites?.animationCubeSat2}
        width="100%"
        height="600px"
        controls={true}
        // autoplayer={true}
      />
       <div className="text_bg">

      {
        Satellites?.text3?.map((el, i) =>
        i === 0 ?
        <h2 key={i} >{el}</h2> :
        <p key={i+1} >{el}</p>)
      }
      {
        Satellites?.margin_text2?.map((el,index) => <p key={index} className="margin_text">{el}</p>)
      }
      {
        Satellites?.text4?.map((el, i) =>
        i === 0 ?
        <h2 key={i}>{el}</h2> :
        <p key={i+1}>{el}</p>)
      }
      {
        Satellites?.margin_text3?.map((el,index) => <p key={index} className="margin_text">{el}</p>)
      }
      </div>
      <ReactPlayer
        // key={3}
        url={Satellites?.animationCubeSat3}
        width="100%"
        height="600px"
        controls={true}
        // autoplayer={true}
      />
       <div className="text_bg">

      {
        Satellites?.text5?.map((el, i) =>
        i === 0 ?
        <h2 key={i}>{el}</h2> :
        <p key={i+1}>{el}</p>)
      }
      </div>
      <ReactPlayer
        // key={4}
        url={Satellites?.animationCubeSat4}
        width="100%"
        height="600px"
        controls={true}
        // autoplayer={true}  
      />
       <div className="text_bg">

      {
        Satellites?.margin_text4?.map((el,index) => <p key={index} className="margin_text">{el}</p>)
      }
      </div>
         <div className="quizButton">
            <button onClick={()=>{navigate("/SatelliteQuiz")}} >{loacal==="AM" ? "Հարցաշար":"Question"}</button>
        </div>
    </div>
}
{/* <ReactPlayer
        // key={2}
        url="./Launch_Space_Minds.mp4"
        width="100%"
        height="600px"
        controls={true}
        // autoplayer={true}
      /> */}
      
    </>
  )
}