# handwriting-synthesis
**Synthesize handwriting using math instead of janky AI.**

(completely vibecoded btw)

---

## Project Wiki: Handwriting with MATH

**Why this exists:** Because I'm too lazy to write out my work on paper.

### The Logic
* **Coordinate Mapping:** Every stroke is a collection of high-precision $(x, y)$ vectors. This isn't a font, but rather it's a simulation of motion.
* **The Variant Lottery:** Having 130+ variants means the chance of two identical letters appearing in the same paragraph is less than if you had only one variant per character, which makes it actually look like handwriting.
* **The Recursive Loop:** The more you train, the more "Letter Trail" ghosts you create, allowing the model to understand the boundaries of your style without being rigid. (yap for "more variation the more you write")

### Practical Laziness Tips
* Use **High-Res PNG Export** to drop the final output directly into digital assignments. Or print them out I guess.
* Adjust **Word Spacing** to match your handwriting.

---

## Technical Overview
This project avoids traditional neural network synthesis in favor of direct vector path manipulation. By storing the raw intent of the pen stroke rather than a static image, the engine can simulate variables like ink pressure, velocity-based line thickness, and natural baseline drift.
