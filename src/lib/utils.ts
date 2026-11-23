import { createCn } from "cn/config";

// Teaches the merger our radius tokens so `rounded-frame` and `rounded-card` aren't dropped as unknown.
export const cn = createCn({
  extend: {
    classGroups: {
      rounded: [{ rounded: ["window", "frame", "card"] }],
    },
  },
});
