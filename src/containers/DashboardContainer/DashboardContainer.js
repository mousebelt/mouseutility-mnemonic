import React, { PureComponent } from 'react'; 
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { Icon, Row, Col, Input, Layout, Pagination } from 'antd';
import { connectSubmission, submissionActionCreators } from 'core';
import { promisify } from '../../utilities';
import ListItem from '../../components/ListItem/ListItem';

const { Content, Header, Footer } = Layout;

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
              <Col span={6} offset={1}>
              </Col>
              <Col span={5} offset={12}>
              </Col>
            </Row>
          </Header>
          <Layout>
            <Content className="main">
              <div className="dashboard_list">
              </div>
            </Content>
          </Layout>
          <Footer className="footer">
          </Footer>
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