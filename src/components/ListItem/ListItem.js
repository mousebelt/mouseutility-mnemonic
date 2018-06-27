import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { Icon, Row, Col, Button, Input, Layout } from 'antd';
import { promisify } from '../../utilities';

import DropdownSelect from '../DropdownSelect/DropdownSelect';

const { Content, Header } = Layout;

class ListItem extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Layout className="item">
          <Header className="item_header">
          </Header>
          <Layout>
            <Content className="main">
              
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default ListItem;