Despliegue

Se hace el despliegue en Docker, para lo cual se provee el archivo Dockerfile en la raíz del proyecto

Configurar en el archivo "src/app/environment.ts" la IP donde corren los microservicios:

export const environment = {
  production: false,
  musicStyleApiUrl: 'http://192.168.8.100:8082',
  surveyApiUrl: 'http://192.168.8.100:8081',
  scoreStyleApiUrl: 'http://192.168.8.100:8083',
  sessionTimeout: 600,
};


Generar imagen:

docker build -t angular-docker .

Ejecutar imagen:

docker run -p 4200:4200 angular-docker

El backend aceptará CORS desde localhost:4200
