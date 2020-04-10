import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Header } from '../Partials';

import { AdminDash, Aside } from './components';

import './style.scss';

export const Dashboard = props => {

    const [data, setData] = useState([]);
    const [updateMade, setUpdateMade] = useState('')
    useEffect(() => {
        let token = localStorage.getItem('userToken')
        fetch(`${process.env.REACT_APP_SERVER_URL}/admin`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })
        .then(response => {
            response.json()
            .then(result => {
                setData(result)
                console.log(result)
            })
        })
        .catch(err => {
            console.log(`We're all fucked`)
        })
    }, [updateMade])

    if (!props.user) {
        return <Redirect to='/' />

    } else if (props.user.is_admin && !data.length) {
        let token = localStorage.getItem('userToken')
        fetch(`${process.env.REACT_APP_SERVER_URL}/admin`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })
        .then(response => {
            response.json()
            .then(result => {
                setData(result)
                console.log(result)
            })
        })
        .catch(err => {
            console.log(`We're all fucked`)
        })
    }

    let content;
    // no user; 
    if (!props.user) {
        content = (
            <div className='dashboard'>
                Loading
            </div>
        )
    } else if (props.user.is_admin && data.length) {
        content = (
            <div className='dashboard'>
                <Aside
                    volunteers={data[0].volunteers}
                    customers={data[1].customers}
                    orders={data[2].orders}
                />
                <AdminDash 
                    volunteers={data[0].volunteers}
                    customers={data[1].customers}
                    orders={data[2].orders}
                    setUpdateMade={setUpdateMade}
                />
            </div>
        )
    }

    return (
        <div className='page'>
            <Header 
                user={props.user}
                updateUser={props.updateUser}
            />
            {content}
        </div>
    )
};