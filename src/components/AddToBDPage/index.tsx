import React, { useState } from 'react';
import { Form, TextArea, Button } from 'semantic-ui-react';
import styles from './styles.module.scss';
import {toastr} from 'react-redux-toastr';
import UIContainer from '../UIContainer';
import { history } from './../..//history';

interface IAddPage {

}

const AddPage: React.FC<IAddPage> = () => {
    const [text, setText] = useState<string | undefined | number>('');

    const handleAdd = () => {
        add();
        history.push("/");
    };

    async function add() {
        const response = await fetch('http://127.0.0.1:5000/database/text', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({text: text})
        }).then(res => {return res.json()})
        if(response.Result === 'Success') {
            console.log(response.text);
            toastr.success("Success", "Text was successfully downloaded to database");
        } else {
            toastr.warning("Error", "Something went wront. Try again");
        }
    }
    
    return (
        <UIContainer text="Enter text you want to add to database.">
            <Form>
                <TextArea placeholder='Enter text' 
                className={styles.textArea}
                onChange={(e, data)=>setText(data.value)}/>
                <Button className={styles.button} type="submit"
                onClick={()=> handleAdd()}>Add</Button>
            </Form>
        </UIContainer>
    );
};

export default AddPage;