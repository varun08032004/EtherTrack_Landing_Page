import { useState } from "react";
import DemoModal from "../components/DemoModal";
import { Ctx } from "./DemoModalContext.const";

export function DemoModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <Ctx.Provider value={{ openDemo: () => setOpen(true) }}>
      {children}
      {open && <DemoModal onClose={() => setOpen(false)} />}
    </Ctx.Provider>
  );
}