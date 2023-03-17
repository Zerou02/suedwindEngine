---
marp: true
theme: gaia
class: invert
math: mathjax
---

# Der Südwestwind

## - der kleinste Gemeinsame Teiler -

---

# Notos - der Südwind

* Bringer des Sommers
* sanft und warm

<img src=Notos.png style="position: absolute; bottom: 0; right: 0;">

---

# Zephyros - der Westwind

* Bringer des Frühlings
* Reifer der Saaten

<img src=Zephyr.png style="position: absolute; bottom: -570px; right: -200px">

---

# Zusammenhalt

* Notos und Zephyros haben ähnliche Gemüter
* Wie lassen sich die beiden jedoch Vereinen?

---

# Ein Mathematischer Ansatz

* Offensichtlich senkrecht aufeinander
* Demnach: Produkt der beiden 0
* Wenn wir jedoch den Blickwinkel ändern ...

<img src=Coordinates.png style="position: absolute; top: 120px; right: 0; height: 600px">

---
<img src=Coordinates.png style="position: absolute; top: 120px; right: 400px; height: 600px">

---

<img src=Coordinates.png style="position: absolute; top: 120px; right: 390px; height: 800px">

---

<img src=Coordinates.png style="position: absolute; top: 120px; right: 350px; height: 1100px">

---

<img src=Coordinates.png style="position: absolute; top: 120px; right: 300px; height: 1500px">

---

<img src=Coordinates.png style="position: absolute; top: 120px; right: 230px; height: 2000px">

---

# Der Ursprung des Windes

* Astraios: 
    * Titan der Abenddämmerung

* Eos:
    * Titanin der Morgenröte

<img src=Astraios.png style="position: absolute; bottom: -30px; right: 0px">

---

# Wir erschaffen eine neue Zukunft
<style scoped>
h1 {
   font-size: 3.5rem;
   position: absolute;
   top: 180px;
}
</style>
---

# Also begrüße ...
<style scoped>
h1 {
   font-size: 3.5rem;
   position: absolute;
   top: 250px;
}
</style>
---

# EoS - Element organisation Structure

* Westwind bietet:
    * dynamisches Menu
    * Weltstruktur auf Canvas
    * => Editor

* Südwind bietet:
    * Funktion
    * Bilder
    * => Runtime

---

* Schnittpunkt liefert Weltstruktur aus Zephyr

*   ts: ``` 
        components: { [z-index: number]: WorldObject }
        ```

* Beispiel: ```
    componets = {  
        0: [
            { type: "rect", origin: pos.new(-100, -100), width: 1000, height: 600 },
        ],
    }```

---

* Bereitstellung von Funktionen zum:
    * Registrieren von Weltobjekten
    * Zeichnen der Weltobjekte auf Canvas

* Unterstützung von:
    * Rechtecken
    * Ovalen
    * Bildern

* Eventuell:
    * Polygone
    * Custom-Components

---

### Brain Storming: Was braucht ein Worldobject?

<textarea style="width: 1100px; height: 500px; resize: none;" autofocus></textarea>