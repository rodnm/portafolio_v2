<script lang="ts">
  import { onMount, tick } from "svelte";

  interface Labels {
    title: string;
    prompt: string;
    placeholder: string;
    close: string;
    welcome: string;
    unknown: string;
    tryHelp: string;
    help: readonly string[];
    bio: string;
    regNote: string;
    contact: string;
    themeSet: string;
    langGo: string;
    classified: string;
  }

  interface Props {
    labels: Labels;
    stack: { label: string; count: number }[];
    projects: { title: string; href: string }[];
    email: string;
    fit: {
      intercept: number;
      slope: number;
      interceptSE: number;
      slopeSE: number;
      r2: number;
      n: number;
    };
    langHrefs: { es: string; en: string };
  }

  let { labels, stack, projects, email, fit, langHrefs }: Props = $props();

  type Line = { kind: "in" | "out" | "err"; text: string; href?: string };
  let dialog: HTMLDialogElement | undefined = $state();
  let field: HTMLInputElement | undefined = $state();
  let log: HTMLDivElement | undefined = $state();
  let command = $state("");
  let lines = $state<Line[]>([{ kind: "out", text: labels.welcome }]);

  const pad = (s: string | number, n: number) => String(s).padStart(n);
  const num = (x: number, d = 4) => x.toFixed(d).replace(/^0\./, ".").replace(/^-0\./, "-.");

  function regression(): string[] {
    const tSlope = fit.slope / fit.slopeSE;
    const tCons = fit.intercept / fit.interceptSE;
    return [
      `      Source |  Number of obs = ${pad(fit.n, 8)}`,
      `             |  R-squared     = ${pad(fit.r2.toFixed(4), 8)}`,
      "-------------+------------------------------------------",
      "       exito |      Coef.   Std. Err.       t    P>|t|",
      "-------------+------------------------------------------",
      `    esfuerzo | ${pad(num(fit.slope), 10)} ${pad(num(fit.slopeSE), 10)} ${pad(tSlope.toFixed(2), 8)}   0.000`,
      `       _cons | ${pad(num(fit.intercept), 10)} ${pad(num(fit.interceptSE), 10)} ${pad(tCons.toFixed(2), 8)}   0.000`,
      "-------------+------------------------------------------",
      labels.regNote,
    ];
  }

  function out(text: string | string[], kind: Line["kind"] = "out") {
    for (const t of Array.isArray(text) ? text : [text]) lines.push({ kind, text: t });
  }

  function setTheme(theme: string) {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("rn-theme", theme);
    } catch {}
    out(`${labels.themeSet} ${theme}.`);
  }

  function run(raw: string) {
    const input = raw.trim().replace(/\s+/g, " ");
    if (!input) return;
    lines.push({ kind: "in", text: `. ${input}` });
    const cmd = input.toLowerCase();
    if (cmd === "help") out(labels.help as string[]);
    else if (cmd === "help rodrigo" || cmd === "describe rodrigo") out(labels.bio);
    else if (cmd === "summarize stack" || cmd === "sum stack") {
      out(["    Variable |   Obs", "-------------+--------"]);
      for (const g of stack) out(`${pad(g.label.slice(0, 12), 12)} | ${pad(g.count, 5)}`);
    } else if (cmd.startsWith("reg")) out(regression());
    else if (cmd === "list projects" || cmd === "ls projects") {
      projects.forEach((p, i) =>
        lines.push({ kind: "out", text: `  ${i + 1}. ${p.title}`, href: p.href }),
      );
    } else if (cmd === "contact") out(`${labels.contact} ${email}`);
    else if (cmd === "theme dark" || cmd === "theme light") setTheme(cmd.split(" ")[1]!);
    else if (cmd === "lang es" || cmd === "lang en") {
      out(labels.langGo);
      window.location.href = langHrefs[cmd.endsWith("en") ? "en" : "es"];
    } else if (cmd.startsWith("use ")) out(labels.classified, "err");
    else if (cmd === "clear" || cmd === "cls") lines = [];
    else if (cmd === "exit" || cmd === "quit") dialog?.close();
    else out(`${labels.unknown}: ${input}. ${labels.tryHelp}`, "err");
    tick().then(() => log?.scrollTo({ top: log.scrollHeight }));
  }

  async function openConsole() {
    if (!dialog || dialog.open) return;
    dialog.showModal();
    await tick();
    field?.focus();
  }

  onMount(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialog?.open) dialog.close();
        else openConsole();
      }
    };
    const onClick = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest("[data-console-open]")) openConsole();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    document
      .querySelectorAll<HTMLButtonElement>("[data-console-open]")
      .forEach((b) => (b.disabled = false));
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  });

  function submit(event: SubmitEvent) {
    event.preventDefault();
    run(command);
    command = "";
  }
</script>

<dialog
  bind:this={dialog}
  aria-labelledby="console-title"
  data-console
  class="m-auto w-full max-w-3xl border-2 border-term-dim bg-term p-0 text-term-fg shadow-2xl backdrop:bg-term/70"
>
  <div class="flex items-center justify-between border-b border-term-dim/40 px-4 py-2">
    <h2 id="console-title" class="font-mono text-cap uppercase">{labels.title}</h2>
    <button
      type="button"
      class="min-h-9 px-2 font-mono text-cap uppercase hover:text-term-alert"
      onclick={() => dialog?.close()}>{labels.close} ✕</button
    >
  </div>
  <div
    bind:this={log}
    class="h-80 overflow-y-auto px-4 py-3 font-mono text-sm leading-relaxed"
    role="log"
    aria-live="polite"
  >
    {#each lines as line, i (i)}
      <pre
        class="whitespace-pre-wrap"
        class:text-term-prompt={line.kind === "in"}
        class:text-term-alert={line.kind === "err"}>{#if line.href}<a
            href={line.href}
            class="underline underline-offset-2 hover:text-term-alert">{line.text}</a
          >{:else}{line.text}{/if}</pre>
    {/each}
  </div>
  <form
    class="flex items-center gap-2 border-t border-term-dim/40 px-4 py-3 font-mono text-sm"
    onsubmit={submit}
  >
    <label for="console-input" class="sr-only">{labels.prompt}</label>
    <span aria-hidden="true" class="text-term-prompt">.</span>
    <input
      id="console-input"
      bind:this={field}
      bind:value={command}
      autocomplete="off"
      spellcheck="false"
      placeholder={labels.placeholder}
      class="min-w-0 flex-1 bg-transparent text-term-fg placeholder:text-term-dim focus:outline-none"
    />
  </form>
</dialog>
