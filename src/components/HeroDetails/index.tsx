import { spidermainFont } from "@/fonts";
import { IHeroData } from "@/interfaces/heroes";
import styles from "./heroDetails.module.scss";
import { Quicksand } from "next/font/google";
import Image from "next/image";

const quicksand = Quicksand({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

interface IProps {
  data: IHeroData;
}

export default function HeroDetails({ data }: IProps) {
  const { id, name, universe, details } = data;

  return (
    <div className={quicksand.className}>
      <h1 className={`${spidermainFont.className} ${styles.title}`}>
        {name} Universo-{universe}
      </h1>

      <div className={`${styles.details}`}>
        <h2 className={`${styles.subtitle} `}>Informações</h2>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.label}>Nome Completo</td>
              <td className="">{details.fullName}</td>
            </tr>
            <tr>
              <td className={styles.label}>Data de Nascimento</td>
              <td className="">
                {new Date(details.birthday).toLocaleDateString("pt-br")}
              </td>
            </tr>
            <tr>
              <td className={styles.label}>Terra Natal</td>
              <td className="">{details.homeland}</td>
            </tr>
            <tr>
              <td className={styles.label}>Altura</td>
              <td className="">{details.height.toFixed(2)}m</td>
            </tr>
            <tr>
              <td className={styles.label}>Peso</td>
              <td className="">{details.weight.toFixed(2)}kg</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.details}>
        <h2 className={styles.subtitle}>Primeira Aparição</h2>

        <Image
          src={`/spiders/${id}-comic-book.png`}
          alt={`Primeira Aparição de ${name} do universo ${universe}`}
          width={80}
          height={122}
        />
      </div>
    </div>
  );
}
