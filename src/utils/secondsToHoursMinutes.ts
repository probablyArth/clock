const secondsToHMS = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return {
    hours: hours,
    minutes: minutes,
    seconds: remainingSeconds,
  };
};

export default secondsToHMS;
