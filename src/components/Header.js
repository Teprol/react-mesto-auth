import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ loggedIn }) {
    const { pathname } = useLocation();
    return (
        <header className="header page__header">
            <Link to="/">
                <img
                    className="logo hover"
                    src={logo}
                    alt="логотип"
                />
            </Link>
            <div className='header-menu'>
                {loggedIn && <p className='header-menu__user-mail'>123@bk.ru</p>}
                {loggedIn ?
                    <Link className='header-menu__link hover' to="/sign-in">Выйти</Link>
                    :
                    <Link className='header-menu__link hover' to={pathname === '/sign-up' ? '/sign-in' : '/sign-up'}>{pathname === '/sign-up' ? 'Войти' : 'Регистрация'}</Link>
                }
            </div>
        </header>
    );
};