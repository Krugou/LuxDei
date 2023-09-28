import React, {useState} from 'react';

const LandingPage = () => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <h1>My Component</h1>
            <p>Count: {count}</p>
            <button onClick={handleClick}>Click me!</button>
        </div>
    );
};

export default LandingPage;
