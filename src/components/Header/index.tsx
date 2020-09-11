import React from 'react';
import styles from './styles.module.scss';
import { history } from './../..//history';

const Header: React.FC = () => (
    <div className={styles.headerContainer}>
        <div className={styles.titleContainer}
        onClick={()=> history.push('/')}>
            Antiplag
        </div>
    </div>
);

export default Header;