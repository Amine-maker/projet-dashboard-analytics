# projet-dashboard-analytics

Lien du repository : <https://github.com/Amine-maker/projet-dashboard-analytics>

## Quick Start

### Dépendances

* [docker](https://docs.docker.com/engine/install/)
* [maven](https://maven.apache.org/download.cgi)

### Environnement local

* (Pour git) Création du .jar

```shell
cd dashboard-api
```

```shell
mvn clean package
```




* Pour lancer les conteneurs (spring, mongodb, react)

```shell
docker-compose build
```

```shell
docker-compose up
```

* Backend : http://localhost:5000/
* Frontend : http://localhost:5173