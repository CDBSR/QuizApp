import {Link} from 'react-router-dom';

export const Home = () => {
    return (
        <div>
            <h1>Welcome to the Quiz App</h1>
            <p>Test your Knowledge and Challange yourself with our quiz. please <Link to='/login'>Login</Link> to get started</p>
        </div>
    )
}