para hacer funcionar BACKEND:

npm install


dependencias o pasos que use y quiza sean necesarios:


npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt class-validator cookie-parser
npm install prisma --save-dev  
npx prisma init 
npm install @prisma/client   
npm install @nestjs/config 
npm install -g dotenv-cli  
npx prisma migrate dev --name "init-proyecto-completo"
npm install -D @types/express
npm install @nestjs/mapped-types
npm install -D @types/multer


Crear Usuario Freelancer: {{baseUrl}}/auth/register
{
  "email": "freelancer@test.com",
  "password": "password123",
  "firstName": "Franco",
  "lastName": "Freelancer"
}

Vamos a prisma studio con: npx prisma studio
Copiamos el id del usuario en mi caso: cmhmjutrh00008px4p7a5k253

Luego el cliente: {{baseUrl}}/auth/register

{
  "email": "cliente@test.com",
  "password": "password123",
  "firstName": "Carla",
  "lastName": "Cliente",
  "role": "CLIENT"
}

Hacemos Login como Freelancer:
{{baseUrl}}/auth/login

{
  "email": "freelancer@test.com",
  "password": "password123"
}

Luego:PUT {{baseUrl}}/profile/me

{
  "bio": "Soy un desarrollador experto en NestJS y React."
}

Luego: PUT {{baseUrl}}/profile/payment

{
  "bankName": "BBVA",
  "accountHolder": "Franco Freelancer",
  "accountNumber": "CLABE 012345678901234567"
}

Agregar proyecto: {{baseUrl}}/projects

{
  "name": "E-commerce para Tienda de Ropa",
  "description": "Un e-commerce completo con carrito de compras.",
  "paymentMode": "HALFHUP"
}

Luego copiar el id del proyecto en respuesta en mi caso: cmhmkkyph00068pzs4q82t2bl

Y lo pones para obtener el codigo de invitacion
{{baseUrl}}/projects/{{projectId}}/code

Y recibes una 

{
    "invitationCode": "cmhmkkyph00078pzsecewccgc"
}

Luego haces lgout

POST {{baseUrl}}/auth/logout


Luego login como cliente

{{baseUrl}}/auth/login

{
  "email": "cliente@test.com",
  "password": "password123"
}


Y entra a {{baseUrl}}/invitations/join

le manda la invitacion

{
  "invitationCode": "cmhmkkyph00078pzsecewccgc"
}


Y deberia devolver: 
{
    "message": "Te has unido al proyecto exitosamente"
}

Luego logout otra vez {{baseUrl}}/auth/logout

Luego hacemos login otra vez como freelancer {{baseUrl}}/auth/login

{
  "email": "freelancer@test.com",
  "password": "password123"
}

Luego creamos unos requirement en {{baseUrl}}/requirements

{
  "description": "Módulo 1: de autenticación de usuarios (Login/Registro)",
  "projectId": "cmhmkkyph00068pzs4q82t2bl"
}

{
  "description": "Módulo 2: de Perfil de Usuario",
  "projectId": "cmhmkkyph00068pzs4q82t2bl"
}

{
  "description": "Módulo 3: Otros perfiles de usuarios",
  "projectId": "cmhmkkyph00068pzs4q82t2bl"
}

Ahora ya podemos editar un requerimiento:
PATCH {{baseUrl}}/requirements/{{requirementId}}


{
  "description": "Módulo ONE: de autenticación (Login/Registro con Google)"
}


Luego ya el freelancer los manda a revision
{{baseUrl}}/projects/cmhmkkyph00068pzs4q82t2bl/requirements/submit

Luego hacemos logout
en {{baseUrl}}/auth/logout

Y login como cliente: {{baseUrl}}/auth/login
{
  "email": "cliente@test.com",
  "password": "password123"
}

Entonces ya elige el cliente: {{baseUrl}}/projects/cmhmkkyph00068pzs4q82t2bl/requirements/review
por ejemplo:
{
  "action": "APPROVE"
}


Luego hacemos logout como cliente, y login como freelancer

Y generamos el contrato

{{baseUrl}}/contracts

{
  "projectId": "cmhmkkyph00068pzs4q82t2bl",
  "price": 2500.0,
  "includesIva": false
}


Ahora el freelancer lo "manda" al cliente
{{baseUrl}}/contracts/{{contractId}}/submit

{
    "message": "Contrato enviado a revisión"
}


Luego LOGOUT como freelancer
y login como cliente



El cliente actualiza en {{baseUrl}}/contracts/{{contractId}}/review
{
  "action": "APPROVE"
}


Ahora el cliente quiere los datos de cuenta del freelancer
{{baseUrl}}/profile/project-payment/cmhmkkyph00068pzs4q82t2bl

y obtiene:
{
    "id": "cmhmkjih800038pzslezbiojn",
    "bankName": "BBVA",
    "accountHolder": "Franco Freelancer",
    "accountNumber": "CLABE 012345678901234567",
    "userId": "cmhmjutrh00008px4p7a5k253"
}

Y sube la prueba
{{baseUrl}}/projects/cmhmkkyph00068pzs4q82t2bl/upload-proof

aqui en vez de raw es a form-data, le pones file, pones una imagen de tu pc


Luego te sales como cliente y te metes como freelancer, ya se, que fastidio

el freelancer aprueba en {{baseUrl}}/proofs/cmhmoop4h00018px4i3hopisd/review
con: 
{
  "action": "APPROVE"
}


Aqui el freelancer obtiene todas las tareas del proyecto:
{{baseUrl}}/projects/cmhmkkyph00068pzs4q82t2bl/tasks


y las puede mover en patch {{baseUrl}}/tasks/{{taskId}}/status

{
  "status": "INPROGRESS"
}

aqui sube una imagen del task:(para que sube imagenes? pues porque estas se van a usar para crear el portfolio del freelancer)
{{baseUrl}}/tasks/{{taskId}}/image


subes una en formdata en vez de raw


luego en patch mueves tarea a finalizado

{{baseUrl}}/tasks/{{taskId}}/status

{
  "status": "DONE"
}

haces esto para cada task igual se puede omitir el inprogress



y completamos el proyecto en: {{baseUrl}}/projects/cmhmkkyph00068pzs4q82t2bl/complete

y obtenemos

{
    "message": "Proyecto finalizado, esperando pago final."
}


Luego logout como freelancer y login como cliente

Luego el cliente sube el comprobante del pago final

{{baseUrl}}/projects/{{projectId}}/upload-proof


Logout y luego login como freelancer

se aprueba el pago final:{{baseUrl}}/proofs/{{proofId2}}/review

{ "action": "APPROVE" } se obtiene:

{
    "message": "Pago aprobado"
}



se hace publico el proyecto:
PATCH {{baseUrl}}/projects/{{projectId}}/visibility

{
  "isPublic": true
}


haces logout: POST {{baseUrl}}/auth/logout

y puedes ver el perfil publico del man

GET {{baseUrl}}/portfolio/{{freelancerId}}

