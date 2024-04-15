// import React from 'react';
// import { Layout, Menu, theme } from 'antd';
// import { Link } from 'react-router-dom';
// import type { SearchProps } from 'antd/es/input/Search';
// import { Input, } from 'antd';


// const { Header, Content, Footer } = Layout;
// const { Search } = Input;
// const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

// interface NavItem {
//   key: string;
//   label: string;
//   path: string;
// }

// export const Home: React.FC = () => {
//   const items: NavItem[] = [
//     { key: '1', label: 'sign in', path: '/home' },
//     { key: '2', label: 'Sign up', path: '/about' },
//   ];

//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <Layout>
//       <Header style={{ display: 'flex', alignItems: 'center'  }}>
//         <div className="demo-logo" />
//         <Menu
//           theme="dark"
//           mode="horizontal"
//           defaultSelectedKeys={['1']}
//           style={{ flex: 1, minWidth: 0,  justifyContent:'flex-end'}}
//         >
//         <div style={{ flex: 1, display: 'flex', justifyContent: 'center', paddingTop:16}}>
//           <Search placeholder="input search text" onSearch={onSearch} style={{ width: 500 }} />
//         </div>
//           {items.map((item: NavItem) => (
//             <Menu.Item key={item.key}>
//               <Link to={item.path}>{item.label}</Link>
//             </Menu.Item>
//           ))}
          
//         </Menu>
//       </Header>
//       <Content style={{ padding: '0 48px' }}>
//         <div
//           style={{
//             background: colorBgContainer,
//             minHeight: 280,
//             padding: 24,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           Content
//         </div>
//       </Content>
//       <Footer style={{ textAlign: 'center' }}>
//         Ant Design ©{new Date().getFullYear()} Created by Ant UED
//       </Footer>
//     </Layout>
//   );
// };


import React from 'react';
import { Layout, theme } from 'antd';
import { HeaderComponent } from '../components/Header';
import Carousel from '../components/Carousel'
import { Typography } from 'antd';
import Card from '../components/CardData';


const { Content, Footer } = Layout;

const { Title } = Typography;

export const Home: React.FC = () => {


  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <HeaderComponent/>
      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            minHeight: 280,
            paddingTop:0,
            paddingBottom: 0,
            borderRadius: borderRadiusLG,
          }}
        >
          <Carousel/>
        </div >
        <div style={{
            minHeight: 280,
            paddingTop:24,
            
            borderRadius: borderRadiusLG,
          }}>
                 <Title level={4} style={{margin:0,}}>Latest Movies</Title>
                 <Card/>
        </div>
        <div>
            
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
