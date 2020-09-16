import React, { useState } from 'react';
import { Form, TextArea, Button } from 'semantic-ui-react';
import styles from './styles.module.scss';
import UIContainer from '../UIContainer';
import { history } from './../..//history';

const UploadPage: React.FC = () => {
    const [text, setText] = useState<string | undefined | number>('');
    const [textId, setTextId] = useState('');
    const [answer, setAnswer] = useState<number | undefined>(undefined);
    const handleSubmit = () => {
        if (text) {
            check();
        }
    };

    const handleClick = () => {
        history.push(`/expanded/${textId}`);
    }

    async function check() {
        const response = await fetch('http://127.0.0.1:5000/check', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({text: text})
        }).then(res => res.json());
        setAnswer(response.Result);
        setTextId(response.Title_id);
    }
    
    return (
        <UIContainer text="Enter your text below to check for plagiarism.">
            <Form>
                <TextArea placeholder='Enter text' required
                className={styles.textArea}
                onChange={(e, data)=>setText(data.value)}/>
                <Button className={styles.button}
                onClick={()=>handleSubmit()}>Submit</Button>
            </Form>
            {answer !== undefined ? 
            <>
                <div className={styles.text}>Your text is {answer}% similar to other texts. </div>
                <div className={styles.text}>
                    Click <span className={styles.link} onClick={() => handleClick()}>here</span> to take a look at the most similar text.
                </div>
            </> : null}
            
        </UIContainer>
    );
};

export default UploadPage;