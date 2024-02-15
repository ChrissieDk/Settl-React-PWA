import React from "react";

interface BlockProps {
  header: string;
  subTitle: string;
  extra: string;
}

const Block: React.FC<BlockProps> = ({ header, subTitle, extra }) => {
  const [label, number] = header.split(" ");
  return (
    <div className="flex flex-col items-center justify-center bg-transparent rounded-3xl p-8 h-48 w-[90%] border-2 border-orange-400">
      <h2 className="text-3xl text-white font-bold">
        <span className="text-black">{label}</span>{" "}
        <span className="text-orange-400">{number}</span>
      </h2>
      <p className="text-md text-gray-600 mt-2">{subTitle}</p>
      <button className="text-sm text-orange-400 mt-2">{extra}</button>
    </div>
  );
};

export default Block;
