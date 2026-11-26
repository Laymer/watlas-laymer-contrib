"""Measure the individual commits and the final patch against their branch point."""
import subprocess
import sys


def git(*args):
    return subprocess.check_output(["git", *args])


def size(before, after):
    records = git("diff", "--no-renames", "--numstat", "-z", before, after).split(b"\0")
    lines = 0
    for record in filter(None, records):
        added, removed, path = record.split(b"\t", 2)
        if path == b"dist/assets/WarriorAtlas.zip":
            continue  # Generated solely from addon/WarriorAtlas.
        if added == b"-":
            raise ValueError(f"Unmeasurable binary change: {path!r}")
        lines += int(added) + int(removed)
    return lines


def check(base, head):
    fork = git("merge-base", base, head).decode().strip()
    commits = git("rev-list", f"{fork}..{head}").decode().splitlines()
    passed = True
    for before, after, limit in [*((c + "^1", c, 150) for c in commits),
                                 (fork, head, 400)]:
        lines = size(before, after)
        print(f"{before}..{after}: {lines} / {limit}")
        passed &= lines <= limit
    return passed


if __name__ == "__main__":
    sys.exit(0 if check(*sys.argv[1:]) else 1)
