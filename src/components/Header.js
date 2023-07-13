import logo from '../images/logo.svg';

export default function Header() {
    return (
        <header className="header page__header">
            <a href="#">
                <img
                    className="logo hover"
                    src={logo}
                    alt="логотип"
                />
            </a>
        </header>
    );
};