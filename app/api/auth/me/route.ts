import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const bearerToken = request.headers.get("Authorization");

  const token = bearerToken?.split(" ")[1];
  if (!token) {
    return NextResponse.json(
      { errorMessage: "Unauthorized user (no token)" },
      { status: 401 }
    );
  }
  const payload = jwt.decode(token) as { email: string };
  if (!payload.email) {
    return NextResponse.json(
      { errorMessage: "Unauthorized user (token invalid)" },
      { status: 401 }
    );
  }
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      city: true,
      phone: true,
    },
  });

  return NextResponse.json(user);
}
