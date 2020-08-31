import React, { useState, useEffect, useRef, useCallback } from 'react'
import styles from './login.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { useKeyboard } from '../hooks/myHooks'
import { signIn } from '../services/services'
import { useDispatch } from '../context/dispatchContext'
import { useAppState } from '../context/appStateContext'
import { userSignedIn } from '../stateManager/actionCreator'
import { useHistory } from 'react-router-dom'

export default function Login() {
    const [username, setUsername] = useState('');
    const input = useRef(null);
    const dispatch = useDispatch();
    const { userId } = useAppState();
    const history = useHistory();

    useEffect(() => {
        input.current.focus();
    }, [])

    function handleSignIn() {
        if (username !== '') {   // TODO: other validation must check here.
            signIn(username)
                .then(({ success, result: user }) => {
                    //  TODO: handle failure.
                    dispatch(userSignedIn(user));
                })
        }
    }

    function handleKeyDown(e) {
        if (e.keyCode === 13)
        handleSignIn();
    }

    // const handleEnter = useCallback(
    //     (e) => {
    //         if (e.keyCode === 13)
    //             handleSignIn();
    //     },
    //     [],
    // );
    // useKeyboard('keydown', handleEnter, [])


    useEffect(() => {
        if (userId)
            history.push('/chat');
    }, [userId])


    return (
        <div className={styles['layout']}>
            <FontAwesomeIcon icon={faSignInAlt} size='5x' className={styles['icon']} />
            <p>Enter Your Username:</p>
            <div>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} ref={input} onKeyDown={handleKeyDown} />
                <button onClick={handleSignIn} >Sign in</button>
            </div>
        </div>
    )
}