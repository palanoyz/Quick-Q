const dotenv = require("dotenv");

dotenv.config();

const PORT = Number(process.env.PORT) || 8000;
const MONGO_URI = String(process.env.MONGO_URI);
const secret_jwt = process.env.SECRET_JWT;
const supabaseUrl = String(process.env.SUPABASE_URL);
const supabaseKey = String(process.env.SUPABASE_KEY);

module.exports = { PORT, MONGO_URI, secret_jwt, supabaseUrl, supabaseKey };