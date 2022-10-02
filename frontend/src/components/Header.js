import headerLogo from '../images/header-logo.svg';

function Header({ children }) {
    return (
        <header className="header">
          <img className="header__logo" src={headerLogo} />
          {children}
        </header>
    );
}

export default Header;