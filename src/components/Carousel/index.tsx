"use client";
import { IHeroData } from "@/interfaces/heroes";
import HeroDetails from "../HeroDetails";
import styles from "./carousel.module.scss";
import React, { useEffect, useMemo, useState } from "react";
import HeroPicture from "../heroPicture";
import { AnimatePresence, motion } from "framer-motion";

interface IProps {
  heroes: IHeroData[];
  activeId: string;
}

enum enPosition {
  FRONT = 0,
  MIDDLE = 1,
  BACK = 2,
}

export default function Carousel({ heroes, activeId }: IProps) {
  const [visibleItens, setVisibleItens] = useState<IHeroData[] | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(
    heroes.findIndex((hero) => hero.id == activeId) - 1
  );
  const [startInteractionPosition, setstartInteractionPosition] =
    useState<number>(0);

  const transitionAudio = useMemo(() => new Audio("/songs/transition.mp3"), []);
  const voicesAudio: Record<string, HTMLAudioElement> = useMemo(
    () => ({
      "spider-man-616": new Audio("/songs/spider-man-616.mp3"),
      "mulher-aranha-65": new Audio("/songs/mulher-aranha-65.mp3"),
      "spider-man-1610": new Audio("/songs/spider-man-1610.mp3"),
      "sp-dr-14512": new Audio("/songs/sp-dr-14512.mp3"),
      "spider-ham-8311": new Audio("/songs/spider-ham-8311.mp3"),
      "spider-man-90214": new Audio("/songs/spider-man-90214.mp3"),
      "spider-man-928": new Audio("/songs/spider-man-928.mp3"),
    }),
    []
  );

  useEffect(() => {
    const indexInArrayScope =
      ((activeIndex % heroes.length) + heroes.length) % heroes.length;
    const visibleItens = [...heroes, ...heroes].slice(
      indexInArrayScope,
      indexInArrayScope + 3
    );
    setVisibleItens(visibleItens);
  }, [heroes, activeIndex]);

  useEffect(() => {
    const htmlEl = document.querySelector("html");

    if (!htmlEl || !visibleItens) {
      return;
    }

    const currentHeroId = visibleItens[enPosition.MIDDLE].id;
    htmlEl.style.backgroundImage = `url("/spiders/${currentHeroId}-background.png")`;
    htmlEl.classList.add("hero-page");

    return () => {
      htmlEl.classList.remove("hero-page");
    };
  }, [visibleItens]);

  useEffect(() => {
    if (!visibleItens) {
      return;
    }

    const voiceAudio = voicesAudio[visibleItens[enPosition.MIDDLE].id];
    if (!voiceAudio) {
      return;
    }

    voiceAudio.volume = 0.3;
    voiceAudio.play();

    transitionAudio.play();
  }, [visibleItens, transitionAudio, voicesAudio]);

  if (!visibleItens) {
    return null;
  }

  const handleChangeActiveIndex = (newDirection: number) => {
    setActiveIndex((prevActiveIndex) => prevActiveIndex + newDirection);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setstartInteractionPosition(e.clientX);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (!startInteractionPosition) {
      return null;
    }

    const endInteractionPosition = e.clientX;
    const diffPosition = endInteractionPosition - startInteractionPosition;
    const newPosition = diffPosition > 0 ? -1 : 1;
    handleChangeActiveIndex(newPosition);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setstartInteractionPosition(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!startInteractionPosition) {
      return null;
    }

    const endInteractionPosition = e.changedTouches[0].clientX;
    const diffPosition = endInteractionPosition - startInteractionPosition;
    const newPosition = diffPosition > 0 ? -1 : 1;
    handleChangeActiveIndex(newPosition);
  };

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div
          className={styles.wrapper}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="popLayout">
            {visibleItens.map((item, position) => (
              <motion.div
                key={item.id}
                className={styles.hero}
                animate={{ x: 0, ...getItemStyles(position) }}
                transition={{ duration: 0.8 }}
                initial={{ x: -1500, scale: 0.75 }}
                exit={{ x: 0, opacity: 0, scale: 1, left: "-20%" }}
              >
                <HeroPicture hero={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        className={styles.details}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
      >
        <HeroDetails data={visibleItens[enPosition.MIDDLE]} />
      </motion.div>
    </div>
  );
}

const getItemStyles = (position: enPosition) => {
  if (position == enPosition.FRONT) {
    return {
      zIndex: 3,
      filter: "blur(10px)",
      scale: 1.2,
      left: "-10%",
    };
  }
  if (position == enPosition.MIDDLE) {
    return {
      zIndex: 2,
      left: "16rem",
      scale: 0.9,
      top: "-10%",
    };
  }
  return {
    zIndex: 1,
    filter: "blur(10px)",
    left: "7.5rem",
    top: "-20%",
    scale: 0.6,
    opacity: 0.7,
  };
};
