import { lazy, Suspense } from "react";

const Scene3D = lazy(() => import("./Scene3D"));

const LazyScene3D = () => {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 -z-10 bg-background" />
      }
    >
      <Scene3D />
    </Suspense>
  );
};

export default LazyScene3D;
