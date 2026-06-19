import { createContext, useContext, useState } from "react";
import DemoModal from "../components/DemoModal";

const Ctx = createContext({ openDemo: () => {} });

export function DemoModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <Ctx.Provider value={{ openDemo: () => setOpen(true) }}>
      {children}
      {open && <DemoModal onClose={() => setOpen(false)} />}
    </Ctx.Provider>
  );
}

export const useDemoModal = () => useContext(Ctx);