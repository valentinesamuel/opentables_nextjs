import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const errors: string[] = [];
  const validationSchema = [
    {
      valid: validator.isLength(email, { min: 1 }),
      errorMessage: "Email is invalid",
    },
    {
      valid: validator.isStrongPassword(password),
      errorMessage: "Password is invalid",
    },
  ];
  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });

  if (errors.length) {
    return NextResponse.json({ errorMessage: errors[0] }, { status: 400 });
  }

  const userWithEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!userWithEmail) {
    return NextResponse.json(
      { errorMessage: "Email or password is invalid" },
      { status: 401 }
    );
  }
    const isMatch = await bcrypt.compare(password, userWithEmail.password);
    if (!isMatch) {
         return NextResponse.json(
           { errorMessage: "Email or password is invalid" },
           { status: 401 }
         );
    }
  const alg = "HS256";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new jose.SignJWT({ email: userWithEmail.email })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(secret);

  return NextResponse.json(token);
}
