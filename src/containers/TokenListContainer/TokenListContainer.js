import React, { PureComponent } from 'react';
import bip39 from 'bip39';
import { Icon, Row, Col, Input, Button, Layout, Pagination } from 'antd';
import ListItem from '../../components/ListItem/ListItem';
import { deriveBitcoin }  from '../../services/derive/bitcoin';
import { deriveLitecoin }  from '../../services/derive/litecoin';
import { deriveStellar }  from '../../services/derive/stellar';
import { deriveNeocoin }  from '../../services/derive/neocoin';
import logo from 'assets/img/logo.png';

const { Content, Header } = Layout;

class TokenListContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mnemonic: '',
      isValid: 'infinite',
      tokenList: [
        {name: 'Neo', address: '', publicKey: '', privateKey: ''},
        {name: 'Stellar', address: '',publicKey: '', privateKey: ''},
        {name: 'Btc', address: '', publicKey: '', privateKey: ''},
        {name: 'Eth', address: '', publicKey: '', privateKey: ''},
        {name: 'Ltc', address: '', publicKey: '', privateKey: ''},
      ]
    }
  }

  genMenemonic = () => {
    var mnemonic = bip39.generateMnemonic();
    this.setState(...this.state, {mnemonic: mnemonic}, () => {
      if (bip39.validateMnemonic(mnemonic)) {
        this.setState(...this.state, {isValid: 'valid'});
        let bitcoinInfo = deriveBitcoin(mnemonic);
        let litecoinInfo = deriveLitecoin(mnemonic);
        let stellarInfo = deriveStellar(mnemonic);
        let neoInfo = deriveNeocoin(mnemonic);

        this.generateCoinSeed(0, neoInfo);
        this.generateCoinSeed(1, stellarInfo);
        this.generateCoinSeed(2, bitcoinInfo);
        this.generateCoinSeed(4, litecoinInfo);
        
      } else {
        this.setState(...this.state, {isValid: 'invalid'});
      }
    });
  }

  generateCoinSeed(index, data) {
    let tokenList = this.state.tokenList;
    tokenList[index].address = data.address;
    tokenList[index].publicKey = data.publicKey;
    tokenList[index].privateKey = data.privateKey;
    this.setState({tokenList});
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
          let bitcoinInfo = deriveBitcoin(mnemonic);
          let litecoinInfo = deriveLitecoin(mnemonic);
          let stellarInfo = deriveStellar(mnemonic);
          let neoInfo = deriveNeocoin(mnemonic);

          this.generateCoinSeed(0, neoInfo);
          this.generateCoinSeed(1, stellarInfo);
          this.generateCoinSeed(2, bitcoinInfo);
          this.generateCoinSeed(4, litecoinInfo);
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
                  <Input.TextArea className={this.state.isValid === 'valid' ? 'mnemonic_words valid' : this.state.isValid === 'invalid' ? 'mnemonic_words invalid' : 'mnemonic_words' } value={this.state.mnemonic} onChange={this.updatedMnemonic} />
                </Col>
                <Col span={6} offset={2}>
                  <Button className="mnemonic_gen_btn" onClick={this.genMenemonic} >Generate</Button>
                </Col>
              </Row>
              <Row>
                <div className="token_list_area">
                  <Row className="token_list_header">
                    <Col span={6}><span>Token</span></Col>
                    <Col span={6}><span>Address</span></Col>
                    <Col span={6}><span>Private Key</span></Col>
                    <Col span={6}><span>Extended Public</span></Col>
                  </Row>
                  <div className="token_list">
                    {
                      this.state.tokenList.map((token, index) => {
                        return (<Row key={index} className="token_list_header token_list_item">
                          <Col span={6}><span>{token.name}</span></Col>
                          <Col span={6}><Input readOnly="true" value={token.address}/></Col>
                          <Col span={6}><Input readOnly="true" value={token.privateKey}/></Col>
                          <Col span={6}><Input readOnly="true" value={token.publicKey}/></Col>
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

export default TokenListContainer;