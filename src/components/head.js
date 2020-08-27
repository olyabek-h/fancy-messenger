import React, { useState, useEffect, useRef, useCallback } from 'react'
import styles from './head.module.scss'
import Headbar from '../components/headbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useKeyboard } from '../hooks/myHooks'

export default function Head({ onKeywordChange }) {
    const [mode, setMode] = useState('chatList');
    // const [text, setText] = useState('');    //  5
    const input = useRef(null);

    function handleMenubarIcon() {
        setMode(mode === 'chatList' ? 'contacts' : 'chatList');
        onKeywordChange('');                    //  5   cause uncontrolled input
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
        // setText(e.target.value);             //  5
        onKeywordChange(e.target.value);
    }

    // function hadnleKeyDown(e) {                      //  6
    //     if (mode !== 'search' && e.ctrlKey && (e.key === 'f' || e.key === 'F')) {
    //         e.preventDefault();
    //         handleSeachIcon();  // setMode('search');       //  ?   4
    //     }
    //     else if (mode === 'search' && e.keyCode === 27) {
    //         handleMenubarIcon();    // setMode(mode === 'chatList' ? 'contacts' : 'chatList');  //  ?   4
    //     }
    // }
    const hadnleKeyDown = useCallback(                  //  6
        (e) => {
            if (mode !== 'search' && e.ctrlKey && (e.key === 'f' || e.key === 'F')) {
                e.preventDefault();
                handleSeachIcon();  // setMode('search');       //  ?   4
            }
            else if (mode === 'search' && e.keyCode === 27) {
                handleMenubarIcon();    // setMode(mode === 'chatList' ? 'contacts' : 'chatList');  //  ?   4
            }
        },
        [mode, handleMenubarIcon],
    );
    useKeyboard('keydown', hadnleKeyDown, [mode])

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
                            // value={text}         //  5
                            ref={input}
                            onChange={handleInputChange}
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