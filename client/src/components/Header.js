import OrderList from '../components/OrderList.js';

import {Divider, Drawer, PageHeader} from 'antd';
import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap';


export default function Header(props) {

    let history = useHistory();

    const [drawerVisible, setDrawerVisible] = useState(false); 
    const handleDrawerClose = () => setDrawerVisible(false); 
    const handleDrawerShow = () => setDrawerVisible(true); 
 
    const [title, setTitle] = useState('');
    const [target, setTarget] = useState('');
    const [selections, setSelections] = useState([]);


    useEffect(() => {
        if (history.location.pathname === "/customer"){
            setTitle('Welcome to Le Sillage, ' + props.customer.givenName)
            setTarget('customer');
            setSelections([<Button variant = "outline-dark" key = "0"
                onClick = {()=> {
                    history.push('/profile',{
                        customer:props.customer,
                        orders: props.orders,
                        password: props.password
                    });
                }}>My Profile</Button>,
            <Button variant = "outline-dark" key = "1" onClick = {handleDrawerShow}>My Orders</Button>])
        }else if (history.location.pathname === "/profile"){
            setTitle('Here is your profile setting~ ')
            setSelections([
                <Button variant = "dark" key = "1" onClick = {()=>history.goBack()}>Back to mainpage</Button>
            ])
        }else if(history.location.pathname ==='/vendor'){
            setTitle('Welcome back, ' + props.vendor.userName)
        }else{
            setTitle('Here is the order list~')
        }
    }, []); 


    return (
        <div>
            <PageHeader title = {title}
                extra = {selections}>
            </PageHeader>
            <Drawer visible ={drawerVisible}
                closable = {true}
                onClose = {handleDrawerClose}
                width={"60vw"}>
                All Orders:
                <Divider/>
                <OrderList id = {props.id}
                            target = {target} 
                            orders={props.orders} 
                            />
            </Drawer>
        </div>
    )
}
