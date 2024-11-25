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
  "tipo_vehiculo": "Automovil",
  "precio_vehiculo": 1500,
  "pago_vehiculo": "efectivo",
  "categoria_precio": "1500",
  "id_usuario": 6,
  "username": "Davidramirez6"
  }
   // te crea el POST
```

* metodo Put 
http://localhost:3000/vehiculos/id
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
http://localhost:3000/vehiculos/id