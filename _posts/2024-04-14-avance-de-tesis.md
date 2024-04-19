---
layout: post
title: "Introducción a mi Proyecto de Tesis de Maestría"
categories: thesis
---

## Solución a problemas de persecución-evasión (PE) en robótica móvil utilizando Deep Reinforcement Learning

### Enfoques tradicionales de solución a problemas de PE

#### Enfoque combinatorio

En este enfoque, se discretiza un entorno en celdas, donde cada celda es un nodo de un grafo y las aristas que conectan los nodos representan las conexiones permisibles entre las celdas. Luego, con esta representación del entorno contenida en un grafo, se puede aplicar algún algoritmo de búsqueda o captura del evasor.

<br />
<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/enfoque_combinatorio.png" width="300px" height="280px"/>
</div>
<br />

**Ventajas:**
* Es posible evitar obstáculos debido a la naturaleza de la discretización del entorno en celdas y la conexión entre las celdas alcanzables.
* Tiene un bajo coste computacional en comparación con otros enfoques de solución.

**Desventajas:**
* No tiene en cuenta las características mecánicas ni físicas de los robots para desplazarse entre los nodos.
* Este enfoque asume que el robot puede observar toda la región que abarca un nodo con sus sensores. En realidad, los robots tienen limitaciones en la capacidad de observación de los sensores, y además, tienen ciertos patrones de observación (por ejemplo, una cámara omnidireccional y una direccional) que pueden no ajustarse al método de solución del enfoque combinatorio.

#### Enfoque diferencial

Con este enfoque, se cuenta con un modelo de configuración mecánica para los robots, que permite aplicar una serie de controles para guiar su movimiento. Por ejemplo, estos controles pueden estar definidos como:

$$u_p = [v_p, \gamma_p], 0 \leq v_p \leq C, 0 \leq \gamma_p \leq \frac{\pi}{6}$$

Además, se dispone de un conjunto de ecuaciones diferenciales que describen la evolución en el tiempo del robot. Las restricciones en los controles se incorporan como restricciones adicionales en estas ecuaciones diferenciales.

<br />
<div align="center">
  <img src="https://github.com/EnriqManComp/EnriqManComp.github.io/blob/master/assets/2do-avance-post/ED.png" width="400px" height="150px"/>
</div>
<br />

Supongamos que un robot desea desplazarse de un punto a otro. Para lograrlo, el robot puede aplicar diversas combinaciones de controles, lo que resultará en diferentes trayectorias. Cada trayectoria tendrá asociado un costo, como el tiempo necesario para recorrerla. Además, cada trayectoria se divide en estados, que representan los puntos específicos a lo largo de la trayectoria donde el robot ha aplicado las combinaciones de controles correspondientes.

<br />
<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/enfoque_diferencial.png" width="350px" height="300px"/>
</div>
<br />

Cada estado en el conjunto de trayectorias tiene asignada una función de valor que depende del costo J. En términos simples, esta función de valor asigna un valor a cada estado, lo que indica qué tan favorable es ese estado en comparación con otros. En esencia, proporciona una medida de qué tan bien está funcionando el robot cuando se encuentra en ese estado.

El objetivo final es encontrar el conjunto óptimo de controles que minimice la función de costo J. Es decir, queremos encontrar los controles que nos lleven a través de la ruta o los estados que minimicen el tiempo necesario para completar la tarea. Resolver este problema implica buscar una solución a la ecuación de Hamilton-Jacobi-Bellman (HJB), que es una herramienta común en la teoría de control óptimo y la optimización dinámica.

<br />
<div align="center">
  <img src="https://github.com/EnriqManComp/EnriqManComp.github.io/blob/master/assets/2do-avance-post/HJB.png" width="350px" height="60px"/>
</div>
<br />

**Ventajas:**
* Proporciona una descripción matemática sólida para abordar el problema.
* Toma en consideración las características y limitaciones tanto del robot como de sus sensores.

**Desventajas:**
* La resolución analítica de la ecuación de Hamilton-Jacobi-Bellman (HJB) no siempre es posible, especialmente en casos complejos. En la mayoría de los escenarios, solo se puede resolver para sistemas de ecuaciones diferenciales lineales y para ecuaciones de costo cuadráticas. En otros casos, se requieren aproximaciones que pueden no ser computacionalmente beneficiosas.
* La incorporación de complejidad adicional a los controles del robot y a las ecuaciones diferenciales que describen su evolución en el tiempo aumenta significativamente el costo computacional para encontrar una solución a la HJB.
* Incluir obstáculos del entorno como restricciones en las ecuaciones diferenciales es un desafío considerable, ya que puede aumentar la complejidad del problema y la dificultad para encontrar soluciones óptimas sin incurrir en costos computacionales excesivos.

### Reinforcement Learning (RL)

Dado los desafíos presentes en los enfoques previos, se han explorado otras alternativas para abordar los problemas de PE. Uno de estos enfoques es el RL.

El RL puede entenderse como un proceso de toma de decisiones en el cual hay un flujo continuo de información proveniente del entorno, la cual el robot procesa para tomar acciones con el fin de llevar a cabo una tarea específica en dicho entorno.

