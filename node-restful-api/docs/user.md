# User API Spec

## Register User API

Endpoint: POST /api/users

Request Body:
```json 
{
    "username": "panpan",
    "password": "admin",
    "name": "panpan wardiman"
}
```

Response Body Success:
```json 
{
    "data": {
        "username": "panpan",
        "name": "panpan wardiman"
    }
}
```

Response Body Errors:
```json 
{
    "errors": "Username already registered"
}
```

## Login User API

Endpoint: POST /api/users/login

Request Body:
```json 
{
    "username": "panpan",
    "password": "admin"
}
```

Response Body Success:
```json 
{
    "data": {
        "token": "unique-token"
    }
}
```

Response Body Errors:
```json 
{
    "errors": "Username or password wrong"
}
```

## Update User API

Endpoint: PATCH /api/users/current

Headers:
- Authorization: token

Request Body:
```json 
{
    "name": "panpan wardiman", // otpional
    "password": "admin" // optional
}
```

Response Body Success:
```json 
{
    "data": {
        "username": "panpan",
        "name": "panpan wardiman"
    }
}
```

Response Body Errors:
```json 
{
    "errors": "Name field required."
}
```

## Get User API

Endpoint: PATCH /api/users/current

Headers:
- Authorization: token

Response Body Success:
```json 
{
    "data": {
        "username": "panpan",
        "name": "panpan wardiman"
    }
}
```

Response Body Errors:
```json 
{
    "errors": "Unauthorized"
}
```

## Logout User API

Endpoint: DELETE /api/users/logout

Headers:
- Authorization: token

Response Body Success:
```json 
{
    "data": "OK"
}
```

Response Body Errors:
```json 
{
    "errors": "Unauthorized"
}
```