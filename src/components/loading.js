import React from 'react'
import styles from './loading.module.scss'
import RingLoader from "react-spinners/RingLoader";

export default function Loading({ loading }) {
    return (
        <div className={styles['loading']} >
            <div>
                <RingLoader
                    css={`
                        display: block;
                        margin: auto;
                    `}
                    size={150}
                    color={"#36D7B7"}
                    loading={loading}
                />
            </div>
        </div>
    )
}
