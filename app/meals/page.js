import { Suspense } from "react";

import styles from "./page.module.css";
import MealsHeader from "@/components/meals/meals-header";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";

export const metadata = {
  title: "All Meals",
  description: "Browse the delicious meals!",
};

async function Meals() {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

function MealsPage() {
  return (
    <>
      <MealsHeader />
      <main className={styles.main}>
        <Suspense
          fallback={<p className={styles.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}

export default MealsPage;
