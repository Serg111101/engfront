import React, { useEffect, useState } from 'react'
import './AddChildModal.scss'
import { CloseOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { uploadImageHandleradd } from '../../../store/action/Upload'

export const AddChildModal = ({ setAddChild, saveChild }) => {
    const [addChildValue, setAddChildValue] = useState({})
    const [img, setImg] = useState('')
    const [error, setError] = useState(true)
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
    };


    return (
        <div className='AddChildModal'>
            <div className='AddChildDiv'>
                <CloseOutlined className=' CloseModal' onClick={() => { setAddChild(false) }} />
                <form action="" onSubmit={(e) => { e.preventDefault(); saveChild(addChildValue, setError) }}>
                    <h3>  {LocalValue === "AM" ? "Աշակերտի տվյալներ":"Pupil data"}</h3>
                    <div className="imgDiv" >
                        <label htmlFor='upload' className=" text-white flex justify-center items-center bg-gray-500 cursor-pointer hover:bg-gray-700 p-2">
                            <img src={addChildValue?.picture||'/image/addImage.png'} alt="" />
                        </label>
                        <input type="file" accept="image/*" id='upload' name='upload' value={""} style={{ display: 'none' }} onChange={uploadImageHandler} />
                    </div>
                  
                    <input className={error && "errorInput"} type="text" maxLength={50} placeholder={LocalValue === "AM"?'Անուն Ազգանուն':"First Name Last Name:"} value={addChildValue?.fullName} onChange={(e) => { setAddChildValue({ ...addChildValue, fullName: e.target.value });  {e.target.value.length!==0 ?  setError(false): setError(true)} }} />
                    {error && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>}
                    <input className={error && "errorInput"} type="number" min={1} maxLength={50} placeholder={LocalValue === "AM"?'Մատյանի համարը':"Log number"} value={addChildValue?.bookNumber} onChange={(e) => { setAddChildValue({ ...addChildValue, bookNumber: +e.target.value });  {e.target.value.length!==0 ?  setError(false): setError(true)} }} />
                    {error && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>}

                    <input className={error && "errorInput"} type="text" maxLength={7} placeholder={LocalValue === "AM"?'մուտքանուն':"username"} value={addChildValue?.login} onChange={(e) => { setAddChildValue({ ...addChildValue, login: e.target.value });  {e.target.value.length!==0 ?  setError(false): setError(true)} }} />
                    {error && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>}

                    <input className={error && "errorInput"} type="password" maxLength={7} placeholder={LocalValue === "AM"?'Գաղտնաբառ':"Password"} value={addChildValue?.password} onChange={(e) => { setAddChildValue({ ...addChildValue, password: e.target.value });  {e.target.value.length!==0 ?  setError(false): setError(true)} }} />
                    {error && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>}

                    
                    <button onClick={(e) => { e.preventDefault(); saveChild(addChildValue, setError) }}>{LocalValue === "AM"?"Ավելացնել":"ADD"}</button>
                </form>
            </div>

        </div>
    )
}
