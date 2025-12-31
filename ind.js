const express = require("express");
const app = express();

app.use(express.json()); // Pour lire le JSON

// 📌 Base de données (tableau)
let taches = [];
let idAuto = 1;

app.post("/taches", (req, res) => {
    const { nom, description, statut } = req.body;

    if (!nom || !description || !statut) {
        return res.status(400).json({ message: "Champs manquants" });
    }

    const nouvelleTache = {
        id: idAuto++,
        nom,
        description,
        statut
    };

    taches.push(nouvelleTache);
    res.status(201).json(nouvelleTache);
});
app.get("/taches", (req, res) => {
    res.json(taches);
});

app.delete("/taches/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = taches.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Tâche non trouvée" });
    }

    taches.splice(index, 1);
    res.json({ message: "Tâche supprimée avec succès" });
});

app.put("/taches/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { nom, description, statut } = req.body;

    const tache = taches.find(t => t.id === id);
    if (!tache) {
        return res.status(404).json({ message: "Tâche non trouvée" });
    }

    if (nom) tache.nom = nom;
    if (description) tache.description = description;
    if (statut) tache.statut = statut;

    res.json(tache);
});

app.listen(3400, ()=>{
    console.log("Serveur port 3400");
})