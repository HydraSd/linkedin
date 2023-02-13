import React from "react";
import styled from "styled-components";
import "../css/icons.css";
import PostModel from "./PostModel";
import { useState, useEffect } from "react";
import { getArticleAPI } from "../actions";
import { connect } from "react-redux";
import ReactPlayer from "react-player/youtube";

function Main(props) {
  const [showModal, setShowModal] = useState("close");
  console.log(props.articles)
  useEffect(() => {
    props.getArticles();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };
  return (
    <>
   
        <Container>
          <ShareBox>
            <div>
              {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} />
              ) : (
                <img src="images/user.svg" alt="" />
              )}
              <button
                onClick={handleClick}
                disabled={props.loading ? true : false}
              >
                Start a post
              </button>
            </div>
            <div>
          
              <button>
                <img
                  src="https://th.bing.com/th/id/OIP.eURN6FEaba3_pAguBjhvsgHaHa?pid=ImgDet&rs=1"
                  alt=""
                  className="icon"
                />
                <span>Photo</span>
              </button>
               
              <button>
                <img
                  src="https://th.bing.com/th/id/R.40c7bcc8fcfef009b0f98252737190b4?rik=3iwX%2bdInbsbLgQ&riu=http%3a%2f%2ficons.iconarchive.com%2ficons%2fwebalys%2fkameleon.pics%2f512%2fVideo-Camera-2-icon.png&ehk=3jvQv8%2bdjXbbLH6KXCnHdEO2QriYorvz4x%2fWZ9Mz2lM%3d&risl=&pid=ImgRaw&r=0"
                  alt=""
                  className="icon"
                />
                <span>Video</span>
              </button>

              <button>
                <img
                  src="https://th.bing.com/th/id/OIP.8OyjwEeRV2l1if8ueKl1qAHaHa?pid=ImgDet&rs=1"
                  alt=""
                  className="icon"
                />
                <span>Event</span>
              </button>

              <button>
                <img
                  src="https://th.bing.com/th/id/R.e4bfae5f8cb2ffbca64e0f542db6b5a7?rik=iBgZR9TylzEZLg&pid=ImgRaw&r=0"
                  alt=""
                  className="icon"
                />
                <span>Write article</span>
              </button>
            </div>
          </ShareBox>
          {props.articles.length === 0 ? (<p>There are no articles</p>) : (
          <Content>
            {props.loading && <img src="images/spinner.svg" />}
            
              {props.articles.length > 0 && 
              props.articles.map((article, key) =>( 
            <Article key={key}>
              <SharedActor>
                <a>
                 <img src={article.actor.image} alt="" />
                  <div>
                    <span>{article.actor.title}</span>
                    <span>{article.actor.description}</span>
                    <span>{Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(article.date)}</span>
                   
                  </div>
                </a>
                <button>
                  <img
                    src="https://th.bing.com/th/id/OIP.G7RB894AORmEkLZk3jcrDwHaHa?pid=ImgDet&rs=1"
                    alt=""
                    className="icon"
                  />
                </button>
              </SharedActor>
              <Description>{article.description}</Description>
              <SharedImage>
                <a>
                  {
                    !article.sharedImg && article.video ? <ReactPlayer with={"100%"} url={article.video}/>
                    :
                    (article.sharedImg && <img src={article.sharedImg}/>)
                  }
                </a>
              </SharedImage>
              <SocialCount>
                <li>
                  <button>
                    <img
                      src="https://th.bing.com/th/id/R.a41a3f8055380dfe10d4381f4b2d09ce?rik=4CTx%2bFoD5Vy2BA&riu=http%3a%2f%2fpngimg.com%2fuploads%2flike%2flike_PNG14.png&ehk=fPeQl9%2bdZdxSyZKchT7C9MpsHg2Ae%2b624bucHKjdeRE%3d&risl=&pid=ImgRaw&r=0"
                      alt=""
                      className="icon"
                    />
                    <img
                      src="https://th.bing.com/th/id/R.0f2ded5c6252d8a70e95e802f2b1234d?rik=ra7zG%2f0%2bWMAoIA&pid=ImgRaw&r=0"
                      alt=""
                      className="icon"
                    />
                    <span>75</span>
                  </button>
                </li>
                <li>
                  <a>{article.comments} comments</a>
                </li>
              </SocialCount>
              <SocaialActions>
                <button>
                  <img
                    src="https://th.bing.com/th/id/OIP.1VHf8Af4mDTLK70EDvVF6QHaHa?pid=ImgDet&rs=1"
                    alt=""
                    className="icon"
                  />
                  <span>Like</span>
                </button>
                <button>
                  <img
                    src="https://th.bing.com/th/id/R.ef4cd3e27163bbac0cbf5bf0059b8b7a?rik=xpa7eiyJ%2f%2fzQPg&riu=http%3a%2f%2ficons.iconarchive.com%2ficons%2fcustom-icon-design%2fflatastic-9%2f512%2fComment-icon.png&ehk=%2fcX8Y1AfPJwtqcrdkWNexgk2X15%2bB%2fG%2bYpfLM%2frjheM%3d&risl=&pid=ImgRaw&r=0"
                    alt=""
                    className="icon"
                  />
                  <span>Comment</span>
                </button>
                <button>
                  <img
                    src="https://th.bing.com/th/id/OIP.OFqw_vtMgv3OnOcH5Q9aEwHaHa?pid=ImgDet&rs=1"
                    alt=""
                    className="icon"
                  />
                  <span>Share</span>
                </button>
                <button>
                  <img
                    src="https://th.bing.com/th/id/OIP.meuMAYN-OTJ-clsTOPa8xQHaHa?pid=ImgDet&rs=1"
                    alt=""
                    className="icon"
                  />
                  <span>Send</span>
                </button>
              </SocaialActions>
            </Article>
              ))}
          </Content>
          )}
          <PostModel showModal={showModal} handleClick={handleClick} />
        </Container>
      
    </>
  );
}

const Container = styled.div`
  grid-area: main;
`;
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgba(0 0 0 / 15%), 0 0 0 rgba(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 40px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 40px;
        border-radius: 50%;
      }
      button {
        margin: 4px 0 0 14px;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;

  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: grey;
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;
const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  text-align: left;
`;
const SharedImage = styled.div`
  overflow: hidden;
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;

  img {
    object-fit: contain;
    width: 100%;
  }
`;

const SocialCount = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      background: transparent;
      border: none;
      display: flex;
    }
  }
`;
const SocaialActions = styled.div`
  overflow: hidden;
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    border: none;
    background: transparent;
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;
const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const mapStateToProps = (state) => {
  return {
    loading: state.articalState.loading,
    user: state.userState.user,
    articles: state.articalState.articles,
  };
};

const mapDispatchProps = (dispatch) => ({
  getArticles: () => dispatch(getArticleAPI()),
});

export default connect(mapStateToProps, mapDispatchProps)(Main);
