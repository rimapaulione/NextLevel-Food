"use server";

import { revalidatePath } from "next/cache";
import { deleteMeal, saveMeal } from "./meals";
import { redirect } from "next/navigation";

export async function handleSubmitForm(prevState, formData) {
  function isValidText(text) {
    return !text || text.trim() === "";
  }
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isValidText(meal.title) ||
    isValidText(meal.summary) ||
    isValidText(meal.instructions) ||
    isValidText(meal.creator) ||
    isValidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input. Please check!",
    };
  }

  await saveMeal(meal);

  revalidatePath("/meals");
  redirect("/meals");
}

export async function handleDelete({ slug, image }) {
  await deleteMeal({ slug, image });
  revalidatePath("/meals", "page");
}
