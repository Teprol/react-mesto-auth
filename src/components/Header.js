import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="header page__header">
            <Link to="/">
                <img
                    className="logo hover"
                    src={logo}
                    alt="логотип"
                />
            </Link>
        </header>
    );
};