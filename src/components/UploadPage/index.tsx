import React, { useState } from 'react';
import { Form, TextArea, Button } from 'semantic-ui-react';
import styles from './styles.module.scss';
import {IState} from '../../reducers'
import { connect, ConnectedProps } from 'react-redux';
import { CheckPlagRoutine } from '../../sagas/routines';
import UIContainer from '../UIContainer';

const UploadPage: React.FC<IUploadPageProps> = ({checkPlag}) => {
    const [text, setText] = useState<string | undefined | number>('');
    const [answer, setAnswer] = useState<number | undefined>(undefined);
    const handleSubmit = () => {
        check();
    };

    async function check() {
        const response = await fetch('http://127.0.0.1:5000/check', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({text: text})
        }).then(res => {return res.json()})
        setAnswer(response.Result);
    } 

    return (
        <UIContainer text="Enter your text below to check for plagiarism.">
            <Form>
                <TextArea placeholder='Enter text' 
                className={styles.textArea}
                onChange={(e, data)=>setText(data.value)}/>
                <Button className={styles.button}
                onClick={()=>handleSubmit()}>Submit</Button>
            </Form>
            {answer !== undefined ? <div className={styles.text}>
                Your text is {answer}% similar to other texts.</div> : null}
        </UIContainer>
    );
};

const mapStateToProps = (state: IState) => ({
    isLoading: state.isLoading,
    text: state.text
});

const mapDispatchToProps = {
    checkPlag: CheckPlagRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type IUploadPageProps = ConnectedProps<typeof connector>;

export default connector(UploadPage);