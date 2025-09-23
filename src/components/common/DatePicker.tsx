/* eslint-disable react-hooks/exhaustive-deps */
import { IonItem, IonLabel, useIonPicker } from '@ionic/react';
import { useEffect, useState } from 'react';

interface Date {
  year: string;
  month: string;
  day: string;
}

interface Indexes {
  year: number;
  month: number;
  day: number;
}

const DEFAULT = { year: '', month: '', day: '' };
const INDEXES = { year: 0, month: 0, day: 0 };

const DatePicker = ({ label, setter, value, lines }: any) => {
  const [picker, dismissPicker] = useIonPicker();
  const [date, setDate] = useState<Date>(DEFAULT);
  const [indexes, setIndexes] = useState<Indexes>(INDEXES);

  const parse = (value: string) => {
    if (value.length === 1) return `0${value}`;
    return value;
  };

  const YEARS = [
    { text: '2021', value: '2021' },
    { text: '2022', value: '2022' },
    { text: '2023', value: '2023' },
    { text: '2024', value: '2024' },
    { text: '2025', value: '2025' },
    { text: '2026', value: '2026' },
    { text: '2027', value: '2027' },
    { text: '2027', value: '2027' },
    { text: '2028', value: '2028' },
    { text: '2029', value: '2029' },
    { text: '2030', value: '2030' },
    { text: '2031', value: '2031' },
    { text: '2032', value: '2032' },
    { text: '2033', value: '2033' },
    { text: '2034', value: '2034' },
    { text: '2035', value: '2035' },
  ];

  const MONTHS = [
    { text: 'Enero', value: '01' },
    { text: 'Febrero', value: '02' },
    { text: 'Marzo', value: '03' },
    { text: 'Abril', value: '04' },
    { text: 'Mayo', value: '05' },
    { text: 'Junio', value: '06' },
    { text: 'Julio', value: '07' },
    { text: 'Agosto', value: '08' },
    { text: 'Septiembre', value: '09' },
    { text: 'Octubre', value: '10' },
    { text: 'Noviembre', value: '11' },
    { text: 'Diciembre', value: '12' },
  ];

  const DAYS = Array.from({ length: 31 }, (x, i) => i + 1).map(
    (value: number) => {
      const num = parse(value.toString());
      return { text: num, value: num };
    },
  );

  const setDefaultDate = () => {
    if (value) {
      const [year, month, day] = value.split('-');
      setDate({ year, month, day });
      defineIndexes(year, month, day);
    }
  };

  useEffect(() => {
    setDefaultDate();
  }, [setDefaultDate]);

  const defineIndexes = (year: string, month: string, day: string) => {
    setIndexes({
      year: YEARS.map((item) => item.value).indexOf(year),
      month: MONTHS.map((item) => item.value).indexOf(month),
      day: DAYS.map((item) => item.value).indexOf(day),
    });
  };

  const displayDate = (date: Date) => {
    if (date.year !== '' && date.month !== '' && date.day !== '') {
      return `${date.year}-${date.month}-${date.day}`;
    }
  };

  const show = () => {
    picker({
      columns: [
        { name: 'day', options: DAYS, selectedIndex: indexes.day },
        { name: 'month', options: MONTHS, selectedIndex: indexes.month },
        { name: 'year', options: YEARS, selectedIndex: indexes.year },
      ],
      buttons: [
        {
          text: 'Confirmar',
          handler: (selected: any) => {
            const date: Date = {
              year: selected.year.value,
              month: selected.month.value,
              day: selected.day.value,
            };
            setDate(date);
            defineIndexes(
              selected.year.value,
              selected.month.value,
              selected.day.value,
            );
            setter(displayDate(date));
            dismissPicker(); // Cerrar el popover al confirmar
          },
        },
      ],
    });
  };

  return (
    <IonItem
      button
      onClick={show}
      lines={lines || 'none'}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <IonLabel
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {label}: {displayDate(date)}
      </IonLabel>
    </IonItem>
  );
};

export default DatePicker;
