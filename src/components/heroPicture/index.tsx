import { IHeroData } from "@/interfaces/heroes";
import Image, { StaticImageData } from "next/image";
import ImageSpiderman616 from "@public/spiders/spider-man-616.png";
import ImageSpiderman1610 from "@public/spiders/spider-man-1610.png";
import ImageSpiderman90214 from "@public/spiders/spider-man-90214.png";
import ImageSpiderman928 from "@public/spiders/spider-man-928.png";
import ImageSpiderham8311 from "@public/spiders/spider-ham-8311.png";
import imageSpdr14512 from "@public/spiders/sp-dr-14512.png";
import ImageMulherAranha from "@public/spiders/mulher-aranha-65.png";

const heroesImage: Record<string, StaticImageData> = {
  "spider-man-616": ImageSpiderman616,
  "spider-man-1610": ImageSpiderman1610,
  "spider-man-90214": ImageSpiderman90214,
  "spider-man-928": ImageSpiderman928,
  "spider-ham-8311": ImageSpiderham8311,
  "sp-dr-14512": imageSpdr14512,
  "mulher-aranha-65": ImageMulherAranha,
};

interface IProps {
  hero: IHeroData;
}

export default function HeroPicture({ hero }: IProps) {
  return (
    <Image
      src={heroesImage[hero.id]}
      alt={`${hero.name} - ${hero.universe}`}
      priority
    />
  );
}
