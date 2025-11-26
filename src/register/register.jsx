import { Link } from "react-router-dom"
export default function Register(){
    return(
        <div>
            <p>
                <form action="" method="post">
                    <label htmlFor="firstname">Prénom : </label>
                    <input type="text" name="firstname" id="lastname" placeholder="Votre prénom..." minLength={1} maxLength={30}/>
            <br />
            <br />
                    <label htmlFor="lastname">Nom de famille : </label>
                    <input type="text" name="lastname" id="lastname" placeholder="Votre nom de famille..." minLength={1} maxLength={30}/>
            <br />
            <br />
                    <label htmlFor="mail">Mail : </label>
                    <input type="email" name="mail" id="mail" placeholder="Votre mail... " minLength={1} maxLength={30}/>

            <br />
            <br />
                    <label htmlFor="Mot de passe">Mot de passe : </label>
                    <input type="password" name="password" id="password" required min={8} pattern="^(?=.*[a-z0-9])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" title="Doit contenir au minimum 8 caractères avec 1 majuscule, une miniscule, un caractère spécial et un chiffre" placeholder="Votre mot de passe..." />
            <br />
            <br />

                    <input type="button" value="Valider" id="registerButton" />

                    <p>
                        Si vous avez déjà un compte, <Link to="/login">connectez vous</Link>
                    </p>
                </form>
            </p>
        </div>
    )
}