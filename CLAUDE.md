# Prototype Lab: Claude Instructions

## 1. Mission

Build SaaS prototypes in hours, not days. Move from idea to high-fidelity interactive prototype with maximum velocity.

**Design Philosophy:** Apple/Airbnb minimalism—generous whitespace, clear typography, every element earns its space.

**Code Philosophy:** Remix + Polaris. Fast iteration over perfect architecture.

## 2. Directory Structure

```
/projects/[project-name]/     # Each prototype (isolated)
  routes/                     # Remix routes for this prototype
  components/                 # Prototype-specific components

/shared/                      # Only for 2+ prototype reuse
  components/                 # Truly reusable UI components
  utils/                      # Shared helper functions
  db.ts                       # Shared mock data (when needed)

/app/routes/_index.tsx        # Home Gallery (prototype dashboard)
```

**Rule:** Start in `/projects/[name]/`. Only move to `/shared/` after the second reuse.

## 3. Design System: Shopify Polaris

All UI must use Shopify Polaris components.

**Implementation:**

- `@shopify/polaris` for all components
- `@shopify/polaris-icons` for all icons (no other icon libraries)

**Aesthetic Guidelines:**

- Generous whitespace using Polaris spacing tokens
- High-contrast, clear typography
- Every pixel serves a purpose—if it doesn't help the user, remove it
- Use `Page`, `Layout`, `BlockStack`, `InlineStack` for all structural layouts

**Styling Rule:**

- Polaris components + Polaris design tokens only
- No custom CSS unless Polaris genuinely can't achieve it
- If custom CSS needed, use CSS Modules

**Mobile-First:**

- Always use Polaris responsive props: `columnSpan={{ xs: 6, md: 4, lg: 3 }}`
- Test every layout on mobile viewport first

## 4. Tech Stack

**Framework:** Remix (with Vite)

- Use loaders for data fetching
- Use actions for mutations
- Leverage Remix's form handling

**Language:** TypeScript

- Strict mode enabled
- Define interfaces for data structures
- Pragmatic approach: `any` is acceptable for rapid prototyping when typing slows you down

**State Management:**

- `useState` / `useContext` for UI state
- Remix loaders/actions for server state
- No Redux, Zustand, or other state libraries

**Data:**

- Mock data as plain JavaScript objects/arrays
- No real databases, no ORMs
- No validation libraries unless explicitly requested

## 5. Data Rules

### Default Approach: Inline Mock Data

Put mock data directly in your route loaders:

```tsx
// app/routes/projects.task-manager.tsx
export async function loader() {
  const tasks = [
    { id: 1, title: "Design homepage", status: "done" },
    { id: 2, title: "Build API", status: "in-progress" }
  ];
  return json({ tasks });
}
```

### When to Use Shared Data

Only move data to `/shared/db.ts` when:

- I explicitly say "make this data shared"
- You're building a second prototype that needs the same entities
- Multiple prototypes need to interact with the same data

### Shared DB Structure (when needed)

Single file: `/shared/db.ts`

```ts
// shared/db.ts
export const users = [
  { id: 1, name: "Jamie", role: "designer" },
  { id: 2, name: "Alex", role: "developer" }
];

export const tasks = [
  { id: 1, title: "Build prototype", assigneeId: 1 }
];
```

No ceremonies: No schema files, no action layers, no migration notes. Just simple exports.

## 6. How We Work Together

### For New Prototypes

1. I describe the idea (1-2 sentences)
2. You show the UX flow (3-5 bullet points, which Polaris components)
3. You build it (aim for one complete response if possible)
4. Mobile-responsive automatically

**Example:**

Me: "Build a simple task manager with add, complete, delete"

You: "UX Flow:
- Page with TextField + Button to add tasks
- List of tasks using BlockStack with Checkbox + Button
- Click checkbox to toggle complete
- Delete button removes task
- Components: Page, Layout, TextField, Button, BlockStack, Checkbox

[Then provide complete code]"

### For Adding Features

- Just describe what you want
- I'll build it using Polaris components
- I'll keep it simple and functional
- If I need clarification, I'll ask ONE question max, then proceed with best judgment

### Code Delivery Standards

- Show complete files (no `// rest of code` comments)
- Include all imports
- One file per code block (clearly labeled)
- Working code only (tested patterns, no pseudo-code)

## 7. Speed Principles

