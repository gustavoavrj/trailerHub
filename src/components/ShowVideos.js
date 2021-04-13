import React, {Component} from "react";
import {firestore} from '../firebaseConfig'
import ReactWebMediaPlayer from 'react-web-media-player';
import { Card, Row, Col } from 'antd';
import { Link } from "react-router-dom";

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
            const {titulo, descripcion, url, thumbnail} = doc.data();
            Videos.push({
                key: doc.id,
                doc,
                titulo,
                descripcion,
                thumbnail,
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
            <Col span={4}>
            <Link to={"/video/" + video.key}><Card
            bordered={true}
            hoverable
            cover={<div style={{
                            height: "200px",
                            width: "450px",
                            overflow: "hidden"
                        }}><img src={video.thumbnail} alt="MDN" width="1780"  / ></div>}
  >
    <Meta title={video.titulo} description={video.descripcion} />
  </Card></Link>
  </Col>,
            )}
            </Row>

            </div>
        
    );


    }
}





    