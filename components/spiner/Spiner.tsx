import { useState, CSSProperties } from "react";
import App from 'next/app';
import { BarLoader, ClipLoader } from "react-spinners";
import style from "@/styles/loader.module.scss"

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");


  return (
    <div className={style.sweet_loading}>

      <div className={"flex"}>
        <BarLoader
          color={color}
          loading={loading}
          cssOverride={override}
            // @ts-ignore
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>


    </div>
  );
}

