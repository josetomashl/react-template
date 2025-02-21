import moment from 'moment';

export function css(...classes: string[]) {
  return classes.join(' ');
}

export function toPrice(str: number, isAbsolute = false) {
  const formatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 6,
  });
  return formatter.format(str).replace('-', isAbsolute ? '' : '-');
}

export function toDate(date: string, format = 'DD/MM/YYYY') {
  if (!date) {
    return null;
  }
  return moment.utc(date).local().format(format);
}

export function toTime(date: string, format = 'HH:mm:ss') {
  if (!date) {
    return null;
  }
  return moment.utc(date).local().format(format);
}

export function toDateTime(date: string, format = 'DD/MM/YYYY HH:mm:ss') {
  if (!date) {
    return null;
  }
  return moment.utc(date).local().format(format);
}
