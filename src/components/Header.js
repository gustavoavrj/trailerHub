import React from "react";
import { PageHeader, Button, Menu } from "antd";
import app from '../firebaseConfig'
import { SettingOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
function handleClick(e) {
    console.log('click', e);
  }
export default function Header({titulo,subtitulo, username}) {
    return (
        <PageHeader
            style={{
                border: "1px solid rgb(235, 237, 240)"
            }}
            title={titulo}
            subTitle={subtitulo}
            extra={[
                <Menu onClick={handleClick} style={{ width: 256 }} mode="horizontal">
    <SubMenu key="sub1" icon={<SettingOutlined />} title={username}>
      <Menu.ItemGroup title="Account">
        <Menu.Item key="1"><Link to="/upload">Subir Video</Link></Menu.Item>
        <Menu.Item key="2">Mis Videos</Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup title="Settings">
      <Menu.Item key="1"><Button onClick={() => app.auth().signOut()} key="logout" type="primary">Cerrar Sesión</Button></Menu.Item>
      </Menu.ItemGroup>

    </SubMenu>
  </Menu>,                
              ]}
        />
    );
}
