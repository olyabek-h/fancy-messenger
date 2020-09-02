import React from 'react'
import styles from './profile.module.scss'
import Avatar from './avatar'

export default function Profile({ name, avatar, contacts, onSelect }) {

    return (
        <div className={styles['profile']} >
            <div className={styles['top']} >
                <Avatar src={avatar} alt={`${name}'s avatar`} /> {/*Temporary hard code*/}
                <span> {name} </span>
            </div>
            <div className={styles['bottom']} >
                <div>
                    {contacts.map(contact => <div key={contact.id} onClick={() => onSelect(contact.id)} >{contact.name}</div>)}
                </div>
            </div>
        </div>
    )
}