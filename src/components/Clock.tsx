import React, { useState, useEffect, FC } from "react";

const Clock: FC<{
  title: string;
  hoursDiff: number;
  minutesDiff: number;
  secondsDiff: number;
}> = ({ title, hoursDiff, minutesDiff, secondsDiff }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const formatTime = (time: number) =>
    time < 10 ? parseInt(`0${time}`) : time;

  const handleDate = () => {
    const date = new Date(
      new Date().toLocaleString("en-US", { timeZone: "GMT" })
    );
    date.setHours(date.getHours() + hoursDiff);
    date.setMinutes(date.getMinutes() + minutesDiff);
    date.setSeconds(date.getSeconds() + secondsDiff);
    setHours(formatTime(date.getHours()));
    setMinutes(formatTime(date.getMinutes()));
    setSeconds(formatTime(date.getSeconds()));
  };

  useEffect(() => {
    const clockInterval = setInterval(() => {
      handleDate();
    }, 1000);

    return () => clearInterval(clockInterval);
  }, [hoursDiff, minutesDiff, secondsDiff]);

  const secondsStyle = {
    transform: `rotate(${seconds * 6}deg)`,
  };
  const minutesStyle = {
    transform: `rotate(${minutes * 6}deg)`,
  };
  const hoursStyle = {
    transform: `rotate(${hours * 30}deg)`,
  };

  return (
    <div
      className={"flex flex-col  items-center border-2 border-black p-10 gap-4"}
    >
      <h3 className="font-bold text-3xl font-mono">{title}</h3>
      <div className={"analog-clock"}>
        <div className={"dial seconds"} style={secondsStyle} />
        <div className={"dial minutes"} style={minutesStyle} />
        <div className={"dial hours"} style={hoursStyle} />
      </div>
      <div className={"flex gap-2 border-2 border-black border-dashed p-2"}>
        <DigitalClockElement time={hours} />:
        <DigitalClockElement time={minutes} />:
        <DigitalClockElement time={seconds} />
      </div>
    </div>
  );
};

const DigitalClockElement: FC<{ time: number }> = ({ time }) => {
  return <span>{time}</span>;
};

export default Clock;
