#!/usr/bin/env bash
# Runs a project tool on Node.js 26 LTS with the permission model enabled.
# Usage: scripts/node.sh <astro|vitest|playwright|prettier|script.mjs> [args...]
# Set PERM_AUDIT=1 to log permission denials instead of failing (used to tune the allowlist).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NODE_BIN="${NODE_BIN:-node}"

major="$("$NODE_BIN" -p 'process.versions.node.split(".")[0]')"
if [ "$major" -lt 26 ]; then
  echo "scripts/node.sh: Node.js >= 26 required, found $("$NODE_BIN" -v) (set NODE_BIN)" >&2
  exit 1
fi

tool="${1:?missing tool}"
shift

case "$tool" in
  astro) entry="$ROOT/node_modules/astro/bin/astro.mjs" ;;
  vitest) entry="$ROOT/node_modules/vitest/vitest.mjs" ;;
  playwright) entry="$ROOT/node_modules/@playwright/test/cli.js" ;;
  prettier) entry="$ROOT/node_modules/prettier/bin/prettier.cjs" ;;
  *.mjs | *.js | *.ts) entry="$ROOT/$tool" ;;
  *)
    echo "scripts/node.sh: unknown tool '$tool'" >&2
    exit 1
    ;;
esac

TMP="${TMPDIR:-/tmp}"
# Vite probes these WSL markers with existsSync, which throws under the permission model.
read_paths=("$ROOT" "$TMP" /proc/sys/fs/binfmt_misc/WSLInterop /run/WSL)
write_paths=("$TMP" "$ROOT/.astro" "$ROOT/node_modules/.astro" "$ROOT/node_modules/.vite" "$ROOT/node_modules/.vitest" "$ROOT/node_modules/.vitest-cache" "$ROOT/node_modules/.vite-temp")

case "$tool" in
  astro) write_paths+=("$ROOT/dist" "$ROOT/src/assets/generated") ;;
  playwright)
    write_paths+=("$ROOT/test-results" "$ROOT/playwright-report" "$ROOT/tests/e2e/__screenshots__")
    [ -n "${PLAYWRIGHT_BROWSERS_PATH:-}" ] && read_paths+=("$PLAYWRIGHT_BROWSERS_PATH")
    ;;
  prettier) write_paths+=("$ROOT") ;;
  scripts/*)
    write_paths+=("$ROOT/src/assets/generated" "$ROOT/public/generated" "$ROOT/public/cv" "$ROOT/test-results")
    [ -n "${PLAYWRIGHT_BROWSERS_PATH:-}" ] && read_paths+=("$PLAYWRIGHT_BROWSERS_PATH")
    ;;
esac

for extra in ${EXTRA_READ:-}; do read_paths+=("$extra"); done
for ca in "${NODE_EXTRA_CA_CERTS:-}" "${SSL_CERT_FILE:-}"; do
  [ -n "$ca" ] && read_paths+=("$ca")
done

# Paths must exist before Node starts; a missing directory is matched as a plain file.
for p in "${write_paths[@]}"; do
  case "$p" in "$ROOT"/*) mkdir -p "$p" ;; esac
done

mode="--permission"
[ "${PERM_AUDIT:-0}" = "1" ] && mode="--permission-audit"

flags=("$mode" --allow-child-process --allow-worker --allow-addons --allow-net)
for p in "${read_paths[@]}"; do flags+=("--allow-fs-read=$p"); done
# A trailing slash marks the grant as a directory, so it survives the tool deleting and recreating it.
for p in "${write_paths[@]}"; do flags+=("--allow-fs-write=${p%/}/"); done

export ASTRO_TELEMETRY_DISABLED=1
# Keep tool preference files inside the project so they stay within the allowlist.
export XDG_CONFIG_HOME="$ROOT/.astro/xdg"
exec "$NODE_BIN" "${flags[@]}" "$entry" "$@"
