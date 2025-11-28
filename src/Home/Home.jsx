import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div>
             <p>
                Je suis la page Home
            </p>

        <br />
             <p>
                Si vous n'avez pas de compte, <Link to="/register">inscrivez vous</Link>
            </p>
            <p>
                Si vous avez un compte, <Link to="/login">Connectez-vous</Link>
            </p>
             <p>Si vous voulez avoir plus d'information sur vos droits <Link to={'/privacy'}>Cliquez ici</Link></p>
                
        </div>
    );
}