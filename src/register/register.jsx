import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./register.css"

export default function Register() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setSuccess('Inscription réussie ! Redirection...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(data.message || 'Erreur lors de l\'inscription');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setError('Erreur de connexion au serveur');
        }
    };

    return (
        <div>
            <main id="mainRegister">
                <form onSubmit={handleSubmit} id="formRegister">

                    <article>
                        <label htmlFor="firstname">Prénom : </label>
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                placeholder="Votre prénom..."
                                minLength={1}
                                maxLength={30}
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                            />
                    </article>
                        
                    <article>
                         <label htmlFor="lastname">Nom de famille : </label>
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                placeholder="Votre nom de famille..."
                                minLength={1}
                                maxLength={30}
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                            />
                    </article>

                        <article>
                            <label htmlFor="email">Mail : </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Votre mail..."
                                    minLength={1}
                                    maxLength={30}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                        </article>

                    <article>
                        <label htmlFor="password">Mot de passe : </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$"
                                title="Doit contenir au minimum 8 caractères avec 1 majuscule, une minuscule, un caractère spécial et un chiffre"
                                placeholder="Votre mot de passe..."
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                    </article>
                
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}

                <article>
                    <button type="submit" id="submitRegister">Valider</button>
                </article>
                <article>
                     <input type="checkbox" name="checkbox" id="RGPD" required/> 
                     <p>Accepter les RGPD <div id="requiredCheckboxRGPD">*</div></p>
                </article>
                    

                <p>
                    Si vous avez déjà un compte, <Link to="/login">connectez vous</Link>
                </p>
            </form>

             <p>Si vous voulez avoir plus d'information sur vos droits <Link to={'/privacy'}>Cliquez ici</Link></p>
        
            </main>
           </div> 
    );
}