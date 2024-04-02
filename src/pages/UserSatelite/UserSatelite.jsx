import React, { useEffect, useState } from 'react';
import './UserSatelite.scss';
import useAuth from '../../hooks/AdminHooks/useAuth';
import {useNavigate} from "react-router-dom"
// import LinksModal from '../../components/LinksModal/LinksModal';
const UserSatelite = () => {

    let loacal;
  if(localStorage?.getItem('language')){
    let languageLocal = localStorage?.getItem('language');
    loacal = JSON.parse(languageLocal)
  }
    const [selectVal, setSelectVal] = useState('');
    const { auth } = useAuth();
    const navigate = useNavigate()
    // const [showLinks,setShowLinks] = useState(false);
    const [linkValue,setLinkvalue] = useState([])
    const handleSelectChange = (e,el) => {
        setLinkvalue([el?.cubesat_link,el?.camera_link])
        setSelectVal(e.target.value);
        // setShowLinks(true)
        // setLinkvalue([...linkValue,el?.cubesat_link,el?.camera_link])
        
    };


    async function navigateTo(el){
        if(el.includes("http://")){
          window.open(el, "_blank");
    
        }else{
          window.open("http://"+el, "_blank");
        }
        if(el.includes("https://")){
          window.open(el, "_blank")
        }else{
          window.open("http://"+el, "_blank");
        }
      }
      
     useEffect(()=>{
        if(selectVal?.length>0){
            selectVal==="cubesatLInk"&& navigateTo(linkValue[0]);
            selectVal==="cameraLink"&& navigateTo(linkValue[1]);
            setSelectVal("")
            setLinkvalue([])
        }
     },[selectVal])






    return (
        <div className="UserSatelite">
              <button className='btn' onClick={()=>navigate("/home")} > {loacal==="AM" ? "Հետ":"Back"}</button>
            <div className="contaLink">
                {auth?.links?.map((el, i) => (
                    <div className="linksContainer" key={i}>
                        <div className="item">
                            <div className="imageDiv" onClick={()=>{!el?.camera_link?.length&&navigateTo(el?.cubesat_link)}}>
                                <img src={el?.image} alt="picture with cubesat" />
                            </div>
                            <div className="selectDiv">
                              {el.camera_link ?  <select onChange={(e)=>handleSelectChange(e,el)}>
                                    <option  hidden>
                                    {loacal==="AM" ? "Ընտեք հղման տեսակը":"Select the link type"}
                                    </option>
                                    <option value="cubesatLInk">{loacal==="AM" ? "Արբանյակի կառավարում":"Satelite control"}</option>
                                    <option value="cameraLink">{loacal==="AM" ? "Տեսախցիկ":"Camera"}</option>
                                </select>:
                                 <div>
                                 <button onClick={()=>{navigateTo(el?.cubesat_link)}} >{loacal==="AM" ? "Արբանյակի կառավարում":"Satelite control"}</button>

                             </div>  
                                }
                            </div>
                        </div>
                    </div>
                ))}
                 {/* {selectVal === "cubesatLInk"&&<LinksModal showLinks={showLinks} setShowLinks={setShowLinks} state={linkValue} selectVal={selectVal} />}
            {selectVal === "cameraLink"&&<LinksModal showLinks={showLinks} setShowLinks={setShowLinks} state={linkValue} selectVal={selectVal} />} */}
            </div>
           
        </div>
    );
};

export default UserSatelite;