- **Inline First, Extract Later** — Don't create abstractions until you need them twice
- **Complete Over Perfect** — A working prototype beats perfect architecture
- **One File Until ~200 Lines** — Don't split components prematurely
- **Make Smart Defaults** — Choose the most likely solution instead of asking
- **Build Fast, Refine Later** — Ship the prototype, then iterate

## 8. Anti-Patterns (Don't Do This)

- **Don't** ask 5 clarifying questions before starting — Ask one question max, or make smart assumptions
- **Don't** build schema/validation layers unless requested — Use plain TypeScript interfaces
- **Don't** create utility files for single-use functions — Inline it, extract only after second use
- **Don't** split into micro-components prematurely — Keep related logic together until file gets large
- **Don't** add dependencies without confirming — Use Polaris + Remix built-ins
- **Don't** create separate data files per prototype — Inline mock data in loaders
- **Don't** build desktop-first — Mobile-first with Polaris responsive props
- **Don't** duplicate Polaris functionality — Use Polaris components as-is

## 9. Home Gallery Standards

Every prototype gets an entry in `/app/routes/_index.tsx`:

```tsx
<Card>
  <BlockStack gap="400">
    <Text variant="headingMd" as="h3">Task Manager</Text>
    <Text>Simple task tracking with add, complete, and delete.</Text>
    <Button url="/projects/task-manager">Open Prototype</Button>
  </BlockStack>
</Card>
```

**Include:**

- Clear title
- One-sentence description
- Link to prototype route

**Optional:**

- Screenshot or icon
- Status badge: `[Concept]` `[Active]` `[Archived]`

## 10. Component Organization

**Prototype-Specific Components** `/projects/[name]/components/` - Only used in this prototype

**Shared Components** `/shared/components/` - Used by 3+ prototypes

**Promotion Rule:** Don't move to `/shared/` until the third reuse. Resist premature abstraction.

## 11. Common Polaris Patterns

### Page Layout:

```tsx
<Page title="Dashboard">
  <Layout>
    <Layout.Section>
      <Card>
        <BlockStack gap="400">
          {/* content */}
        </BlockStack>
      </Card>
    </Layout.Section>
  </Layout>
</Page>
```

### Forms:

```tsx
<Form method="post">
  <BlockStack gap="400">
    <TextField label="Task name" name="title" />
    <Button submit>Add Task</Button>
  </BlockStack>
</Form>
```

### Lists:

```tsx
<BlockStack gap="300">
  {items.map(item => (
    <InlineStack key={item.id} align="space-between">
      <Text>{item.name}</Text>
      <Button>Action</Button>
    </InlineStack>
  ))}
</BlockStack>
```

### Responsive Grids:

```tsx
<Layout>
  <Layout.Section variant="oneThird">
    {/* sidebar */}
  </Layout.Section>
  <Layout.Section>
    {/* main content */}
  </Layout.Section>
</Layout>
```

## 12. Example Prototype Structure

```
/projects/task-manager/
  routes/
    _index.tsx              # Main task list view
    new.tsx                 # Add new task form
  components/
    TaskCard.tsx            # Individual task display
    TaskFilters.tsx         # Filter controls
```

### Route Code Pattern:

```tsx
// projects/task-manager/routes/_index.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Layout, Card, BlockStack } from "@shopify/polaris";

export async function loader() {
  const tasks = [
    { id: 1, title: "Build prototype", done: false },
    { id: 2, title: "Review designs", done: true }
  ];
  return json({ tasks });
}

export default function TaskManager() {
  const { tasks } = useLoaderData<typeof loader>();

  return (
    <Page title="Task Manager">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              {tasks.map(task => (
                <Text key={task.id}>{task.title}</Text>
              ))}
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
```

## 13. Quick Reference

| When I say: | You do: |
|---|---|
| "Build a [feature]" | Show 3-5 step UX flow, then complete code |
| "Make this shared" | Move data to `/shared/db.ts` |
| "Add to gallery" | Update `_index.tsx` with Card entry |
| "Mobile check" | Confirm responsive props on Layout/Grid components |
| "Keep it simple" | Inline everything, no abstractions |

### Questions to Ask Before Starting

Before building, Claude should confirm (mentally or by asking):

1. What's the core user task? (in one sentence)
2. What's the happy path? (3-5 steps)
3. Any shared data needed? (default: no)

If unclear, ask ONE clarifying question, then proceed with best judgment.

---

*Last Updated: 2025-02-07*

**Philosophy:** Ship prototypes fast. Refine through iteration, not upfront planning.
