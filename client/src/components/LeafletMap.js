
import React, {useState, useMemo} from 'react'
import {useHistory} from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {Button, Form, Modal} from 'react-bootstrap';


import Menu from './Menu.js';
import axios from "../commons/axios"
import {message} from 'antd';
import cafeIcon from "../icons/cafe.png"
import {Icon} from "leaflet";

export default function LeafletMap(props) {
    let history = useHistory();

    const [position, setPosition] = useState(props.center)
    const [address, setAddress] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const vendorParkIcon = new Icon({
        iconUrl: cafeIcon,
        iconSize: [40,40]
    })


    const eventHandlers = useMemo(
        (e)=> ({
            dragend(e){
                console.log(e.target.getLatLng())
                setPosition(e.target.getLatLng())
            },
            click(){
                handleShow()
            }
        }),
        [],
    )
//
    const parkingInfo = () =>{
        console.log(props.vendor.id, position.lat, position.lng)
        axios.post('/vendor/park/' + props.vendor.id, {
            location: [position.lat, position.lng],
            textAddress: address
        }).then(response=>{
            message.success("You've successfully parked!")
            history.push({
                pathname: '/orders', 
                state: {
                    vendor: props.vendor
                }
            })
        })
    }

    // five vendors has a menu to show 
    const infoIdFiveVendors = props.vendors.map((vendor)=>{
        return (
            <Menu key={vendor.id}
            position = {vendor.location}
            customer = {props.customer} 
            snacks = {props.snacks}
            vendor = {vendor}/>
        )
    })

    const PosCustomerMarker = (
        <Marker position = {props.center} iconUrl = {'https://static.thenounproject.com/png/780108-200.png'}>
            <Popup>Your are Here!!</Popup>
        </Marker>
    )

    const PosVendorMarker = (
        <Marker        
        eventHandlers = {eventHandlers}
        icon = {vendorParkIcon}
        position = {position}
        draggable = {true}>
        </Marker>
    )

 
    return (
        <>
            <Modal show = {show} onHide = {handleClose} style = {{marginTop: '20vh'}}>
                <Modal.Header closeButton>
                    <Modal.Title>Park Your Vendor First</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Your Text address</Form.Label>
                            <Form.Control type="text" placeholder="Enter address"
                                onChange={e => setAddress(e.target.value)} />
                            <Form.Text className="text-muted">
                                Plases enter the detailed address
                            </Form.Text>  
                        </Form.Group>
                    </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={parkingInfo}>
                    Submit
                </Button>
            </Modal.Footer>
            </Modal>



            <MapContainer center={props.center} zoom={18} scrollWheelZoom={false} style={{height: "80vh"}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    
                />
                {(history.location.pathname ==='/vendor') ? PosVendorMarker : <></>}
                {(history.location.pathname ==='/customer') ? infoIdFiveVendors : <></>}
                {(history.location.pathname ==='/customer') ? PosCustomerMarker : <></>}
            </MapContainer>
        </>
    )
}
