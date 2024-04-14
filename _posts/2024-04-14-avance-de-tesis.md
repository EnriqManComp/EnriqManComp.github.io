---
layout: post
title: "Avance de Proyecto de Tesis"
categories: thesis
---

## Solución a problemas de persecución-evasión (PE) en robótica móvil utilizando Deep Reinforcement Learning

### Enfoques tradicionales de solución a problemas de PE

Existían anteriormente dos enfoques para tratar problemas de PE: el enfoque combinatorio y el diferencial.

#### Enfoque combinatorio

El enfoque combinatorio no es más que discretizar un entorno en celdas. Cada celda es el nodo de un grafo y las aristas del grafo son las conexiones permitidas entre celdas en el entorno.
Luego de tener el grafo que representa al entorno lo que se hace es aplicar algún algoritmo de búsqueda sobre este y así se resuelven problemas de PE como captura y búsqueda del evasor. Inclusive se puede tratar aplicaciones de cooperación entre perseguidores para encontrar a un evasor en cierto entorno para responder preguntas como:
* Cuál es el mínimo número de perseguidores que se necesita para encontrar a un evasor en X entorno.
* Bajo que circunstancias un evasor se puede evadir de P número de perseguidores en X entorno.


<div align="center">
  <img src="https://github.com/EnriqManComp/EnriqManComp.github.io/blob/master/assets/2do-avance-post/enfoque%20combinatorio.png" width="300px" height="280px"/>
</div>


