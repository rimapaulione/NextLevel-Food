import Link from "next/link";
import Image from "next/image";

import styles from "./meal-item.module.css";
import Button from "../UI/button";

export default function MealItem({ title, slug, image, summary, creator }) {
  return (
    <article className={styles.meal}>
      <header>
        <div className={styles.image}>
          <Image
            src={`https://mybuckettestproject.s3.eu-west-1.amazonaws.com/nextLevelFood/${image}`}
            alt={title}
            fill
            unoptimized={true}
          />
        </div>
        <div className={styles.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={styles.content}>
        <p className={styles.summary}>{summary}</p>
        <div className={styles.actions}>
          <div>
            <Link href={`/meals/${slug}`}>View Details</Link>
          </div>
          <div>
            <Button slug={slug} image={image} />
          </div>
        </div>
      </div>
    </article>
  );
}
