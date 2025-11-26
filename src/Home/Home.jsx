import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div>
             <p>
                Je suis la page Home
            </p>
             <p>
                Si vous n'avez pas de compte, <Link to="/register">inscrivez vous</Link>
                Si vous avez un compte, <Link to="/login">Connectez-vous</Link>
            </p>
                
        </div>
    );
}