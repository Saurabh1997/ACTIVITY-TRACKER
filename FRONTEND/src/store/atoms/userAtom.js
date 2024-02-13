import { selector } from "recoil";
import { createAtom } from "utils/atomFunc";

export const countAtom = createAtom("count", 0);

export const evenSelector = selector({
  key: "evenSelector",
  get: ({ get }) => {
    const count = get(countAtom);
    return count % 2 === 0;
  },
});
