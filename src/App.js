import "./styles.css";
import { useState, cloneElement } from "react";
import { Route, Link, useRoute } from "wouter";
import { AnimatePresence, motion } from "framer-motion";

const animateVariants = {
  in: {
    x: "100vw",
  },
  stay: {
    x: 0,
  },
  out: {
    x: "-100vw",
  },
};
const useRoutes = (routes) => {
  // save the length of the `routes` array that we receive on the first render
  const [routesLen] = useState(() => routes.length);
  // because we call `useRoute` inside a loop the number of routes can't be changed!
  // otherwise, it breaks the rule of hooks and will cause React to break
  if (routesLen !== routes.length) {
    throw new Error(
      "The length of `routes` array provided to `useRoutes` must be constant!"
    );
  }

  const matches = routes.map((def) => {
    return useRoute(def.path);
  });

  for (let [index, match] of matches.entries()) {
    const [isMatch, params] = match;

    if (isMatch) {
      return cloneElement(routes[index].element, { params });
    }
  }

  return null;
};

function Page1() {
  return (
    <motion.div
      initial="in"
      animate="stay"
      exit="out"
      variants={animateVariants}
      transition={{ duration: 1 }}
      style={{ position: "fixed", top: 0, left: "50vw" }}
    >
      Page 1
      <br />
      <Link to="/2">To 2</Link>
    </motion.div>
  );
}
function Page2() {
  return (
    <motion.div
      initial="in"
      animate="stay"
      exit="out"
      variants={animateVariants}
      transition={{ duration: 1 }}
      style={{ position: "fixed", top: 0, left: "50vw" }}
    >
      Page 2
      <br />
      <Link to="/">To 1</Link>
    </motion.div>
  );
}
export default function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <Page1 />,
    },
    {
      path: "/2",
      element: <Page2 />,
    },
  ]);
  return (
    <div className="App">
      <AnimatePresence>
        {cloneElement(element, { key: location.pathname })}
      </AnimatePresence>
    </div>
  );
}
