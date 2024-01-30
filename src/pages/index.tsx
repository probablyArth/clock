import { Inter } from "next/font/google";
import Clock from "@/components/Clock";
import React, { useEffect, useState } from "react";
import axios from "axios";
import secondsToHMS from "@/utils/secondsToHoursMinutes";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [timeZones, setTimeZones] = useState<string[] | null>(null);
  const [currOffSet, setCurrOffset] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 5, minutes: 30, seconds: 0 });

  useEffect(() => {
    (async () => {
      axios
        .get("https://worldtimeapi.org/api/timezone", {
          method: "GET",
        })
        .then((data) => data.data)
        .then((data: string[]) => {
          setTimeZones(data);
        })
        .catch((e) => {
          console.error(e);
        });
    })();
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    axios
      .get(`https://worldtimeapi.org/api/timezone/${e.target.value}`)
      .then((data) => data.data)
      .then((data: { raw_offset: number }) => {
        setCurrOffset(secondsToHMS(data.raw_offset));
      });
  };

  if (timeZones === null) return <h1>Loading...</h1>;
  return (
    <>
      <Head>
        <title>World Clock</title>
        <meta name="description" content="World Clock | @probablyarth" />
      </Head>
      <main
        className={`flex flex-col lg:flex-row min-h-screen w-full justify-center items-center gap-20 p-24 ${inter.className} `}
      >
        <Clock
          hoursDiff={currOffSet.hours}
          minutesDiff={currOffSet.minutes}
          secondsDiff={currOffSet.seconds}
          title="World Clock"
        />
        <div className="flex flex-col gap-4">
          <label htmlFor="select-timezone" className="font-bold">
            Select Timezone
          </label>
          <select
            className="p-4 border-black border-2 cursor-pointer"
            onChange={handleChange}
            defaultValue={"Asia/Kolkata"}
            id="select-timezone"
          >
            {timeZones.map((timezone, idx) => {
              return <option key={idx}>{timezone}</option>;
            })}
          </select>
        </div>
      </main>
    </>
  );
}
