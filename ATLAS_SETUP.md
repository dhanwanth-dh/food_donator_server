Use MongoDB Atlas for deployment by replacing the local connection string in `server/.env`.

Current local value:
`MONGODB_URI=mongodb://127.0.0.1:27017/foodbridge`

Atlas format:
`MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/foodbridge?retryWrites=true&w=majority&appName=FoodBridge`

Checklist before deploy:
1. Create a MongoDB Atlas cluster.
2. Create a database user with read and write access.
3. Add your deployment server or hosting platform IP to Atlas Network Access.
4. Replace `MONGODB_URI` in `server/.env` or your hosting provider environment variables.
5. Keep `.env` out of git and only commit `.env.example`.

Important:
- MongoDB Compass is only a client app. Your actual app is using whatever URI is in `MONGODB_URI`.
- For production, set `CLIENT_URL` to your deployed frontend URL.
