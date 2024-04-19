---
layout: post
title: "Avance de Proyecto de Tesis"
categories: thesis
---

## Solución a problemas de persecución-evasión (PE) en robótica móvil utilizando Deep Reinforcement Learning

### Enfoques tradicionales de solución a problemas de PE

Existen varios enfoques con los que resolver problemas de PE. Dos de los más utilizados fueron los siguientes:
* Enfoque Combinatorio.
* Enfoque Diferencial.

#### Enfoque combinatorio

En este enfoque se discretiza un entorno en celdas, donde cada celda es el nodo de un grafo y las aristas que conectan los nodos son las conexiones permisibles entre las celdas.
Luego con esta representación del entorno contenida en un grafo se puede aplicar algún algoritmo de búsqueda o captura del evasor.

<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/enfoque_combinatorio.png" width="300px" height="280px"/>
</div>

Ventajas:
* Se pueden evadir los obstáculos debido a la propia naturaleza de discretización del entorno en celdas y la conexión entre celdas alcanzables.
* Bajo coste computacional comparado con otros enfoques de solución.
Desventajas:
* No tiene en cuenta las características mecánicas ni físicas de los robots para trasladarse entre los nodos.
* Este enfoque supone que el robot puede observar con sus sensores toda la región que abarca un nodo. En la realidad un robot tiene limitaciones en la capacidad de observación de los sensores, y además tienen ciertos patrones de observación (ejemplo, una cámara omnidireccional y una direccional) que pueden no ajustarse al método de solución del enfoque combinatorio.

#### Enfoque diferencial

Con este enfoque si se tiene un modelo de configuración mecánico para los robots. Del cual podemos aplicar una serie de controles como los siguientes:

$$u_p = [v_p, \gamma_p], 0 \leq v_p \leq C, 0 \leq \gamma_p \leq \frac{\pi}{6}$$

Además, se tiene un conjunto de ecuaciones diferenciales con las cuales se puede describir la evolución en el tiempo del robot, donde las restricciones en los controles se introducen como restricciones a las ecuaciones diferenciales. 

Supongamos que un robot quiere ir de un punto a otro. El robot puede aplicar diferentes combinaciones de controles que trazarán diferentes trayectorias. Cada trayectoria va a tener un costo asociado, por ejemplo el tiempo que toma recorrerla. Además cada trayectoria se van a dividir en estados donde el robot aplicó las combinaciones de los controles que lo llevaron por la trayectoria.

<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/enfoque_diferencial.png" width="350px" height="300px"/>
</div>

Cada uno de los estados tiene una función de valor en función del costo J. Básicamente, la función de valor no es más que una forma de darle cierto valor a un estado sobre otro, o dicho de otra forma si el robot está en ese estado le dice que tan bien lo está haciendo.
Al final se quiere encontrar el conjunto de controles que minimice la función de costo J. O sea, que nos lleve por la ruta o los estados que minimice el tiempo de realizar esta tarea. Encontrar estos controles para minimizar J es un problema de optimización y para resolverlo se busca una solución a la ecuación de HJB.

Ventajas:
* Se tiene una descripción matemática sólida para la solución del problema.
* Tiene en cuenta las características y limitaciones de un robot y de sus sensores.
Desventaja:
* Encontrar la solución analítica a la ecuación de HJB no es posible en muchos casos. En la mayoría de los casos, se puede resolver para un sistema de ecuaciones diferenciales lineales y para ecuaciones de costo cuadráticas. De otro modo se necesita buscar aproximaciones que no siempre van a ser beneficiosas desde el punto de vista computacional.
* Añadir complejidad a los controles de un robot y a las ecuaciones diferenciales que describen su evolución en el tiempo añade complejidad para buscar una solución a la HJB. Por lo tanto, de no caer en la primera desventaja existe un alto costo computacional.
* Incluir los obstáculos del entorno por complejos que sean como restricciones a las ecuaciones diferenciales sin caer en uno de los problemas anteriores es todo un desafío.

### Reinforcement Learning (RL)

A partir de los problemas de los enfoques anteriores se buscaron otras alternativas para resolver problemas de PE. Uno de estas alternativas fue el RL.

El RL puede ser visto como un proceso de toma de decisiones donde existe este intercambio continuo de información proveniente del entorno conla cual el robot va a procesarla para tomar una acción para realizar cierta tarea en dicho entorno.

#### Elementos fundamentales que intervienen del RL

Existen dos elementos fundamentales en el enfoque de RL. El primero, es lo que se llama Markov Decision Process (MDP) el cual es un marco matemático para describir el proceso de toma de decisiones descrito anteriormente.

