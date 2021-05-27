import {Typography} from 'antd';
import React, {Component} from 'react'

const {Text} = Typography;

export default class CountUp extends Component {

    constructor(props) {
        super();
        this.state = {
            min: "",
            sec: ""
        }
    }

    tick(){
        let now = new Date()
        let upd = Date.parse(this.props.updatedAt)
        this.setState({min: parseInt((now - upd) / 60000)})
        let sec = ((now - upd) - this.state.min * 60000) / 1000
        this.setState({sec: parseInt(sec)})
    }

    // update tick every second
    componentDidMount(){
        this.timerID = setInterval(
            () => this.tick(), 1000     
        ); 
    }

    // tick starts over 
    componentWillUnmount(){
        clearInterval(this.timerID); 
    }

    render(){
        return (
            <div>
                <Text italic= {true}> {this.state.min + " minutes " + this.state.sec + " seconds"} </Text>
            </div>
        )
    }
}
