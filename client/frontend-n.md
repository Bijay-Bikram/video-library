## Frontend Structure:
```
src
    - assets
    - components
    - pages
    - redux
        - store.js
        - userSlice.js
        - videoSlice.js
        
    - utils
        - Theme.js

    - App.jsx
    - main.js
    - firebase.js
```
## 1. Styled-Components 
To Install: `npm install styled-components` <br>
Import and use: `import styled from 'styled-components'`<br>
We can use styled-components alike internal CSS but we assume elements as variable and then use them in the form of Tag.<br>
Similar to react components, styled variables name must be camelCase.<br>
app.jsx
```
import styled, { ThemeProvider } from 'styled-components'

const Container = styled.div` // Declare outside the function
 display: flex;
`
const App = () => {

    return (
        
        <Container> // This is "div" element
            //...
        </Container>
    )
}
```
- We use ThemeProvider from 'styled-components' to provide the theme easily by creating object module. <br>
Creating object module for theme. <br>
Theme.js
```
export const darkTheme = {
    bg: "#181818",
    bgLighter: "#202020",
    text: "#fff",
    textSoft: "#aaaaaa",
    soft: "#373737",
    highlighter: "#272727"
};

export const lightTheme = {
    bg: "#f9f9f9",
    bgLighter: "white",
    text: "#000",
    textSoft: "#606060",
    soft: "#f5f5f5",
    highlighter: "#F2F2F2"
}
```
Import "ThemeProvider" from styled-components <br>
Import "darkTheme, lightTheme" from Theme.js <br>
Now, wrap the return JSX of app.jsx file to provide Theme for all components and pages.<br>
App.jsx<br>
```
import styled, { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from './utils/Theme'

const App = () =>{
   const [DarkMode, setDarkMode] = useState(true)

  return (
    <ThemeProvider theme={DarkMode ? darkTheme : lightTheme}>
    // JSX Elements / Components or Routes
    <ThemeProvider>
    )
}
```
- WoW! We can also  pass "Props" in styled components and use based on condition for style <br>
```
import styled from 'styled-components'

const Container = styled.div`
width: ${({ type }) => type !== "sm" && "320px"};
overflow: hidden;
font-family: 'Roboto',sans-serif;  
display:${({ type }) => type === "sm" && "flex"};
margin-bottom:${({ type }) => type === "sm" ? "9px" : "30px"};
`
const Card = ({ type }) => {
return (
      <Container type={type}> // Passing "Props"
        //...
      </Container>
)
}
```

## 2. Material UI
React-js library for building user interfaces and also to access Material Icons.<br>

## 3. Tailwind-scrollbar-npm
This Tailwind scrollbar npm package provides the ability to customize the default scrollbar.<br> 

## 4. Tailwind CSS Styles based on conditionals with the help of useEffect & useRef hooks
Default scrollbar styles for dark mode & white mode <br>
Menu.jsx
```
 const ref = useRef(null);

    useEffect(() => {
        const currentRef = ref.current;
        if (DarkMode) {
            currentRef.classList.remove('scrollbar-thumb-gray-300', 'scrollbar-track-[#f1f1f1]')
            currentRef.classList.add('scrollbar-thumb-gray-500', 'scrollbar-track-[#202020]')
        }
        else {
            currentRef.classList.remove('scrollbar-thumb-gray-500', 'scrollbar-track-[#202020]')
            currentRef.classList.add('scrollbar-thumb-gray-300', 'scrollbar-track-[#f1f1f1]')
        }
    }, [DarkMode]);
```

## 5. Understand "flex" property of flex items:
Flex property is used in flex items to provide flexible size. <br>
Example: <br>
```
    .item1{
        flex: 3; // this is 30% of the screen
    }

    .item2{
        flex: 5; // this is 50% of the screen
    }
```

## 6. To apply Pseudo class to the element: `&:hover` using styled-components<br>
Use "& :" prefix and then use pseudo class name.<br>
```
&:hover{
    background-color: ${({ theme }) => theme.soft};
 }
```

## 7. "timeago.js" library for time ago
To Install: `npm install timeago.js` <br>
To use `timeago.js` library: `import {format} from 'timeago.js'`  <br>
Card.js
```
import { format } from 'timeago.js';

const Card = ({ type, video }) => {
//...

<Info type={type} >{video.views} views • {format(video.createdAt)}</Info>

//...
}
```

