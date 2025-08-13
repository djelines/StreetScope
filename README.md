
# StreetScope

**StreetScope** est une application web interactive qui vous permet de découvrir et explorer les lieux intéressants autour de vous en ville. Visualisez des monuments, des bâtiments historiques, des parcs et plus encore directement sur une carte et dans une liste intuitive.

---

## 🚀 Fonctionnalités

- **Exploration locale** : trouvez des lieux autour de votre position actuelle.  
- **Carte interactive** : zoom et déplacement dynamique avec marqueurs pour chaque lieu.  
- **Liste paginée et triable** : consultez les lieux par nom avec tri A→Z / Z→A.  
- **Détails enrichis** : nom, type de lieu, distance, note.  
- **Sélection synchronisée** : sélection d’un lieu dans la liste ou sur la carte.  

---

## 🛠️ Installation

1. Cloner le repository :

```bash
git clone https://github.com/djelines/StreetScope.git
cd streetscope
````

2. Installer les dépendances :

```bash
npm install
```

3. Lancer l'application en développement :

```bash
npm start
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

---

## 📂 Structure du projet

```
/src
  /Components
    /Header
    /List
    /Map
    /PlaceDetails
  App.js
  index.js
```

* **Header** : barre de navigation avec logo et recherche.
* **List** : liste des lieux avec pagination et tri.
* **Map** : carte interactive avec marqueurs et sélection de lieux.
* **PlaceDetails** : détails complets pour chaque lieu.

---

## 🔑 API

StreetScope utilise l'API [OpenTripMap](https://opentripmap.io) pour récupérer les lieux autour de votre position.
Vous devez définir votre clé API dans le fichier `Map.js` :

```javascript
const API_KEY = "VOTRE_CLE_API";
```

---
