import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function formFilm(){

    const [formData, setFormData] = useState({
        titre: '',
        genre: '',
        rate: '',
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
        const response = await fetch('http://localhost:3001/api/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem("type", data.type.trim());
            setSuccess('Connexion réussie !');
            setTimeout(() => {
                console.log(data.type);
                if (data.type === "admin") {
                    navigate('/admin'); 
                    console.log('Je suis ici')     
                } else {
                    navigate('/main');       
                }
            }, 500);

        } else {
            setError(data.message || 'Erreur lors de la connexion');
        }

    } catch (error) {
        console.error('Erreur:', error);
        setError('Erreur de connexion au serveur');
    }
};

    return(
        <div>
            <h1>Je suis la page pour rajouter un film</h1>

                <form onSubmit = {handleSubmit}>
                    <label htmlFor="titre">Titre :</label> 

                    <input type="text" name="text" id="titreFilm" placeholder="Titre du film" minLength={1} maxLength={30} value={formData.titre} onChange={handleChange} required></input>
                </form>
            
        </div>
        );
    }

