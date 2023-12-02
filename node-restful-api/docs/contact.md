# Contact API Spec

## Create Contact API

Endpoint: POST /api/contacts/:contactId

Headers:
- Authorization: token

Request Body:
```json 
{
    "first_name": "panpan",
    "last_name": "wardiman",
    "email": "panpan@test.id",
    "phone": "123456789012"
}
```

Response Body Success:
```json 
{
    "data": {
        "id": "1",
        "first_name": "panpan",
        "last_name": "wardiman",
        "email": "panpan@test.id",
        "phone": "123456789012"
    }
}
```

Response Body Errors:
```json 
{
    "errors": "email is not valid"
}
```

## Update Contact API

Endpoint: PUT /api/contacts/:contactId

Headers:
- Authorization: token

Request Body:
```json 
{
   "first_name": "panpan",
    "last_name": "wardiman",
    "email": "panpan@test.id",
    "phone": "123456789012"
}
```

Response Body Success:
```json 
{
    "data": {
        "id": "1",
        "first_name": "panpan",
        "last_name": "wardiman",
        "email": "panpan@test.id",
        "phone": "123456789012"
    }
}
```

Response Body Errors:
```json 
{
    "errors": "email is not valid"
}
```

## Get Contact API

Endpoint: GET /api/contacts/:contactId

Headers:
- Authorization: token

Response Body Success:
```json 
{
    "data": {
        "id": "1",
        "first_name": "panpan",
        "last_name": "wardiman",
        "email": "panpan@test.id",
        "phone": "123456789012"
    }
}
```

Response Body Errors:
```json 
{
    "errors": "Contact not found."
}
```

## Search Contact API

Endpoint: GET /api/contacts

Headers:
- Authorization: token

Query Params
- name: search by first_name or last_name using like, optional
- email: search by email using like, optional
- phone: search by phone using like, optional
- page: number of page, default 1
- size: size of page, default 10

Response Body Success:
```json 
{
    "data": [
        {
            "first_name": "panpan",
            "last_name": "wardiman",
            "email": "panpan@test.id",
            "phone": "123456789012"
        },
    ],
    "paging": {
        "page": 1,
        "total_page": 3,
        "total_items": 10
    }
}
```

Response Body Errors:
```json 
{
    "errors": "Unauthorized"
}
```

## Remove Contact API

Endpoint: DELETE /api/contacts/:contactId

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
    "errors": "Contact not found."
}
```