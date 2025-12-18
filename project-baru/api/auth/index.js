import { MongoClient } from 'mongodb';

// Link koneksi MongoDB Atlas Anda (Sudah saya masukkan password-nya)
const uri = "mongodb+srv://admin:kopi123@cluster0.yp9uq6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let client;
let clientPromise;

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  try {
    const dbClient = await clientPromise;
    const db = dbClient.db("myDatabase"); // Ini akan membuat database bernama 'myDatabase'
    const collection = db.collection("users"); // Data disimpan di tabel 'users'

    const { method } = req;
    const { username, password } = req.body || {};

    if (method === 'POST') {
      // LOGIKA REGISTRASI
      if (req.url.includes('/register')) {
        if (!username || !password) {
          return res.status(400).json({ message: "Username dan Password wajib diisi!" });
        }

        const existingUser = await collection.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ message: "Username sudah terdaftar!" });
        }
        
        await collection.insertOne({ username, password });
        return res.status(201).json({ message: "Registrasi Berhasil ke MongoDB!" });
      }

      // LOGIKA LOGIN
      if (req.url.includes('/login')) {
        const user = await collection.findOne({ username, password });
        if (user) {
          return res.status(200).json
	({
    		success: true,
    		message: `Selamat datang, ${username}!`,
    		username
  	});
        } else {
          return res.status(401).json
	({
  		success: false,
  		message: "Username atau Password salah!"
	});

        }
      }
    }

    // Jika diakses lewat browser biasa (GET)
    res.status(200).json({ message: "Auth Service Aktif dan Terhubung ke MongoDB." });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan pada database", error: error.message });
  }
}