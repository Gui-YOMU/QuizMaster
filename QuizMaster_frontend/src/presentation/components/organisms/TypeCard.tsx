import { useState } from "react";
import { Button } from "../atoms/Button";

interface TypeCardProps {
  type: {
    typeName: string;
    typeDescription: string;
    typeImageUrl: string;
  };
  onSelectType: (typeName: string) => void;
}

export const TypeCard = ({ type, onSelectType }: TypeCardProps) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative flex flex-col justify-center items-center gap-2 h-full p-2 border-2 border-mainblue rounded-xl"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h1>{type.typeName}</h1>
      <div className="h-4/5 border border-maingold">
        <img className="w-full h-full object-contain" src={type.typeImageUrl} alt={type.typeName} />
      </div>
      <Button
        bgColor="bg-mainblue"
        width="w-fit"
        content="Choisir"
        onClick={() => onSelectType(type.typeName)}
      />
      {hover && (
        <div className="absolute border-3 border-border bg-white rounded-xl p-2 w-9/10 mx-1">
          <p className="text-center">{type.typeDescription}</p>
        </div>
      )}
    </div>
  );
};
