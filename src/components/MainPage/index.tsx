import React from 'react';
import styles from './styles.module.scss';
import { Button, Divider } from 'semantic-ui-react';
import { history } from './../..//history';

const MainPage: React.FC = () => (
    <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
            <div className={styles.text}>Here you can check for plagiarism every work you need. </div>
            <div className={styles.buttonContainer}>
                <Button size='huge'
                onClick={() => history.push('/upload')}>Check</Button>
            </div>
        </div>
        <Divider vertical>Or</Divider>
        <div className={styles.infoContainer}>
            <div className={styles.text}>You can add new text to database.</div>
            <div className={styles.buttonContainer}>
                <Button size='huge'
                onClick={() => history.push('/add')}>Add</Button>
                <Button size="huge"
                onClick={() => history.push('/list')}>View all texts</Button>
            </div>
        </div>
    </div>
);

export default MainPage;