## Backend Project Setup/Structure
```
- controllers // Routes function
- routes // Only Routes
- models
- utils // Others useful handler
- .env
- index.js


```

## 1. To use .env file in backend 
- Create ".env" file in backend folder <br>
- Install "dotenv" npm package in backend folder <br>
- Import "dotenv" in index.js file then make "dotenv.config()" in index.js file <br>
- Now you can use .env variables in index.js file<br>
`Note: Before using .env variables, test each variable using console.log() <br>`

## 2. WARNING: In Mongodb URI, dont use space
Avoid space in MONGO_URI variable.<br>

## 3. WARNING: Dont use semicolon at the end of the line in ".env" file.
Avoid coding syntax in ".env" file.<br>
Any thing written inside ".env" file will be the exact result<br>s

## 4. bcryptjs library
It is used to encrypt passwords.<br>
To Install:` npm install bcryptjs` <br>
To use `bcryptjs` library: `import bcryptjs from 'bcryptjs'` in auth file <br>
- Generate salt and hash password using `const salt = bcryptjs.genSaltSync(10);` and `const hash = bcryptjs.hashSync(req.body.password, salt);`<br>

<b>auth.js</b>
```
import UserModal from "../models/UserModal.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
    try {
        // Generate a salt (a random value used to make the hashed password unique)
        const salt = bcrypt.genSaltSync(10);
        // Hash the password using the salt and the password provided by the user
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = await UserModal.create({ ...req.body, password: hash }); // create a new user & hash the password
        res.status(200).send("New user has been created successfully");
    } catch (error) {
        next(error)
    }
}
```

- To verify password using bcrypt:
```
// Signin auth
export const signin = async (req, res, next) => {
    try {
        const user = await UserModal.findOne({ name: req.body.name });// Verify and return user details
        if (!user) return next(createError(404, "User not found"));

        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Wrong Credentials")); // Verify if the password is correct using bcrypt (bcrypt verify hashed password ) 

        const token = jwt.sign({ id: user._id }, process.env.JWT); // create a token
        const { password, ...others } = user._doc; // seperate password from the user

        res.cookie("access_token", token, { // send the token to the user, "access_token" is name of the cookie
            expires: new Date(Date.now() + 9000000000),
            httpOnly: true,
        }).status(200).json(others);

    } catch (error) {
        next(error);
    }
}
```

## 5. "jsonwebtoken" library (JWT)
`It is used to create and verify tokens.`<br>
To Install: `npm install jsonwebtoken` <br>
To use `jsonwebtoken` library: `import jwt from 'jsonwebtoken'` in auth file <br>
Now, create token using `const token = jsonwebtoken.sign({ _id: user._id }, "jwtPrivateKey");` and send it to the user.<br>
Create "jwtPrivateKey" in ".env" file manually.<br>
auth.js
```
import UserModal from "../models/UserModal.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js"
import jwt from "jsonwebtoken";

export const signin = async (req, res, next) => {
    try {
        const user = await UserModal.findOne({ name: req.body.name });
        if (!user) return next(createError(404, "User not found"));

        const isCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isCorrect) return next(createError(400, "Wrong Credentials"));

        const token = jwt.sign({ id: user._id }, process.env.JWT); // create a token

        res.cookie("access_token", token, { // send the token to the user
            httpOnly: true,
        }).status(200).json(user);
    } catch (error) {
        next(error);
    }
}
```
Note: Install "cookie parser" to use cookies in backend: `npm install cookie-parser`<br>
index.js
```
import cookieParser from 'cookie-parser';
// ...

app.use(cookieParser());
//...
```
- What is the purpose of JWT? <br>
It is used to securely transfer information over the web(between two parties). JWT is a mechanism for verifying the authenticity of some JSON data.

- Is JWT safe?
It's important to note that a `JWT guarantees data ownership but not encryption`. The reason is that the JWT can be seen by anyone who intercepts the token because it's serialized, not encrypted. It is strongly advised to use JWTs with HTTPS, a practice that extends to general web security

