"use client";
import Styles from "./Card.module.css";
import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import Image from "next/image";
// import { track } from '@vercel/analytics';
import Link from "next/link";
import { useTranslation } from "react-i18next";

// import Button from "./Button";

function Card({ imagen, link, bonus }) {
  const { t } = useTranslation();

  const [show, setShown] = useState(false);

  const props3 = useSpring({
    opacity: 1,
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)",
  });

  const [newUrl, setNewUrl] = useState("");
  // Чтение сохраненной ссылки из локального хранилища
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUrl = localStorage.getItem("savedUrl");
      setNewUrl(savedUrl);
    }
  }, []);

  console.log("savedurl", newUrl);

  return (
    <animated.div
      className={Styles.card}
      style={props3}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <Link
        className="target-top-brand"
        href={`${link}/${newUrl}`}
        target="_blank"
      >
        <Image
          width={300}
          height={150}
          loading="lazy"
          src={imagen}
          alt={bonus}
        />
      </Link>

      {/* <h2>Title</h2> */}

      <div className="review-bonus">{bonus}</div>
      <div className={Styles.btnn}>
        <Link
          className="btn btn-primary target-top-brand"
          href={`${link}/${newUrl}`}
          target="_blank"
        >
          {t("Play Now")}
        </Link>
        {/* <Button text="Demo" />
        <Button text="Code" /> */}
      </div>
    </animated.div>
  );
}

export default Card;
