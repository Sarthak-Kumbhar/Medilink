# Medilink

AI powerd Learning platform for enrich and clear the concept

![Interface](src/assets/interface.webp)

## Installation / Setup ✨

1. First Clone
    ```bash
    git clone https://github.com/Sarthak-Kumbhar/Medilink.git
2. create .env
    ```bash
    touch .env

    #copy and paste this
    VITE_GOOGLE_CLIENT_ID= #get it from google cloud console
    VITE_COHERE_API_KEY= # cohere ai
3. Install Dependencies
    ```bash
    npm install
4. Finally Run 🎉
    ```bash
    npm run dev
## Backend Setup

```bash
1. cd backend 
    
2. touch .env

# copy and paste
DB_URL= # db url
PORT= # port number
HOST= # host like localhost
JWT_SEC= # get it from jwt.io
JWT_EX= # something like 2h
NODE_ENV= # developement or production only
```
```bash
npm install
```
```bash
npm run start
```