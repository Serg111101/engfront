import React, { useEffect, useState } from 'react'
import './AddChildModal.scss'
import { CloseOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { uploadImageHandleradd } from '../../../store/action/Upload'

export const AddChildModal = ({ setAddChild, saveChild }) => {
    const [addChildValue, setAddChildValue] = useState({})
    const [img, setImg] = useState('')
    const [error, setError] = useState(false)
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (img) {
           setAddChildValue({...addChildValue,picture:img}) 
            setImg('')
        }
    }, [img])
    
    const uploadImageHandler = async (e) => {
        console.log(e.target.files[0], 'e');
        dispatch(uploadImageHandleradd(e, setImg));
    };


    return (
        <div className='AddChildModal'>
            <div className='AddChildDiv'>
                <CloseOutlined className=' CloseModal' onClick={() => { setAddChild(false) }} />
                <form action="" onSubmit={(e) => { e.preventDefault(); saveChild(addChildValue, setError) }}>
                    <h3>Աշակերտի տվյալներ</h3>
                    <div className="imgDiv" >
                        <label htmlFor='upload' className=" text-white flex justify-center items-center bg-gray-500 cursor-pointer hover:bg-gray-700 p-2">
                            <img src={addChildValue?.picture||'/image/addImage.png'} alt="" />
                        </label>
                        <input type="file" accept="image/*" id='upload' name='upload' value={""} style={{ display: 'none' }} onChange={uploadImageHandler} />
                    </div>
                    <input className={error && "errorInput"} type="text" maxLength={7} placeholder='Անուն Ազգանուն' value={addChildValue?.fullname} onChange={(e) => { setAddChildValue({ ...addChildValue, fullName: e.target.value }); setError(false) }} />
                    {error && <p>Դաշտը չի կարող դատարկ լինել *</p>}
                    <input className={error && "errorInput"} type="text" maxLength={7} placeholder='մուտքանուն' value={addChildValue?.login} onChange={(e) => { setAddChildValue({ ...addChildValue, login: e.target.value }); setError(false) }} />
                    {error && <p>Դաշտը չի կարող դատարկ լինել *</p>}
                    <input className={error && "errorInput"} type="password" maxLength={7} placeholder='Գաղտնաբառ' value={addChildValue?.password} onChange={(e) => { setAddChildValue({ ...addChildValue, password: e.target.value }); setError(false) }} />
                    {error && <p>Դաշտը չի կարող դատարկ լինել *</p>}
                    
                    <button onClick={(e) => { e.preventDefault(); saveChild(addChildValue, setError) }}>Ավելացնել</button>
                </form>
            </div>

        </div>
    )
}