## 8. I spend more than "30 minutes" to fix this error (useState([null]))
Note: Never put "null" in useState hook it will return an error<br>
You know that useState hook never changes the value.<br>
Whenever you update the state, it will just return snapshot of the state but the its default value never changes.<br>

## 9. Object Properties will automatically created when you pass a variable inside  {}
```
const name = "Haris"
const email = "haris@example.com"

const user = {
    name,
    email
}

console.log(user)

// { name: 'Haris', email: 'haris@example.com' }  // OUTPUT
```

## 10. Redux toolkit
To Install: `npm install @reduxjs/toolkit react-redux` <br>
Create "redux" folder in "client" side and create "store" & "Slices" inside redux folder.<br>
```
    redux
     - store.js
     - userSlice.js
```
Now, Import "Provider" from "react-redux" 
 To use state globally wrap App component by Provider. <br>
Import store from redux folder and pass it to Provider as Props.<br>
main.js
```
/...
import { store } from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
```
- ### Redux actions
To use redux actions we need to `import "useDispatch" from "react-redux"` <br>
You need to declare useDispatch function then use it to dispatch actions.<br>
Also import "action" from redux "Slices"<br>

We can include many states inside Redux actions.<br>
`Redux actions are also used to store data in the state, using "action.payload" in state`<br>

We can create actions for specific purpose such as login and logout, fetchSuccess, fetchFailure etc. <br>

<b>SignIn.jsx</b>
```
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice'
import { useDispatch } from 'react-redux'

const SignIn = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch() 

    const handleLogin = async (e) => {
        e.preventDefault() // prevents the page from refreshing
        dispatch(loginStart())
        try {
            const res = await axios.post("http://localhost:3000/api/auth/signin", { name, password })
            dispatch(loginSuccess(res.data))
            console.log(res.data)
        } catch (error) {
            dispatch(loginFailure())
        }
    }

    return (
        <Container>
           /...
        </Container>
    )
}
```
- ### Redux state
To use state we need to `import "useSelector" from "react-redux"` <br>
You need to declare useSelector function then use it to get state.<br>
<b>Navbar.jsx</b>
```
//...
import { useSelector } from 'react-redux'

const Navbar = () => {

    const { currentUser } = useSelector((state) => state.user)

    return (
        <Container>
        // You can use currentUser properities here
           //...
        </Container>
    )
}
```

- ### JS Array Methods in Redux Toolkit
Note : We can also use JS array methods in redux toolkit but we can't in redux.<br>

<b>videoSlice.js</b>
```
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentVideo: "Somethings",
    loading: false,
    error: false
}

export const videoSlice = createSlice({
    name: 'video', // Name of slice
    initialState, 
    reducers: {
       //...,
        like:(state,action)=>{
            //If user id is not in likes array
            if(!state.currentVideo.likes.includes(action.payload)){
                state.currentVideo.likes.push(action.payload)
                state.currentVideo.dislikes.splice(state.currentVideo.dislikes.findIndex((userId)=>userId===action.payload),1)
            }
        },
        dislike:(state,action)=>{
            // If user id is not in dislikes array
            if(!state.currentVideo.dislikes.includes(action.payload)){
                state.currentVideo.dislikes.push(action.payload)
                state.currentVideo.likes.splice(state.currentVideo.likes.findIndex((userId)=>userId===action.payload),1)
            }
        },
    },
})

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } = videoSlice.actions
export default videoSlice.reducer
```

- ### Which one is better Redux or Redux Toolkit?
Redux is powerful, but setting it up and writing boilerplate code for actions and reducers can be time-consuming. Redux Toolkit is a set of utilities, including a standardized way to write reducers, create actions, and configure the Redux store.<br>


## 11. Redux-persist:
To install: `npm install redux-persist` <br>
"redux-persist" is another module of redux.<br>
It is used to persist Slices/State of redux store.<br>
<b>we used persist for signin in this app to persist user data/account although the page is reloaded or closed</b><br>

It basically store user data and other elements in local storage.<br>
Note: All user data store in Slices are visible in local storage, it may not be secure.<br>

After login, we also have cookie with the access token.<br>

We need to use various persist code from "redux-persist" in store.<br>
<b>store.js</b>
```
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import videoReducer from './videoSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import { PersistGate } from 'redux-persist/integration/react'


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    user: userReducer,
    video: videoReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,  // Note: persistedReducer is an object  
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store)
```
And you need wrap App component by PersistGate.<br>
Then pass loading and persistor props to PersistGate.<br>
main.jsx
```
import { persistor, store } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
//...
```

