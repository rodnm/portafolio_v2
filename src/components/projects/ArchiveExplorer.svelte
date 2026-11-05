<script lang="ts">
  interface Item {
    id: string;
    title: string;
    summary: string;
    metric?: string;
    year: number;
    context: string;
    categories: string[];
    stack: string[];
    links: { label: string; url: string }[];
  }

  interface Props {
    items: Item[];
    categories: { id: string; label: string }[];
    labels: { filter: string; all: string; shown: string };
  }

  let { items, categories, labels }: Props = $props();
  let active = $state<string | null>(null);

  const visible = $derived(
    active ? items.filter((item) => item.categories.includes(active!)) : items,
  );
  const used = $derived(
    categories.filter((c) => items.some((item) => item.categories.includes(c.id))),
  );
</script>

<div class="flex flex-col gap-6">
  <div class="flex flex-col gap-3" role="group" aria-label={labels.filter}>
    <ul class="flex flex-wrap gap-2">
      <li>
        <button
          type="button"
          class="min-h-9 border px-3 font-mono text-cap uppercase transition-colors"
          class:border-ink={active === null}
          class:bg-ink={active === null}
          class:text-canvas={active === null}
          class:border-hair={active !== null}
          aria-pressed={active === null}
          onclick={() => (active = null)}>{labels.all}</button
        >
      </li>
      {#each used as category (category.id)}
        <li>
          <button
            type="button"
            class="min-h-9 border px-3 font-mono text-cap uppercase transition-colors hover:border-accent"
            class:border-ink={active === category.id}
            class:bg-ink={active === category.id}
            class:text-canvas={active === category.id}
            class:border-hair={active !== category.id}
            aria-pressed={active === category.id}
            onclick={() => (active = active === category.id ? null : category.id)}
            >{category.label}</button
          >
        </li>
      {/each}
    </ul>
    <p class="font-mono text-cap text-ink-dim uppercase" aria-live="polite">
      n = {visible.length}
      {labels.shown}
    </p>
  </div>

  <ol class="border-b border-hair">
    {#each visible as item (item.id)}
      <li class="grid gap-x-6 gap-y-2 border-t border-hair py-5 md:grid-cols-[4rem_1fr_auto]">
        <span class="font-mono text-sm text-ink-dim tabular-nums">{item.year}</span>
        <div class="flex flex-col gap-1">
          <h4 class="text-lg font-medium">{item.title}</h4>
          <p class="text-ink-dim">{item.summary}</p>
          <p class="font-mono text-cap text-ink-dim uppercase">
            {item.context} · {item.stack.join(" · ")}
          </p>
        </div>
        <div class="flex flex-col items-start gap-2 md:items-end">
          {#if item.metric}
            <span class="font-mono text-sm text-accent tabular-nums">{item.metric}</span>
          {/if}
          <ul class="flex flex-wrap gap-2">
            {#each item.links as link (link.url)}
              <li>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener"
                  class="inline-flex min-h-9 items-center border border-hair px-2.5 font-mono text-cap uppercase transition-colors hover:border-accent hover:text-accent"
                  >{link.label} ↗</a
                >
              </li>
            {/each}
          </ul>
        </div>
      </li>
    {/each}
  </ol>
</div>
