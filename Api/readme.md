## Bloc de notas - Api

instalar dependecias primero
``npm install``

desde app ejecuto 
``node app.js`` 

es para el login y base de datos

## Prubas Crud en Thunder Client o Postman USUARIOS
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
  
## Prubas Crud en Thunder Client o Postman Vehiculos
Get - Post - Put - Delete 

* metodo Get
http://localhost:3000/vehiculos

* metodo Get por ID
http://localhost:3000/vehiculos/id

* metodo Post
http://localhost:3000/vehiculos
```bash 
body:
{
    "tipo_vehiculo": "Automoviles",
    "precio_vehiculo": 1500,
    "pago_vehiculo": "efectivo",
    "categoria_precio": "2000",
    "id_usuario": 1, # id de usuario
    "username": "Ceciliabolado1"  # usuario que este en la DB
  }
   // te crea el POST
```

* metodo Put 
http://localhost:3000/vehiculos/id
```bash 
body:
{
    "tipo_vehiculo": "Camiones",
    "precio_vehiculo": 2500,
    "pago_vehiculo": "efectivo",
    "categoria_precio": "2000",
    "id_usuario": 1, # id de usuario
    "username": "Ceciliabolado1" #usuario que este en la DB
  }
   // actualizar datos de usuarios
```

* metodo Delete
http://localhost:3000/vehiculos/id