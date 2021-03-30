import React, { useEffect, useContext ,useState} from "react";
import Header from "../components/Header";
import { Layout } from "antd";
import { Form, Input, Button } from "antd";
import { Auth } from "../context/AuthContext";
import { withRouter } from "react-router";
import Footer from '../components/Footer'

  
const Upload=({history}) =>{
    const { Content } = Layout;
    const { usuario } = useContext(Auth);
    const [nombre, setnombre] = useState(null)
  
   

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
                        <Form className="login-form">

                            <Form.Item>
                                <h3>Titulo</h3>
                                <Input
                                    name="title"
                                    placeholder="Titulo"
                                />
                            </Form.Item>
                            <Form.Item>
                                <h3>Descripcion</h3>
                                <Input
                                    name="descripcion"
                                    placeholder="Descripcion"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                style={{ marginRight: 10 }}
                                >
                                Subir
                                </Button>
                            </Form.Item>

                        </Form>
                    </div>
                   

                </Content>
                <Footer />
            </Layout>
        );
    
}
export default withRouter(Upload);
