import React, { useState } from 'react';

const NewsViewer = ({ news }: { news: any[] }) => {
  const [index, setIndex] = useState(0);

  if (news.length === 0) return null;

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="border-b pb-2 mb-4">
        <h3 className="text-xl font-bold text-gray-900">{news[index].title}</h3>
        <a
          className="text-blue-500 underline text-sm mt-1 inline-block"
          href={news[index].link}
          target="_blank"
          rel="noreferrer"
        >
          뉴스 원문 사이트 이동
        </a>
      </div>
      <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
        {news[index].body}
      </div>
    </div>
  );
};

export default NewsViewer;
