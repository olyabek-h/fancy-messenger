import React from 'react'
import ReactDom from 'react-dom'
import styles from './drawer.module.scss'
import className from 'classnames'

export default function Drawer({ isOpen, onClose, children }) {

    const drawerClassName = className({
        [styles['drawer']]: true,
        [styles['open']]: isOpen,
        [styles['close']]: !isOpen,
    })
    const containerClassName = className({
        [styles['container']]: true,
        [styles['open']]: isOpen,
        [styles['close']]: !isOpen,
    })

    return (
        <>
            {ReactDom.createPortal(
                <div
                    className={drawerClassName}
                    onClick={onClose}
                >
                </div>,
                document.body
            )}
            {ReactDom.createPortal(
                <div
                    className={containerClassName}
                >
                    {children}
                </div>,
                document.body
            )}
        </>
    )

}