Como ejecutar el proyecto:

	- Una vez clonado el repositorio, abriremos este mismo en VSCode
	- Abriremos una terminal bash y nos dirigiremos a la carpeta a ejecutar con los siguientes comandos:
		1.  cd automoviles-app
		2.  cd server
	Estando ahí instalaremos lo necesario para el proyecto ejecutando los siguientes comandos:
		npm init -y
		npm install express mongoose jsonwebtoken bcryptjs cors dotenv socket.io
		
	Modificaremos el archivo .env para agregar una DB de Mongo con los datos locales
		//Aqui va la URI que usaremos para conectar con Mongo, basta con crear una DB llamada 
		MONGODB_URI=mongodb://localhost:27017/automoviles_db
		//Aqui se tiene que poner un hash secreto para conectar a la DB
		JWT_SECRET=a48b51c05003ccb7266b56c36cdc0480aebc44f9f2dc8c0f59e4d96cfbc5f400
		//Finalmente el puerto de la DB, por defecto habitualmente es el 5000
		PORT=5000
	Una vez realizado se pueden ejecutar las consultas a partir de los metodos escr
