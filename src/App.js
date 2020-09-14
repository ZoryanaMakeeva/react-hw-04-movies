import React, { Suspense } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import styles from "./App.module.scss";
import routes from "./routes/routes";

function App() {
  return (
    <>
      <nav className={styles.navigation}>
        {routes.map(
          ({ path, label, isExact, isInMenu }) =>
            isInMenu && (
              <NavLink
                key={label}
                className={styles.link}
                activeClassName={styles["active-link"]}
                to={path}
                exact={path !== "/movies"}
              >
                {label}
              </NavLink>
            )
        )}
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {routes.map(({ label, path, isExact, component }) => (
            <Route
              key={label}
              path={path}
              exact={isExact}
              component={component}
            />
          ))}
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
