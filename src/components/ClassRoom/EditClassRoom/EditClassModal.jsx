import React, { useState } from 'react'
import './EditClassModal.scss'
import { CloseOutlined } from '@ant-design/icons'

export const EditClassModal = ({ setEditClassModal, editClassModal,EditClass}) => {
    const [error, setError] = useState(false)
    let LocalValue
    if (localStorage.getItem("language")) {
        let local = localStorage.getItem("language");
        LocalValue = JSON.parse(local);
      }
    return (
        <div className='AddClassModal'>
            <div className='AddClassDiv'>
            <CloseOutlined className=' CloseModal' onClick={()=>{setEditClassModal(false)}} />
                <form autoComplete='off' onSubmit={(e) => { e.preventDefault(); EditClass(editClassModal, setError) }}>
                    <h3>{LocalValue==="AM" ? "Դասարանի անունը":"Class name"}</h3>
                    <input className={error ? "errorInput" :""} type="text" maxLength={7} placeholder={LocalValue=="AM" ? "Դասարանի անունը":"Class name"} value={editClassModal?.name} onChange={(e) => { setEditClassModal({...editClassModal,name:e.target.value}); {e.target.value.length!==0 ?  setError(false): setError(true)} }} />
                    {error && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>}

                    <button onClick={(e) => { e.preventDefault(); EditClass(editClassModal, setError) }}>{LocalValue==="AM" ? "Փոփոխել":"Edit"}</button>
                </form>
            </div>
        </div>
    )
}

