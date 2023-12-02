# Address API Spec

## Create Address API

Endpoint: POST /api/contacts/:contactId/address

Request Body:
```json 
{
    "street": "Jl. Raya",
    "city": "Jakarta Pusat",
    "province": "DKI Jakarta",
    "country": "Indonesia",
    "postal_code": "12345"
}
```

Response Body Success:
```json 
{
    "data": {
        "id": "1",
        "street": "Jl. Raya",
        "city": "Jakarta Pusat",
        "province": "DKI Jakarta",
        "country": "Indonesia",
        "postal_code": "12345"
    }
}
```

Response Body Errors:
```json 
{
    "errors": "country field is required"
}
```

## Update Address API

Endpoint: PUT /api/contacts/:contactId/address/:id

Request Body:
```json 
{
    "street": "Jl. Raya",
    "city": "Jakarta Pusat",
    "province": "DKI Jakarta",
    "country": "Indonesia",
    "postal_code": "12345"
}
```

Response Body Success:
```json 
{
    "data": {
        "id": "1",
        "street": "Jl. Raya",
        "city": "Jakarta Pusat",
        "province": "DKI Jakarta",
        "country": "Indonesia",
        "postal_code": "12345"
    }
}
```

Response Body Errors:
```json 
{
    "errors": "country field is required"
}
```

## Get Address API

Endpoint: GET /api/contacts/:contactId/address/:id

Headers:
- Authorization: token

Response Body Success:
```json 
{
    "data": {
        "id": "1",
        "street": "Jl. Raya",
        "city": "Jakarta Pusat",
        "province": "DKI Jakarta",
        "country": "Indonesia",
        "postal_code": "12345"
    }
}
```

Response Body Errors:
```json 
{
    "errors": "Address not found."
}
```

## List Address API

Endpoint: GET /api/contacts/:contactId/address

Headers:
- Authorization: token

Response Body Success:
```json 
{
    "data": [
        {
            "id": "1",
            "street": "Jl. Raya",
            "city": "Jakarta Pusat",
            "province": "DKI Jakarta",
            "country": "Indonesia",
            "postal_code": "12345"
        },
    ]
}
```

Response Body Errors:
```json 
{
    "errors": "Unauthorized"
}
```

## Remove Address API

Endpoint: DELETE /api/contacts/:contactId/address/:id

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