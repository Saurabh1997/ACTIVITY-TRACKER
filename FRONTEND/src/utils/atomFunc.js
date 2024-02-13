import { atom, selector } from "recoil";

export const createAtom = (key, defaultValue) =>
  atom({ key: key, default: defaultValue });
