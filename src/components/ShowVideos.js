import React, {Component} from "react";
import {firestore} from '../firebaseConfig'
import ReactWebMediaPlayer from 'react-web-media-player';
import { Card, Row, Col } from 'antd';
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
            <Row gutter={16}>

        {console.log(this.Videos)}
        {this.state.Videos.map( video => 
            <Col span={8}>
            <Card
            hoverable
            cover={<ReactWebMediaPlayer video={video.url} title={video.titulo} />}
  >
    <Meta title={video.titulo} description={video.descripcion} />
  </Card>
  </Col>,
            )}
            </Row>

            </div>
        
    );


    }
}





    