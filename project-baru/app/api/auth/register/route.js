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

    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { message: "Username sudah terdaftar!" },
        { status: 400 }
      );
    }

    await collection.insertOne({ username, password });

    return NextResponse.json(
      { message: "Registrasi Berhasil ke MongoDB!" },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada database", error: error.message },
      { status: 500 }
    );
  }
}
