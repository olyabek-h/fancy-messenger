import React, { useState, useEffect, useRef, useCallback } from 'react'
import styles from './chatBox.module.scss'
import Headbar from './headbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEllipsisV, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Avatar from '../../../components/avatar'
import { useKeyboard } from '../../../hooks/customHooks'
import { loadMessages } from '../../../services/services'
import { useDispatch } from '../../../context/dispatchContext'
import { useAppState } from '../../../context/appStateContext'
import { loadPrependMessages } from '../../../stateManager/actionCreator'
import TextMessage from '../../../components/textMessage'

export default function ChatBox({ avatar, name, messages, onSubmitMessage, selectedChatId, onClose }) {
    const [text, setText] = useState('');
    const input = useRef(null);
    const lastMessage = useRef(null);
    const messagesContainer = useRef(null);
    const dispatch = useDispatch();
    const { userId } = useAppState();
    const lastTextMessage = useRef('');

    function handleInputChange(e) {
        setText(e.target.value);
    }

    function handleSubmitMessage() {
        if (text !== '') {
            onSubmitMessage(text);
            setText('');
            input.current.focus();
            lastTextMessage.current = text;
        }
    }

    function handleKeyDown(e) {
        if (e.keyCode === 13)
            handleSubmitMessage();
    }

    // function handleEsc(e) {          //  6   
    //     if (e.keyCode === 27)
    //         onClose();
    // }
    const handleEsc = useCallback(      //  6
        (e) => {
            if (e.keyCode === 27)
                onClose();
        },
        [onClose],
    );
    useKeyboard('keydown', handleEsc, [onClose]);

    useEffect(() => {
        input.current.focus();
        lastMessage.current && lastMessage.current.scrollIntoView();
    }, [selectedChatId])

    useEffect(() => {
        if (lastMessage.current && messages.length > 0)
            if (messages[messages.length - 1].text === lastTextMessage.current)
                lastMessage.current.scrollIntoView();
    }, [messages])

    useEffect(() => {
        function handleScrollTop() {
            if (messagesContainer.current.scrollTop === 0) {
                loadMessages(selectedChatId, userId, messages[messages.length - 1].id)
                    .then(data => {
                        dispatch(loadPrependMessages(selectedChatId, data));
                    })
            }
        }
        const msgContainer = messagesContainer.current;
        msgContainer.addEventListener('scroll', handleScrollTop);
        return () => {
            msgContainer.removeEventListener('scroll', handleScrollTop);
        }
    }, [selectedChatId, messages, dispatch, userId])

    return (
        <div className={styles['chatBox']}>
            <div className={styles['chatHead']}>
                <Headbar
                    first={
                        <FontAwesomeIcon icon={faTimes} size='lg' onClick={onClose} />
                    }
                    middle={
                        <>
                            <Avatar src={avatar} alt={name} />
                            <span>{name}</span>
                        </>
                    }
                    last={
                        <FontAwesomeIcon icon={faEllipsisV} size='lg' />
                    }
                />
            </div>
            <div className={styles['chatBody']}>
                <ul className={styles['messages']} ref={messagesContainer} >
                    {messages.map((message, index) => (
                        <TextMessage
                            key={message.id}
                            ref={messages.length === index + 1 ? lastMessage : null}
                            message={message}
                        />
                        // <li
                        //     className={styles[message.me ? 'me' : '']}
                        //     key={message.id}
                        //     ref={messages.length === index + 1 ? lastMessage : null}
                        // >
                        //     <span>{message.text}</span>
                        //     <span>{message.time}</span>
                        // </li>
                    ))}
                </ul>
                <div className={styles['chatInput']}>
                    <FontAwesomeIcon icon={faPaperclip} size='lg' className={styles['icon']} />
                    <input
                        type='text'
                        value={text}
                        onChange={e => handleInputChange(e)}
                        onKeyDown={e => handleKeyDown(e)}
                        ref={input}
                    />
                    <FontAwesomeIcon
                        icon={faPaperPlane}
                        size='lg'
                        className={styles['icon']}
                        onClick={handleSubmitMessage}
                    />
                </div>
            </div>
        </div>
    )
}