# Boxletter

## Présentation 
*BoxLetter* est un site web recensant divers film de différentes catégories.  

## Fonctionnalité  

 >En tant que **User** je peux me connecter sur le site et noter le film de 1 à 5. 

 > En tant qu'**Admin** je peux créer un film et lui donner un nom, une catégorie, une résumé et voir la moyenne de notation d'un film. 

 ## Installation 

 1. **Clônage du projet** 

    Afin de profiter pleinement du projet, il faut l'avoir en local et je vous invite donc à ouvrir un terminal et de faire la commande suivante : 

    ```bash 
    git clone https://github.com/yanis-meziane/Boxletter.git
    ``` 

2. **Installation des dépendances** 

    Une fois le projet installé, il sera nécessaire d'installer toutes les dépendances nécessaires pour son bon fonctionnement.  

    Les démarches à suivre :  
         
    * Ouvrir un Terminal et faire cette commande

    ```
    cd Boxletter 
    ```

    * Une fois accédé à ce dossier, procéder à l'installation des dépendances.  

    ```bash
        npm install
    ``` 

    3. **Lancement du projet** 

        Une fois toutes les dépendances installées, il sera nécessaire d'ouvrir un deuxième Terminal pour lancer le projet et lancer le serveur. 

        Donc dans un premier terminal, il faudra lancer cette commande : 

        ```bash 
            cd backend
            node server.js
        ```

        Et vous devriez avoir comme message : 

        ```bash 
            Server listen on http://localhost:3001
            Vous êtes bien connecté à PostgreSQL
        ```

        Sur le deuxième terminal, dans le dossier parent (donc Boxletter), il faudra lancer cette commande : 

        ```bash 
            npm run start
        ```

        Et le projet devrait se lancer correctement ! Vous pourrez ainsi vous connecter à votre page user et noter les films posté par nos admins ! 