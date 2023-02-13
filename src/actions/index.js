import { auth, provider, storage, db } from "../firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionType";
import { collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { put } from 'redux-saga/effects'
import { doc, getDocs } from "firebase/firestore";

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const setLoading = (status) => ({
  type : SET_LOADING_STATUS,
  status: status,
});

export const  getArticle = (payload) => ({
  type : GET_ARTICLES,
  payload : payload,
});

export const signInAPI = () => {
  // setLoading(true)
  return (dispatch) => {
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, provider)
      .then((payload) => {
        dispatch(setUser(payload.user));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};


export const getUserAuth = () => {
  return (dispatch) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log(user)
        dispatch(setUser(user));
      }
    });
  };
};

export const SignOutAPI = () => {
  return (dispatch) => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => console.log(error.message));
  };
};

export const postArticleAPI = async (payload) => {
     put(setLoading(true));
    if (payload.image !== "") {
      const upload = ref(storage, `images/${payload.image.name}`);
      const uploadTask = uploadBytesResumable(upload, payload.image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(`Progress : ${progress}%`);
        },
        (error) => {
          alert(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            return downloadURL;
          });
         
          const docRef = await addDoc(collection(db, "article"), {
            actor : {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
  
            video: payload.video,
            sharedImg:downloadUrl,
            description : payload.description,
            comments: 0,
           
          });
       put(setLoading(false))
        }
      );
    } else if(payload.video){
      const docRef = await addDoc(collection(db, "article"), {
        actor : {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
  
        video: payload.video,
        sharedImg:"",
        description : payload.description,
        comments: 0,
      });
       put(setLoading(false))
    }
};

// export const getArticleAPI = () => {
//   return (dispatch) => {
//     let payload;
//     db.collection('article').orderBy('actor.date', 'desc')
//     .onSnapshot((snapshot)=> {
//       payload = snapshot.docs.map((doc) => doc.data())

//     })
//   }
// }

export const getArticleAPI = () => {
  return async (dispatch) => {
    let payload;
    var data = []
    const querySnapshot = await getDocs(collection(db, "article"));
    querySnapshot.forEach((doc) => {
      payload = doc.data()
      // console.log(`${doc.id} => ${doc.data()}`);
      data.push(payload)
     
      dispatch(getArticle(data))
    });
    // console.log(payload)
  }
}