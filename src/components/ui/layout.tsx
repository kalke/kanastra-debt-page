import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

function Layout(): ReactElement {
  return (
    <>
      <main className="p-6 flex flex-col gap-8">
        <Outlet />
      </main>
    </>
  );
}

export { Layout };
