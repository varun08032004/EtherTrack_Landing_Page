import { useContext } from "react";
import { Ctx } from "../context/DemoModalContext.const";

export function useDemoModal() {
  return useContext(Ctx);
}