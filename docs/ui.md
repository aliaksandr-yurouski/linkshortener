# UI Components

## Rules

- **shadcn/ui is the only permitted component library.** Never create custom UI components from scratch.
- Always use shadcn/ui components for all UI elements: buttons, inputs, dialogs, forms, cards, badges, etc.
- Do **not** build bespoke wrappers around HTML elements when a shadcn/ui equivalent exists.

## Adding Components

Install new shadcn/ui components via the CLI:

```bash
npx shadcn@latest add <component-name>
```

This places the component source under `components/ui/`. Do **not** modify generated files there unless absolutely necessary — prefer composing them instead.

## Usage

Import directly from the generated path:

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
```

## Styling

- Apply variants and sizes through the component's own props (`variant`, `size`, etc.) before reaching for Tailwind utilities.
- Use Tailwind utilities only for layout and spacing adjustments, not to replicate styling already provided by a shadcn/ui variant.
- Design tokens (colors, radii) are configured in `app/globals.css` under `@theme` — do not hardcode raw values.

## Forms

Use shadcn/ui `Form` components together with `react-hook-form` and `zod`:

```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
```

Never build uncontrolled or ad-hoc form layouts using plain `<input>` and `<label>` elements.
