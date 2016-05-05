# Undemanding Server

Interact with remote pages through an HTTP server.

## Documentation

I had a lot of this, and then I added a ton of new functionality. So I want to start the documentation over, when things have settled down a bit. Feel free to get the process going by submitting a pull requests with some additions to this page, or markdown files in a `docs` folder...

## Endpoints

1. `GET /session` List sessions
2. `POST /session` Start a new session
3. `GET /session/{session}` View session details
4. `POST /session/{session}/close` Close a session
5. `GET /session/{session}/page` List pages
6. `POST /session/{session}/page` Create a new page
7. `GET /session/{session}/page/{page}` View page details
8. `POST /session/{session}/page/{page}/visit` Open new address in the page
9. `POST /session/{session}/page/{page}/run` Run a script in the page
10. `POST /session/{session}/page/{page}/resize` Resize the page
11. `POST /session/{session}/page/{page}/scroll` Scroll the page
12. `POST /session/{session}/page/{page}/zoom` Zoom the page
13. `POST /session/{session}/page/{page}/wait` Wait until network traffic stops for the page
14. `POST /session/{session}/page/{page}/capture` Capture PNG image data for the page

## Installation

```sh
$ git clone git@github.com:undemanding/server.git .
$ npm install
$ node src/server.js
```
