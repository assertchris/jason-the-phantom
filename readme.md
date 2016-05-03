# Jason The Phantom

Interact with PhantomJS through a JSON interface.

## Installation

```sh
$ git clone git@github.com:assertchris/jason-the-phantom.git .
$ npm install
$ node src/server.js
```

## Endpoints

1. [List Sessions](#list-sessions)
2. [Create Session](#create-session)
3. [View Session](#view-session)
4. [List Pages](#list-pages)
5. [Create Page](#create-page)
6. [View Page](#view-page)
7. [Visit Address With Page](#visit-address-with-page)
8. [Run JavaScript Code On Page](#run-javascript-code-on-page)

### List Sessions

Jason supports multiple concurrent sessions. Each time you [create a new session](#create-session),
you'll get a unique session identifier. This endpoint returns a list of open sessions.

Request format:

```sh
$ curl
    --request GET
    "http://localhost:4321/session"
```

Response format:

```json
{
    "status": "ok",
    "sessions": [
        {
            "id": 1
        },
        {
            "id": 2
        },
        {
            "id": 3
        }
    ]
}
```

### Create Session

This endpoint creates a new session, and returns its unique identifier.

Request format:

```sh
$ curl
    --request POST
    "http://localhost:4321/session"
```

Response format:

```json
{
    "status": "ok",
    "session": {
        "id": 4
    }
}
```

### View Session

This endpoint returns an identified session.

```sh
$ curl
    --request GET
    "http://localhost:4321/session/4"
```

Response format:

```json
{
    "status": "ok",
    "session": {
        "id": 4
    }
}
```

### List Pages

This endpoint returns a list of pages for the current session.

```sh
$ curl
    --request GET
    "http://localhost:4321/session/4/page"
```

Response format:

```json
{
    "status": "ok",
    "pages": [
        {
            "id": 1,
            "returned": null,
            "address": null,
            "status": null,
            "body": null
        },
        {
            "id": 2,
            "returned": null,
            "address": null,
            "status": null,
            "body": null
        },
        {
            "id": 3,
            "returned": null,
            "address": null,
            "status": null,
            "body": null
        }
    ]
}
```

### Create Page

This endpoint creates a new page in the current session, and returns its unique identifier.

Request format:

```sh
$ curl
    --request POST
    "http://localhost:4321/session/4/page"
```

Response format:

```json
{
    "status": "ok",
    "page": {
        "id": 4,
        "returned": null,
        "address": null,
        "status": null,
        "body": null
    }
}
```

### View Page

This endpoint returns an identified page.

```sh
$ curl
    --request GET
    "http://localhost:4321/session/4/page/4"
```

Response format:

```json
{
    "status": "ok",
    "page": {
        "id": 4,
        "returned": null,
        "address": null,
        "status": null,
        "body": null
    }
}
```

### Visit Address With Page

This endpoint opens an address in an identified page, as though you were opening it in a browser.
Future requests to [view the page](#view-page) will have the address, status, and body.

```sh
$ curl
    --request POST
    --data "address=http%3A%2F%2Fassertchris.io"
    "http://localhost:4321/session/4/page/4/visit"
```

Response format:

```json
{
    "status": "ok",
    "page": {
        "id": 4,
        "returned": null,
        "address": "https://medium.com/@assertchris",
        "status": "success",
        "body": "..."
    }
}
```

### Run JavaScript Code On Page

This endpoint runs a provided script on the page, and assigns the returned value to the page.

```sh
$ curl
    --request POST
    --data "script=document.write%28%27hello%27%29%3B+return+%27success%27%3B"
    "http://localhost:4321/session/4/page/4/run"
```

Response format:

```json
{
    "status": "ok",
    "page": {
        "id": 4,
        "returned": "success",
        "address": "https://medium.com/@assertchris",
        "status": "success",
        "body": "<html><head></head><body>hello</body></html>"
    }
}
```
