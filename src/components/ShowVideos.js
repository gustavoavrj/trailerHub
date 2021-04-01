import React, { useEffect, useContext ,Component} from "react";
import Header from "../components/Header";
import { Layout } from "antd";
import { Form, Input, Button } from "antd";
import { Auth } from "../context/AuthContext";
import { withRouter } from "react-router";
import Footer from '../components/Footer'
import app, {firestore} from '../firebaseConfig'


import { Card } from 'antd';
const { Meta } = Card;
export default class ShowVideos extends Component {
    constructor(props) {
        super(props)
        this.ref = firestore;
        this.unsuscribe = null;
        this.state = {
            Videos: []
        };
    }

    componentDidMount() {
        this.unsuscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }
    onCollectionUpdate = (querySnapshot)=>{
        const Videos = [];
        querySnapshot.forEach((doc)=>{
            const {titulo, descripcion, url} = doc.data();
            Videos.push({
                key: doc.id,
                doc,
                titulo,
                descripcion,
                url
            });
        });
        this.setState({
            Videos
        });
    }

    
    render() {  

    return (
        <div>
        {console.log(this.Videos)}
        {this.state.Videos.map( video => 
            <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title={video.titulo} description={video.descripcion} />
  </Card>,
            )}
            </div>
        
    );


    }
}





    