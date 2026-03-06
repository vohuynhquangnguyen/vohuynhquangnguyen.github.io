---
title: "From GPUs to RRAMs: Distributed In-Memory Primal-Dual Hybrid Gradient Method for Solving Large-Scale Linear Optimization Problems"
collection: publications
permalink: /publication/2026-02-24-from-gpus-to-rrams
excerpt: 'We present a distributed primal-dual hybrid gradient (PDHG) method co-designed for resistive random-access memory (RRAM) in-memory computing, enabling large-scale linear optimization with dramatically reduced energy and latency compared to GPU baselines.'
date: '2026-02-24'
venue: '2026 SIAM Conference on Parallel Processing for Scientific Computing (PP26)'
citation: 'Huynh Q. N. Vo, Md Tawsif Rahman Chowdhury, Paritosh Ramanan, Gozde Tutuncuoglu, Junchi Yang, Feng Qiu, and Murat Yildirim. (2026). From GPUs to RRAMs: Distributed In-Memory Primal-Dual Hybrid Gradient Method for Solving Large-Scale Linear Optimization Problems. In: Proceedings of the 2026 SIAM Conference on Parallel Processing for Scientific Computing (PP26).'
---

# Abstract
The exponential growth of computational workloads is surpassing the capabilities of conventional architectures, which are constrained by fundamental limits. In-memory computing (IMC) with RRAM provides a promising alternative by providing analog computations with significant gains in latency and energy use. However, existing algorithms developed for conventional architectures do not translate to IMC, particularly for constrained optimization problems where frequent matrix reprogramming remains cost prohibitive for IMC applications. Here we present a distributed in-memory primal–dual hybrid gradient (PDHG) method, specifically co-designed for arrays of RRAM devices. Our approach minimizes costly write cycles, incorporates robustness against device non-idealities, and leverages a symmetric block-matrix formulation to unify operations across distributed crossbars. We integrate a physics-based simulation framework called MELISO+ to evaluate performance under realistic device conditions. Benchmarking against GPU-accelerated solvers on large-scale linear programs demonstrates that our RRAM-based solver achieves comparable accuracy with up to three orders-of-magnitude reductions in energy consumption and latency. These results demonstrate the first PDHG-based LP solver implemented on RRAMs, showcasing the transformative potential of algorithm–hardware co-design for solving large-scale optimization through distributed in-memory computing.

# Contents
The contents of this article can be accessed here:
- SIAM Proceedings (DOI): https://epubs.siam.org/doi/10.1137/1.9781611979022.2
- arXiv (preprint version): https://arxiv.org/abs/2509.21137

<!-- The presentation of this article for SIAM PP26 can be accessed here -->
