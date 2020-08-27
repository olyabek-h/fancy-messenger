import React, { useState, useEffect, useRef, useCallback } from 'react'
import styles from './chatBox.module.scss'
import Headbar from './headbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEllipsisV, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Avatar from './avatar'
import { useKeyboard } from '../hooks/myHooks'

export default function ChatBox({ avatar, name, messages, onSubmitMessage, selectedChatId, onClose }) {
    const [text, setText] = useState('');
    const input = useRef(null);
    const lastMessage = useRef(null);

    function handleInputChange(e) {
        setText(e.target.value);
    }

    function handleSubmitMessage() {
        if (text !== '') {
            onSubmitMessage(text);
            setText('');
            input.current.focus();              //  ?   3   focus
        }
    }

    // useEffect(() => {                    //  ?   3   focus
    //     if (text === '')
    //         input.current.focus()
    // }, [text])

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
        lastMessage.current.scrollIntoView();
    }, [selectedChatId, messages])

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
                <ul className={styles['messages']}>
                    {messages.map((message, index) => (
                        <li
                            className={styles[message.me ? 'me' : '']}
                            key={message.id}
                            ref={messages.length === index + 1 ? lastMessage : null}
                        >
                            <span>{message.text}</span>
                            <span>{message.time}</span>
                        </li>
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