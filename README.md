# Orquestração Local de Microsserviços com Docker Compose 🚀

## 📋 Proposta da Atividade
O objetivo deste desafio foi solucionar o atrito enfrentado pelo time de desenvolvimento ao configurar manualmente ambientes locais dependentes de múltiplos serviços. A proposta consistiu em automatizar a inicialização simultânea de uma API desenvolvida em Node.js (Express), um banco de dados **MongoDB** e um sistema de cache/sessões em **Redis** através do **Docker Compose**.

## 🛠️ O que foi Realizado
* **Desenvolvimento da API Node.js**: Criação da estrutura base com Express, Mongoose (MongoDB) e o client do Redis.
* **Empacotamento (Dockerfile)**: Definição de um ambiente leve baseado em `node:18-alpine` para containerizar a aplicação.
* **Orquestração Multicontainer (`docker-compose.yml`)**: Configuração de três serviços (`app`, `mongodb` e `redis`) integrados sob uma rede bridge isolada (`rede-app`).
* **Persistência de Dados**: Implementação de *Named Volumes* (`mongo_data`) para garantir que os registros do MongoDB sobrevivam a reinicializações dos containers.
* **Resiliência e Conexão**: Configuração de estratégias de reconexão assíncrona para contornar o tempo de inicialização dos daemons de banco de dados.

## ⚙️ Como Funciona
1. **Rede Interna**: Os containers comunicam-se entre si através do nome dos serviços definidos no Docker Compose (ex: `mongodb` e `redis`), eliminando a necessidade de IPs fixos.
2. **Injeção de Variáveis**: As credenciais e portas são repassadas via variáveis de ambiente.
3. **Persistência**: O volume mapeado para `/data/db` armazena os dados do MongoDB no host de forma segura.

## 🏢 Visão de Produção em Ambiente Corporativo
Em um ambiente corporativo real, essa arquitetura local evolui para plataformas de alta disponibilidade:
* **Orquestração em Nuvem**: Os arquivos de Compose são substituídos ou convertidos para manifests do **Kubernetes (K8s)** ou gerenciados via **Amazon ECS / Azure Container Instances**.
* **Banco de Dados Gerenciado**: Em produção, o MongoDB e o Redis raramente rodam em containers na mesma máquina da aplicação; utilizam-se serviços gerenciados (como MongoDB Atlas e AWS ElastiCache) para garantir escalabilidade, backups automatizados, replicação e segurança avançada.
* **Segurança e CI/CD**: Pipelines de DevSecOps escaneiam imagens em busca de vulnerabilidades antes do deploy automatizado em ambientes de homologação e produção.
