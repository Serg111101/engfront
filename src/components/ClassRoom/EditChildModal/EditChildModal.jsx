import React, { useEffect, useState } from 'react'
import './EditChildModal.scss'
import { CloseOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { uploadImageHandleradd } from '../../../store/action/Upload'

export const EditChildModal = ({ setEditChild, editChild, EditChild }) => {
    const [img, setImg] = useState('')
    const [error, setError] = useState(false)
    const [error1, setError1] = useState(false)
    const [error2,setError2] = useState(false)
    const [error3,setError3] = useState(false)
    const [errorReg, setErrorReg] = useState(false)
    const [errorReg1, setErrorReg1] = useState(false)
    const [errorReg2, setErrorReg2] = useState(false)
    const dispatch = useDispatch();
    let LocalValue;
    if (localStorage.getItem("language")) {
      let local = localStorage.getItem("language");
      LocalValue = JSON.parse(local);
    }
    useEffect(() => {
        if (img) {
           setEditChild({...editChild,picture:img}) 
            setImg('')
        }
    }, [img])
    
    const uploadImageHandler = async (e) => {
        dispatch(uploadImageHandleradd(e, setImg));
    };

    const regexPattern = /^[a-zA-Z\u0531-\u0587\s]+$/;
    const regexPatternNumber = /^[1-9]\d*$/;

      return (
        <div className='AddChildModal'>
            <div className='AddChildDiv'>
                <CloseOutlined className=' CloseModal' onClick={() => { setEditChild(false) }} />
                <form autoComplete='off' onSubmit={(e) => { e.preventDefault(); editChild(EditChild, setError) }}>
                    <h3>{LocalValue === "AM" ? "Փոփոխել տվյալները":"Edit data"}</h3>
                    <div className="imgDiv" >
                        <label htmlFor='upload' className=" text-white flex justify-center items-center bg-gray-500 cursor-pointer hover:bg-gray-700 p-2">
                            <img src={editChild?.picture||'/image/addImage.png'} alt="" />
                        </label>
                        <input type="file" accept="image/*" id='upload' name='upload' value={""} style={{ display: 'none' }} onChange={uploadImageHandler} />
                    {error3 && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>}

                    </div>
                    <label htmlFor="">{LocalValue === "AM"?'Մատյանի համարը':"Log number"}</label>
                    <input className={error ? "errorInput":""} type="text"  maxLength={50} placeholder={LocalValue === "AM"?'Մատյանի համարը':"Log number"} value={editChild?.bookNumber}
                    onChange={(e) => {
                        if( e.target.value?.length>=3 || e.target.value?.length<=30 ){
                            setError(false)
                            setEditChild({ ...editChild, bookNumber:e.target.value })
                           if(!regexPatternNumber.test(e.target.value) ){

                            setErrorReg1(true)
                           }else{
                               setErrorReg1(false)
                           }
                           if(e.target.value?.length===0){
                            setErrorReg1(false)
                            setError(true)
                           }
                        }
                           }}
                     />
                    {error && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>}
                    {errorReg1 && <p>{LocalValue==="AM" ? "Դաշտը պետք է պարունակի միայն թվանշան":"The field must contain only digits"}</p>} 

                    <label htmlFor="">{LocalValue === "AM"?'Անուն Ազգանուն':"First Name Last Name:"}</label>
                    <input className={error1 ? "errorInput" :""} type="text"  placeholder={LocalValue === "AM"?'Անուն Ազգանուն':"First Name Last Name:"} value={editChild?.fullName}
                     onChange={(e) => { 
                        if( e.target.value?.length>=3 || e.target.value?.length<=30 ){
                            setError1(false)
                            setEditChild({ ...editChild, fullName: e.target.value })
                           if(!regexPattern.test(e.target.value) ){

                            setErrorReg(true)
                           }else{
                               setErrorReg(false)
                           }
                           if(e.target.value?.length===0){
                            setErrorReg(false)
                            setError1(true)
                           }
                        }
                    
                       }}
                        
                        />
                    {errorReg && <p>{LocalValue==="AM" ? "Դաշտը չի կարող պարունակ էլ սիմվոլ կամ թվանշան":"The field cannot contain symbols or digits"}</p>} 

                    {error1 && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>}

                    <label htmlFor="">մակարդակ</label>
                    <input className={error2 ? "errorInput":""} type="text" min={1}  placeholder={LocalValue === "AM"?'Մակարդակ':"Level"} value={editChild?.level}
                    onChange={(e) => {
                        if( e.target.value?.length>=3 || e.target.value?.length<=30 ){
                            setError2(false)
                            setEditChild({ ...editChild, level: e.target.value })
                           if(!regexPatternNumber.test(e.target.value) ){

                            setErrorReg2(true)
                           }else{
                            setErrorReg2(false)
                           }
                           if(e.target.value?.length===0){
                            setErrorReg2(false)
                            setError2(true)
                           }
                        }
                           }}/>
                    {error2 && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>}
                    {errorReg2 && <p>{LocalValue==="AM" ? "Դաշտը պետք է պարունակի միայն թվանշան":"The field must contain only digits"}</p>} 

                    
                    <button disabled={errorReg ||errorReg1 || errorReg2} style={{pointerEvents:(errorReg ||errorReg1 || errorReg2)&& "none"}} onClick={(e) => { e.preventDefault(); EditChild(editChild, setError,setError1,setError2,setError3) }}>{LocalValue === "AM"?'Փոփոխել':"Edit"}</button>
                </form>
            </div>

        </div>
    )
}
