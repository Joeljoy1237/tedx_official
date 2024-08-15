import PreLoader from "@components/PreLoader";
import SuccessPage from "@widgets/Success";
import React, { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<PreLoader/>}>
      <SuccessPage />
    </Suspense>
  );
}
