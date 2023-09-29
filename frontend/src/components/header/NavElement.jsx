import React from 'react';
import {useNavigate} from 'react-router-dom';
const NavElement = () => {
    const navigate = useNavigate();

    return (

        <nav>
            <ul>
                <li><button
                    className="nav-link"
                    onClick={() => navigate('/about')}
                >
                    About
                </button>
                </li>
                <li><button
                    className="nav-link"
                    onClick={() => navigate('/contact')}
                >
                    Contact
                </button>
                </li>

            </ul>
        </nav>
    );
};

export default NavElement;
