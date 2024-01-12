import style from "./Card.module.css";
import Image from "next/image";

export default function Card({
  image,
  title,
  value,
  id,
  onClick,
}: {
  id: number;
  value: string;
  title: string;
  image: string;
  onClick: () => void;
}) {
  return (
    <div className={style.card} key={id} onClick={onClick}>
      <img src={image} alt={title} width={300.19} height={300.19} />
      <span>{title}</span>
      <p>{value}</p>
    </div>
  );
}
