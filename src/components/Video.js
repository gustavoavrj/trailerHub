import React, {Component} from "react";
import {firestore} from '../firebaseConfig'
import ReactWebMediaPlayer from 'react-web-media-player';
import { Card, Row, Col } from 'antd';

const { Meta } = Card;
export default class Video extends Component {
    constructor(props) {
        super(props)
        this.ref = firestore;
        this.unsuscribe = null;
        this.state = {
            Videos: []
        };
    }

    componentDidMount() {
        this.unsuscribe = this.ref.doc(this.props.id).onSnapshot(this.onCollectionUpdate);
    }
    onCollectionUpdate = (querySnapshot)=>{
        const Videos = [];
        try{
            const {titulo, descripcion, url, thumbnail} = querySnapshot.data();
            Videos.push({
                titulo,
                descripcion,
                thumbnail,
                url
            });
        ;
        this.setState({
            Videos
        });
        console.log(this.state.Videos.titulo)


        }catch(err){console.error(err.message);}
            
    }

    
    render() {  
        
    return (

        
        <div>
        {this.state.Videos.map( video => 
            <Card title={video.titulo} bordered={false}>,
            <ReactWebMediaPlayer
        title={video.titulo}
        video={video.url} 
        height={700} width={1200}  />,<Meta description={video.descripcion} /></Card>
            )}
            

            </div>
        
    );


    }
}





    