import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContextProvider";
import { baseurl } from "./Baseurl";
import '../styles/Result.css';


export const Result = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const {userId} = useContext(AuthContext);

    const fetchResult = async () => {
        try {
            const res = await fetch(`${baseurl}/api/result/${userId}`);
            const data = await res.json();
            console.log(data, 'data from result');
            setResult(data);
        } catch(err) {
            setError(err);
            console.log("Error in result", err);
            setLoading(false);
        }
    };

    if(!loading) {
        return <div>Loading...</div>
    }
    if(error) {
        return <div className="error">{error}</div>
    }
    if(!result) {
        return <div>No result found</div>
    }
    
    return (
        <div className="result">
            <h2>yay! Quiz Completed</h2>
            <div className="score-card">
                <h3>Your Score : {result.score} </h3>
                <p>You answered : {result.correctedAnswers} out of {result.totalQuestions} questions correctly</p>
            </div>
        </div>
    );
};