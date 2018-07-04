import React, { PureComponent } from 'react';
import bip39 from 'bip39';
import { Row, Col, Input, Button, Layout } from 'antd';
import { deriveBitcoin }  from '../../services/derive/bitcoin';
import { deriveLitecoin }  from '../../services/derive/litecoin';
import { deriveStellar }  from '../../services/derive/stellar';
import { deriveNeocoin }  from '../../services/derive/neocoin';
import { deriveEthereum }  from '../../services/derive/ethcoin';
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
        let ethInfo = deriveEthereum(mnemonic);

        this.generateCoinSeed(0, neoInfo);
        this.generateCoinSeed(1, stellarInfo);
        this.generateCoinSeed(2, bitcoinInfo);
        this.generateCoinSeed(3, ethInfo);
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
          let ethInfo = deriveEthereum(mnemonic);

          this.generateCoinSeed(0, neoInfo);
          this.generateCoinSeed(1, stellarInfo);
          this.generateCoinSeed(2, bitcoinInfo);
          this.generateCoinSeed(3, ethInfo);
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
            <img alt="true" src={logo} className="logo"/>
            <span>Mnemonic Tool</span>
          </Header>
          <Layout>
            <Content className="main">
              <Row className="mnemonic_title_area">
                <Col span={24} className="mnemonic_title">
                  <h3>Paste or Generate your mnemonic to derive wallets</h3>
                </Col>
              </Row>
              <Row className="mnemonic_gen_area">
                <Input.TextArea className={this.state.isValid === 'valid' ? 'mnemonic_words valid' : this.state.isValid === 'invalid' ? 'mnemonic_words invalid' : 'mnemonic_words' } value={this.state.mnemonic} onChange={this.updatedMnemonic} />
                <Button className="mnemonic_gen_btn" onClick={this.genMenemonic} >Generate</Button>
              </Row>
              <Row>
                <div className="table_container">
                  <table>
                    <thead>
                      <td>Token</td>
                      <td>Address</td>
                      <td>Private Key</td>
                      <td>Extended Public</td>
                    </thead>
                    <tbody>
                      {
                        this.state.tokenList.map((token, index) => {
                          return (<tr key={index}>
                            <td>{token.name}</td>
                            <td><Input readOnly="true" value={token.address}/></td>
                            <td><Input readOnly="true" value={token.privateKey}/></td>
                            <td><Input readOnly="true" value={token.publicKey}/></td>
                          </tr>)
                        })
                      }
                    </tbody>
                  </table>
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
