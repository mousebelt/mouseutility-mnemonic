import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import bip39 from 'bip39';
import { Icon, Row, Col, Input, Button, Layout, Pagination } from 'antd';
import { connectSubmission, submissionActionCreators } from 'core';
import { promisify } from '../../utilities';
import ListItem from '../../components/ListItem/ListItem';
import logo from 'assets/img/logo.png';

const { Content, Header } = Layout;

class DashboardContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mnemonic: '',
      isValid: 'infinite',
      tokenList: [
        {name: 'Neo', address: '', privateKey: ''},
        {name: 'Stellar', address: '', privateKey: ''},
        {name: 'Btc', address: '', privateKey: ''},
        {name: 'Eth', address: '', privateKey: ''},
        {name: 'Ltc', address: '', privateKey: ''},
      ]
    }
  }

  genMenemonic = () => {
    var mnemonic = bip39.generateMnemonic();
    this.setState(...this.state, {mnemonic: mnemonic}, () => {
      if (bip39.validateMnemonic(mnemonic)) {
        this.setState(...this.state, {isValid: 'valid'});
      } else {
        this.setState(...this.state, {isValid: 'invalid'});
      }
    });
  }

  updatedMnemonic = (evt) => {
    let mnemonic = evt.target.value;
    this.setState({
      mnemonic: evt.target.value
    }, () => {
      if (mnemonic === '') {
        this.setState(...this.state, {isValid: 'infinite'});
      } else {
        if (bip39.validateMnemonic(mnemonic)) {
          this.setState(...this.state, {isValid: 'valid'});
        } else {
          this.setState(...this.state, {isValid: 'invalid'});
        }
      }
    });
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
                <Col span={24} className="mnemonic_title">
                  <span>Paste or Generate your mnemonic to derive wallets</span>
                </Col>
              </Row>
              <Row className="mnemonic_gen_area">
                <Col span={12} offset={2}>
                  <div className={this.state.isValid === 'valid' ? 'mnemonic_words valid' : this.state.isValid === 'invalid' ? 'mnemonic_words invalid' : 'mnemonic_words' }>
                    <Input.TextArea value={this.state.mnemonic} onChange={this.updatedMnemonic} />
                  </div>
                </Col>
                <Col span={6} offset={2}>
                  <Button className="mnemonic_gen_btn" onClick={this.genMenemonic} >Generate</Button>
                </Col>
              </Row>
              <Row>
                <div className="token_list_area">
                  <Row className="token_list_header">
                    <Col span={8}><span>Token</span></Col>
                    <Col span={8}><span>Address</span></Col>
                    <Col span={8}><span>Private Key</span></Col>
                  </Row>
                  <div className="token_list">
                    {
                      this.state.tokenList.map((token, index) => {
                        return (<Row key={index} className="token_list_header token_list_item">
                          <Col span={8}><span>{token.name}</span></Col>
                          <Col span={8}><span>{token.address}</span></Col>
                          <Col span={8}><span>{token.privateKey}</span></Col>
                        </Row>)
                      })
                    }
                  </div>
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