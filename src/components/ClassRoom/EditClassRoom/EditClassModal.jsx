import React, { useState } from 'react'
import './EditClassModal.scss'
import { CloseOutlined } from '@ant-design/icons'

export const EditClassModal = ({ setEditClassModal, editClassModal,EditClass}) => {
    const [addValue, setAddValue] = useState('')
    const [error, setError] = useState(false)
    return (
        <div className='AddClassModal'>
            <div className='AddClassDiv'>
            <CloseOutlined className=' CloseModal' onClick={()=>{setEditClassModal(false)}} />
                <form action="" onSubmit={(e) => { e.preventDefault(); EditClass(editClassModal, setError) }}>
                    <h3>Դասարանի անունը</h3>
                    <input className={error && "errorInput"} type="text" maxLength={7} placeholder='Դասարանի անունը' value={editClassModal?.name} onChange={(e) => { setEditClassModal({...editClassModal,name:e.target.value}); setError(false) }} />
                    {error && <p>Դաշտը չի կարող դատարկ լինել *</p>}

                    <button onClick={(e) => { e.preventDefault(); EditClass(editClassModal, setError) }}>Փոփոխել</button>
                </form>
            </div>
        </div>
    )
}

