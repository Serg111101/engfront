import React, { useEffect, useState } from 'react'
import './AddChildModal.scss'
import { CloseOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { uploadImageHandleradd } from '../../../store/action/Upload'

export const AddChildModal = ({ setAddChild, saveChild }) => {
    const [addChildValue, setAddChildValue] = useState({})
    const [img, setImg] = useState('')
    const [error, setError] = useState(false)
    const [error1, setError1] = useState(false)
    const [error2, setError2] = useState(false)
    const [error3, setError3] = useState(false)
    const [error4, setError4] = useState(false)
    const [errorReg, setErrorReg] = useState(false)
    const [errorReg1, setErrorReg1] = useState(false)
    const dispatch = useDispatch();
    let LocalValue;
    if (localStorage.getItem("language")) {
      let local = localStorage.getItem("language");
      LocalValue = JSON.parse(local);
    }
    useEffect(() => {
        if (img) {
           setAddChildValue({...addChildValue,picture:img}) 
            setImg('')
        }
    }, [img])
    
    const uploadImageHandler = async (e) => {
        dispatch(uploadImageHandleradd(e, setImg));
        setError4(false)
    };

  

  
      const regexPattern = /^[a-zA-Z\u0531-\u0587\s]+$/;
      const regexPatternNumber = /^[1-9]\d*$/;
    //   const isValidInput = regexPattern.test(value);
  

    return (
        <div className='AddChildModal'>
            <div className='AddChildDiv'>
                <CloseOutlined className=' CloseModal' onClick={() => { setAddChild(false) }} />
                <form autoComplete='off' onSubmit={(e) => { e.preventDefault(); saveChild(addChildValue, setError) }}>
                    <h3>  {LocalValue === "AM" ? "Աշակերտի տվյալներ":"Pupil data"}</h3>
                    <div className="imgDiv" >
                        <label htmlFor='upload' className=" text-white flex justify-center items-center bg-gray-500 cursor-pointer hover:bg-gray-700 p-2">
                            <img src={addChildValue?.picture||'/image/addImage.png'} alt="" />
                        </label>
                        <input type="file" accept="image/*" id='upload' name='upload' value={""} style={{ display: 'none' }} onChange={uploadImageHandler} />
                    {/* {error4 && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>} */}
                       
                        
                    </div>
                  
                    <input className={error ?"errorInput":""} type="text" maxLength={50} placeholder={LocalValue === "AM"?'Անուն Ազգանուն':"First Name Last Name:"} value={addChildValue?.fullName} 
                    onChange={(e) => {
                        if( e.target.value?.length>=3 || e.target.value?.length<=30 ){
                            setError(false)
                            setAddChildValue({ ...addChildValue, fullName: e.target.value });
                           if(!regexPattern.test(e.target.value) ){

                            setErrorReg(true)
                           }else{
                               setErrorReg(false)
                           }
                           if(e.target.value?.length===0){
                            setErrorReg(false)
                            setError(true)
                           }
                        }
                           }} />
           
                    {error && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>} 
                    {errorReg && <p>{LocalValue==="AM" ? "Դաշտը չի կարող պարունակ էլ սիմվոլ կամ թվանշան":"The field cannot contain symbols or digits"}</p>} 
                    <input className={error1 ? "errorInput" : ""} type="text" min={1} maxLength={50} placeholder={LocalValue === "AM"?'Մատյանի համարը':"Log number"} value={addChildValue?.bookNumber}
                      
                     onChange={(e) => {
                        if( e.target.value?.length>=3 || e.target.value?.length<=30 ){
                            setError1(false)
                            setAddChildValue({ ...addChildValue, bookNumber: e.target.value })
                           if(!regexPatternNumber.test(e.target.value)  ){

                            setErrorReg1(true)
                           }else{
                               setErrorReg1(false)
                           }
                           if(e.target.value?.length===0){
                            setErrorReg1(false)
                            setError1(true)
                           }
                        }
                           }}/>
                    {error1 && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>}
                    {errorReg1 && <p>{LocalValue==="AM" ? "Դաշտը պետք է պարունակի միայն թվանշան":"The field must contain only digits"}</p>} 

                    <input className={error2 ? "errorInput" : ""} type="text" maxLength={7} placeholder={LocalValue === "AM"?'մուտքանուն':"username"} value={addChildValue?.login}
                     onChange={(e) => { 
                        
                         
                        if(e.target.value.length===0){setAddChildValue({ ...addChildValue, login: e.target.value });setError2(true)}else{setAddChildValue({ ...addChildValue, login: e.target.value }); setError2(false)}  }} />
                    {error2 && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>}

                    <input className={error3 ? "errorInput" : ""} type="password" maxLength={20} placeholder={LocalValue === "AM"?'Գաղտնաբառ':"Password"} value={addChildValue?.password} 
                    onChange={(e) => {
                        if(e.target.value.length===0){ setAddChildValue({ ...addChildValue, password: e.target.value });setError3(true)}else{ setAddChildValue({ ...addChildValue, password: e.target.value }); setError3(false)}  }} />
                    
                    
                    
                    {error3 && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>}

                    
                    <button disabled={errorReg ||errorReg1} style={{pointerEvents:(errorReg ||errorReg1)&& "none"}} onClick={(e) => { e.preventDefault(); saveChild(addChildValue, setError,setError1,setError2,setError3,setError4) }}>{LocalValue === "AM"?"Ավելացնել":"ADD"}</button>
                </form>
            </div>

        </div>
    )
}