Los elementos que intervienen en un MDP son los siguientes:
* Estados (S): Es la información necesaria para que el robot ejecute las acciones. Este estado puede ser información proveniente del entorno, de otro agente, y otro tipo de información como lecturas de los sensores del propio robot o de sensores externos.
* Modelo T(s,a,s'): Contiene las reglas de transición de un estado S a un estado S' tomando una acción a. El modelo puede ser determinístico o probabilístico.
* Acciones: Son los posibles controles que puede ejecutar el robot.
* Recompensas R(s), R(s,a,s'): Contiene las recompensas que puede recibir un robot por estar en cierto estado s o por llegar a cierto estado s'. Estas recompensas pueden ser discretas o continuas o una combinación de ambas.
* Política: Al final lo que se quiere obtener es una política (un comportamiento a partir del estado S) que mapee de un estado S a una acción A que máximice la recompensa R(S).

Un MDP por si solo no es suficiente para poder obtener una solución buena para una tarea de RL. Por lógica podemos suponer que una acción tomada hoy que nos de la máxima recompensa no significa que tomar esa acción hoy maximice las recompensas que tendremos en el futuro. Este concepto se refleja en el segundo de los elementos que intervienen en el RL, las funciones de valor.

Existen diferentes funciones de valor las más conocidas es la función de estado V(s), y la función de estado-acción Q(s,a).

* La función de estado V(s) es la ecuación de Bellman donde si se realiza de forma recursiva y se tiene un modelo de transición de estados podemos obtener todas las recompensas que se van a obtener en el futuro. El parámetro gamma no es más que un factor de descuento que nos dice que tanto le hacemos caso a las recompensas futuras. Este parámetro si sustituimos V(s') por la ecuación de estado veremos que el factor gamma crece exponencialmente con el número de estados. Esto significa que las recompensas más cercanas al estado s tendrán mayor peso en la decisión.
* La función de estado-acción Q(s,a) es una aproximación de la función de valor anterior donde contiene el mismo concepto solo que se calcula para cada acción su valor para el estado s.

### Deep Reinforcement Learning (DRL)

Este enfoque es necesario debido a varios factores que son explicados en el post: [¿Por qué se necesita el DRL?](https://enriquecompanioni.me/misc/2024/04/08/deep-reinforcement-learning.html)
Bajo las deficiencia del RL se ha tratado de buscar métodos alternativos donde los más utilizados son aquellos que parametrizan la política en forma de vectores de peso como es el caso de las redes neuronales (DRL). En DRL se utiliza la misma teoría que en RL solo que la política la aprende una red neuronal.

### Objetivo general del proyecto de tesis

En el proyecto de tesis lo que se quiere hacer es diseñar, implementar y evaluar una red neuronal que utilice como datos de entrada las lecturas de los sensores de un robot móvil y arroje como resultado una política de movimiento para un problema de PE.

#### Objetivos específicos

* Obtener un conjunto de datos extraídos de los sensores de un robot móvil en un entorno creado en Gazebo con un evasor.

* Diseñar, implementar y evaluar una red neuronal que utilice dicha información como su conjunto de entrenamiento.

* Evaluar el modelo de red neuronal entrenado en diferentes entornos con distintas complejidades.

### Metodología

<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/metodologia.png" width="350px" height="300px"/>
</div>

### Propuesta inicial

#### Entorno

El entorno se diseñó en Gazebo donde se tiene una habitación de 6.0x6.0 metros, y una cámara aérea ubicada a 8.0 metros de altura. Los robots tienen una configuración DDR y pueden tomar 8 posibles acciones A = {No action, Up, Down, Left, Right, Double-Left, Double-Right}. El proceso de diseño de los robots fue similar al creado en el repositorio [differential-drive-robot-model-ros-gazebo](https://github.com/EnriqManComp/differential-drive-robot-model-ros-gazebo)   

<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/entorno.png" width="350px" height="300px"/>
</div>

<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/entorno1.png" width="350px" height="300px"/>
</div>

#### Tarea inicial del perseguidor

La tarea inicial del perseguidor es utilizar como estados las imágenes aéreas proveniente de la cámara para ejecutar acciones que lo lleven hacia un área cercana al evasor que inicialmente va a estar fijo.

<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/tarea_perseguidor.png" width="350px" height="300px"/>
</div>

Dicho de otro modo, las tareas a realizar son:

* Utilizar como información de los estados las imágenes de la cámara aérea. La formación del estado actual y del estado futuro se formarán con cuatro frames del movimiento del robot. Esta forma de tratar los estado es similar a la utilizada en el paper [Human-level control through deep reinforcement learning](https://www.nature.com/articles/nature14236)
* Evitar la colisión con los obstáculos: límites del entorno y el agente evasor.
* Aprender una política de búsqueda del área cercana al agente evasor.

**Subtareas:**

* Aprender propiedades inerciales y mecánicas del robot.
* Aprender la distorsión de 3D a 2D causada al capturar la imagen aérea. 

### Algoritmos utilizados

Para la realización de la primera tarea en Gazebo se utilizó el algoritmo DQN, Double DQN, Dueling DQN, y Dueling Double DQN. Además, para mejorar la eficiencia en la selección de las muestras de entrenamiento se implementó la variante Prioritized Experience Replay. Los resultados no fueron los esperados debido a la inestabilidad en el entrenamiento que generalmente sufren estos métodos basados en Q-learning.

<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/tipos%20de%20algoritmos%20en%20DRL.png" width="350px" height="300px"/>
</div>

















