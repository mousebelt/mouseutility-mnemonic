import React, { PureComponent } from 'react'; 
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { Icon, Row, Col, Input, Button, Layout, Pagination } from 'antd';
import { connectSubmission, submissionActionCreators } from 'core';
import { promisify } from '../../utilities';
import ListItem from '../../components/ListItem/ListItem';
import logo from 'assets/img/logo.png';

const { Content, Header } = Layout;

class DashboardContainer extends PureComponent {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="block dashboard">
        <Layout>
          <Header className="header">
            <Row>
              <Col span={2}>
                <img alt="true" src={logo} className="logo"/>                                                                                                                                     
              </Col>
              <Col span={17} className="title">
                <span>Mnemonic Tools</span>
              </Col>
              <Col span={5} className="title">
                <span>No Rest Labs</span>
              </Col>
            </Row>
          </Header>
          <Layout>
            <Content className="main">
              <Row className="mnemonic_title_area">
                <Col span={14} offset={5} className="mnemonic_title">
                  <span>Paste or Generate your mnemonic to derive wallets</span>
                </Col>
              </Row>
              <Row className="mnemonic_gen_area">
                <Col span={12} offset={2}>
                  <div className="mnemonic_words">
                    <span></span>
                  </div>
                </Col>
                <Col span={6} offset={2}>
                  <Button className="mnemonic_gen_btn">Generate</Button>
                </Col>
              </Row>
              <Row>
                <div className="token_list_area">
                  <Row className="token_list_header">
                    <Col span={8}><span>Token</span></Col>
                    <Col span={8}><span>Address</span></Col>
                    <Col span={8}><span>Private Key</span></Col>
                  </Row>
                  <Row>

                  </Row>
                </div>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }  
}

const mapStateToProps = ({submission}) => ({
  list: submission.list
});

const mapDisptachToProps = (dispatch) => {
  const {
    getSubmissionList
  } = submissionActionCreators

  return bindActionCreators({
    getSubmissionList
  }, dispatch);
}

export default compose(
  connectSubmission(mapStateToProps, mapDisptachToProps),
)(DashboardContainer);