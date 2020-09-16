import React, { useState } from 'react';
import { Form, TextArea, Button, Input, Message } from 'semantic-ui-react';
import styles from './styles.module.scss';
import {toastr} from 'react-redux-toastr';
import UIContainer from '../UIContainer';
import { history } from './../..//history';

const AddPage: React.FC = () => {
    const [text, setText] = useState<string | undefined | number>('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    const handleAdd = () => {
        if (text && title) {
            add();
            history.push("/");
        } else {
            setError("Enter all fields")
        }
    };

    async function add() {
        const response = await fetch('http://127.0.0.1:5000/database/text', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title: title, text: text})
        }).then(res => {return res.json()})
        if(response.Result === 'Success') {
            toastr.success("Success", "Text was successfully downloaded to database");
        } else {
            toastr.warning("Error", "Something went wront. Try again");
        }
    }
    
    return (
        <UIContainer text="Enter text you want to add to database.">
            <Form>
                <Input fluid placeholder='Enter title' required
                onChange={(e, data)=>setTitle(data.value)}/>
                <TextArea placeholder='Enter text' required
                className={styles.textArea}
                onChange={(e, data)=>setText(data.value)}/>
                {error ? <Message color='red'>{error}</Message> : null}
                <Button className={styles.button} type="submit"
                onClick={()=> handleAdd()}>Add</Button>
            </Form>
        </UIContainer>
    );
};

export default AddPage;