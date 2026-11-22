import { createCn } from "cn/config";

// Teaches the merger our radius tokens so `rounded-frame` isn't dropped as unknown.
export const cn = createCn({
  extend: {
    classGroups: {
      rounded: [{ rounded: ["window", "frame"] }],
    },
  },
});
