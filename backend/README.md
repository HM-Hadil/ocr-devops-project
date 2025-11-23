# 🚀 OCR DevOps Project

Plateforme d'extraction de données par OCR avec architecture conteneurisée.

## 🏗️ Architecture

- **Backend** : Spring Boot (Java 21) - API REST
- **Frontend** : React - Interface utilisateur
- **OCR Service** : Python (Flask) - Extraction de texte
- **Database** : PostgreSQL 16
- **Container** : Docker & Docker Compose
- **CI/CD** : GitHub Actions + Jenkins
- **Infrastructure** : Vagrant + Ansible
- **Monitoring** : Nagios

## 🚀 Démarrage rapide

### Prérequis
- Docker Desktop installé
- Git installé

### Installation

1. Cloner le repository :
```bash
git clone https://github.com/VOTRE_USERNAME/ocr-devops-project.git
cd ocr-devops-project
```

2. Lancer l'application :
```bash
docker-compose up -d
```

3. Accéder aux services :
- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:9090
- **pgAdmin** : http://localhost:8081
- **OCR Service** : http://localhost:5000

## 📚 Documentation

- [Architecture](docs/architecture.md)
- [API Documentation](docs/api.md)
- [Guide de Contribution](CONTRIBUTING.md)

## 👥 Équipe

- **Backend** : [@votre-username](https://github.com/votre-username)
- **Frontend** : [@frontend-dev](https://github.com/frontend-dev)
- **OCR Service** : [@ocr-dev](https://github.com/ocr-dev)

## 📄 Licence

MIT License - voir [LICENSE](LICENSE)