import Switch from "react-switch";
import styles from "./header.module.css";
import LayerxIcon from "@/assets/icons/layerx-icon";
import Link from "next/link";
import Cart from "@/components/cart/cart";

export default function Header({
  isSwitchChecked,
  onSwitchChange,
}: {
  isSwitchChecked: boolean;
  onSwitchChange: (e: boolean) => void;
}) {
  return (
    <header className={styles.header}>
      <div>
        <Link href="/" passHref>
          <a>Store</a>
        </Link>
        <Link href="https://layerx.xyz/" passHref>
          <a target="__blank">About Us</a>
        </Link>
      </div>
      <LayerxIcon />
      <div>
        <Cart />
        {isSwitchChecked ? "Dark" : "Light"}:
        <Switch
          checked={isSwitchChecked}
          onChange={onSwitchChange}
          uncheckedIcon={false}
          checkedIcon={false}
          onHandleColor="#dfeaf3"
          onColor="#5e5e5e"
          height={20}
          width={48}
          handleDiameter={30}
        />
      </div>
    </header>
  );
}
