import { times } from "@/data";
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
  const searchTimes = times.find((t) => {
    return t.time === time;
  })?.searchTimes;
  if (!searchTimes) {
    return NextResponse.json(
      {
        errorMessage: "Invalid data provided",
      },
      { status: 400 }
    );
  }

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true
    }
  });

  return NextResponse.json({ searchTimes, bookings });
}
