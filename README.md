# 🏭 Gestion des Ordres de Fabrication

Application web de gestion des ordres de fabrication développée avec **Spring Boot** (Backend) et **Angular** (Frontend).

## 📋 Description du Projet

Cette application permet de gérer l'ensemble du processus de fabrication d'une usine, incluant :
- La gestion des produits et du stock
- La gestion des machines et leur maintenance
- La gestion des employés et leurs affectations
- La création et le suivi des ordres de fabrication

### Fonctionnalités principales

- ✅ **CRUD complet** pour toutes les entités (Produits, Machines, Employés, Ordres)
- ✅ **Gestion automatique du stock** : diminution lors de la création d'ordres, remontée lors d'annulation
- ✅ **Validation des données** : vérification du stock disponible avant création d'ordre
- ✅ **Filtrage intelligent** : seules les machines disponibles peuvent être assignées aux employés
- ✅ **Dashboard avec statistiques** : vue d'ensemble des ordres et machines par état
- ✅ **Confirmation avant suppression** : prévention des suppressions accidentelles
- ✅ **Suivi des états** : ordres (EN_ATTENTE, EN_COURS, TERMINÉ, ANNULÉ) et machines (DISPONIBLE, EN_PANNE, EN_MAINTENANCE)

---

## 🛠️ Technologies Utilisées

### Backend
- **Spring Boot 3.5.14** - Framework Java
- **Spring Data JPA** - Gestion de la persistance
- **Spring Validation** - Validation des données
- **MySQL 8.0** - Base de données relationnelle
- **Lombok** - Réduction du code boilerplate
- **Maven** - Gestion des dépendances

### Frontend
- **Angular 21.2** - Framework TypeScript
- **Bootstrap 5.3** - Design responsive
- **RxJS** - Programmation réactive
- **TypeScript** - Typage statique

### DevOps
- **Docker** - Conteneurisation
- **Docker Compose** - Orchestration multi-conteneurs
- **Git/GitHub** - Versioning du code
- **Nginx** - Serveur web pour le frontend

---

## 📦 Architecture du Projet

```
gestion-fabrication/
├── backend/                    # API REST Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/fabrication/backend/
│   │   │   │   ├── controller/    # Endpoints REST
│   │   │   │   ├── service/       # Logique métier
│   │   │   │   ├── repository/    # Accès données
│   │   │   │   └── entity/        # Modèles JPA
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                   # Interface Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # Composants UI
│   │   │   └── services/      # Services HTTP
│   │   └── index.html
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
└── docker-compose.yml         # Orchestration Docker
```

---

## 🚀 Installation et Exécution

### Prérequis

- **Java 17** ou supérieur
- **Node.js 18** ou supérieur
- **MySQL 8.0**
- **Docker** et **Docker Compose** (pour le déploiement)

---

### Option 1 : Exécution Locale (Développement)

#### 1. Backend (Spring Boot)

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Le backend sera accessible sur : `http://localhost:8080`

#### 2. Frontend (Angular)

```bash
cd frontend
npm install
ng serve
```

Le frontend sera accessible sur : `http://localhost:4200`

#### 3. Base de données

Assurez-vous que MySQL est démarré et créez la base de données :

```sql
CREATE DATABASE fabrication;
```

---

### Option 2 : Déploiement avec Docker 🐳 (Recommandé)

#### Démarrer l'application complète

```bash
docker-compose up -d --build
```

Cette commande va :
1. Construire les images Docker pour le backend et le frontend
2. Démarrer MySQL dans un conteneur
3. Démarrer le backend Spring Boot
4. Démarrer le frontend Angular avec Nginx

#### Accéder à l'application

- **Frontend** : http://localhost
- **Backend API** : http://localhost:8080
- **Base de données** : localhost:3307

#### Arrêter l'application

```bash
docker-compose down
```

#### Voir les logs

```bash
docker-compose logs -f
```

---

## 📡 API Endpoints

### Produits
- `GET /api/produits` - Liste tous les produits
- `GET /api/produits/{id}` - Récupère un produit
- `POST /api/produits` - Crée un produit
- `PUT /api/produits/{id}` - Modifie un produit
- `DELETE /api/produits/{id}` - Supprime un produit

### Machines
- `GET /api/machines` - Liste toutes les machines
- `GET /api/machines/{id}` - Récupère une machine
- `POST /api/machines` - Crée une machine
- `PUT /api/machines/{id}` - Modifie une machine
- `DELETE /api/machines/{id}` - Supprime une machine

### Employés
- `GET /api/employes` - Liste tous les employés
- `GET /api/employes/{id}` - Récupère un employé
- `POST /api/employes` - Crée un employé
- `PUT /api/employes/{id}` - Modifie un employé
- `DELETE /api/employes/{id}` - Supprime un employé

### Ordres de Fabrication
- `GET /api/ordres` - Liste tous les ordres
- `GET /api/ordres/{id}` - Récupère un ordre
- `POST /api/ordres` - Crée un ordre (vérifie le stock)
- `PUT /api/ordres/{id}` - Modifie un ordre
- `DELETE /api/ordres/{id}` - Supprime un ordre

---

## 🗄️ Modèle de Données

### Entités

#### Produit
- `id` : Long (auto-généré)
- `nom` : String (obligatoire)
- `type` : String
- `stock` : Integer (≥ 0)
- `fournisseur` : String

#### Machine
- `id` : Long (auto-généré)
- `nom` : String (obligatoire)
- `etat` : String (DISPONIBLE, EN_PANNE, EN_MAINTENANCE)
- `derniereMaintenance` : LocalDate

#### Employé
- `id` : Long (auto-généré)
- `nom` : String (obligatoire)
- `poste` : String
- `machineAssignee` : Machine (relation ManyToOne)

#### OrdreFabrication
- `id` : Long (auto-généré)
- `projet` : String
- `produit` : Produit (relation ManyToOne)
- `quantite` : Integer (≥ 1)
- `date` : LocalDate
- `etat` : String (EN_ATTENTE, EN_COURS, TERMINE, ANNULE)

---

## ✨ Fonctionnalités Avancées

### Gestion Automatique du Stock

Le système gère automatiquement le stock des produits :

1. **Création d'ordre** : Le stock diminue de la quantité commandée
2. **Validation** : Impossible de créer un ordre si le stock est insuffisant
3. **Annulation** : Le stock remonte si un ordre est annulé
4. **Suppression** : Le stock remonte si un ordre non-annulé est supprimé

### Filtrage des Machines

Seules les machines avec l'état **DISPONIBLE** peuvent être assignées aux employés, garantissant la cohérence des données.

### Dashboard Statistiques

Vue d'ensemble en temps réel :
- Nombre total d'ordres, produits, machines, employés
- Répartition des ordres par état (avec barres de progression)
- Répartition des machines par état

---

## 🧪 Tests

### Tester l'API avec curl

```bash
# Créer un produit
curl -X POST http://localhost:8080/api/produits \
  -H "Content-Type: application/json" \
  -d '{"nom":"Acier","type":"Métal","stock":500,"fournisseur":"MetalCorp"}'

# Lister les produits
curl http://localhost:8080/api/produits
```

---

## 👨‍💻 Auteur

**Marwa Mejdoub**
- GitHub: [@marwa-mejdoub11](https://github.com/marwa-mejdoub11)
- Repository: [gestion-ordres-fabrication](https://github.com/marwa-mejdoub11/gestion-ordres-fabrication)

---

## 📄 Licence

Ce projet est développé dans le cadre d'un projet académique.

---

## 🙏 Remerciements

Projet réalisé dans le cadre du cours de développement web avec Spring Boot et Angular.
