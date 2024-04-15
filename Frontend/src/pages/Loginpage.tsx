import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { Typography } from 'antd';
import Auth from '../components/Auth'

const { Title } = Typography;


function Loginpage() {

        

  return (
    <Layout style={{ height: '100vh' }}>
        <Content style={{ display: "flex", height: '100%' }}>
            <div style={{ position: 'relative', width: "75%", height: '100%', backgroundImage: "url('https://i0.wp.com/thescriptblog.com/wp-content/uploads/2020/10/tumblr_inline_nrvrnfIALM1rk1lvi_1280.jpg?fit=1172%2C682&quality=95&strip=all&ssl=1')", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent:'center',display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div>
                        <Title style={{color:"white", fontSize:100, justifyContent:"center", display:'flex',alignItems:'center'}}> 
                        STARLIGHT CINEMA
                        </Title>
                        <Title level={3} style={{color:'white', textAlign: 'center'}}>Where Movie Magic Comes to Life</Title>
                        <Title level={5} style={{color:'white', textAlign: 'center',paddingLeft:50,paddingRight:50}}>Step into the enchanting world of Starlight Cinema, 
                        where every visit promises an unforgettable cinematic experience. With state-of-the-art technology and plush seating, 
                        immerse yourself in the latest blockbusters, timeless classics, and captivating indie films. 
                        Join us under the starlit ceiling for an evening filled with wonder, excitement, and cinematic magic. 
                        Welcome to Starlight Cinema, where dreams flicker to life on the silver screen</Title>

                    </div>
                </div>                
            </div>
            <div style={{ width: "25%",  }}>
                <Auth/>
            </div>
        </Content>
    </Layout>
  )
}

export default Loginpage
