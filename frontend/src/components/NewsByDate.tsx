import React, { useEffect, useState } from 'react';

interface NewsByDateProps {
  symbol: string;
  onSelect: (date: string) => void;
  sortDescending?: boolean;
}

const NewsByDate = ({ symbol, onSelect, sortDescending = false }: NewsByDateProps) => {
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/dates/${symbol}`)
      .then(res => res.json())
      .then(setDates);
  }, [symbol]);

  const sortedDates = sortDescending
    ? [...dates].sort((a, b) => (a < b ? 1 : -1))
    : [...dates].sort();

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">날짜 선택</h2>
      <select
        className="px-4 py-2 border rounded w-full"
        onChange={(e) => onSelect(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>날짜를 선택하세요</option>
        {sortedDates.map(date => (
          <option key={date} value={date}>{date}</option>
        ))}
      </select>
    </div>
  );
};

export default NewsByDate;
