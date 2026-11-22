# `cn()` object notation for dynamic classes

Build conditional class lists with `cn()` from the [`cn`](https://www.npmjs.com/package/cn) package (shadcn's drop-in for `clsx` + `tailwind-merge`). Import the app's configured instance, never `cn` from the package directly: each app teaches it Daycraft's custom token names (mobile: `@/lib/cn`). Unconfigured, `cn('text-ink', 'text-micro')` drops `text-ink`, because it reads an unknown `text-*` as a color. When you add a font-size, radius, font family or `type-*` preset token, add its name to that configuration in the same change.

When rendering classes conditionally, use the object notation (`cn({ 'classes': condition })`) instead of ternaries or string concatenation. The object form keeps the condition next to the class it toggles and merges cleanly with other arguments to `cn()`.

```tsx
// Prefer
<View
  className={cn('base-classes', {
    'rotate-180': shouldTranslateUp,
    'opacity-50': isDisabled,
  })}
/>

// Avoid
<View
  className={cn(
    'base-classes',
    shouldTranslateUp && 'rotate-180',
    isDisabled ? 'opacity-50' : '',
  )}
/>
```

Static, unconditional classes still belong as plain string arguments to `cn()`; switch to the object form only when a class depends on a boolean. A class chosen by lookup (such as `ActivityHueBackground[hue]`) is passed as a plain argument too. Every class name stays a complete string literal, because Tailwind scans source at build time.
