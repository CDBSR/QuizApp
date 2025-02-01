import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import axios from "axios";
import { baseurl } from "./Baseurl";
import { Quizitems } from "./Quizitems";
import '../styles/Quiz.css';


export const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const[loading, setLoading] = useState(true);
    const [error, setError ] = useState('');
    const navigate = useNavigate();
    const {userId} = useContext(AuthContext);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async() => {
        try {
            const res = await fetch(`${baseurl}/api/questions`);
            if(res.ok){
                const data = await res.json();
                console.log(data.questions);
                setQuestions(data.questions);
            }
            console.log('Quiz fetching ')
        } catch(err) {
            console.log('Error in getting Questions', err);
            setError(err);
            setLoading(false);
            console.log('eeror in quiz', err);
        }
    };

    const handleAnswerSelect = (quesionId, answer) => {
        setAnswers(prev => ({
            ...prev, [quesionId] : answer
        }));
    };

    const handleSubmit = async () => {
        try {
            const res = await fetch(`${baseurl}/api/submit`, {
                method: 'POST',
                headers: {
                    'content-type' : 'aplication/json'
                },
                body: JSON.stringify({userId, answers}),
            });
            setLoading(false);

            if(res.ok) {
                navigate('/result');
                setLoading(false);
            }
        } catch(err){
            setError(err);
        }
    };

    if(!loading) {
        return <div>Loading...</div>
    }
    if(error) {
        return <div className="error">{error}</div>
    }

    const allQuestionsAns = questions.length > 0 && Object.keys(answers).length === questions.length;


    return(
        <div className="quiz">
           <h2>Quiz Questions</h2> 
           {questions.map((question) => {
            return (
                <>
                <Quizitems key={question.id} question={question} AnswerSelect={handleAnswerSelect} />
                </>
            )
           })}

           {allQuestionsAns && (
            <button className="submit-quiz" onClick={handleSubmit}>Submit Quiz</button>
           )}
        </div>
    )
};