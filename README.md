# Vuexinette

## ¿ Qué es vuexinette ?

Vuexinette es una pequeña libreria que facilita el manejo de operaciones CRUD en vuex se basa en la normalizacion de estado inspirado en Redux con la ayuda de normalizr

## Instalacion

### Instalación en los modulos
El primer paso es realizar la instalacion en los modulos principales del store, con esto vuexinette agrega el modulo 'entities' necesario para el manejo de datos normalizados

```js
// store.js

import Vuexinette from 'vuexinette';
import modules from './modules';

const store = new Vuex.store({
  modules: Vuexinette.install(modules),
});

export default store;
```

### Creacion de entities
Las entities son usadas por los plugins que requieren realizar requests a la API, cada entity cuenta con un 'client' asociado el cual se encarga de realizar las peticiones y normalizar los datos basados en el schema dado

```js
//  entities/clients.js

import Vuexinette from 'vuexinette';

export default Vuexinette.Entity({
  name: 'carBrands',
  client: {
    url: '/v1/carBrands',
  },
  schema: {
    // normalizr schema
  },
});
```

### Instalación de plugins
Los plugins contienen toda la logica de los modules (state, action, mutations y getters), cada plugin se encarga de una sola cosa en específica de manera eficáz, en este caso usamos el fetchableList el cual permite obtener datos de una entity en su ruta base */clients* ademas de que permite la paginacion de los mismos, al hacer la instalacion Vuexinette solo hace un assign de la lógica que tiene el plugin agregandola al modulo específicado, se puede instalar multiples plugins a un modulo.

```js
// modules/clients.js

import Vuexinette from 'vuexinette';
import fetchablePlugin from 'vuexinette/dist/plugins/fetchableList';

const module = {
  namespaced: true,
};

Vuexinette.installPlugin(module, fetchablePlugin, { entity });

export default module;
```
