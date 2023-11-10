<h1 align="center">☾ - TATTOO STUDIO BACKEND - ☽</p></h1>

---
### ✪ [Enlace al repositorio](https://github.com/PabloProst/Tattoo-Studio-backend)
### ✪ [Enlace a mi Linkedin](https://www.linkedin.com/in/pablo-ezequiel-prost-926ab6297/)

---

## ⚘ Desarrollo:

``` js
 const developer = "PabloProst";

 console.log("Desarrollado por: " + PabloProst);
```  
---

## &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:mag: OBJETIVO :mag:

#### ▫︎ Este proyecto es una creación de una API y una base de datos capaces de simular un backend de un estudio de tatuajes real ▫︎

---

## Tecnologías utilizadas:

#### ✒︎ MySQL
#### ✒︎ Typescript
#### ✒︎ Postman
#### ✒︎ Github
#### ✒︎ Node
#### ✒︎ Nodemon

---
## &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:rocket: DIAGRAMA BBDD :rocket:


<img src = "./src/img/bbdd.png" width = "900px">

---

## :gear: Instalación en local :gear:
1. Clonar el repositorio
2. ` $ npm install `
3. Conectamos nuestro repositorio con la base de datos 
4. ``` $ Ejecutamos las migraciones ``` 
5. ``` $ npm run dev ```  para poner el servidor en marcha

----
## ✦ Endpoints ✦

<details>
<summary>Endpoints</summary>

- **REGISTER**

    ```
    POST http://localhost:3430/register

    {
        "name": "pedro",
        "email": "pedro@pedro.com",
        "password": "1234A!"
    }
    ```

- **LOGIN**

    ```
    POST http://localhost:3430/login

    {
        "email": "pedro@pedro.com",
        "password": "1234A!"
    }
    ```

- **PROFILE**

    ```
    POST http://localhost:3430/profile

    TOKEN +

    {
        "email": "pedro@pedro.com",
        "password": "GeeksHubs1!"
    }
    ```

- **UPDATE USER**

    ```
    POST http://localhost:3430/update

    TOKEN +

    {
        "email": "hola@pedro.com",
        "password": "1111A!"
    }
    ```

- **GET GALLERY**

    ```
    POST http://localhost:3430/gallery
    ```

- **ARTIST REGISTER (ADMIN)**

    ```
    POST http://localhost3430/admin/register
    ```

- **ARTIST LOGIN**

    ```
    POST http://localhost3430/admin/login
    ```

- **GET ALL USERS (ADMIN)**

    ```
    POST http://localhost:3430/admin/users
    ```

- **DELETE USER (ADMIN)**

    ```
    POST http://localhost:3430/admin/delete

    {
        "id": "1"
    }
    ```

- **NEW APPOINTMENT**

    ```
    POST http://localhost:3430/appointment/new

    {
        "user": 1,
        "artist": 1,
        "time": "2023-12-20T15:30:00.000Z"
    }
    ```

- **GET USER APPOINTMENTS**

    ```
    GET http://localhost:3430/myappointments

    {
        "id": "11"
    }
    ```

- **GET ARTIST APPOINTMENTS**

    ```
    GET http://localhost:3430/admin/myappointments

    {
        "id": "2"
    }
    ```

</details>


---
## ✦ Licencia ✦
Este proyecto se encuentra bajo licencia de "Pablo Prost"