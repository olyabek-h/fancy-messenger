import React from 'react'
import styles from './inaccessibility.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserLock } from '@fortawesome/free-solid-svg-icons'
import { Route, Link } from 'react-router-dom'
import { useKeyboard } from '../../hooks/customHooks'
import { useHistory } from 'react-router-dom'

export default function Inaccessibility() {
    const history = useHistory();

    function handleOk() {
        history.push('/login');
    }
    useKeyboard('keydown', handleOk, [])

    return (
        <div className={styles['layout']}>
            <FontAwesomeIcon icon={faUserLock} size="7x" className={styles['icon']} />
            <div className={styles['message']}>
                <span>You must </span>
                <Route>
                    <Link to='/login'>login</Link>
                </Route>
                <span> first.</span>
            </div>
        </div >
    )
}