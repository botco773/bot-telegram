import sholatModel from "../model/sholatModel.js";
import nextSholat from "../util/nextSholat.js";
import emoji from "../database/emoji.js";
import formatDate from "../helper/formatData.js";

const template = async (idLokasi) => {
  const dateNow = new Date()
    .toISOString()
    .replace("-", "/")
    .split("T")[0]
    .replace("-", "/");

  const nextDay = new Date(new Date().setDate(new Date(dateNow).getDate() + 1))
    .toISOString()
    .replace("-", "/")
    .split("T")[0]
    .replace("-", "/");

  let dataQuran = await sholatModel.get(`jadwal/${idLokasi}/${dateNow}`);
  let dataQuranNextDay = await sholatModel.get(`jadwal/${idLokasi}/${nextDay}`);
  dataQuran.jadwal.subuhNext = dataQuranNextDay.jadwal.subuh;
  dataQuran.jadwal.nextDay = dataQuranNextDay.jadwal.date;
  let nextTimeSholat = nextSholat(dataQuran.jadwal);
  let { imsak, subuh, terbit, dhuha, dzuhur, ashar, maghrib, isya } =
    dataQuran.jadwal;

  let textTest = `
<b>Jadwal Sholat</b>
${dataQuran.lokasi}. ${formatDate.tanggal("2022-07-27")}
<b>${nextTimeSholat.countDown}</b> lagi menuju sholat <b>${
    nextTimeSholat.label
  }</b>
${emoji.imsak} imsak: ${imsak}
${emoji.subuh} subuh: ${subuh}
${emoji.terbit} terbit: ${terbit}
${emoji.dhuha} dhuha: ${dhuha}
${emoji.dzuhur} dzuhur: ${dzuhur}
${emoji.ashar} ashar: ${ashar}
${emoji.maghrib} maghrib: ${maghrib}
${emoji.isya} isya: ${isya}
    `;

  return textTest;
};

export default template;
