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

Además, se tiene un conjunto de ecuaciones diferenciales con las cuales se puede describir la evolución en el tiempo del robot, donde las restricciones en los controles se introducen como restricciones a las ecuaciones diferenciales. 
Ahora, supongamos que tenemos la tarea de ir de un punto a otro (Figura 2). Para ir hasta el punto rojo se puede ir por diferentes trayectorias aplicando diferentes combinaciones en los controles.

<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/enfoque_diferencial.png" width="350px" height="290px"/>
</div>

Estas trayectorias se pueden discretizar a lo largo del tiempo, a los cuales se le llamarán estados. Cada uno de los estados tiene una función de valor en función de un costo asociado a ir por cada una de las trayectorias. Básicamente, la función de valor no es más que una forma de darle cierto valor a un estado sobre otro en función digamos del tiempo que tarda ir del punto azul al rojo tomando esa trayectoria.
Y lo que se quiere hacer al final es quedarnos con la trayectoria que va a minimizar el tiempo de ir del punto azul al rojo.

Y bien, encontrar esta trayectoria que minimiza una función de costo (el tiempo) a partir de una serie de controles y ecuaciones diferenciales que describen la evolución de un sistema en el tiempo, es un problema de optimización. Para resolverlo pues recurriremos a la ecuación de Hamilton-Jacobi-Bellman (HJB) donde al resolverla tendremos un conjunto de soluciones óptimas para los controles del robot que lo llevarán sobre los estados de la trayectoria óptima.

Ventajas:
* Se tiene una descripción matemática sólida para la solución del problema.
* Tiene en cuenta las características y limitaciones de un robot y de sus sensores.
Desventaja:
* Encontrar la solución a la ecuación de HJB no es posible en muchos casos. Específicamente, se puede resolver para un sistema de ecuaciones diferenciales lineales y para ecuaciones de costo cuadráticas.
* Añadir complejidad a los controles de un robot y a las ecuaciones diferenciales que describen su evolución en el tiempo añade complejidad para buscar una solución a la HJB. Por lo tanto, de no caer en la primera desventaja existe un alto costo computacional.
* Incluir los obstáculos del entorno por complejos que sean como restricciones a las ecuaciones diferenciales sin caer en uno de los problemas anteriores es todo un desafío.

### Reinforcement Learning (RL)

A partir de los problemas de los enfoques anteriores se buscaron otras alternativas para resolver problemas de PE. Uno de estas alternativas fue el RL.

El RL puede ser visto como un proceso de toma de decisiones donde se tiene un robot y un entorno. El robot recibe una observación del entorno en el instante t y ejecuta un control o acción en base a la observación que recibe. Luego, recibe otra observación en el instante t+1 y ejecuta otro control, y así sucesivamente en el tiempo. Este proceso de toma de decisión con el objetivo de realizar cierta tarea digamos ir de un punto a otro como el ejemplo anterior.

#### Elementos fundamentales que intervienen del RL

Existen dos elementos fundamentales en el enfoque de RL. El primero, es lo que se llama Markov Decision Process


