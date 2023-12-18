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


    return (
        <div className='AddChildModal'>
            <div className='AddChildDiv'>
                <CloseOutlined className=' CloseModal' onClick={() => { setEditChild(false) }} />
                <form action="" onSubmit={(e) => { e.preventDefault(); editChild(EditChild, setError) }}>
                    <h3>{LocalValue === "AM" ? "Փոփոխել տվյալները":"Edit data"}</h3>
                    <div className="imgDiv" >
                        <label htmlFor='upload' className=" text-white flex justify-center items-center bg-gray-500 cursor-pointer hover:bg-gray-700 p-2">
                            <img src={editChild?.picture||'/image/addImage.png'} alt="" />
                        </label>
                        <input type="file" accept="image/*" id='upload' name='upload' value={""} style={{ display: 'none' }} onChange={uploadImageHandler} />
                    </div>
                    <label htmlFor="">{LocalValue === "AM"?'Մատյանի համարը':"Log number"}</label>
                    <input className={error && "errorInput"} type="number" min={1} maxLength={50} placeholder={LocalValue === "AM"?'Մատյանի համարը':"Log number"} value={editChild?.bookNumber} onChange={(e) => { setEditChild({ ...editChild, bookNumber: +e.target.value }); {e.target.value!==0 ?  setError(false): setError(true)} }} />
                    {error && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>}

                    <label htmlFor="">{LocalValue === "AM"?'Անուն Ազգանուն':"First Name Last Name:"}</label>
                    <input className={error1 && "errorInput"} type="text"  placeholder={LocalValue === "AM"?'Անուն Ազգանուն':"First Name Last Name:"} value={editChild?.fullName} onChange={(e) => { setEditChild({ ...editChild, fullName: e.target.value }); {e.target.value.length!==0 ? setError1(false): setError1(true)} }} />
                    {error1 && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>}

                    <label htmlFor="">մակարդակ</label>
                    <input className={error2 && "errorInput"} type="number" min={1}  placeholder={LocalValue === "AM"?'Մակարդակ':"Level"} value={editChild?.level} onChange={(e) => { setEditChild({ ...editChild, level: e.target.value }); {e.target.value!==0 ?  setError2(false): setError2(true)} }} />
                    {error2 && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>}

                    
                    <button onClick={(e) => { e.preventDefault(); EditChild(editChild, setError) }}>{LocalValue === "AM"?'Փոփոխել':"Edit"}</button>
                </form>
            </div>

        </div>
    )
}
