# Documentação API

## API para gerenciamento de usuários e autenticação.
## Endpoints
### 1. Criar Usuário
**POST** `/api/users/register`
Cria um novo usuário com os dados fornecidos.
#### Request Body
```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```

#### Response
```json
{
  "id": "integer",
  "username": "string",
  "email": "string"
}
```
### 2. Autenticar Usuário
**POST** `/api/users/login`
Autentica um usuário com as credenciais fornecidas.
#### Request Body
```json
{
  "email": "string",
  "password": "string"
}
```
#### Response
```json
{
  "session": "string",
  "user": {
    "id": "_id",
    "username": "string",
    "email": "string"
  }
}
```
### 3. Obter Usuário
**GET** `/api/users/{id}`
Obtém os detalhes de um usuário específico.
#### Response
```json
{
  "id": "integer",
  "username": "string",
  "email": "string"
}
```
### 4. Atualizar Usuário
**PUT** `/api/users/{id}`
Atualiza os dados de um usuário específico.
#### Request Body
```json
{
  "username": "string",
  "email": "string"
}
```
#### Response
```json
{
  "id": "integer",
  "username": "string",
  "email": "string"
}
```
### 5. Deletar Usuário
**DELETE** `/api/users/{id}`
Deleta um usuário específico.
#### Response
```json
{
  "message": "Usuário deletado com sucesso"
}
```
### 6. Listar Usuários
**GET** `/api/users`
Obtém uma lista de todos os usuários.
#### Response
```json
[
  {
    "id": "integer",
    "username": "string",
    "email": "string"
  }
]
```
## Médicos
### 1. Criar Médico
**POST** `/api/physicians/register`
Cria um novo médico com os dados fornecidos.
#### Request Body
```json
{
  "name": "string",
  "specialty": "string",
  "clinic": "string",
  "email": "string",
  "availableDays": ["segunda", "terça", "quarta", "quinta", "sexta"]
}   
```

#### Response
```json
{
  "id": "integer",
  "name": "string",
  "specialty": "string",
  "clinic": "string",
  "email": "string",
  "availableDays": ["segunda", "terça", "quarta", "quinta", "sexta"]
}
```
### 2. Listar Médicos
**GET** `/api/physicians`
Obtém uma lista de todos os médicos.
#### Response
```json
[
  {
    "id": "integer",
    "name": "string",
    "specialty": "string",
    "clinic": "string",
    "email": "string",
    "availableDays": ["segunda", "terça", "quarta", "quinta", "sexta"]
  }
]
```
### 3. Obter Médico
**GET** `/api/physicians/{id}`
Obtém os detalhes de um médico específico.
#### Response
```json
{
  "id": "integer",
  "name": "string",
  "specialty": "string",
  "clinic": "string",
  "email": "string",
  "availableDays": ["segunda", "terça", "quarta", "quinta", "sexta"]
}
```
### 4. Atualizar Médico
**PUT** `/api/physicians/{id}`
Atualiza os dados de um médico específico.
#### Request Body
```json
{
  "name": "string",
  "specialty": "string",
  "clinic": "string",
  "email": "string",
  "availableDays": ["segunda", "terça", "quarta", "quinta", "sexta"]
}
```

#### Response
```json
{
  "id": "integer",
  "name": "string",
  "specialty": "string",
  "clinic": "string",
  "email": "string",
  "availableDays": ["segunda", "terça", "quarta", "quinta", "sexta"]
}
```
### 5. Deletar Médico
**DELETE** `/api/physicians/{id}`
Deleta um médico específico.
#### Response
```json
{
  "message": "Médico deletado com sucesso"
}
```
### 6. Autenticar Médico
**POST** `/api/physicians/login`
Autentica um médico com as credenciais fornecidas.
#### Request Body
```json
{
  "email": "string",
  "password": "string"
}
```
#### Response
```json
{
  "session": "string",
  "physician": {
    "id": "_id",
    "name": "string",
    "specialty": "string",
    "clinic": "string",
    "email": "string",
    "availableDays": ["segunda", "terça", "quarta", "quinta", "sexta"]
  }
}
```
## Consultas(appointments)
### 1. Criar Consulta
**POST** `/api/appointments`
Cria uma nova consulta com os dados fornecidos.
#### Request Body
```json
{
  "physicianId": "integer",
  "patientId": "integer",
  "date": "string", // Formato: 2023-10-01T10:00:00Z // Data e hora da consulta
}
```
#### Response
```json
{
  "id": "integer",
  "physicianId": "integer",
  "patientId": "integer",
  "date": "string", // Formato: 2023-10-01T10:00:00Z
  "clinic": "string",
  "consultationType": "string"
}
```
### 2. Listar Consultas
**GET** `/api/appointments`
Obtém uma lista de todas as consultas.
#### Response
```json
[
  {
    "id": "integer",
    "physicianId": "integer",
    "patientId": "integer",
    "date": "string", // Formato: 2023-10-01T10:00:00Z
    "clinic": "string",
    "consultationType": "string"
  }
]
```
### 3. Obter Consulta
**GET** `/api/appointments/{id}`
Obtém os detalhes de uma consulta específica.
#### Response
```json
{
  "id": "integer",
  "physicianId": "integer",
  "patientId": "integer",
  "date": "string", // Formato: 2023-10-01T10:00:00Z
  "clinic": "string",
  "consultationType": "string"
}
```
### 4. Atualizar Consulta
**PUT** `/api/appointments/{id}`
Atualiza os dados de uma consulta específica.
#### Request Body
```json
{
  "physicianId": "integer",
  "patientId": "integer",
  "date": "string", // Formato: 2023-10-01T10:00:00Z
  "clinic": "string",
  "consultationType": "string"
}
```
#### Response
```json
{
  "id": "integer",
  "physicianId": "integer",
  "patientId": "integer",
  "date": "string", // Formato: 2023-10-01T10:00:00Z
  "clinic": "string",
  "consultationType": "string"
}
```
### 5. Deletar Consulta
**DELETE** `/api/appointments/{id}`
Deleta uma consulta específica.
#### Response
```json
{
  "message": "Consulta deletada com sucesso"
}
```
