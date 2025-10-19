import {createContext} from 'react';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HttpStatusCode } from 'axios';


export const AuthContext= createContext({});

const client= axios.create({
    baseURL:"http://localhost:8000/api/v1/users"
})

export const AuthProvider= ({children})=> {
    const authContext = useContext(AuthContext);

    const [userData, setUserData] = useState(authContext);

    const handleRegister = async(name, username, password)=>{
        try{
            let request = await client.post("/register", {
                name:name,
                username:username,
                password:password
            })

            if(request.status === HttpStatusCode.CREATED){
                return request.data.message;
            }
        }catch(err){
            throw err;
        }
    }

    



//     const handleLogin = async (username, password) => {
//     try {
//         const request = await client.post("/login", {
//             username,
//             password
//         });

//         console.log("Login Response:", request);

//         // Save token only if login is successful
//         if (request.status === HttpStatusCode.OK) {
//             localStorage.setItem("token", request.data.token);
//         }

//         // Return the request so Authentication.jsx can use it
//         return request;

//     } catch (err) {
//         // Optional: handle errors here or throw to caller
//         console.error("Login failed:", err);
//         throw err;
//     }
// };

 const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password
            });

            console.log(username, password)
            console.log(request.data)

            if (request.status === HttpStatusCode.OK) {
                localStorage.setItem("token", request.data.token);
                router("/home");
                return {message:"Login Successful" , data: request.data};
            }

             return { message: "Login failed", data: null };
        } catch (err) {
             console.error("Login error:", err);
            throw err;
        }
    }


    const router =useNavigate();

    const getHistoryOfUser = async () => {
        try {
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data
        } catch
         (err) {
            throw err;
        }
    }

    const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request
        } catch (e) {
            throw e;
        }
    }

    const data={
        userData, setUserData,handleRegister,handleLogin,getHistoryOfUser,addToUserHistory
    }


    

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}


