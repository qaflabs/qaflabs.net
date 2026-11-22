# No pass-through re-export files

A pass-through re-export is any file whose only job is to re-export a symbol from another module. Two ways this gets introduced, both wrong:

1. **Creating one.** Writing a new file solely so a symbol is reachable from a second import path (for example, a local file that just does `export { foo } from '<real location>'`).
2. **Leaving one behind during a refactor.** When moving or renaming a symbol, replacing the original file with `export { foo } from '<new location>'` to keep existing imports working, instead of updating every consumer to the new path.

```ts
// Avoid: a file at the old or wrapping location whose entire body is
export { useSafeRefForEffect } from '<real location>';

// Prefer: at every consumer, import directly from the real location
import { useSafeRefForEffect } from '<real location>';
```

## During a refactor

When refactoring, the correct response to "but this will break N call sites" is to update those N call sites in the same change, not to add a shim. Pass-through files obscure where the symbol actually lives, accumulate as dead aliases over time, and inflate the import graph.

## Scope

This applies everywhere in the repo (apps, packages, anywhere). It also applies when porting code from one app to another: if the source file imports through a shim path, switch the import to the real location rather than mirroring the shim in the destination.

## Allowed exception

A deliberately curated barrel `index.ts` that aggregates several sibling exports for a single public surface (for example `apps/mobile/src/components/ui/index.ts`, or a package's entry point) is fine. The rule is about files that exist only as a single redirection.
