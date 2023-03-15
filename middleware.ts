import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest, res: NextResponse) {
  const bearerToken = request.headers.get("Authorization");
  if (!bearerToken) {
    return NextResponse.json(
      { errorMessage: "Unauthorized user (no bearer token)" },
      { status: 401 }
    );
  }
  const token = bearerToken.split(" ")[1];
  if (!token) {
    return NextResponse.json(
      { errorMessage: "Unauthorized user (no token)" },
      { status: 401 }
    );
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return NextResponse.json(
      { errorMessage: "Unauthorized user (token invalid)" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: '/api/auth/me'
}