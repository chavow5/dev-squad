## Bloc de notas - Api

instalar dependecias primero
``npm install``

desde app ejecuto 
``node app.js`` 

es para el login y base de datos

## Prubas Crud en Thunder Client o Postman
Get - Post - Put - Delete 

* metodo Get
http://localhost:3000/usuarios

* metodo Get por ID
http://localhost:3000/usuarios/id

* metodo Post
http://localhost:3000/usuarios
```bash 
body:
{
    "username": "Davidramirez",
    "password": "Davidramirez",
    "rol": "usuario",
    "mail_usuario": "david@gmail.com"
  }
   // te crea el POST
```

* metodo Put 
http://localhost:3000/usuarios/id
```bash 
body:
{
    "username": "Davidramirez",
    "password": "Davidramirez",
    "rol": "usuario",
    "mail_usuario": "david@gmail.com"
  }
   // actualizar datos de usuarios
```

* metodo Delete
http://localhost:3000/usuarios/id
  