- ### How to remove data from redux persist?
To remove redux persist data use the following code : <br>
```
  persistor.pause();
        persistor.flush().then(() => {
            return persistor.purge();
        });
```

## 12. Google Authentication for Login
To Install : `npm install firebase` <br>
Then, initialise Firebase using the code provided by Firebase.<br>
Also import "getAuth" & "GoogleAuthProvider" from "firebase/auth" that allows us to use google authentication and authorization.<br>

Note: This firebase config is required while uploading files/data to firebase storage.<br>

<b>firebase.js</b>
```
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCLy0frnvZSUWhqYdfmsv20dtMh9AYqfwI",
    authDomain: "video-library-74bef.firebaseapp.com",
    projectId: "video-library-74bef",
    storageBucket: "video-library-74bef.appspot.com",
    messagingSenderId: "104807927194",
    appId: "1:104807927194:web:0266ef41fe586a1eea3e23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app;
```

Then, import "auth" and "provider" from "../firebase" in sigin page that allows us to use google authentication and authorization.<br>
Also import "signInWithPopup" from "firebase/auth" that allows google authentication popup.<br>
And use "auth" and "provider" as parameters in "signInWithPopup" function.<br>

<b>signin.jsx</b>
```
//...
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'

const SignIn = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    axios.defaults.withCredentials = true;

    const handleLogin = async (e) => {
        e.preventDefault() // prevents the page from refreshing
        dispatch(loginStart())
        try {
            const res = await axios.post("http://localhost:3000/api/auth/signin", { name, password })
            dispatch(loginSuccess(res.data))
            console.log(res.data)
        } catch (error) {
            dispatch(loginFailure())
        }
    }

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.error(error)
            });
    }

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <SubTitle>To continue to YouTube</SubTitle>
                <Input placeholder='username' name='name' onChange={(e) => setName(e.target.value)} />
                <Input type='password' name='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleLogin}>Sign In</Button>

                <Title>or</Title>
                <Button onClick={signInWithGoogle}>Sign In with Google</Button>
                <Title>or</Title>

                <Link to={'/signup'}>
                    Don't have an account?<Marker>Sign Up</Marker>
                </Link>
            </Wrapper>
            <OtherLinks />
        </Container>
    )
}
export default SignIn
```

## 13. My Great Mistake or Great Achievement.
Note: Always check "Network" from Browser DevTools.<br>
Either is it "No throting" or not.<br>
If you network is not "No Throting" then will get errors.<br>

Due to rendering incomplete data or slow network your data won't be loaded in browser so you need to use "Loader" to fix this issue.<br>

## 14. Don't believe on AutoComplete provided by Codeium/Github_Copilot

I waste my lot of time getting issue due to autocomplete provided by Codeium<br>

Code Snippet provided by Codeium is great but the variables would be wrong <br>

<b>`Ensure that the variables is correct before accepting autocomplete.`</b><br>

## 15. To upload files to Firebase Storage:
Ensure that the Firebase Storage rule must be read and write enabled.<br>
Note: This is only for testing purposes and not secure.<br>
```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```
Now, to upload files to Firebase Storage we need to use upload function code from firebase.<br>
Go to Doc - > Build - > Storage - > Web - > Upload Files - > Full Example<br>
Then customize the code to upload files to Firebase Storage.<br>

<b>Upload.jsx</b>
```
const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                if (urlType === 'imgUrl') {
                    setImgPerc(Math.round(progress))
                } else {
                    setVideoPerc(Math.round(progress))
                }
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.error(error)
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs(prev => {
                        return { ...prev, [urlType]: downloadURL }
                    })
                });
            }
        );
    }
```

## 16. Axios does not provide our data directly:
Axios is an object consist of various properties.<br>
We need to go through "data" property to get our data.<br>

Axios provides various properties like: <br>
 - config
 - headers
 - status
 - statusText
 - data
 - request

## 17. Always use function inside "useEffect" function while fetching data:
Note: You need to use "async" & "await" while fetching data so, function should be inside "useEffect" function.<br>

<b>Home.jsx</b>
```
 useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/videos/${type}`)
                const data = await res.data
                setVideos(data)
                // console.log("video", data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [type])
