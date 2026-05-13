---
layout: neoclassical-page
title: "Analog and In-Memory Computing"
eyebrow: "Lucius Vo · Research"
lede: "For seventy years, computing has obeyed one architectural rule — keep memory separate from arithmetic. What happens when we stop?"
permalink: /research/analog/
author_profile: false
---

## The bottleneck

Every CPU built since the 1950s has lived under the same architectural law: instructions and data live in memory; arithmetic happens in the processor; a bus shuffles bytes between the two. John von Neumann sketched this on a napkin and we have been refining it ever since — adding caches, pipelines, vector units, GPUs — but the basic shape is unchanged.

The cost shows up in modern workloads. Training a large language model often spends *more* energy moving the weights across the memory hierarchy than it spends multiplying them. The arithmetic is fast; the bus is the wall.

## In-memory computing

In-memory computing (IMC) refuses the wall. Instead of moving data to compute, IMC builds the compute *into* the memory array itself. RRAM crossbars are one such substrate: matrix-vector multiplication happens as a side effect of physics, not as a programmed sequence of instructions.

The energy savings, for the workloads it suits, can be several orders of magnitude. The latency savings can be similar. And the architecture maps naturally to the workloads — neural networks, linear solvers, signal processing — that dominate today's compute.

## Analog versus digital

There is a deeper shift here than just "memory and compute co-located." Most IMC operations are *analog*: the answer is a current, not a bit pattern. Precision is bounded by the physics — by noise floors, conductance ranges, and device variability — not by a wordlength. The design space looks different: voltages, conductance kernels, and signal-to-noise budgets, not caches and instruction-level parallelism.

The cost is fragility. An analog computer that delivers 90% of the precision at 1/1000 of the energy is a great trade *for the right workload*. The research question becomes: which workloads? And how do we prove it?

## My work

I work on the algorithm–architecture seam: designing iterative linear-program solvers that survive analog noise, mapping their kernel structure onto distributed RRAM crossbars, and showing that the resulting machine actually delivers what the physics promises — at scale, on problems that matter.

## Where to read more

- [From GPUs to RRAMs: Distributed In-Memory Primal-Dual Hybrid Gradient Method for Linear Optimization](https://arxiv.org/abs/2509.21137) — a PDHG solver running natively on RRAM crossbars.
- [IBM Research — In-Memory Computing](https://research.ibm.com/projects/in-memory-computing) — a useful industrial overview of the field.
- [All publications](/publications/)
