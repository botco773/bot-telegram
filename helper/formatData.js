export default {
  tanggal(tgl = null, opt = null) {
    var options = opt
      ? opt
      : {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
    var date = tgl ? new Date(tgl) : new Date();
    return date.toLocaleDateString("id-ID", options);
  },
};
