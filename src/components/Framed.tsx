import Image from "next/image";
import styles from "./Framed.module.css";

type FramedProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/** Image avec cadre doré décalé et lueur latérale. */
export default function Framed({ src, alt, width, height, priority, sizes, className = "" }: FramedProps) {
  return (
    <div className={`${styles.frame} ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes ?? "(max-width: 800px) 90vw, 480px"}
        className={styles.img}
      />
    </div>
  );
}
