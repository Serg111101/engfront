import React from 'react'
import LeftOutlined, { CloseOutlined } from "@ant-design/icons"

const LinksModal = ({showLinks,setShowLinks,auth}) => {


  let LocalValue;
  if (localStorage.getItem("language")) {
      let local = localStorage.getItem("language");
      LocalValue = JSON.parse(local);
  }

  function navigateTo(el){
    if(el.includes("http://")){
      window.open(el, "_blank");

    }else{
      window.open("http://"+el, "_blank");
    }
    if(el.includes("https://")){
      window.open(el, "_blank")
    }else{
      window.open("https://"+el, "_blank");
    }

  }
  
    return (
        <div className={`CartTransferTwo ${showLinks ? 'modalOpen' : 'modalClosed'}`}  >
          <div className={`modal ${showLinks ? 'modalOpen' : 'modalClosed'}`} onClick={()=>{setShowLinks(false)}}>
            <div className="container">
              <div className="conta">
                <div className="topBlock">
                  <div className="btnBack"  >
                    <LeftOutlined onClick={()=>setShowLinks(false)} />
                  </div>
                  <p className="topTitle">{LocalValue === 'AM' ? 'Անցեք Հղումներից մեկով' : 'Go through one of the Links'}</p>
                  <div className="close" >
                  <CloseOutlined onClick={()=>setShowLinks(false)} />
                  </div>
                </div>
                <div className="mainMod">
                  <div>
                    <div className="link">
                      {
                        auth?.cubesat_link?.map((el,index)=>{

                          return(
                            <p className='linkText' key={index} onClick={()=>navigateTo(el)} >
                              {el}
                            </p>
                          )
                        })
                      }
                    </div>
                  </div>
          
                </div>
    
              </div>
            </div>
          </div>
        </div>
      );
}

export default LinksModal