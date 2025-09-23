import moment from 'moment';
import momentBusines from 'moment-business-days';
import 'moment/locale/es';

const FORMAT = {
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  DATE: 'YYYY-MM-DD',
  TIME: 'h:mm:ss a',
};

moment.locale('es');

const format = (date: Date) => {
  return moment(date, FORMAT.DATETIME);
};

const toString = (date: Date, time: boolean = false) => {
  const pattern = time ? FORMAT.DATETIME : FORMAT.DATE;
  return format(date).format(pattern);
};

const toFormatHour = (date: number) => {
  if (date >= 28800000) {
    return ` 8 hora con 0 minutos y 0 segundos`;
  } else {
    var seconds = moment.duration(date).seconds();
    var minutes = moment.duration(date).minutes();
    var hour = moment.duration(date).hours();

    return ` ${hour} hora con ${minutes} minutos y ${seconds} segundos`;
  }
};

/** Retorna una fecha como tiempo en string */
const toStringTime = (date: Date) => {
  return format(date).format(FORMAT.TIME);
};

/** Retorna una fecha como tiempo en string */
const toStringandTime = (date: Date) => {
  const _date = new Date(date);
  const weekday = _date.toLocaleDateString('es-EC', { weekday: 'long' });
  const dates = format(_date).format(FORMAT.DATE);
  const time = _date.toLocaleTimeString('es-EC', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  return `Día: ${weekday}\nFecha: ${dates}\nHora: ${time}`;
};

/** Retorna la diferencia de horas entre dos fechas con un formato diferente*/
const hoursFormat = (init: any, end: any) => {
  const initTime = moment(init, 'hh:mm A');
  const endTime = moment(end, 'hh:mm A');
  const result = moment.duration(endTime.diff(initTime));
  //const hourNumber = moment.duration(endTime.diff(initTime)).asHours();
  const hour = result.hours() + ' hora ' + result.minutes() + ' minutos ';
  return hour;
};

const dayFormat = (init: string, end: string) => {
  const initDay = momentBusines(init, 'YYYY-MM-DD');
  const endDay = momentBusines(end, 'YYYY-MM-DD');
  const dayNumber = initDay.businessDiff(endDay) + 1;
  return dayNumber;
};

/** Suma dos horas diferentes*/
const sumHour = (inithour: any, endhour: any) => {
  const inDate = toStringTime(inithour);
  const outDate = toStringTime(endhour);
  const sum = hoursFormat(inDate, outDate);
  if (inDate === 'Invalid date' && outDate === 'Invalid date') return '0';
  else return sum;
};

/** Sumar la diferencia de dias*/
const sumDay = (initday: any, endday: any) => {
  if (initday !== undefined || endday !== undefined) {
    const inDay = toString(initday);
    const outDay = toString(endday);
    const sum = dayFormat(inDay, outDay);
    if (inDay === 'Invalid date' && outDay === 'Invalid date') return 0;
    else return sum;
  } else {
    return 0;
  }
};

const hourFormatTimer = (time: any) => {
  const date = moment(time).startOf('day');
  const formattedTime = date.format('HH:mm:ss');
  return formattedTime;
};

//Dias de la semana
const daysWeek = (date: any) => {
  const diaDeLaSemana = moment(date).format('dddd');
  return diaDeLaSemana;
};

const groupDates = (date: any) => {
  const dateGroupe = moment(date).endOf('day').format('YYYY-MM-DD');
  return dateGroupe;
};
export const dates = {
  format,
  toString,
  toFormatHour,
  sumHour,
  sumDay,
  hourFormatTimer,
  daysWeek,
  groupDates,
  toStringandTime,
};
