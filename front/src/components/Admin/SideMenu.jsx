import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./sideMenu.scss";

const SideMenu = () => {
    
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
    
        setIsOpen(!isOpen);
    
    };

    const closeMenu = () => {
    
        setIsOpen(false);
    
    };

    const overlayPointerEvents = isOpen ? "auto" : "none";
    const menuButtonClass = isOpen ? "MenuButton hidden" : "MenuButton"; 

    return (
        
        <div className="MobileMenu">
        
            <button className={menuButtonClass} onClick={toggleMenu}>
               <h2 className="menu"> Menu</h2>
            </button>
        
            {isOpen && (
        
                <React.Fragment>
        
                    <div className="Overlay" style={{ pointerEvents: overlayPointerEvents }} onClick={toggleMenu}></div>
        
                    <ul className="MenuList">
    
                        <p className="home"><Link to="/" onClick={closeMenu}>Accueil</Link></p>
    
                        <li>
                            <p>User</p>
                            <ul>
                                <li><Link to="/admin/user/index" onClick={closeMenu}>- Liste</Link></li>
                            </ul>
                        </li>
    
                        <li>
                            <p>Recette</p>
                            <ul>
                                <li><Link to="/admin/recipe/index" onClick={closeMenu}>- Liste</Link></li>
                                <li><Link to="/admin/recipe/add" onClick={closeMenu}>- Ajouter</Link></li>
                            </ul>
                        </li>

                        <li>
                            <p>Ingrédient</p>
                            <ul>
                                <li><Link to="/admin/ingredient/index" onClick={closeMenu}>- Liste</Link></li>
                                <li><Link to="/admin/ingredient/add" onClick={closeMenu}>- Ajouter</Link></li>
                            </ul>
                        </li>

                    </ul>
        
                </React.Fragment>
        
            )}
        
        </div>
    
    );
};

export default SideMenu;