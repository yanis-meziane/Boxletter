import { Link } from "react-router-dom"
import "./Home.css"

export default function Home() {
    return (
        <div>
            <main>
                <section id="sectionUser">
                    <article> 
                        <p>
                            Si vous n'avez pas de compte, <Link to="/register">inscrivez vous</Link>
                        </p> 
                    </article>

                    <article>
                        <p>
                            Si vous avez un compte, <Link to="/login">Connectez-vous</Link>
                        </p>
                    </article>

                    <article>
                        <p>
                            Si vous voulez avoir plus d'information sur vos droits <Link to={'/privacy'}>Cliquez ici</Link>
                        </p>
                    </article>
                </section>
            </main>    
        </div>
    );
}