<br />
<div align="center">
  <img src="https://github.com/EnriqManComp/EnriqManComp.github.io/blob/master/assets/2do-avance-post/RL%20workflow.png" width="600px" height="300px"/>
</div>
<br />

#### Elementos fundamentales que intervienen del RL

Hay dos elementos fundamentales en el enfoque de RL. En primer lugar, está el Proceso de Decisión de Markov (MDP), que proporciona un marco matemático para describir el proceso de toma de decisiones mencionado anteriormente.

Los elementos que intervienen en un MDP son los siguientes:

* Estados (s): Representan la información necesaria para que el robot ejecute acciones. Estos estados pueden incluir información del entorno, de otros agentes, así como lecturas de los sensores tanto del propio robot como de sensores externos.
* Modelo de Transición T(s,a,s′): Define las reglas para cambiar de un estado s a otro s′ al tomar una acción a. Este modelo puede ser determinista o probabilístico.
* Acciones: Son las posibles acciones que puede tomar el robot.
* Recompensas R(s), R(s,a,s′): Indican las recompensas que puede recibir el robot al estar en un estado s o al alcanzar un estado s′ después de tomar una acción a. Estas recompensas pueden ser discretas, continuas o una combinación de ambas.
* Política: El objetivo final es obtener una política (un comportamiento basado en el estado s) que mapee un estado s a una acción a que maximice la recompensa R(s).

Sin embargo, un MDP por sí solo no es suficiente para obtener una solución óptima para una tarea de RL. Intuitivamente, una acción tomada hoy que maximice la recompensa no garantiza que maximizará las recompensas futuras. Este concepto se refleja en el segundo elemento crucial del RL: las funciones de valor.

Existen diferentes funciones de valor en el aprendizaje por refuerzo, siendo las más conocidas la función de estado V(s) y la función de estado-acción Q(s,a).

* La función de estado V(s) se define mediante la ecuación de Bellman, la cual puede calcularse recursivamente si se dispone de un modelo de transición de estados. Esta función nos proporciona una estimación de todas las recompensas futuras. El parámetro γ representa el factor de descuento, que determina cuánto valor se asigna a las recompensas futuras en comparación con las actuales. Es importante destacar que este parámetro tiene un efecto exponencial en la ecuación de estado, lo que significa que las recompensas más cercanas al estado s tendrán un mayor impacto en las decisiones.
* La función de estado-acción Q(s,a) es una variante de la función de valor que calcula el valor esperado para cada acción en un estado dado s. Esta función también se puede derivar utilizando la ecuación de Bellman, pero se enfoca en evaluar cada acción específica en lugar del estado en su totalidad.

<br />
<div align="center">
  <img src="https://github.com/EnriqManComp/EnriqManComp.github.io/blob/master/assets/2do-avance-post/V.png" width="400px" height="80px"/>
</div>
<br />

<br />
<div align="center">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://github.com/EnriqManComp/EnriqManComp.github.io/blob/master/assets/2do-avance-post/Q.png" width="370px" height="45px"/>
</div>
<br />

### Deep Reinforcement Learning (DRL)

