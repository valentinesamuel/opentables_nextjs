import { getQueryParams } from "@/utils/getQueryParams";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, context: { params: any }) {
  const { slug, day, time, partySize } = getQueryParams(request.url);
  console.log({ slug, day, time, partySize });

  if (!day || !time || !partySize) {
    return NextResponse.json(
      {
        errorMessage: "Invalid request",
      },
      { status: 400 }
    );
  }
  // {
  //     params: {
  //       slug: "whatevs";
  //     }
  //   }

  return NextResponse.json({ slug, day, time, partySize });
}
