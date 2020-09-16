import React, { useState, useEffect } from 'react';
import { Loader, Card } from 'semantic-ui-react';
import UIContainer from '../UIContainer';
import { history } from './../..//history';

export interface IText {
    id: string;
    title: string;
    text?: string; 
}

const TextListPage: React.FC = () => {
    const [list, setList] = useState<IText[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getList();
    }, []);

    const getList = async() => {
        setIsLoading(true);
        const response = await fetch('http://127.0.0.1:5000/database/texts', {
            method: 'get'
        }).then(res => {return res.json()})
        setList(response.Result);
        setIsLoading(false);
    }

    return (
        <UIContainer text="List of all texts presented below.">
            {!isLoading ? list.map(item => {
            return (
                <Card
                    key={item.id}
                    link
                    header={item.title}
                    onClick={() => history.push(`/expanded/${item.id}`)}
                />
            )
        }) : <Loader active inline='centered' />}
        </UIContainer>
    )
};

export default TextListPage;