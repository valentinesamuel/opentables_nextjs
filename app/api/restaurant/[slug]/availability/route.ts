import { Restaurant } from "./../../../../restaurant/[slug]/page";
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
      tables: true,
    },
  });

  const bookinTablesObj: { [key: string]: { [key: number]: true } } = {};
  bookings.forEach((booking) => {
    bookinTablesObj[booking.booking_time.toISOString()] = booking.tables.reduce(
      (obj, table) => {
        return {
          ...obj,
          [table.table_id]: true,
        };
      },
      {}
    );
  });
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      tables: true,
    },
  });

  if (!restaurant) {
    NextResponse.json(
      {
        errorMessage: "Invalid data provided",
      },
      { status: 400 }
    );
  }
  const tables = restaurant?.tables;

  const searchTimesWithTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables,
    };
  });

  return NextResponse.json({
    searchTimes,
    bookings,
    bookinTablesObj,
    tables,
    searchTimesWithTables,
  });
}
