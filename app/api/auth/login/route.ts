import { NextResponse } from "next/server";

export async function POST() {
  try {
    const body = {
        "username": "admin",
        "password": "Bonji456Tr@1234-PROD-SECURETY"
    };

    const res = await fetch( `https://api.truebuilders.in/api/admin/login?nonce=${Date.now()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Login failed" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data); // contains token
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
