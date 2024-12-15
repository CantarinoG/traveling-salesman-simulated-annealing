# Traveling Salesman Problem Visualization

This is an interactive web application that visualizes solutions to the Traveling Salesman Problem (TSP) using the Simulated Annealing algorithm. The application allows users to generate random cities and observe how the algorithm finds an optimized route between them.

## Features

- Generate random cities on a 400x400 grid
- Customize the number of cities
- Adjust the number of iterations for the algorithm
- Visual representation of:
  - City locations
  - Initial random solution
  - Best solution found
- Distance calculations for both initial and optimized routes

## How to Use

You can either:

1. Visit [the live demo](https://cantarinog.github.io/traveling-salesman-simulated-annealing/)

Or run locally:

1. Open `index.html` in a web browser 

2. Set the desired number of cities 
3. Set the number of iterations for the algorithm
4. Click "Gerar" (Generate) to run the simulation
5. Observe the three canvases showing:
   - City locations
   - Initial random route
   - Optimized route

## Technical Details

- Implementation uses pure JavaScript
- Simulated Annealing parameters:
  - Initial temperature: 1000.0
  - Cooling rate: 0.003
- Visualization done using HTML Canvas
- No external dependencies required

## Algorithm

The project implements the Simulated Annealing algorithm to solve the TSP, which includes:
- Random initial solution generation
- Neighbor solution generation through swap operations
- Temperature-based acceptance probability
- Cooling schedule implementation