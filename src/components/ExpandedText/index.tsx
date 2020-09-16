import React, { useEffect, useState } from 'react';
import UIContainer from '../UIContainer';
import { Header, Container, Loader, Button, Modal } from 'semantic-ui-react';
import { IText } from '../TextsList';
import styles from './styles.module.scss';
import { history } from './../..//history';
import {toastr} from 'react-redux-toastr';

interface IExpandedTextPageProps {
    match: any;
}

const ExpandedTextPage: React.FC<IExpandedTextPageProps> = ({match}) => {
    const [text, setText] = useState<IText>();
    const [isLoading, setIsLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        getText(match.params.id)
    }, [])

    const getText = async (id: string) => {
        setIsLoading(true);
        const response = await fetch(`http://127.0.0.1:5000/database/text/${id}`, {
            method: 'get'
        }).then(res => {return res.json()})
        setText(response.Result);
        console.log(response.Result);
        setIsLoading(false);
    };

    const handleDelete = () => {
        deleteText(match.params.id);
    };

    const deleteText = async (id: string) => {
        const response = await fetch(`http://127.0.0.1:5000/database/text/${id}`, {
            method: 'delete'
        }).then(res => {return res.json()})
        if(response.Result === 'Success') {
            toastr.success("Success", "Text was successfully deleted");
        } else {
            toastr.warning("Error", "Something went wront. Try again");
        }
        setOpenModal(false);
        history.push('/list');
    }

    const getModal = () => (
        <Modal
        size={'mini'}
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Delete This Text</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this text? This action can't be reverted.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button className={styles.negativeButton} onClick={() => handleDelete()}>
            Yes
          </Button>
          <Button className={styles.positiveButton} onClick={() => setOpenModal(false)}>
            No
          </Button>
        </Modal.Actions>
        </Modal>
    );

    return (
        <UIContainer>
            {!isLoading ?
            <>
                <Button className={styles.deleteButton}
                onClick={()=>setOpenModal(true)}>Delete</Button>
                <Container text>
                <Header as='h2'>{text?.title}</Header>
                <p>{text?.text}</p>
            </Container> 
            </>
            : <Loader active inline='centered' />}
            {getModal()}
        </UIContainer>
    )
};

export default ExpandedTextPage;