<script lang="ts">
  interface Card {
    id: string;
    title: string;
    issuer: string;
    date: string;
    category: string;
    hours?: number | undefined;
    grade?: string | undefined;
    verify?: string | undefined;
    thumb: string;
  }

  interface Props {
    cards: Card[];
    categories: { id: string; label: string }[];
    labels: {
      filter: string;
      all: string;
      count: string;
      verify: string;
      hours: string;
      thumbAlt: string;
    };
  }

  let { cards, categories, labels }: Props = $props();
  let active = $state<string | null>(null);
  const visible = $derived(active ? cards.filter((c) => c.category === active) : cards);
  const used = $derived(categories.filter((c) => cards.some((card) => card.category === c.id)));
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
      {labels.count}
    </p>
  </div>

  <ul class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
    {#each visible as card (card.id)}
      <li class="flex flex-col border border-hair bg-paper">
        <img
          src={card.thumb}
          alt={`${labels.thumbAlt}: ${card.title}`}
          loading="lazy"
          decoding="async"
          width="320"
          height="226"
          class="aspect-video w-full border-b border-hair bg-canvas object-contain p-2"
        />
        <div class="flex flex-1 flex-col gap-1 p-2 sm:p-3">
          <p class="font-mono text-cap text-ink-dim uppercase tabular-nums">{card.date}</p>
          <h4 class="text-sm leading-snug font-medium sm:text-base">{card.title}</h4>
          <p class="text-xs text-ink-dim sm:text-sm">{card.issuer}</p>
          <p class="mt-auto flex flex-wrap items-center gap-x-3 pt-2 font-mono text-cap uppercase">
            {#if card.hours}<span class="tabular-nums">{card.hours} {labels.hours}</span>{/if}
            {#if card.grade}<span class="text-accent tabular-nums">{card.grade}</span>{/if}
            {#if card.verify}
              <a
                href={card.verify}
                target="_blank"
                rel="noopener"
                class="text-accent hover:underline">{labels.verify} ↗</a
              >
            {/if}
          </p>
        </div>
      </li>
    {/each}
  </ul>
</div>
