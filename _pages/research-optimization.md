---
layout: neoclassical-page
title: "Optimization and Learning on Analog Substrates"
eyebrow: "Lucius Vo · Research"
lede: "Some of the world's most important computations are linear programs. If a machine no longer separates memory from arithmetic, what could it solve that a GPU cannot?"
permalink: /research/optimization/
author_profile: false
---

## The class of problems

Linear programming (LP) is one of the oldest, most useful corners of optimization. The shape is simple: minimize a linear cost function, subject to linear constraints. The reach is enormous — LPs schedule electricity across the U.S. power grid, route freight, allocate capital, set production levels, and serve as the inner loop of countless other algorithms.

Modern LPs are also large. The grid-operation problems I worked on at Argonne run into hundreds of thousands of variables and millions of constraints. Even on the best GPU clusters, a single solve can take minutes to hours.

## Primal-dual hybrid gradient

The classical algorithm for LPs of this scale is the *interior-point method* — fast, but it requires solving a dense linear system at every iteration, and those linear systems quickly outgrow GPU memory. A more recent alternative is *primal-dual hybrid gradient* (PDHG), a first-order method that only needs matrix-vector products. PDHG converges more slowly per iteration, but each iteration is cheap, and the work parallelizes beautifully.

That last property — every iteration is a matrix-vector product — is what makes PDHG a natural fit for RRAM. The thing the analog crossbar does best is exactly the thing PDHG does most.

## What my research adds

A direct port of PDHG to RRAM does not work. The algorithm reads the constraint matrix `A` and its transpose `Aᵀ` on alternating iterations; the analog crossbar would have to be reprogrammed every step, and RRAM write cycles are the slowest, most fragile thing in the device.

My recent work co-designs the algorithm and the crossbar topology to side-step this: a symmetric block-matrix formulation that unifies `A` and `Aᵀ` into a single resident layout, plus an error-correction layer that tolerates the noise the analog substrate introduces. On large-scale grid LPs, the resulting solver matches GPU accuracy with up to three orders of magnitude less energy and two orders less latency.

## Where to read more

- [From GPUs to RRAMs](https://arxiv.org/abs/2509.21137) — the PDHG paper.
- [SplitVAEs: Decentralized scenario generation](https://doi.ieeecomputersociety.org/10.1109/BigData62323.2024.10826070) — earlier work on decentralized optimization under data silos.
- [All publications](/publications/)
