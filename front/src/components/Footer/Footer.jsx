import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faSquareXTwitter, faSquareInstagram } from '@fortawesome/free-brands-svg-icons';
import "./footer.scss";

const Footer = () => {

  return (

    <footer>
  
          <section className="social container">

              <h3>Mes réseaux sociaux : </h3>
          
              <a  href="https://facebook.com" target="_blank"><FontAwesomeIcon className="icone" icon={faFacebookSquare} /></a>
              <a  href="https://x.com" target="_blank"><FontAwesomeIcon className="icone" icon={faSquareXTwitter} /></a>
              <a  href="https://instagram.com" target="_blank"><FontAwesomeIcon className="icone" icon={faSquareInstagram} /></a>

          </section>

          <section className="coordinated container">

              <h3>Coordonnées</h3>

              <p>Cielu Lucie</p>
              <p>lespatisseriesdelucie@gmail.com</p>
              <p>21 Rue Des Coraux</p>
              <p>33001 Locéan</p>

          </section>

          <p className="copyright">&copy; Gaëtan Pujol 2024  - Tout droits réservés</p>

   </footer>

  );
};

export default Footer;