```

## 18. Best way to organize various input value in state:
Create a state object and pass it in "useState" hook.<br>
Ensure that all input data should be stored in "state" object.<br>

<b>EditProfile.jsx</b>
```
const EditProfile = () => {
   //other state & hooks...

    const [inputs, setInputs] = useState({});

 // other state & hooks...


  //other useEffect...

  //other handler...

    // Integrate all inputs to the inputs state as an object
    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    //other handler...

    // Function to upload files to Firebase Storage
    const uploadFile = (file, urlType) => {
        //Declaration...

        uploadTask.on('state_changed',
            (snapshot) => {
                //...
            }
            // Error handler function
            (error) => {
                console.error(error)
            },
            // function to get the download URL
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL)
                    setInputs(prev => {
                        return { ...prev, [urlType]: downloadURL }
                    })
                });
            }
        );
    }
    useEffect(() => { image && uploadFile(image, 'img') }, [image]);

    return (
        <Container>
            <Wrapper className='hero p-5 rounded-md'>
                {/* Image  Section*/}
                <div className='flex gap-3 flex-col items-center'>
                    {/* Img */}
                    <Img src={currentUser.img} />
                    {/* hidden input file */}
                    <input type="file" id='imgFile' name='imgFile' style={{ display: 'none' }} onChange={(e) => setImage(e.target.files[0])} accept='image/*' />
                    {/* label */}
                    <label htmlFor="imgFile" className='text-sm cursor-pointer flex items-center gap-1 bg-blue-900 hover:bg-blue-800 px-4 py-2 rounded-full'>
                        <EditIcon fontSize='small' /> Change
                    </label>
                </div>

                <Info>
                    {/* Username */}
                    <label className='text-xl mb-4 flex flex-col gap-2'>Username
                        <Input
                            placeholder="name"
                            name='name'
                            value={userName}
                            onChange={handleChange}
                        />
                    </label>

                    {/* Email */}
                    <label className='text-xl mb-4  flex flex-col gap-2'>Email
                        <Input
                            placeholder='email'
                            name='email'
                            value={email}
                            onChange={handleChange}
                        />
                    </label>

                    {/* Save and Cancel */}
                    <div className='flex gap-8 w-full justify-center mt-5'>
                        <Button onClick={handleSubmit}>Save</Button>
                        <Button onClick={handleReset}>Cancel</Button>
                    </div>

                </Info>

            </Wrapper>
        </Container>
    )
}

export default EditProfile
```


## 19. Best way to create Profile image:
Note: Don't use "object-fit" css property rather only use "height", "width" and "border-radius" properties.<br>
```
const Img = styled.img`
height: 50px;
width: 50px;
border-radius: 50%;
`
```

## 20.  Use "useEffect" with "if statement" to get effective result:
It helps to prevent unnecessary re-renders and void data<br>
```
// Change & insert new imgUrl in currentUser state
    useEffect(() => {
        const handleHistory = () => {
            if (imgUrl) {
                let changes = { ...userHistory }
                changes.img = imgUrl
                dispatch(loginSuccess(changes))
            }
        }
        handleHistory()
    }, [imgUrl])
```

## 21.  Nested Ternary Operator:
We can also use nested ternary operator for multiple conditions.<br>
```
{/* Video */}
<div className='flex flex-col gap-1'>
    {vidUpload && videoPerc < 100 ? "Uploading: " + videoPerc + "%" : (videoPerc === 100 ? "Video Uploaded" : "")}
    <Label htmlFor="video">Video :
        <Input
            id='video'
            type="file"
            accept='video/.mp4,.x-m4v,.mkv'
            onChange={handleVidUpload}
        />
    </Label>
</div>
```

## 22.  Max and Min width or height plays vital role in responsiveness:
After spending an hours, i understand the way of making responsive element using max height (video-library/Video.jsx/video element/).<br>

When only max-width is given, the default width will be fit to its content (video-library/EditProfile.jsx)

## 23. Flex or Grid layout doesn't work for mapping contents:
If we want to apply Flex or Grid layout then we nedd wrap the mapped contents by another element.<br>
```
  <Container>
        {/* Wrapping the mapped contents */}
        <CardContainer>
            {videos.map((video) => (
                <Card key={video._id} video={video} />
            ))}
    </CardContainer>
  </Container>
```

## 24. Automatic responsive grid layout:
This CSS grid property will automatically adjusts the number of columns based on the screen width.<br>
```
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
```
Tailwind Class:<br>
```
grid-cols-[repeat(auto-fill,minmax(200px,1fr))]
```

