import React, { Fragment } from 'react';
import 'antd/dist/antd.css';
import './../assets/css/index.css'
import { Layout } from 'antd';

class FullResultPage extends React.Component {
    render() {
        const { Header, Content, Footer } = Layout;
        return (
            <Fragment>
                <Layout className="layout">
                    <Header>
                    <span className="app-logo">Book Store</span>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Created by Ahmad Shoaib © 2019</Footer>
                </Layout>
            </Fragment>
        )
    }
}

export default FullResultPage;