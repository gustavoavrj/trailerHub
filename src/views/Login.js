import React, { useState, useContext, useEffect } from "react";
import { Layout } from "antd";
import { Form, Input, Button } from "antd";
import Icon from '@ant-design/icons';
import Signup from "./Signup";
import { withRouter } from "react-router";
import firebase from 'firebase/app'
import app from "../firebaseConfig";
import { Auth } from "../context/AuthContext";
import Errores from '../components/Errores'
import Footer from '../components/Footer'

const Login = ({ history }) => {
    const [email, setEmail] = useState("");
    const [clave, setPassword] = useState("");
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

    const { Content } = Layout;
    const [signup, setsignup] = useState(false);
    const { usuario } = useContext(Auth);
    const [error, seterror] = useState('')

    useEffect(() => {
        if (usuario) {
            history.push("/");
        }
    }, [history, usuario]);
    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "usuario") {
          setEmail(value);
        } else if (name === "clave") {
          setPassword(value);
        } 
      };
    const correoClave = async () => {

        await app
            .auth()
            .signInWithEmailAndPassword(email, clave)
            .then(result => {
                console.log(result);
                history.push("/");
            })
            .catch(error => {
                seterror(error.message)
            });
        
    };


    const socialLogin = async (provider)=>{
        await app
        .auth()
        .signInWithPopup(provider)
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            seterror(error.message)
        });
    }



    return (
        <Layout style={{ height: "100vh", backgroundImage: "URL(https://wallpaperaccess.com/full/752715.jpg)"          
    }}>
            <Content
                style={{
                    padding: "0 50px",
                    marginTop: 40,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <div
                    style={{
                        background: "#fff",
                        padding: 24,
                        height: 450,
                        width: 400,
                        textAlign: "center",
                        flexDirection: "column",
                        justifyContent: "center",
                        display: "flex"
                    }}
                >
                    {!signup ? (
                        <Form className="login-form" onFinish={correoClave}>
                            <Form.Item>
                                <h1>Ingreso</h1>
                            </Form.Item>
                            {error? <Form.Item><Errores mensaje={error}/></Form.Item>:null}
                            <Form.Item>
                                <Input
                                    prefix={
                                        <Icon
                                            type="user"
                                            style={{
                                                color: "rgba(0,0,0,.25)"
                                            }}
                                        />
                                    }
                                    name="usuario"
                                    placeholder="Usuario"
                                    value={email}
                                    onChange={event => onChangeHandler(event)}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    prefix={
                                        <Icon
                                            type="lock"
                                            style={{
                                                color: "rgba(0,0,0,.25)"
                                            }}
                                        />
                                    }
                                    name="clave"
                                    type="password"
                                    placeholder="Clave"
                                    value={clave}
                                    onChange={event => onChangeHandler(event)}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    style={{ marginRight: 10 }}
                                >
                                    Ingresa
                                </Button>
                                O{" "}
                                <Button
                                    onClick={() => setsignup(true)}
                                    type="link"
                                >
                                    Registrate Ahora!
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="danger"
                                    htmlType="button"
                                    className="login-form-button"
                                    style={{ marginRight: 10 }}
                                    onClick={() => socialLogin(googleAuthProvider)}
                                >
                                    Google
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="button"
                                    className="login-form-button"
                                    style={{ marginRight: 10 }}
                                    onClick={() => socialLogin(facebookAuthProvider)}
                                >
                                    Facebook
                                </Button>
                            </Form.Item>
                        </Form>
                    ) : (
                        <Signup setsignup={setsignup} />
                    )}
                </div>
            </Content>
            <Footer />
        </Layout>
    );
};
export default withRouter(Login);
