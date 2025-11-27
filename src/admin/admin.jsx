import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Admin(){
    return(
        <div>
           <h1>Je suis le Dashboard</h1>

            <p>La liste des films sont ici</p>

            <p>Si vous voulez rajouter un film c'est <Link to="/ajoutFilm">ici</Link></p>

        </div>
    )
}