## 6. Specific error Handler
Create a saperate "error.js" file and create error handler<br>
error.js
```
export const createError = (status, message) => {
    const error = new Error();
    error.status = status;
    error.message = message;
    return error;
}
```
Now you can use this error handler anywhere in your project by importing from error.js<br>
Note: Error "port" and "message" is passed to createError function then this function will throw an error with given status and message <br>
Again error thrown by createError function is caught by error handler in index.js<br>
verifyToken.js
```
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated"));
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid"));
        req.user = user;
        next();
    });
};
```
index.js<br>
```
//...

// Error Handler (Middleware) to handle all the errors
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})
```

## 7.  { timestamps: true } property in modal
Note: You can use this property in modal to add automatically created and updated time.<br>
Example of UserModal:
```
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
      // user schema . . .
    },
    { timestamps: true }

);

export default mongoose.model("User", UserSchema)
```

## 8. To show recently updated data while using put method
Use { new: true } as third parameter in findByIdAndUpdate() method<br>
```
const updatedUser = await UserModal.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
```

## 9. To Prevent nestead Array of Objects:
JavaScript flat() method prevent nestead array of objects.<br>
Note: JS sort() method is used to sort in ascending order either string or number<br>
```
export const sub = async (req, res, next) => {
    try {
        const user = await UserModal.findById(req.user.id);
        const subscribedChannel = user.subscribedUsers; // this is an array of channel ids

        const list = await Promise.all( // Return after fulfilling all promises
            subscribedChannel.map((channelId) => {
                return VideoModal.find({ userId: channelId });
            })
        );
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (error) {
        next(error);
    }
}
```

## 10. To show random aggregate data form db
```
export const random = async (req, res, next) => {
    try {
        const videos = await VideoModal.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    } catch (error) {
        next(error);
    }
}
```

## 11. "$in" operator in mongoose
Note: The use of "$in" operator in mongoose/mongoDB, is to go inside the array.<br>
```
export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(',');
    try {
        const videos = await VideoModal.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json(videos);
    } catch (error) {
        next(error);
    }
}
```
The "$in" operator is used to check if the value of the "tags" field is in the array of tags. <br>

## 12. I spend "1 hour" to fix this error (import module error)
`Note: Don't forget to use suffix "js" in file extension while importing module from JS file`<br>

## 13. "$addToSet" operator in mongoose
Note: The use of "$addToSet" operator in mongoose/mongoDB, is to add an element in the array only if it doesn't exist. (no duplicates)<br>

## 14. Trim and Regex in search query:
<b>Note:Implementing Trim and Regex in search query will make search effective </b><br>
Trim is used to remove whitespace from start and end of the string. <br>
Regex is used to search for a string in a different way such as case-insensitive <br>
```
export const getByTag = async (req, res, next) => {
    try {
        // console.log(req.query.tags);
        const tags = req.query.tags.split(',');
        const trimmedTags = tags.map((tag) => tag.trim()); // Trim each item
        const searchRegex = trimmedTags.map((tag) => new RegExp(`\\b${tag}\\b`, "i")); //Add regex in each item
        const videos = await VideoModal.find(
            { tags: { $in: searchRegex } },
            {},
            { limit: 20 }
        );
        res.status(200).json(videos);
    } catch (error) {
        next(error);
    }
}
```
<b>Breaking Down</b>
```
const s = "  tag1,tag2,tag3 ";

const tags = s.split(',');
const trimmedTags = tags.map((tag) => tag.trim());
const searchRegex = trimmedTags.map((tag) => new RegExp(`\\b${tag}\\b`, "i"));

console.log(searchRegex)
```
- For each trimmed tag, a regular expression is created using new RegExp.
- \\b ensures word boundaries, so it matches whole words.
- "i" makes the regex case-insensitive.
- $in: Value is matched within an array
- {} This is used to return all fields.

