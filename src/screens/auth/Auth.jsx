import React, { useState } from 'react'
import './Auth.scss'
import {auth} from '../../utils/firebase';

function Auth() {
    const [name, setName] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        localStorage.setItem('userName', name)
        await auth.signInAnonymously()
    }

    return (
        <div className="authForm__container">
            <form className='authForm' action="authForm" onSubmit={handleSubmit}>
            <h1>Enter your name to start</h1>
            <br />
            <div className="authForm__field">
                <p className="authForm__field-control">
                    <input 
                        className='input' 
                        type="text" 
                        name="" 
                        id="" 
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </p>
                <div className="authForm__field">
                    <p className="authForm__field-control">
                        <button className="button is-success authForm__button" type='submit'> start </button>
                    </p>
                </div>
            </div>
        </form>
        </div>
    )
}

export default Auth