El DRL se vuelve necesario debido a varias limitaciones del enfoque tradicional de aprendizaje por refuerzo. Se ha discutido a fondo en el artículo [¿Por qué se necesita el DRL?](https://enriquecompanioni.me/misc/2024/04/08/deep-reinforcement-learning.html) disponible en este enlace.

Ante las deficiencias del aprendizaje por refuerzo convencional, se han explorado métodos alternativos, siendo uno de los más prominentes aquellos que emplean redes neuronales para parametrizar la política de acción (DRL). En el DRL, se aplica la misma teoría que en el RL, pero la política de acción es aprendida por una red neuronal, lo que permite abordar problemas más complejos y obtener mejores resultados en tareas de aprendizaje por refuerzo.

<br />
<div align="center">
  <img src="https://github.com/EnriqManComp/EnriqManComp.github.io/blob/master/assets/2do-avance-post/DRL.png" width="600px" height="300px"/>
</div>
<br />

### Objetivo general del proyecto de tesis

El objetivo principal de este proyecto de tesis es diseñar, implementar y evaluar una red neuronal que utilice las lecturas de los sensores de un robot móvil como datos de entrada y genere una política de movimiento para abordar un problema de persecución-evasión.

#### Objetivos específicos

* Recolectar un conjunto de datos obtenidos de los sensores de un robot móvil en un entorno simulado en Gazebo, que incluya la presencia de un agente evasor.

* Diseñar, implementar y evaluar una red neuronal que utilice este conjunto de datos como conjunto de entrenamiento para aprender la política de movimiento.

* Evaluar el rendimiento del modelo de red neuronal entrenado en diferentes entornos con distintos niveles de complejidad, con el fin de analizar su capacidad de generalización y adaptación a diferentes situaciones de persecución-evasión.

### Metodología

<br />
<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/metodologia.png" width="350px" height="300px"/>
</div>
<br />

### Propuesta inicial

#### Entorno

El entorno se ha configurado en Gazebo, donde se ha creado una habitación de dimensiones 6.0x6.0 metros. Además, se ha ubicado una cámara aérea a una altura de 8.0 metros para supervisar la actividad en el entorno. Los robots empleados en este entorno tienen una configuración DDR y son capaces de ejecutar 8 acciones distintas, definidas como A = {No action,Up,Down,Left,Right,Double-Left,Double-Right}. El proceso de diseño de los robots se basó en una metodología similar a la descrita en el repositorio [differential-drive-robot-model-ros-gazebo](https://github.com/EnriqManComp/differential-drive-robot-model-ros-gazebo)   

<br />
<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/entorno.png" width="350px" height="300px"/>
</div>
<br />

<br />
<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/entorno1.png" width="350px" height="300px"/>
</div>
<br />

#### Tarea inicial del perseguidor

La tarea inicial del perseguidor consiste en utilizar imágenes aéreas provenientes de la cámara como estados, con el objetivo de ejecutar acciones que lo conduzcan hacia un área cercana al evasor, que inicialmente permanecerá en una posición fija.

<br />
<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/tarea_perseguidor.png" width="350px" height="300px"/>
</div>
<br />

Las tareas a realizar se desglosan de la siguiente manera:

* Utilizar las imágenes de la cámara aérea como información de los estados. Se formará el estado actual y el estado futuro utilizando cuatro frames del movimiento del robot. Este enfoque para el tratamiento de los estados es similar al utilizado en el artículo [Human-level control through deep reinforcement learning](https://www.nature.com/articles/nature14236).
* Evitar la colisión con los obstáculos, incluyendo los límites del entorno y el agente evasor.
* Aprender una política para buscar el área cercana al agente evasor.

Subtareas:
* Aprender las propiedades inerciales y mecánicas del robot.
* Aprender la distorsión 3D a 2D causada por la captura de imágenes aéreas.

### Algoritmos utilizados

<br />
<div align="center">
  <img src="https://github.com/EnriqManComp/EnriqManComp.github.io/blob/master/assets/2do-avance-post/tipos%20de%20algoritmos%20en%20DRL.png" width="350px" height="300px"/>
</div>
<br />

Para la realización de la tarea en Gazebo, se emplearon los algoritmos DQN, Double DQN, Dueling DQN y Dueling Double DQN. Además, para mejorar la eficiencia en la selección de las muestras de entrenamiento, se implementó la variante Prioritized Experience Replay (PER). Los resultados no fueron los esperados debido a las siguientes razones:

* La inestabilidad en el entrenamiento que generalmente sufren los métodos basados en Q-learning se refleja en inestabilidad en la explotación de la política. El algoritmo se ejecuta en tiempo real, por lo tanto, en los instantes donde se entrena la red neuronal que ejecuta la política existe una demora en la captura del estado S y el estado S′. Esto puede introducir cierto nivel de ruido al aprendizaje de la red, lo que se refleja en su capacidad de anticipación en las decisiones que debe tomar.
* Las imágenes como única información del estado pueden no contener suficiente información para tomar decisiones adecuadas o ayudar en la convergencia del algoritmo.
* Además, Gazebo presenta algunas dificultades para eliminar la información de los sensores de contacto, utilizados para detectar colisiones, al momento de eliminar y reaparecer un modelo de un robot. Este problema se puede encontrar abierto en el repositorio de GitHub para Gazebo [bug](https://github.com/gazebosim/gz-sim/issues/2223). Por lo tanto, la alternativa realizada fue una automatización de procesos para abrir consolas que iniciaran los diferentes nodos utilizados en el algoritmo, proceso que añade una pérdida de tiempo valioso en proyectos de DRL.

### Nuevo enfoque

A partir de los problemas anteriores, se adoptaron nuevos enfoques para abordar el problema:

* Se optó por programar el mismo diseño en PyGame y utilizarlo en el resto del proyecto.
* Se incorporó un sensor láser como medio adicional de sensado para agregar información adicional a los estados.
* Con el objetivo de obtener resultados con mayor anticipación, se decidió simplificar los controles del robot y no utilizar la física del mundo real que se considera en Gazebo.

Los resultados de estas modificaciones se pueden observar en el repositorio [smart-disks](https://github.com/EnriqManComp/smart-disks). A pesar de obtener resultados positivos con la implementación del algoritmo Double DQN y la arquitectura Dueling, aún persistía el problema de la inestabilidad en los puntajes acumulados. Por lo tanto, se recurrió a un algoritmo más robusto basado en la optimización de políticas, llamado Proximal Policy Optimization (PPO).

<br />
<div align="center">
  <img src="https://github.com/EnriqManComp/EnriqManComp.github.io/blob/master/assets/2do-avance-post/smart_disks_D3QN.png" width="600px" height="350px"/>
</div>
<br />

Con la implementación de este algoritmo, el problema anterior se solucionó. Los resultados pueden observarse en el repositorio [smart-disk-ppo](https://github.com/EnriqManComp/Deep-Reinforcement-Learning-Portfolio/tree/master/smart-disks-PPO).

















