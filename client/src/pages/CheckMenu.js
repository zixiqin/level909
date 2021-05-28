import axios from "../commons/axios"
import {useState} from 'react';
import {Divider, Row, Col, Card} from 'antd';
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap';

export default function ChechMenu(props) {

    const [snacks, setSnacks] = useState([]);
    const { Meta } = Card;
    axios.get('/snack').then(response => {
        setSnacks(response.data.snacks)
    })

    let history = useHistory();
    const backHomePage = () => {history.push('/')};




return(
    <>
    <div style={{width: '40%', margin: 'auto', marginTop: '3%'}} >
    <img alt="" src="/coffee-truck.png" width="70" height="50" className="d-inline-block align-top"/>
    <Button variant="dark"  onClick={backHomePage}>
        Back to HomePage and start your order
    </Button>
    <Row id="Coffee-Row">
                <Divider orientation="left" style={{borderWidth:2, borderColor: '#593e34' }} plain>
                    <h2>Snacks - Le Sillage</h2>
                </Divider>
            {snacks.map((snack, index) =>(
                <Col span={8}>
                <Card id="coffeemenu" hoverable
                        cover={<img alt="" src={snack.image} ></img>} >
                        <Meta title={snack.name + "    " + "$"+snack.price} description={snack.detail} />
                    </Card>
                </Col>
            ))}
            </Row>
    </div>
    </>
)

}