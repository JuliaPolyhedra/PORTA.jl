```@meta
CurrentModule = XPORTA
```
# User Guide

## Setup

1. [Download and install julia](https://julialang.org/downloads/).
2. Add the XPORTA.jl package.
```julia
julia> using Pkg; Pkg.add("XPORTA")
```

## Simple Example

### 3-Simplex: Vertex Representation -> Halfspace Representation

Given a set of vertices, PORTA can find the linear equalities and
inequalities bounding the convex hull of vertices.

Consider the vertices of the following 3-simplex (equilateral triangle).

```math
\begin{matrix}
\begin{matrix}
v_1 = (1, 0, 0) \\
v_2 = (0, 1, 0) \\
v_3 = (0, 0, 1) \\
\end{matrix} & \rightarrow & \begin{bmatrix}
1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1
\end{bmatrix}
\end{matrix}
```

The vertices are cartesian coordinates, ``v_i = (x_i, y_i, z_i)``, and the right-hand-side
matrix is constructed by stacking each vertex as a row in the matrix.

This code block demonstrates how to use XPORTA.jl to compute the halfspace
representation of the 3-simplex.

```@example
using XPORTA

# Construct the vertex representation (POI) of the 3-simplex.
simplex_poi = POI(vertices = [1 0 0;0 1 0;0 0 1])

# Compute the halfspace representation (IEQ) with traf().
simplex_ieq = traf(simplex_poi)

# Print out the bounding linear equalities and inequalites.
println("Simplex Equalities: ", simplex_ieq.equalities)
println("Simplex Inequalities: ", simplex_ieq.inequalities)
```

The equality represents a normalization constraint

```math
x + y + z = 1.
```

The inequalities represent positivity constraints on ``x``, ``y``, and ``z``.

```math
\begin{matrix}
-y \leq 0 &  & y \geq 0 \\
-z \leq 0 & \rightarrow & z \geq 0 \\
y + z \leq 1 &  & x \geq 0\\
\end{matrix}
```

The right-hand-side is realized by applying the the normalization constraint and performing
some algebra.

!!! warning "PORTA is a Rational Solver"
    Methods accept matrices of type `Int` or `Rational{Int}`. All other types
    will result in a `TypeError` when constructing a `POI` or `IEQ`.
