import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  return NextResponse.json({
    name: "Nextjs GET",
    route: "api/auth/signup",
  });
}

export async function POST(request: NextRequest) {
  const { firstName, lastName, email, phone, city, password } =
    await request.json();
  const errors: string[] = [];
  const validationSchema = [
    {
      valid: validator.isLength(firstName, {
        min: 1,
        max: 20,
      }),
      errorMessage: "First name is invalid",
    },
    {
      valid: validator.isLength(lastName, {
        min: 1,
        max: 20,
      }),
      errorMessage: "Last name is invalid",
    },
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is invalid",
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: "Phone number is invalid",
    },
    {
      valid: validator.isLength(city, { min: 1 }),
      errorMessage: "City is invalid",
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
  if (userWithEmail) {
    return NextResponse.json(
      { errorMessage: "Email already exists!!" },
      { status: 400 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      password: hashedPassword,
      city,
      phone,
      email,
    },
  });

  return NextResponse.json(user);
}

export async function PUT(req: NextRequest) {
  return NextResponse.json({
    name: "Nextjs PUT",
    route: "api/auth/signup",
  });
}

export async function DELETE(req: NextRequest) {
  return NextResponse.json({
    name: "Nextjs DELETE",
    route: "api/auth/signup",
  });
}

export async function PATCH(req: NextRequest) {
  return NextResponse.json({
    name: "Nextjs PATCH",
    route: "api/auth/signup",
  });
}
