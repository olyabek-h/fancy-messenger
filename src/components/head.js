import React, { useState } from 'react'
import styles from './head.module.scss'
import Headbar from '../components/headbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function Head() {
    const [mode, setMode] = useState('chatList');


    function handleMenubarIcon() {
        setMode(mode === 'chatList' ? 'contacts' : 'chatList');
    }

    function handleSeachIcon() {
        setMode('search');
    }

    return (
        <div className={styles['head']}>
            <Headbar
                first={
                    <FontAwesomeIcon
                        icon={mode === 'chatList' ? faBars : faArrowLeft}
                        size='lg'
                        onClick={handleMenubarIcon}
                    />
                }

                middle={
                    mode === 'chatList' ?
                        'My Messenger' :
                        <input type="text" placeholder='search' />
                }

                last={
                    mode === 'chatList' &&
                    <FontAwesomeIcon icon={faSearch} size='lg' onClick={handleSeachIcon} />
                }
            />
        </div>
    )
}