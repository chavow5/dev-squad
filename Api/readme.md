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
    "username": "Davidramirez1",
    "password": "Davidramirez1",
    "id_rol": 1,
    "mail": "david@gmail.com"
  }
   // te crea el POST
```

* metodo Put 
http://localhost:3000/usuarios/id
```bash 
body:
{
    "username": "Davidramirez1",
    "password": "Davidramirez1",
    "id_rol": 1,
    "mail": "david@gmail.com"
  }
   // actualizar datos de usuarios
```

* metodo Delete
http://localhost:3000/usuarios/id
  
## Prubas Crud en Thunder Client o Postman VEHICULOS
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
  "patente": "ABC123",
  "tipo_vehiculo": "Automovil"
}
   // te crea el POST
```

* metodo Put 
http://localhost:3000/vehiculos/id
```bash 
body:
{
  "patente": "ABC123",
  "tipo_vehiculo": "Automovil"
}
   // actualizar datos de usuarios
```

* metodo Delete
http://localhost:3000/vehiculos/id

## Prubas Crud en Thunder Client o Postman HISTORIAL
Get - Post - Put - Delete 

* metodo Get
http://localhost:3000/historial

* metodo Get por ID
http://localhost:3000/historial/id

* metodo Post
http://localhost:3000/historial
```bash 
body:
{
  "id_vehiculo": 1,
  "id_cabina": 2,
  "id_usuario": 3,
  "monto_pagado": 500
}
   // te crea el POST
```

* metodo Put 
http://localhost:3000/historial/id
```bash 
body:
{
  "cobros": 500,
  "id_vehiculo": 1,
  "username": "Davidramirez1" #usuario en db
}
   // actualizar datos de usuarios
```

* metodo Delete
http://localhost:3000/historial/id