import '../Footer/footerUser.css'
import { Link } from 'react-router-dom'
import Privacy from './privacyUser'

export default function Footer(){
    return(
        <div id='footer'>
            <footer>
               <div id='copyright'>
                    <p>Copyright 2025 - Tous droits réservés.  | </p>
               </div>
               <div id='privacy'>
                <p>Si vous voulez avoir plus d'information sur vos droits <Link to={'/privacy'}>Cliquez ici</Link></p>
                </div> 
            </footer>
        </div>
    )
}