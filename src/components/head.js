import React, { useState, useEffect, useRef } from 'react'
import styles from './head.module.scss'
import Headbar from '../components/headbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function Head() {
    const [mode, setMode] = useState('chatList');
    const [text, setText] = useState('');
    const input = useRef(null);

    function handleMenubarIcon() {
        setMode(mode === 'chatList' ? 'contacts' : 'chatList');
    }

    function handleSeachIcon() {
        setMode('search');
        // input.current.focus();               //  1   focus
    }

    useEffect(() => {
        if (mode === 'search')
            input.current.focus();              //  1   focus
    }, [mode])

    function handleInputChange(e) {
        setText(e.target.value);
    }

    return (
        <div className={styles['head']}>
            <Headbar
                first={
                    <FontAwesomeIcon
                        icon={mode === 'search' ? faArrowLeft : faBars}
                        size='lg'
                        onClick={handleMenubarIcon}
                    />
                }

                middle={
                    mode === 'search' ?
                        <input
                            type="text"
                            placeholder='search'
                            value={text}
                            onChange={e => handleInputChange(e)}
                            ref={input}
                        /> :
                        'My Messenger'
                }

                last={
                    mode !== 'search' &&
                    <FontAwesomeIcon icon={faSearch} size='lg' onClick={handleSeachIcon} />
                }
            />
        </div>
    )
}