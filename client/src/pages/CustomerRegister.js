import React, {useState} from 'react'
import { PageHeader, Button, Form, Input, message } from 'antd';
import axios from '../commons/axios.js';
import { Carousel } from 'antd';

export default function CustomerRegister(props) {

    const [form] = Form.useForm();
    const [givenName,setGivenName] = useState('');
    const [familyName,setFamilyName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const onSubmit = () => {
        const registerBody = {
            "givenName": givenName,
            "familyName": familyName,
            "email": email,
            "password": password
        }
        axios.post('/customer/register/', registerBody).then((response) => {
            if (response.data.customer){
                message.success("customer details registered succsess")
                props.history.push('/');
            }else{
                message.error(response.data.message)
            }
        })
    }

    return (
        <>
           <PageHeader title={"Register"}></PageHeader>
           <div style={{width: '40%', margin: 'auto'}}>
                <Form form={form} layout="vertical">
                    <Form.Item label="Given Name">
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
                    <Form.Item label="Password">
                        <Input placeholder="email" 
                            type = "password"
                            defaultValue={password}
                            onChange={e => setPassword(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={onSubmit}>Submit</Button>
                    </Form.Item>
                </Form>
            </div>
            <Carousel autoplay>
        <div>
        <h3>
        <img  src="https://images.unsplash.com/photo-1449049607083-e29383d58423?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            width="750" height="500" className="d-inline-block align-top" style = {{marginLeft: "30vw", marginTop:"1vh"}}/> 
        </h3>
        </div>
        <div>
          <h3>
          <img  src="https://images.unsplash.com/photo-1517559911230-415def7b667f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            width="650" height="500" className="d-inline-block align-top" style = {{marginLeft: "32.5vw", marginTop:"1vh"}}/> 
          </h3>
        </div>
        <div>
          <h3>
          <img  src="https://images.unsplash.com/photo-1594470677322-4eb47f343f3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=473&q=80" 
          width="750" height="500" className="d-inline-block align-top" style = {{marginLeft: "30vw", marginTop:"1vh"}}/> 
          </h3>
        </div>
        <div>
          <h3>
          <img  src="https://images.unsplash.com/photo-1587491439149-bd2ff295d450?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
          width="650" height="500" className="d-inline-block align-top" style = {{marginLeft: "32.5vw", marginTop:"1vh"}}/> 
          </h3>
        </div>
      </Carousel>
        </>
    )
}
