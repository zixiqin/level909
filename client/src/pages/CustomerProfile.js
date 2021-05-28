import React, {useState} from 'react'
import { Button, Form, Input, Divider, Typography, message } from 'antd';
import axios from '../commons/axios.js';
import Header from '../components/Header.js';
import {Jumbotron} from 'react-bootstrap';

export default function CustomerProfile(props) {

    const [form] = Form.useForm();
    const { Link } = Typography;

    const [givenName,setGivenName] = useState(props.location.state.customer.givenName);
    const [familyName,setFamilyName] = useState(props.location.state.customer.familyName);
    const [email,setEmail] = useState(props.location.state.customer.email);
    const [password,setPassword] = useState(props.location.state.customer.password);
    const [disable, setDisable] = useState(true);

    const enablePassword = () => {
        if(disable) {setDisable(false)}
        else{setDisable(true)}
    }

    const onSubmit = () => {
        const updateBody = {
            "givenName": givenName,
            "familyName": familyName,
            "email": email,
            "password": password
        }
        axios.post('/customer/update/' + props.location.state.customer.id, updateBody).then((response,err) => {
            if (response.data.success){
                message.success("customer details update succsess")
            }else{
                message.error(response.data.error)
            }
        }).catch(error =>{
            message.error("another customer already registered that email")
        })
    }
      
    return (
        <>
            <Header/>
            <Jumbotron style={{width: '50%', margin :'auto', marginTop: '3%',backgroundColor :"#f5e3ce"}}>
            <div style={{width: '40%', margin: 'auto'}}>
                <Form form={form} layout="vertical" >
                    <Form.Item label="Given Name" style = {{color: "red"}}>
                        <Input placeholder="given name" defaultValue={givenName}
                            onChange={e => setGivenName(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Family Name">
                        <Input placeholder="family name" defaultValue={familyName}
                            onChange={e => setFamilyName(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input placeholder="email" defaultValue={email}
                            onChange={e => setEmail(e.target.value)} />
                    </Form.Item>
                    <Divider>
                        Click <Link onClick={enablePassword} target="_blank">
                            here
                        </Link> to change password
                    </Divider>
                    <Form.Item label="Password">
                        <Input placeholder="email" 
                            type = "password"
                            defaultValue={props.location.state.customer.password}
                            disabled={disable}
                            onChange={e => setPassword(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="dark" onClick={onSubmit}>Submit</Button>
                    </Form.Item>
                </Form>
                
            </div>
            </Jumbotron>
        </>
    )
}
