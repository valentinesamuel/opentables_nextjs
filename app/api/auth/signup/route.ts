import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    name: "Nextjs GET",
    route: "api/auth/signup",
  });
}

export async function POST(req: NextRequest) {
  return NextResponse.json({
    name: "Nextjs POST",
    route: "api/auth/signup",
  });
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
