---
layout: neoclassical-page
title: "Resistive Random-Access Memory"
eyebrow: "Lucius Vo · Research"
lede: "A class of non-volatile memory that doesn't just remember values — it computes with them."
permalink: /research/rram/
author_profile: false
---

## The device

Resistive random-access memory (RRAM) is a non-volatile memory technology built around a deceptively simple structure: a thin oxide film sandwiched between two metal electrodes. By applying a voltage above a threshold, conductive filaments form (or rupture) inside the oxide, switching the cell between a high-resistance state (HRS) and a low-resistance state (LRS).

The states persist when power is removed. There is no refresh, no charge-pump leakage, and access times are competitive with SRAM. For years RRAM has been pitched as a candidate "universal memory" — combining the persistence of flash, the speed of DRAM, and the density of disk.

## Why I care about it

What makes RRAM remarkable for my research is that the *same device that stores a value can also compute with it*. Arrange thousands of cells into a crossbar grid — one cell at every intersection of a horizontal wordline and a vertical bitline — and apply voltages along the wordlines. By Ohm's law, each cell sources a current proportional to the applied voltage and to its own conductance. By Kirchhoff's current law, those currents sum on each bitline. The bitline current is, exactly, the dot product of the voltage vector and the conductance column.

In other words: matrix-vector multiplication, in analog, in a single cycle, with no data movement.

This is the heart of *in-memory computing*. A workload that on a GPU requires moving billions of weights across a memory bus becomes, on an RRAM crossbar, a single physics operation. Energy per multiply-accumulate drops by orders of magnitude. Latency drops with it.

## Why it is hard

The catch is that the devices are imperfect. Cell-to-cell variability, drift over time, cycle-to-cycle randomness, and "sneak path" currents through unaddressed cells all degrade accuracy. A nominally 8-bit RRAM weight often delivers only 3–4 bits of useful precision in practice. Naïvely deploying a deep-learning model trained on FP32 GPUs onto an RRAM crossbar — without rethinking either the algorithm or the architecture — yields gibberish.

This is the research question that drives much of my work: how do you co-design the *algorithm*, the *crossbar topology*, and the *error-correction layer* so that an imperfect device becomes a reliable computer?

## Where to read more

- [Harnessing the Full Potential of RRAMs through Scalable and Distributed In-Memory Computing](https://arxiv.org/abs/2508.13298) — the MELISO+ paper, which introduces a two-tier error-correction layer for distributed RRAM crossbars.
- [The Lynchpin of In-Memory Computing](https://doi.ieeecomputersociety.org/10.1109/ICONS62911.2024.00058) — a benchmarking framework for vector-matrix multiplication on RRAM.
- [All publications](/publications/)
