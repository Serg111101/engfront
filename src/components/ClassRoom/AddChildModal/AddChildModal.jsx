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
                    {error4 && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>}
                       
                        
                    </div>
                  
                    <input className={error ?"errorInput":""} type="text" maxLength={50} placeholder={LocalValue === "AM"?'Անուն Ազգանուն':"First Name Last Name:"} value={addChildValue?.fullName} onChange={(e) => { setAddChildValue({ ...addChildValue, fullName: e.target.value }); setError(false) }} />
                    {error && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>}
                    <input className={error1 ? "errorInput" : ""} type="number" min={1} maxLength={50} placeholder={LocalValue === "AM"?'Մատյանի համարը':"Log number"} value={addChildValue?.bookNumber} onChange={(e) => { setAddChildValue({ ...addChildValue, bookNumber: +e.target.value }); setError1(false)}} />
                    {error1 && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>}

                    <input className={error2 ? "errorInput" : ""} type="text" maxLength={7} placeholder={LocalValue === "AM"?'մուտքանուն':"username"} value={addChildValue?.login} onChange={(e) => { setAddChildValue({ ...addChildValue, login: e.target.value });  setError2(false)  }} />
                    {error2 && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>}

                    <input className={error3 ? "errorInput" : ""} type="password" maxLength={20} placeholder={LocalValue === "AM"?'Գաղտնաբառ':"Password"} value={addChildValue?.password} onChange={(e) => { setAddChildValue({ ...addChildValue, password: e.target.value });    setError3(false) }} />
                    {error3 && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>}

                    
                    <button onClick={(e) => { e.preventDefault(); saveChild(addChildValue, setError,setError1,setError2,setError3,setError4) }}>{LocalValue === "AM"?"Ավելացնել":"ADD"}</button>
                </form>
            </div>

        </div>
    )
}
