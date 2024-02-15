// BlocksContainer.tsx
import React from "react";
import Block from "./Block";

const BlocksContainer: React.FC = () => {
  const blocksData = [
    {
      header: "Step 1",
      subTitle: "Personalise your healthcare plan",
      extra: "Read more",
    },
    {
      header: "Step 2",
      subTitle: "Choose the payment option that best suits you.",
      extra: "Read more",
    },
    {
      header: "Step 3",
      subTitle: "Create your heallth tokens and redeem it at...",
      extra: "Read more",
    },
    {
      header: "Step 4",
      subTitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      extra: "Read more",
    },
    {
      header: "Step 5",
      subTitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      extra: "Read more",
    },
    {
      header: "Step 6",
      subTitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      extra: "Read more",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 place-items-center">
      {blocksData.map((block, index) => (
        <Block
          key={index}
          header={block.header}
          subTitle={block.subTitle}
          extra={block.extra}
        />
      ))}
    </div>
  );
};

export default BlocksContainer;
