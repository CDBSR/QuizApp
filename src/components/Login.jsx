import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContextProvider";
import axios from 'axios'
import { baseurl } from "./Baseurl";
import '../styles/Login.css';


export const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setpassword] = useState('');
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(null);
    const {login, id} = useContext(AuthContext);

    const handleLogin = async(e) => {
        e.preventDefault();
        console.log("clicke");
        try{
            const response = await axios({
                method: 'POST',
                url: `${baseurl}/login`,
                data: {
                    username, password
                }
            });

            console.log(response);
            if(response.data.success) {
                console.log(response.data.token, 'token');
                setUserId(response.data.userId);
               console.log('userId', response.data.userId);
                login(response.data.token, userId);
            }
        } catch(error){
            console.log("Error in login", error);
            setError(error);
        }
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Enter your Username"  value={username} onChange={(e) => setUserName(e.target.value)}/>
                <input type="password" placeholder="Enter your password"  value={password} onChange={(e) => setpassword(e.target.value)}/>
                <input type="submit" value='Login' className="btn" />
            </form>
            {error && <p style={{color:'red'}}></p>}
        </div>
    )
}