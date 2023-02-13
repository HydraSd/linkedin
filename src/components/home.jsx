import React from 'react'
import styled from 'styled-components'
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import Main from './Main';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

function Home(props) {
  return (
    <Container>
      {!props.user && <Navigate to="/" />}
    <Section>
      <h5>
        <a>Hiring in hurry ?</a>
        </h5>
        <p>Find talanted pros in time with Upwork and keep th business moving</p>
      </Section>
      <Layout>
        <LeftSide />
        <Main />
        <RightSide />
      </Layout>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 102px;
  padding-bottom: 100px;
  @media (max-width: 768px) {
    padding-top:52px;
  }
`;
const Section = styled.section`
  min-height: 50px;
  padding: 16px;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color:#0c66c2;
    font-size: 16px;
    a {
      font-weight: 700;
    }
  }
  p {
    font-size: 14px;
    color: #434649;


  }
  @media (max-width:768px) {
    flex-direction: column;
    padding: 0 5px;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 20%) minmax(0,50%) minmax(30%, 7px);
  column-gap: 25px;
  row-gap: 25px;
  grid-template-rows: auto;
  margin: 25px 0;
  @media (max-width: 768px) {
    display : flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

const mapStateToProps = (state) => {
    return {
      user : state.userState.user
    }
}

export default connect(mapStateToProps)(Home);