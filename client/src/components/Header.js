import OrderList from '../components/OrderList.js';

import {Divider} from 'antd';
import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import {Button,Navbar,OverlayTrigger,Tooltip, Modal} from 'react-bootstrap';


export default function Header(props) {

    let history = useHistory();

    // const [drawerVisible, setDrawerVisible] = useState(false); 
    // const handleDrawerClose = () => setDrawerVisible(false); 
    // const handleDrawerShow = () => setDrawerVisible(true); 
 
    const[modalVisible, setModalVisible]= useState(props.modalVisible);
    const handleModalShow = () => setModalVisible(true);
    const handleModalClose = () => setModalVisible(false);

    const goHomePage = () => {history.push('/')};
    const renderTooltip = (props) => (
        <Tooltip id = 'button-tooltip' {...props}>
          Click here to go homepage
        </Tooltip>
      );

    const [title, setTitle] = useState('');
    const [target, setTarget] = useState('');
    const [selections, setSelections] = useState([]);


    useEffect(() => {
        if (history.location.pathname === "/customer"){
            setTitle('Welcome to Le Sillage, ' + props.customer.givenName)
            setTarget('customer');
            setSelections([<Button variant = "outline-light" key = "0"
                onClick = {()=> {
                    history.push('/profile',{
                        customer:props.customer,
                        orders: props.orders,
                        password: props.password
                    });
                }}>My Profile</Button>,
            <Button variant = "outline-light" key = "1" onClick = {handleModalShow}>My Orders</Button>])
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
            <Navbar id="nav" >
                <OverlayTrigger
                    placement = "right"
                    delay = {{show:250, hide: 300}}
                    overlay = {renderTooltip} >
                    <Button variant="outline-light" size="" onClick={goHomePage}>
                        <img alt="" src="/coffee-truck.png" width="70" height="50" className="d-inline-block align-top"/>
                    </Button>
                </OverlayTrigger>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="navbar navbar-expand-lg navbar-light bg-light">
                <nav class="navbar navbar-dark">
                    <span class="navbar-brand">
                        {title}
                    </span>
                </nav>
                </Navbar.Collapse>
                {selections}

            <Modal show={modalVisible} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>All orders </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Divider/>
                    <OrderList id = {props.id}
                            target = {target} 
                            orders={props.orders} 
                            />
                </Modal.Body>
            </Modal>
            {/* <Drawer visible ={drawerVisible}
                closable = {true}
                onClose = {handleDrawerClose}
                width={"60vw"}>
                All Orders:
                <Divider/>
                <OrderList id = {props.id}
                            target = {target} 
                            orders={props.orders} 
                            />
            </Drawer> */}
        </Navbar> 

    )
}
