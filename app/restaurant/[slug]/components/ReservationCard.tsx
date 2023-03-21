"use client";
import { partySize as partySizes, times } from "@/data";
import useAvailabilities from "@/hook/useAvailabilities";
import { convertToDisplayTime } from "@/utils/convertToDisplayTime";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-datepicker";

const ReservationCard = ({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: String;
  slug: string;
}) => {
  const { data, loading, error, fetchAvailabilities } = useAvailabilities();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(openTime);
  const [partySize, setPartySize] = useState("1");
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split("T")[0]);
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  const filterTimeByRestaurantOpenWindow = () => {
    const timesWithinWindow: typeof times = [];
    let isWithinWindow = false;
    times.forEach((time) => {
      if (time.time === openTime) {
        isWithinWindow = true;
      }
      if (isWithinWindow) {
        timesWithinWindow.push(time);
      }
      if (time.time === closeTime) {
        isWithinWindow = false;
      }
    });
    return timesWithinWindow;
  };

  const handleClick = () => {
    fetchAvailabilities({
      slug,
      day,
      time,
      partySize,
    });
  };

  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select
          name=""
          className="py-3 border-b font-light"
          id=""
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
        >
          {partySizes.map((size, idx) => {
            return (
              <option value={size.value} key={idx}>
                {size.label}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className="py-3 border-b font-light text-reg w-28"
            dateFormat="MMM d"
            wrapperClassName="w-[15]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select
            name=""
            id=""
            className="py-3 border-b font-light"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            {filterTimeByRestaurantOpenWindow().map((time, idx) => {
              return (
                <option key={idx} value={time.time}>
                  {time.displayTime}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
          disabled={loading}
          onClick={handleClick}
        >
          {loading ? <CircularProgress /> : "Find a Time"}
        </button>
      </div>
      {data && data.length ? (
        <div className="mt-4">
          <p className="text-reg">Selet a time</p>
          <div className="flex flex-wrap mt-2">
            {data.map((time) => {
              return time.available ? (
                <Link
                  href={`/reserve/${slug}?date=${time.time}&partySize=${partySize}`}
                  className="bg-red-600 cursor-pointer p-2 text-center mb-3 rounded mr-3"
                >
                  <p className="text-s font-bold">{convertToDisplayTime(time.time)}</p>
                </Link>
              ) : (
                <p className="bg-gray-300 p-2 w-24 mb-3 roudned mr-3"></p>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReservationCard;
