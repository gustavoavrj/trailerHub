import React, { useEffect, useContext ,useState} from "react";
import Header from "../components/Header";
import { Layout } from "antd";
import { Form, Input, Button, Upload } from "antd";
import { Auth } from "../context/AuthContext";
import { withRouter } from "react-router";
import Footer from '../components/Footer'
import app, {storage, firestore} from '../firebaseConfig'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { uuid } from 'uuidv4';
import VideoThumbnail from 'react-video-thumbnail';

const UploadV=({history}) =>{
    const { Content } = Layout;
    const { usuario } = useContext(Auth);
    const [nombre, setnombre] = useState(null)
    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");
    const [is_uploaded, setUploaded] = useState(true);
    const [titulo, setTitulo] = useState("");
    const [thumbnail, setTumbnail] = useState("");
    const [dthumbnail, setdTumbnail] = useState(null);
    const [thumbnailurl, setTumbnailurl] = useState("");
    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {
        
        if (usuario===null) {
            history.push("/login");
        }

        usuario?usuario.displayName?setnombre(usuario.displayName):setnombre(usuario.email):setnombre(null)
       
    }, [history, usuario]);
    function handleChange(e) {
        setFile(e.file.originFileObj);
      }

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "titulo") {
            setTitulo(value);
        } else if (name === "descripcion") {
            setDescripcion(value);
        } 
      };
    
     function onSubmit (e) {
         firestore.add({
             titulo,
             descripcion,
             url,
             thumbnail
         }).then(history.push('/'))
         
     }
     
     const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
      
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
      
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
      
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
      
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
      }


function thumbUpload () {
    let fileId = uuid()
    const fileRef = storage.ref('thumbs').child(fileId);
      const image = fileRef.put(dthumbnail, { customMetadata: { uploadedBy: "myName", fileName: "thumbs" } })

      image.on(
        'state_changed',
        (snap) => console.log("progress"),
        (err) => console.log("error"),
        () => {console.log("sucess"); storage
            .ref("thumbs")
            .child(fileId)
            .getDownloadURL()
            .then((url) => {
              setTumbnailurl(url);
            })}
      )

   
  }
  const basetoblob = (base64) => 
  fetch(base64).then(res => res.blob());

      
  


      const customUpload = async ({ onError, onSuccess, onProgress }) => {
        let fileId = uuid()
        const fileRef = storage.ref('demo').child(fileId)
        try {
          const image = fileRef.put(file, { customMetadata: { uploadedBy: "myName", fileName: file.name } })
    
          image.on(
            'state_changed',
            (snap) => onProgress({ percent: (snap.bytesTransferred / snap.totalBytes) * 100 }),
            (err) => onError(err),
            () => {onSuccess(null, image.metadata_); storage
                .ref("demo")
                .child(fileId)
                .getDownloadURL()
                .then((url) => {
                  setFile(null);
                  setURL(url);
                  setUploaded(false);
                })}
          )

        } catch (e) {
          onError(e)
        }
      }
      function renderThumb () {
          if (url != "" ){
              return <VideoThumbnail
              videoUrl={url}
              thumbnailHandler={(thumbnail) => setTumbnail(thumbnail)}
              width={300}
              height={200}
              />;
          }
      }
    
    
        return (
            <Layout style={{ height: "100vh",backgroundImage: "URL(https://wallpaperaccess.com/full/752715.jpg)"}}>
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
                        <Form className="login-form" onFinish={onSubmit}>

                            <Form.Item>
                                <h3>Titulo</h3>
                                <Input
                                    name="titulo"
                                    placeholder="Titulo"
                                    onChange={event => onChangeHandler(event)}
                                />
                            </Form.Item>
                            <Form.Item>
                                <h3>Descripcion</h3>
                                <Input
                                    name="descripcion"
                                    placeholder="Descripcion"
                                    onChange={event => onChangeHandler(event)}
                                />
                            </Form.Item>
                            <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={handleChange}
      >
        <Upload accept="video/*" name="logo" listType="picture" customRequest={customUpload} >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
                            <Form.Item>
                                <Button
                                    disabled={is_uploaded}
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                style={{ marginRight: 10 }}
                                >
                                Subir
                                </Button>
                            </Form.Item>
                            

                        </Form>
                        {renderThumb()}
                        
                    </div>
                   

                </Content>
                <Footer />
            </Layout>
        );
    
}
export default withRouter(UploadV);
