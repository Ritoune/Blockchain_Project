# Elèves : Henri Petrelli et Paul Gommard

# Instructions pour lancer l'application 
- Cloner le projet
- Sur Remix IDE, déployer le smart contract présent dans src/contracts/projet.sol
- Lancer "npm install" puis "npm start"

# Utilisation de l'application 
- Dans le premier champs de saisie, renseignez l'ID du smart contract déployé, que vous pouvez trouver sur Remix IDE
- Appuyez sur "Obtenir des informations sur le token" pour voir apparaitre son nom, son symbole et sa quantité totale
- Appuyez sur "Obtenir mon solde" pour voir apparaitre l'adresse de votre wallet et son solde associé
- Dans la rubrique envoyer des token, veuillez renseigner l'adresse du destinataire ainsi qu'un montant, et valider la transaction sur la fenêtre MetaMask qui s'ouvre 
A noter, que le smart contract n'est déployé que localement.
- Après avoir fait des transactions, vous verrez s'afficher un historique dans la rubrique "Transaction récentes"

# Importance de la blockchain dans le projet
Cette page web est une esquisse de marketplace de token. Les token sont au préalable crées grace au déploiment du smart contract sur Remix IDE. On peut y voir les informations sur ce token dans sa globalité, ainsi que la quantité de token liée au wallety de l'utilisateur. On peut aussi y transférer des tokens, et voir l'historique des transactions. 