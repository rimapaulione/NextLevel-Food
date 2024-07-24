import { S3 } from "@aws-sdk/client-s3";
import sql from "better-sqlite3";
import { notFound } from "next/navigation";
import slugify from "slugify";
import xss from "xss";

const s3 = new S3({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const db = sql("meals.db");

export async function getMeals() {
  //for testing
  //await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error("Loading meals fail");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function deleteMeal({ slug, image }) {
  const fileName = image;

  const deleteImage = await s3.deleteObject({
    Bucket: "mybuckettestproject",
    Key: `nextLevelFood/${fileName}`,
  });

  if (deleteImage.$metadata.httpStatusCode !== 204) {
    return notFound();
  }

  db.prepare("DELETE FROM meals WHERE slug = ?").run(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true }) + crypto.randomUUID();
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  const image = await s3.putObject({
    Bucket: "mybuckettestproject",
    Key: `nextLevelFood/${fileName}`,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  if (image.$metadata.httpStatusCode !== 200) {
    return notFound();
  }

  meal.image = fileName;

  db.prepare(
    `
  INSERT INTO meals
  (title, summary, instructions, creator, creator_email, image, slug)
  VALUES(
    @title,
    @summary,
    @instructions,
    @creator,
    @creator_email,
    @image,
    @slug
  )
  `
  ).run(meal);
}
