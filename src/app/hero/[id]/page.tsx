import Carousel from "@/components/Carousel";
import { getHeroesData } from "@/utils/apiCalls";

interface IProps {
  params: {
    id: string;
  };
}

export default async function Hero({ params: { id } }: IProps) {
  const heroes = await getHeroesData();

  return <Carousel heroes={heroes.data} activeId={id} />;
}
