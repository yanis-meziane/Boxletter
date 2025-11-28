import '../Footer/footerUser.css'
import Privacy from './privacyUser'

export default function Footer(){
    return(
        <div id='footer'>
            <footer>
               <div id='copyright'>
                    <p>Copyright 2025 - Tous droits réservés.  | </p>
               </div>
               <div id='privacy'>
                <Privacy></Privacy>
                </div> 
            </footer>
        </div>
    )
}