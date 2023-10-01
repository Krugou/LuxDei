import React, {useState} from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);
        // Add code here to submit form data to server
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <label className="flex flex-col items-start mt-4">
                <span className="text-lg font-medium mb-2">Username:</span>
                <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="border border-gray-400 rounded-lg p-2 w-full"
                />
            </label>
            <label className="flex flex-col items-start mt-4">
                <span className="text-lg font-medium mb-2">Email:</span>
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="border border-gray-400 rounded-lg p-2 w-full"
                />
            </label>
            <label className="flex flex-col items-start mt-4">
                <span className="text-lg font-medium mb-2">Password:</span>
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="border border-gray-400 rounded-lg p-2 w-full"
                />
            </label>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Register
            </button>
        </form>
    );
};

export default Register;
