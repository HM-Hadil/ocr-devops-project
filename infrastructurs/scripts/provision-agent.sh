#!/bin/bash

# ════════════════════════════════════════════════════════════════
# Jenkins Agent - Machine de build et déploiement
# Rôle: Exécution des builds, Docker, déploiement application
# ════════════════════════════════════════════════════════════════

set -e

echo "╔══════════════════════════════════════════════════════════╗"
echo "║  Installation Jenkins Agent                              ║"
echo "╚══════════════════════════════════════════════════════════╝"

# ════════════════════════════════════════════════════════════════
# 1. Mise à jour système
# ════════════════════════════════════════════════════════════════
echo ""
echo "📦 [1/6] Mise à jour du système..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get upgrade -y -qq

# ════════════════════════════════════════════════════════════════
# 2. Installation Docker
# ════════════════════════════════════════════════════════════════
echo ""
echo "🐳 [2/6] Installation de Docker..."
apt-get install -y apt-transport-https ca-certificates curl software-properties-common gnupg lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update -qq
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

systemctl start docker
systemctl enable docker

echo "   ✅ Docker installé : $(docker --version)"

# ════════════════════════════════════════════════════════════════
# 3. Installation Docker Compose
# ════════════════════════════════════════════════════════════════
echo ""
echo "🔧 [3/6] Installation de Docker Compose..."
curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose

echo "   ✅ Docker Compose installé : $(docker-compose --version)"

# ════════════════════════════════════════════════════════════════
# 4. Installation Java 17
# ════════════════════════════════════════════════════════════════
echo ""
echo "☕ [4/6] Installation de Java 17..."
apt-get install -y fontconfig openjdk-17-jdk openjdk-17-jre git curl

echo "   ✅ Java installé : $(java -version 2>&1 | head -n 1)"

# ════════════════════════════════════════════════════════════════
# 5. Installation Maven
# ════════════════════════════════════════════════════════════════
echo ""
echo "📦 [5/6] Installation de Maven..."
apt-get install -y maven

echo "   ✅ Maven installé : $(mvn -version | head -n 1)"

# ════════════════════════════════════════════════════════════════
# 6. Configuration
# ════════════════════════════════════════════════════════════════
echo ""
echo "🔐 [6/6] Configuration..."

# Ajouter vagrant au groupe docker
usermod -aG docker vagrant

# Créer dossier pour l'agent Jenkins
mkdir -p /home/vagrant/jenkins-agent
chown -R vagrant:vagrant /home/vagrant/jenkins-agent

# Créer dossier pour l'application
mkdir -p /home/vagrant/ocr-app
chown -R vagrant:vagrant /home/vagrant/ocr-app

echo "   ✅ Configuration terminée"

# ════════════════════════════════════════════════════════════════
# Affichage informations
# ════════════════════════════════════════════════════════════════
echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║  ✅ Agent installé avec succès !                         ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
echo "📍 Informations :"
echo "   • IP privée       : 192.168.56.11"
echo "   • Docker          : $(docker --version)"
echo "   • Docker Compose  : $(docker-compose --version)"
echo "   • Java            : $(java -version 2>&1 | head -n 1)"
echo "   • Maven           : $(mvn -version | head -n 1)"
echo ""
echo "💡 Prochaine étape :"
echo "   1. Configurer l'agent dans Jenkins"
echo "   2. Lancer l'agent : java -jar agent.jar ..."
echo ""