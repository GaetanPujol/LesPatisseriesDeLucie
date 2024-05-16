import { Link } from "react-router-dom";
import { accountService } from "../../_services/account.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const handleLinkClick = () => {

        setMenuOpen(false);

    };


    let navigate = useNavigate();
    const logout = () => {
        accountService.logout();
        navigate("/")
    }
    return (

        <header className="pHeader">

            <a href="/home"><img className="logo" src="/src/uploads/logo.png" alt="Logo Les pâtisseries de Lucie" /></a>

            <nav>

                <label>

                    <input type="checkbox" checked={menuOpen} onChange={() => setMenuOpen(!menuOpen)} />
                    <span className="menu"> <span className="hamburger"></span> </span>

                    <ul style={{ display: menuOpen ? "block" : "none" }}>
                    
                        <h2>Les patisseries de Lucie</h2>
                        <li><Link to="/home" onClick={handleLinkClick}>Accueil</Link></li>
                        <li><Link to="/recipes" onClick={handleLinkClick}>Recettes</Link></li>
                        <li><Link to="/users/sign-in" onClick={handleLinkClick}>Connect</Link></li>
                        <li><Link to="/admin/user/index" onClick={handleLinkClick}>Admin</Link></li>

                    </ul>

                </label>

            </nav>
  <div className="disconnection-container">
                <button onClick={logout} className="disconnection"><FontAwesomeIcon icon={faPowerOff} className="icones"/></button>
            </div>
        </header>

    );
};

export default Header;
