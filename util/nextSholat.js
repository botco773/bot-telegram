const nextSholat = (timePrayer) => {
  let date = timePrayer.date;
  let nextDay = timePrayer.nextDay;

  const _date = (date, time) => new Date(date + " " + time);

  let subuh = _date(date, timePrayer.subuh),
    dhuha = _date(date, timePrayer.dhuha),
    dzuhur = _date(date, timePrayer.dzuhur),
    ashar = _date(date, timePrayer.ashar),
    maghrib = _date(date, timePrayer.maghrib),
    isya = _date(date, timePrayer.isya),
    nextsubuh = _date(nextDay, timePrayer.subuhNext);

  let jadwalsholat = [
    { label: "Subuh", value: subuh },
    { label: "Dhuha", value: dhuha },
    { label: "Dzuhur", value: dzuhur },
    { label: "Ashar", value: ashar },
    { label: "Maghrib", value: maghrib },
    { label: "Isya", value: isya },
    { label: "Subuh", value: nextsubuh },
  ];
  // jadwal sholat selanjutnya
  let now = new Date(); // initial date now
  let next =
    jadwalsholat.find((k) => now.getTime() < k.value.getTime()) ||
    jadwalsholat.find((k) => k.label == "Shubuh");
  let distance = next.value.getTime() - now.getTime();
  let distanceHours = Math.floor((distance / (1000 * 60 * 60 * 24)) * 24);
  let distanceMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let distanceSecond = Math.floor((distance % (1000 * 60)) / 1000);
  let teks = "";
  if (distanceHours > 0) {
    teks += distanceHours + " jam ";
  }

  teks += distanceMinutes + " menit";

  if (distanceHours == 0 && distanceMinutes == 0) {
    teks = distanceSecond + " detik";
  }

  return {
    countDown: teks,
    label: next.label,
  };
};
export default nextSholat;
