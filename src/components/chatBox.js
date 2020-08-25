import React, {useState} from 'react'
import styles from './chatBox.module.scss'
import Headbar from './headbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEllipsisV, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Avatar from './avatar'

export default function ChatBox({ avatar, name, messages }) {
    const [text, setText] = useState('');

    function handleInputChange(e) {
        setText(e.target.value);
    }

    return (
        <div className={styles['chatBox']}>
            <div className={styles['chatHead']}>
                <Headbar
                    first={
                        <FontAwesomeIcon icon={faTimes} size='lg' />
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
                    {messages.map(message => (
                        <li className={styles[message.me ? 'me' : '']} key={message.id}>
                            <span>{message.text}</span>
                            <span>{message.time}</span>
                        </li>
                    ))}
                </ul>
                <div className={styles['chatInput']}>
                    <FontAwesomeIcon icon={faPaperclip} size='lg' className={styles['icon']} />
                    <input type='text' value={text} onChange={e => handleInputChange(e)} />
                    <FontAwesomeIcon icon={faPaperPlane} size='lg' className={styles['icon']} />
                </div>
            </div>
        </div>
    )
}