import { lazy } from "react";

const Cast = lazy(() =>
  import("../components/Cast" /* webpackChunkName: "cast" */)
);
const Reviews = lazy(() =>
  import("../components/Reviews" /* webpackChunkName: "reviews" */)
);

export default [
  {
    path: "/movies/:id/cast",
    component: Cast,
  },
  {
    path: "/movies/:id/reviews",
    component: Reviews,
  },
];
