# Polish Weather Visualization

> **Course Example Project**: This repository serves as a template and example for students in the CAS Generative Data Design course. It demonstrates how to build a weather data visualization using real Danish weather data.

## Project Description

This project visualizes wind patterns and weather data across Denmark using a particle system. The visualization shows how maritime winds from the Atlantic Ocean influence Denmark's temperate oceanic climate, creating the characteristic weather patterns that define the region.

## Purpose & Goal

This example project demonstrates key techniques in creative coding and data visualization:
- Working with real-world data from APIs (data saved locally from OpenWeatherMap API)
- Combining geographic and meteorological data
- Creating dynamic visualizations
- Using particle systems for data visualization
- Integrating multiple web technologies (p5.js, d3.js, Tailwind CSS)

## Data Sources & Information

### Weather Data
- **Source**: [OpenWeatherMap API](https://openweathermap.org/api)
- **File**: `weather-DK.json`
- **Time Period**: Data collected from June 2025
- **Coverage**: Multiple weather stations across Denmark and northern Germany

### Data Structure
Each weather station entry contains:
```json
{
  "coord": { "lon": 7.2214, "lat": 54.104 },
  "weather": [{ "main": "Clear", "description": "clear sky" }],
  "main": {
    "temp": 15.52,
    "humidity": 71,
    "pressure": 1027
  },
  "wind": {
    "speed": 6.1,
    "deg": 331,
    "gust": 6.98
  },
  "name": "Baltrum"
}
```

### Geographic Data
- **Source**: World countries GeoJSON
- **File**: `world.geojson` 
- **Usage**: Filtered to show Denmark's boundaries and geographic outline

## How It Works

The visualization uses a particle system where 2000 particles move across the canvas according to wind data:

1. **Geographic Projection**: D3.js Mercator projection centers on Denmark (10.59°E, 55.95°N)
2. **Wind Field**: Each particle finds its nearest weather station using a quadtree for efficient spatial queries
3. **Movement**: Particles move based on wind direction and speed from the nearest weather station
4. **Lifecycle**: Particles have limited lifespans and respawn randomly to maintain visual flow

## Technologies Used

- **p5.js**: Canvas rendering and particle system animation
- **d3.js**: Geographic projections and spatial data structures
- **Tailwind CSS**: Responsive styling and typography
- **HTML**: Structure and semantic markup
- **OpenWeatherMap API**: Real weather data source

## Setup & Installation

### Prerequisites
- VS Code with the p5.vscode extension (which includes Live Server)

### Running the Project
1. Clone this repository to your local machine
2. Open the project folder in VS Code
3. Install the p5.vscode extension if not already installed
4. Click "Go Live" button in the VS Code status bar
5. The project will open in your browser at `http://localhost:5500`

## Live Demo

View the live visualization at: [https://chrischne-edu.github.io/danish-weather](https://chrischne-edu.github.io/danish-weather)

## Project Status

**Status**: Complete - Course Example Template  
**Last Updated**: September 2025  
**Version**: 1.0

---