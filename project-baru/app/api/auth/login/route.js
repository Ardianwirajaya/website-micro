import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

// HARD-CODED (as requested)
const uri = "mongodb+srv://admin:kopi123@cluster0.yp9uq6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let client;
let clientPromise;

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username dan Password wajib diisi!" },
        { status: 400 }
      );
    }

    const dbClient = await clientPromise;
    const db = dbClient.db("myDatabase");
    const collection = db.collection("users");

    const user = await collection.findOne({ username, password });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Username atau Password salah!" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Selamat datang, ${username}!`,
      username
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada database", error: error.message },
      { status: 500 }
    );
  }
}
