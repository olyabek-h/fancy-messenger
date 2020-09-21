import React, { useState, useEffect, useRef, useCallback } from 'react'
import styles from './head.module.scss'
import Headbar from './headbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useKeyboard } from '../../../hooks/customHooks'
import Drawer from '../../../components/drawer'
import Profile from '../../../components/profile'
import { useAppState } from '../../../context/appStateContext'
import { useDispatch } from '../../../context/dispatchContext'
import { keywordSearched, chatCreated, userSignedOut } from '../../../stateManager/actionCreator'
import { startChat } from '../../../services/services'

export default function Head() {
    const [mode, setMode] = useState('chatList');
    const input = useRef(null);
    const { name, searchedKeyword, contacts, userId } = useAppState();
    const dispatch = useDispatch();

    function handleSeachIcon() {
        setMode('search');
    }

    useEffect(() => {
        if (mode === 'search')
            input.current.focus();
    }, [mode])

    function handleInputChange(e) {
        dispatch(keywordSearched(e.target.value))
    }

    function handleMenubarIcon() {
        setMode(mode === 'chatList' ? 'contacts' : 'chatList');
        dispatch(keywordSearched(''))
    }

    const hadnleKeyDown = useCallback(
        (e) => {
            if (mode !== 'search' && e.ctrlKey && (e.key === 'f' || e.key === 'F')) {
                e.preventDefault();
                setMode('search');      //      6   handleSeachIcon()
            }
            else if (mode === 'chatList' && e.ctrlKey && (e.key === 'm' || e.key === 'M')) {
                e.preventDefault();
                setMode('contacts');
            }
            else if (e.keyCode === 27) {
                setMode('chatList');    //      6   handleMenubarIcon()
                dispatch(keywordSearched(''))             //      6
            }
        },
        [mode, dispatch],
    );
    useKeyboard('keydown', hadnleKeyDown, [mode])

    function handleContactSelect({ id: peerId, name }) {
        startChat(peerId, userId)
            .then(chatId => {
                setMode('chatList')
                dispatch(chatCreated(chatId, name))
            })
    }

    function handleOnExit() {
        dispatch(userSignedOut());
        localStorage.clear();
    }

    return (
        <div className={styles['head']}>
            <Drawer isOpen={mode === 'contacts'} onClose={handleMenubarIcon} >
                <Profile
                    name={name}
                    avatar='/avatar.png'
                    contacts={contacts}
                    onContactSelect={handleContactSelect}
                    onExit={handleOnExit}
                />
            </Drawer>
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
                            value={searchedKeyword}
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