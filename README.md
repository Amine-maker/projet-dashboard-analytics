# projet-dashboard-analytics

Lien du repository : <https://github.com/Amine-maker/projet-dashboard-analytics>

## Quick Start

### Dépendances

* [docker](https://docs.docker.com/engine/install/)

### Environnement local

* Pour lancer les conteneurs (spring, mongodb, react)

```shell
docker-compose up --build
```

* Backend : <http://localhost:5000>
* Frontend : <http://localhost:5173>

## Utilisation

#### Récuperation et intégration du script <https://github.com/Amine-maker/projet-dashboard-analytics/blob/main/script/script.js>

* Intégration du fichier dans le html

```html
<script type="module" src="/chemin/vers/script.js"></script>
```

* Pour l'initialisation, vous pouvez soit passez dans le html via les attributs
data-site-id & data-client-id.
À noter que l'identifiant "#dadasha" dans la balise d'd'initialisation est important.

```html
 <main class="app" id="dadasha"
    data-site-id="mon-site-id"
    data-client-id="mon-client-id">
    <section>
      mon app
    </section>
  </main>
```

* Ou alors via vos scripts personnalisé qui récupère la fonction d'initialisation

```javascript
import InitDadasha from "/chemin/vers/script.js";

  const option = {
     siteId: 'mon site id',
     clientId: 'mon client id'
   }
   
   InitDadasha(option);
```

* Gestion d'évenements personnalisé

```javascript
import InitDadasha, { sendCustomEvent } from "/chemin/vers/script.js";

monElement.addEventListener('click' /* peu importe l'evenement */, (e) => {
    sendCustomMessage(
    {
      label : "mon evenement",
      data : {
        x : number,
      }
   })
})

 

```
