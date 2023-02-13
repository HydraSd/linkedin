import React from "react";
import styled from "styled-components";
import "../css/icons.css";
import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { connect } from "react-redux";
import { Timestamp } from 'firebase/firestore'
import { postArticleAPI } from "../actions";

function PostModel(props) {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  const SwitchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const postArticle = (e) => {
    e.preventDefault();
    if(e.target !== e.currentTarget){
      return;
    }
    // console.log(shareImage.name)
    const payload = {
      image : shareImage,
      video : videoLink,
      user: props.user,
      description : editorText,
      timestamp  : Timestamp.now(),
    };
    props.postArticle(payload);
  }

  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(e);
  };

  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Contain>
            <Header>
              <h2>Create a Post</h2>
              <button onClick={(event) => reset(event)}>
                <img
                  src="https://th.bing.com/th/id/R.f6883ee1ce2e0e3755a1892da2fe7e3c?rik=ozgkFfeviLMaDg&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_265949.png&ehk=gPghjaahwRbD4GGEcjuhCM8HJhQYy%2b2YzE5lGs5PvMo%3d&risl=&pid=ImgRaw&r=0"
                  alt=""
                  className="icon2"
                />
              </button>
            </Header>
            <ShareContent>
              <UserInfo>
                {props.user.photoURL ? ( <img src={props.user.photoURL}/>) : (<img src="/images/user.svg" alt="" />)}
                <span>{props.user.displayName}</span>
                
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />

                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file">Select an image to share</label>
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="Please input a video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                      {videoLink && (
                        <ReactPlayer with={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </ShareContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => SwitchAssetArea('image')}>
                  <img
                    src="https://th.bing.com/th/id/OIP.2ysWaZVQWKbuTngNt9YKoAHaGV?pid=ImgDet&rs=1"
                    alt=""
                    className="icon3"
                  />
                </AssetButton>
                <AssetButton onClick={() => SwitchAssetArea('media')}>
                  <img
                    src="https://th.bing.com/th/id/R.6b0e670236f0adcdec30deee36d715a8?rik=V8Yw20MATt9VOg&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fLcK%2f7EE%2fLcK7EE5gi.png&ehk=Pkrxn6yhXMlgXgzcpLjkhrb1xR4K8I2dJVe%2bMxrRmjI%3d&risl=&pid=ImgRaw&r=0"
                    alt=""
                    className="icon3"
                  />
                </AssetButton>
              </AttachAssets>

              <ShareComments>
                <AssetButton>
                  <img
                    src="https://th.bing.com/th/id/OIP.05ii4NbTas6Hhpo_eGxpeQHaGL?pid=ImgDet&rs=1"
                    alt=""
                    className="icon3"
                  />
                  Anyone
                </AssetButton>
              </ShareComments>

              <PostButton disabled={!editorText ? true : false} onClick={(event)=> postArticle(event)}>
                Post
              </PostButton>
            </ShareCreation>
          </Contain>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;

const Contain = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 9px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;
const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  line-height: 1.3;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    border: none;
    background: transparent;
    svg,
    img {
      pointer-events: none;
    }
  }
`;
const ShareContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 40px;
    height: 40px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;
const ShareComments = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    img {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  border: none;
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)" : "white")};
  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
  }
`;
const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }

  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const mapStateToProps = (state) => {
  return{
    user: state.userState.user,
  };
};

const mapDispatchProps = (dispatch) => ({
    postArticle : (payload) => dispatch(postArticleAPI(payload))
});

export default connect(mapStateToProps, mapDispatchProps)(PostModel);
