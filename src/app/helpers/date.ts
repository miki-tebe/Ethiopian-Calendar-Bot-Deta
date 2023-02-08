let ethiopic = require("ethiopic-js");

export function getDate() {
  // gregoraian date
  const gDate = new Date();
  // ethiopian date
  const eDate = ethiopic.toEthiopic(
    gDate.getFullYear(),
    gDate.getMonth() + 1,
    gDate.getDate()
  );
  return `Today's date in Ethiopian Calender is <code>${eDate[2]}/${eDate[1]}/${eDate[0]}</code>`;
}
