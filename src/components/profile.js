import React from 'react'
import styles from './profile.module.scss'
import Avatar from './avatar'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Profile({ name, avatar, contacts, onContactSelect, onExit }) {

    return (
        <div className={styles['profile']} >
            <div className={styles['top']} >
                <Avatar src={avatar} alt={`${name}'s avatar`} /> {/*Temporary hard code*/}
                <span> {name} </span>
                <div className={styles['icon']}>
                    <FontAwesomeIcon icon={faSignOutAlt} size='sm' onClick={onExit} />
                </div>
            </div>
            <div className={styles['bottom']} >
                <div>
                    {!!contacts.length && contacts.map(contact => <div key={contact.id} onClick={() => onContactSelect(contact)} >{contact.name}</div>)}
                </div>
            </div>
        </div>
    )
}