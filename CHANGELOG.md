# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.1](https://github.com/Kyostenas/perpetuus/compare/v0.2.0...v0.2.1) (2024-10-12)


### Bug Fixes

* **backend:** urls de api incorrectas ([8f9f425](https://github.com/Kyostenas/perpetuus/commit/8f9f4258bc6418ed259338e46ce671a7387f0017))

## [0.2.0](https://github.com/Kyostenas/perpetuus/compare/v0.1.0...v0.2.0) (2024-10-12)


### ⚠ BREAKING CHANGES

* **backend:** ahora si usan `/api` de nuevo.

* **backend:** cambio de nuevo en rutas ([6bfb621](https://github.com/Kyostenas/perpetuus/commit/6bfb6214a581d7b083e1e7d22b37a3ebcfbe7af4))

## [0.1.0](https://github.com/Kyostenas/perpetuus/compare/v0.0.7...v0.1.0) (2024-10-12)


### ⚠ BREAKING CHANGES

* **backend:** ya no se usa la estructura `/api/v1` direcamente en el backend, si no en el nginx conf pero solo como `/api`

* **backend:** version de api en rutas removido ([2ca7939](https://github.com/Kyostenas/perpetuus/commit/2ca7939a606ef5f2c5be3b31e6bf00cafd9a9939))

### [0.0.7](https://github.com/Kyostenas/perpetuus/compare/v0.0.6...v0.0.7) (2024-10-12)


### Bug Fixes

* **backend:** error en importacion de node_env ([a11f412](https://github.com/Kyostenas/perpetuus/commit/a11f4126e56fb567d5eeef92ac12b3c58d953402))

### [0.0.6](https://github.com/Kyostenas/perpetuus/compare/v0.0.5...v0.0.6) (2024-10-12)

### [0.0.5](https://github.com/Kyostenas/perpetuus/compare/v0.0.4...v0.0.5) (2024-10-09)

### [0.0.4](https://github.com/Kyostenas/perpetuus/compare/v0.0.3...v0.0.4) (2024-10-09)

### [0.0.3](https://github.com/Kyostenas/perpetuus/compare/v0.0.2...v0.0.3) (2024-10-09)


### Bug Fixes

* **frontend:** actualizacion de seguridad ([257ff38](https://github.com/Kyostenas/perpetuus/commit/257ff3866b043c5005acb2db98dec11f9ef29e0b))

### [0.0.2](https://github.com/Kyostenas/perpetuus/compare/v0.0.1...v0.0.2) (2024-10-09)

### 0.0.1 (2024-10-09)


### Features

* API incluida en imagen de docker de la app ([42d312e](https://github.com/Kyostenas/perpetuus/commit/42d312e8add4af9fb3c63d1797d2316517e5933d))
* Aplicación como PWA. ([eed2618](https://github.com/Kyostenas/perpetuus/commit/eed26189ce37b444d5663fee1e08a717d9d3d2ed))
* Aplicación con routing arranca. ([9e770d1](https://github.com/Kyostenas/perpetuus/commit/9e770d12c6522ddac993cf241cfc4b2eae5e8bf4))
* Asignacion y remocion de permisos funcional ([93be5f6](https://github.com/Kyostenas/perpetuus/commit/93be5f61331cdf69b3eff222b0fbabd1ef66ea21))
* Autenticación de usuario ([f59c30b](https://github.com/Kyostenas/perpetuus/commit/f59c30b14b725cebec45bf820e72db45fdcc0c61))
* Busqueda por termino de rules usando indices ([45075a0](https://github.com/Kyostenas/perpetuus/commit/45075a0074f1b48cf79c2f77bd6a394348a94c8d))
* Componente de tarjeta (bootstrap) generica ([f2df37f](https://github.com/Kyostenas/perpetuus/commit/f2df37f82ff87424eb6db81f4a8ce8398c7a499b))
* Componente de usuarios ([0744511](https://github.com/Kyostenas/perpetuus/commit/0744511faf95ff806b6f34a9b00055fa22815bba))
* Componente para elemento desplegable (collapse) ([05bcb92](https://github.com/Kyostenas/perpetuus/commit/05bcb929200b18a597ab50672ef26aed4cc12645))
* Componente para errores de validacion de formularios ([666f8be](https://github.com/Kyostenas/perpetuus/commit/666f8bebbb9ff1cb406b9aae03bf7eb04a9ba25e))
* Directiva elemento-ocultable ([cacec8e](https://github.com/Kyostenas/perpetuus/commit/cacec8e715f492f4098f7c2b3b7a54d28854bb21))
* **frontend:** zoneless aplicado ([933a1f7](https://github.com/Kyostenas/perpetuus/commit/933a1f78810840192a1949289695ee8bfdcda9e6))
* Funcion para preparar url conexion api ([f0e08e1](https://github.com/Kyostenas/perpetuus/commit/f0e08e129757a50a782f33f355e6b63e9ddecaf1))
* **gui:** Validacion de sesion en componente de inicio de sesion ([9de34c8](https://github.com/Kyostenas/perpetuus/commit/9de34c817f496570895dd6fd6e5e8c89948b2de2))
* **gui:** Validaciones de sesion en layouts de admin y usuario ([4a39c05](https://github.com/Kyostenas/perpetuus/commit/4a39c05a0d4cbd343878cc6a4653c20d5c1d9103))
* Layout inicial ([540bccc](https://github.com/Kyostenas/perpetuus/commit/540bccc43871b61b43b43c0add2f54e0b83eae0f))
* Login de super admin navega a `/administracion` ([4beecf2](https://github.com/Kyostenas/perpetuus/commit/4beecf2aac9d9fd3a27a213c189ebbf92b59c936))
* Manejador de errores y respuestas. ([1e4656e](https://github.com/Kyostenas/perpetuus/commit/1e4656e94092e16de866096548dc3d2696b07ff2))
* Mejores varias en formulario dinamico ([7c4845f](https://github.com/Kyostenas/perpetuus/commit/7c4845f3c0d96dbdf53ca415947f37f65d506c53))
* Middleware para campo de busqueda "automatico" ([ca1015d](https://github.com/Kyostenas/perpetuus/commit/ca1015d1c8ddd31d6c4787457d4641ee4dba444a))
* Modelo de roles completo ([f849a00](https://github.com/Kyostenas/perpetuus/commit/f849a00d1a33432d3d04b816683de33c74a08b86))
* Parte logica de inicio de sesion y registro ([9175d96](https://github.com/Kyostenas/perpetuus/commit/9175d96c331639726ab8a4d0796874553c0e54bd))
* Primer prototipo de login a al admin layout ([7bbb759](https://github.com/Kyostenas/perpetuus/commit/7bbb75984b212620f7f7ecaa4b25da4c1064558b))
* **primera version:** Api funcionando. ([91e01bf](https://github.com/Kyostenas/perpetuus/commit/91e01bf2e90c5eb7397c998c660db95533ccb1de))
* Refresh token se crea al iniciar sesion ([09cb082](https://github.com/Kyostenas/perpetuus/commit/09cb0829273c669ce89907ba7e9c0d00a3ced00d))
* Ruta para refrescar token ([ac0cddd](https://github.com/Kyostenas/perpetuus/commit/ac0cddd7145cc9c59611e5fdea9d60b51090576c))
* Servicio de validacion de formularios ([80f7328](https://github.com/Kyostenas/perpetuus/commit/80f7328e7ab76159c16afd6a0c1749233b9012cd))
* utiles ([f4d4296](https://github.com/Kyostenas/perpetuus/commit/f4d42968411ab345a983514ffa1af36305c99534))
* **utilidades:** prueba de ping pong para servidor nginx ([08db35a](https://github.com/Kyostenas/perpetuus/commit/08db35a4d68afa2712013ee10e048223375caef6))
* Validaciones de Angular con mensajes en formulario dinamico ([27c12c5](https://github.com/Kyostenas/perpetuus/commit/27c12c58bfa849f7837d04262fad7d565b78800b))
* Verificacion de auth token con cada consulta al api ([f2a45d3](https://github.com/Kyostenas/perpetuus/commit/f2a45d395c127e79a50913f9642b4cd49848f1ff))
* Verificacion de token con middleware ([79739f5](https://github.com/Kyostenas/perpetuus/commit/79739f5e0f1f47c32d52f74d917467f5a8f00a47))
* Verificación de token de auth ([9972ce0](https://github.com/Kyostenas/perpetuus/commit/9972ce034c06c9fb7df9982fe981b879b86adcc5))


### Bug Fixes

* **api:** Se intentaba validar el token antes de iniciar sesion. ([f0eede5](https://github.com/Kyostenas/perpetuus/commit/f0eede520343cec4b390163774dea1c8775b56e2))
* **api:** Validacion de sesion incorrecta ([c25a53f](https://github.com/Kyostenas/perpetuus/commit/c25a53f752048bc4280184131d4cf8beeaf89117))
* CRUD de roles con incosistencias de funcionamiento ([ceee9e9](https://github.com/Kyostenas/perpetuus/commit/ceee9e943f21f84ba71131fa28fc5a2ea506d7e3))
* Middleware sin `next()`. ([31fc8a8](https://github.com/Kyostenas/perpetuus/commit/31fc8a8dac568b5911460f7d4f9e32b151c0da1f))
