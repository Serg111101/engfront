import React, { useEffect, useState } from 'react'
import './EditChildModal.scss'
import { CloseOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { uploadImageHandleradd } from '../../../store/action/Upload'

export const EditChildModal = ({ setEditChild, editChild, EditChild }) => {
    const [img, setImg] = useState('')
    const [error, setError] = useState(false)
    const dispatch = useDispatch();
    
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
                    <h3>Փոփոխել տվյալները</h3>
                    <div className="imgDiv" >
                        <label htmlFor='upload' className=" text-white flex justify-center items-center bg-gray-500 cursor-pointer hover:bg-gray-700 p-2">
                            <img src={editChild?.picture||'/image/addImage.png'} alt="" />
                        </label>
                        <input type="file" accept="image/*" id='upload' name='upload' value={""} style={{ display: 'none' }} onChange={uploadImageHandler} />
                    </div>
                    <input className={error && "errorInput"} type="text"  placeholder='Անուն Ազգանուն' value={editChild?.fullName} onChange={(e) => { setEditChild({ ...editChild, fullName: e.target.value }); setError(false) }} />
                    {error && <p>Դաշտը չի կարող դատարկ լինել *</p>}
                    <input className={error && "errorInput"} type="text"  placeholder='Համարը' value={editChild?.number} onChange={(e) => { setEditChild({ ...editChild, number: e.target.value }); setError(false) }} />
                    {error && <p>Դաշտը չի կարող դատարկ լինել *</p>}
                    <input className={error && "errorInput"} type="text"  placeholder='մակարդակ' value={editChild?.level} onChange={(e) => { setEditChild({ ...editChild, level: e.target.value }); setError(false) }} />
                    {error && <p>Դաշտը չի կարող դատարկ լինել *</p>}
                    
                    <button onClick={(e) => { e.preventDefault(); EditChild(editChild, setError) }}>Փոփոխել</button>
                </form>
            </div>

        </div>
    )
}
