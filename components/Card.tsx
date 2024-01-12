import style from "./Card.module.css";
import Image from "next/image";

export default function Card({
  image,
  title,
  id,
  onClick,
}: {
  id: number;
  title: string;
  image: string;
  onClick: () => void;
}) {
  return (
    <div className={style.card} key={id} onClick={onClick}>
      <img src={image} alt={title} width={300.19} height={300.19} />
      <span>{title}</span>
    </div>
  );
}
