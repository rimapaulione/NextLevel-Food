"use client";

import { useFormStatus } from "react-dom";

function MealsFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      {pending ? "Submiting..." : "Share Meal"}
    </button>
  );
}

export default MealsFormSubmit;
