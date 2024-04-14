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
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/enfoque_combinatorio.png" width="300px" height="280px"/>
</div>

Ventajas:
* Se pueden evadir los obstáculos debido a la propia naturaleza de discretización del entorno en celdas y la conexión entre celdas alcanzables.
* Poco coste computacional comparado con otros enfoques de solución.
Desventajas:
* Si bien la conexión entre las celdas es cuando son alcanzables físicamente, **no tiene en cuenta si debido a las dimensiones físicas de un robot puede alcanzar dichas celdas**.
* Existen diferentes configuraciones mecánicas para los robots (por ejemplo: DDR), para este enfoque se **supone que los nodos del grafo son alcanzables y no si es posible alcanzarlo por la configuración mecánica de un robot**.
* Este enfoque supone que el robot puede observar con sus sensores toda la región que abarca un nodo. En la realidad un robot tiene limitaciones en la capacidad de observación de los sensores, y además tienen ciertos patrones de observación (ejemplo, una cámara omnidireccional y una direccional) que pueden no ajustarse al método de solución del enfoque combinatorio.

#### Enfoque diferencial

El enfoque diferencial se tiene un conjunto de controles que puede aplicar un robot:
$$u_p = [v_p, \gamma_p], 0 \leq v_p \leq C, 0 \leq \gamma_p \leq \frac{\pi}{6}$$

Además, se tiene un conjunto de ecuaciones diferenciales con las cuales se puede describir la evolución en el tiempo del robot.
Ahora, supongamos que tenemos la tarea de ir de un punto a otro (Figura 2). Para ir hasta el punto rojo se puede ir por diferentes trayectorias aplicando diferentes combinaciones en los controles.


<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/enfoque_diferencial.png" width="350px" height="290px"/>
</div>


