import fs from "fs";
const input = fs.readFileSync("input.txt", "utf-8");
const lines = input.split("\n");
const grid = [];
const grid2 = [];
const galaxies = [];
// skapar rader & columner från datan i input
for (let i = 0; i < lines.length; i++) {
    grid[i] = [];
    grid2[i] = [];
}
// Om vi söter på #, sätter vi till true
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char == "#") {
            grid[i][j] = true;
            grid2[j][i] = true;
            galaxies.push({ y: i, x: j });
        }
    }
}
// Skapar en array som håller koll på expansion
const expansion = Array.from(galaxies, _ => ({ x: 0, y: 0 }));
// Kollar efter helt tomma rader, "Expanderar" i y led
for (let k = 0; k < grid.length; k++) {
    if (grid[k].length == 0) {
        for (let l = 0; l < galaxies.length; l++) {
            const galaxy = galaxies[l];
            if (galaxy.y > k) {
                expansion[l].y++;
            }
        }
    }
}
// Kollar tomma kolumner, expanderar i X-led
for (let k = 0; k < grid2.length; k++) {
    if (grid2[k].length == 0) {
        for (let l = 0; l < galaxies.length; l++) {
            const galaxy = galaxies[l];
            if (galaxy.x > k) {
                expansion[l].x++;
            }
        }
    }
}
// Uppdaterar galaxies arrayen med expansionen
for (let ö = 0; ö < galaxies.length; ö++) {
    galaxies[ö].y += expansion[ö].y;
    galaxies[ö].x += expansion[ö].x;
}
// ......#
// ...#...
let sumOfDistance = 0;
for (let i = 0; i < galaxies.length - 1; i++) {
    for (let k = i + 1; k < galaxies.length; k++) {
        sumOfDistance += Math.abs(galaxies[i].y - galaxies[k].y);
        sumOfDistance += Math.abs(galaxies[i].x - galaxies[k].x);
    }
}
console.log(sumOfDistance);
