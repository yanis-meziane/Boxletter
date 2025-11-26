import { Link } from "react-router-dom"

export default function Login() {
    return (
        <div>
             <form action="" method="post">
                   
                    <label htmlFor="mail">Mail : </label>
                    <input type="email" name="mail" id="mail" placeholder="Votre mail... " minLength={1} maxLength={30}/>

            <br />
            <br />
                    <label htmlFor="Mot de passe">Mot de passe : </label>
                    <input type="password" name="password" id="password" required min={8} placeholder="Votre mot de passe..."/>
            <br />
            <br />

                    <input type="button" value="Valider" id="registerButton" />

                    <p>
                        Si vous n'avez pas de compte, <Link to="/">inscrivez vous</Link>
                    </p>
                </form>
        </div>
    );
}