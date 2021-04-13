import React, { useEffect, useContext ,useState} from "react";
import Header from "../components/Header";
import { Layout } from "antd";
import { Form, Input, Button } from "antd";
import { Auth } from "../context/AuthContext";
import { withRouter, useParams } from "react-router";
import Footer from '../components/Footer'
import ShowVideos from '../components/ShowVideos'
import ReactWebMediaPlayer from 'react-web-media-player';
import { firestore } from "../firebaseConfig";
import Video from "../components/Video"
import ButtonGroup from "antd/lib/button/button-group";
const VideoComponent=({history}) =>{
    const { Content } = Layout;
    const { usuario } = useContext(Auth);
    const [nombre, setnombre] = useState(null)
    const { id } = useParams()


    function deleteVideo () {
        firestore.doc(id).delete().then(history.push('/'))
    }
    useEffect(() => {
        
        if (usuario===null) {
            history.push("/login");
        }
       
        usuario?usuario.displayName?setnombre(usuario.displayName):setnombre(usuario.email):setnombre(null)
       
    }, [history, usuario]);

        return (
            <Layout style={{ height: "100vh",backgroundImage: "URL(https://wallpaperaccess.com/full/752715.jpg)"          
        }}>
                <Header
                    titulo="TrailerHub"
                    subtitulo="Your trailer hub"
                    username={nombre}
                />
                <Content style={{ padding: "0 50px", marginTop: 40 }}>
                    <div
                        style={{
                            background: "#fff",
                            padding: 24,
                            minHeight: "80vh"
                        }}
                    >
                    <Video id={id} />
                    <ButtonGroup><Button onClick={() => deleteVideo()} key="delete" type="primary" danger>Eliminar</Button></ButtonGroup>

                    </div>
                   
                </Content>
                <Footer />
            </Layout>
        );
    
}
export default withRouter(VideoComponent);
