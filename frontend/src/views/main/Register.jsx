import React, {useState} from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('fi');
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);
        // Add code here to submit form data to server
        fetch('http://jakfilms.northeurope.cloudapp.azure.com/backend/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: username,
                email: email,
                password: password,
                countryid: country,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
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
            <label className="flex flex-col items-start mt-4">
                <span className="text-lg font-medium mb-2">Country:</span>
                <select
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                    className="border border-gray-400 rounded-lg p-2 w-full"
                >
                    <option value="fi">Finland</option>
                    <option value="dk">Denmark</option>
                    <option value="no">Norway</option>
                    <option value="se">Sweden</option>
                </select>
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
