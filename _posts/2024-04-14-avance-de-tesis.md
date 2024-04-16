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
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/enfoque_diferencial.png" width="350px" height="300px"/>
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

Existen dos elementos fundamentales en el enfoque de RL. El primero, es lo que se llama Markov Decision Process (MDP) el cual es un marco matemático para describir el proceso de toma de decisiones descrito anteriormente.

Los elementos que intervienen en un MDP son los siguientes:
* Estados (S): El cual es la información necesaria para que el robot ejecute las acciones. Este estado puede ser información proveniente del entorno y otro tipo de información como lecturas de los sensores del propio robot.
* Modelo: El modelo es el que describe la transición de un estado S a un estado S'. El modelo puede ser determinístico o probabilístico.
* Acciones: Son las acciones o controles que puede ejecutar el robot.
* Recompensas: Son las recompensas que puede recibir un robot por estar en cierto estado o por llegar a cierto estado. Estas recompensas pueden ser discretas o continuas o una combinación de ambas.
* Política: Al final lo que se quiere obtener es una política que mapee de un estado S a una acción A que máximice la recompensa esperada para cierta tarea. Una política no es más que el comportamiento que va a tener un robot si le presentamos un estado S.

El segundo de los elementos que intervienen en el enfoque de RL es las funciones de valor. Existen diferentes funciones de valor las más conocidas es la función de estado V, y la función de estado-acción Q. Donde la V es la ecuación de Bellman vista anteriormente para el enfoque diferencial, y la Q es una aproximación de la V donde se tiene en cuenta el valor para cada acción.

### Deep Reinforcement Learning (DRL)

Este enfoque es necesario debido a varios factores que son explicados en el post: [¿Por qué se necesita el DRL?](https://enriquecompanioni.me/misc/2024/04/08/deep-reinforcement-learning.html)
Bajo la deficiencia del RL se ha tratado de buscar métodos alternativos donde los más utilizados son aquellos que parametrizan la política en forma de vectores de peso como es el caso de las redes neuronales (DRL). En DRL se utiliza la misma teoría que en RL solo que la política la aprende una red neuronal.

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

### Entorno

El entorno diseñado en Gazebo tiene una dimensión de 6x6 metros, y una cámara aerea ubicada a 8 metros de altura. Los robots diseñados tienen una configuración DDR y pueden tomar 8 posibles acciones A = {No action, Up, Down, Left, Right, Double-Left, Double-Right}.   

<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/entorno.png" width="350px" height="300px"/>
</div>

<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/entorno1.png" width="350px" height="300px"/>
</div>

### Tarea inicial del perseguidor

La tarea inicial del perseguidor es ir a un área cercana del evasor para simular una tarea de mantener en vista.

<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/tarea_perseguidor.png" width="350px" height="300px"/>
</div>

### Qué se intenta hacer en la primera aproximación a la tarea anterior

* Utilizar como información del estado las imágenes de la cámara aerea. La formación del estado actual y el estado futuro se formarán con cuatro frames del movimiento del robot perseguidor. Esta forma de tratar el estado es similar a la utilizada en el paper [Human-level control through deep reinforcement learning](https://www.nature.com/articles/nature14236)
* Evitar la colisión con los obstáculos: límites del entorno y agente evasor.
* Aprender una política de búsqueda del área cercana al agente evasor.

**Subtareas:**

* Aprender propiedades inerciales del agente.
* Aprender movimientos mecánicos del agente.
* Aprender distorsión 3D a 2D por cámara panorámica. 

#### Arquitectura de red neuronal utilizada

La arquitectura de la red neuronal utilizada es la que se describe en la Figura. En la cual se tiene un conjunto de capas convolucionales y un conjunto de capas densas. A la salida de la red se va a tener una capa densa en la cual la cantidad de neuronas van a coincidir con las acciones que puede ejecutar el robot.

<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/DQN%20arch.png" width="350px" height="300px"/>
</div>

La cantidad de filtros y sus dimensiones, el stride, y la cantidad de neuronas de las capas densas son las mismas que las utilizadas en el paper mencionado anteriormente. Los algoritmos utilizados para aprender la política y para el entrenamiento de la red anterior se describirán a continuación.

### Tipos de algoritmos utilizados en DRL

<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/2do-avance-post/tipos%20de%20algoritmos%20en%20DRL.png" width="350px" height="300px"/>
</div>

Existen diferentes enfoques para resolver un problema utilizando DRL. Por un lado están los algoritmos basados en Q-learning donde se utiliza un algoritmo para entrenar una red como un buen estimador de la función Q asociada a cada acción cuando se le introduce cierto estado. Y por el otro lado se tienen los algoritmos basados en policy optimization los cuales utilizan por lo general redes Actor-Critic donde se tiene una red Actor que aprende la política directamente y a la salida tiene las probabilidades de ejecutar cada una de las acciones, y se tiene una red Critic que va a cuestionar la decisión tomada por la red Actor.

A continuación se irán describiendo cada uno de los algoritmos. Cada uno de los que voy a explicar fueron los utilizados para implementar en la primera aproximación del proyecto de tesis.

#### DQN

**¿Cómo funciona el algoritmo de aprendizaje y la arquitectura DQN ?**

<div align="center">
  <img src="https://github.com/EnriqManComp/EnriqManComp.github.io/blob/master/assets/2do-avance-post/DQN%20policy.png" width="350px" height="300px"/>
</div>

La arquitectura de red neuronal anteriormente vista funciona como cualquier otra CNN. En esta sección explicaré lo que sucede a la salida de la red. Como sabemos una unidad lineal de una capa densa (neurona) lo que estima a la salida es la ecuación lineal y=w*x + b. Como se mencionó anteriormente la capa densa de salida coincide con la cantidad de acciones que puede ejecutar el robot, por lo tanto, las llamaremos igual que las acciones que puede realizar el robot (simplificando: UP, DOWN, LEFT, RIGHT). La salida de cada neurona no es más que un valor numérico a la salida, este valor es la estimación del valor Q para cada una de las acciones Q(s,a).

De estas estimaciones de Q(s,a) se extrae el argumento que maximiza el valor de Q. Lo que se puede interpretar como extraer la acción que maximiza el valor de Q.

##### Algoritmo de aprendizaje o entrenamiento

<div align="center">
  <img src="https://github.com/EnriqManComp/EnriqManComp.github.io/blob/master/assets/2do-avance-post/DQN%20train.png" width="350px" height="300px"/>
</div>

Para explicar este proceso tomaremos como ejemplo un problema de clasificación de Machine Learning (ML). En un problema de clasificación se tiene un conjunto de datos con características y una variable objetivo que nos sirve como valor verdadero o de referencia para ajustar a un modelo de ML. En DRL no se tiene una estimación verdadera del valor de Q para comparar con las estimaciones de la red. Por lo tanto, la solución que se recomendó en el paper mencionado anteriormente es utilizar otra red que nos sirva como referencia.

**A partir de ahora a la red que contiene la política del robot la llamaremos red Q y a la de referencia le llamaremos Q target.**

Esta red Q target va a iniciar con los mismos pesos que la red Q, pero se va a actualizar cada X veces que se entrene la red Q. O sea, es una versión que se actualiza con menos frecuencia. Esto hace que si la red Q modifica su política a valores que son peores que los anteriores aprendidos pueda regresar un poco hacia atrás por medio de la red Q target y el algoritmo de backpropagation.

Al final se quiere estimar la acción que va a maximizar no solo la recompensa inmediata si no la recompensa futura esperada. Con la red Q target predecimos los valores Q futuros por medio de los estados futuros S' y sustituiremos el máximo de la estimación Q' en la ecuación de Bellman: $$Q = r_s + \gamma * max(Q')$$
Donde {\gamma} no es más que un factor de descuento que pesa cuanta atención dedicamos a la recompensa futura. Y esta estimación de Q será la que se usará como Q verdadera para calcular la pérdida entre la Q estimada por la red Q y la Q verdadera calculada. La pérdida que se utiliza generalmente es el square error y como es un minibatch de experiencia se utiliza el Mean Square Error. Luego, se actualizan los pesos de la red Q con dicha pérdida.

Para el entrenamiento de la red Q se evalua la acción tomada anteriormente y se vuelve a estimar el valor Q para esa acción. Dicho de otro modo la selección de la acción y la evaluación de la acción se realiza de forma junta en una misma red.

Este algoritmo es conocido por funcionar en muchas aplicaciones, pero tiende algunas veces a aprender valores altos de Q para las acciones. Esto es debido a que tiene un paso de maximización sobre la estimación de los valores de las acciones. Esto hace que si se tiene un conjunto de acciones posibles y la red aún no ha aprendido nada la red comience a hacerle caso a cierta acción que parece buena en principio cuando en realidad no lo era.     

#### Double DQN (DDQN)

Este algoritmo se centra en mitigar este efecto de sobreestimación y su solución se basa en dividir la estimación del valor de la acción y su evaluación. Con el estado inicial se mantiene lo presentado anteriormente, pero para el estado siguiente se estima la acción que va a maximizar el estado futuro y se evalúa esta acción en la estimación del valor Q de la red Q target. Esto es con el objetivo de tener también una predicción en el futuro de la acción que va a maximizar la Q futura y por consiguiente la recompensa futura esperada.

#### Dueling DQN y Double Dueling DQN (D3QN)

Estas dos las explicaré juntas porque la arquitectura Dueling es el cambio de arquitectura de la red neuronal y D3QN es el algoritmo visto anteriormente. 
La motivación de los autores del paper básicamente lo que buscan es proponer una arquitectura alternativa de red neuronal a las utilizadas para Q-learning sin modificar los algoritmos existentes. El beneficio que proponen para cambiar la arquitectura de la red es buscar abarcar un poco más de generalización en problemas donde las redes existentes no aprendían una política correcta.

La idea que plantean es separar el valor Q en una representación del estado (que es la función V) y una función de ventaja (A) que no es más que una medida de la importancia de cada acción. Esta separación está fundamentada además porque en ciertos problemas no se necesita calcular el valor de las acciones porque no existe una ventaja de tomar una sobre otra. Tomemos como ejemplo el caso del juego Enduro donde la parte encargada de aprender la función de valor observa continuamente la carretera de forma adelantada mientras que la función de ventaja solo tiene valor cuando la colisión con un objeto es eminente.

Las operaciones que le siguen al stream de la función de ventaja es porque la ecuación Q=V+A no es identificable porque diferentes valores de V y A pueden dar el mismo valor de Q. En el paper dicen que esto vuelve inestable la política y además vuelve ineficiente el aprendizaje. Por lo tanto, la vuelven identificable centrando a 0 los valores de la función de ventaja reduciendo la media de los valores de esta función.

Bueno, en resumen desde un punto de vista más abstracto vamos a tener un conjunto de parámetros independientes que van a intentar ser buenos estimadores de la función V y la A y esto va a traer mejoras en el aprendizaje de una política para un agente.

Ahora, todos estos algoritmos de Q-learning se demoran en converger por lo tanto, no podía probar si realmente iban a funcionar caundo mi problema es más complejo que tener juegos de Atari que es el benchmark que estos papers tratan de batir. De igual forma revisé papers para saber si se habían utilizado antes en aplicaciones de robótica similares a las que estoy tratando en el proyecto.

Pues para probar este algoritmo recurrí primero a un recurso llamado OpenAI Gym el cual tiene diferentes juegos con el propósito de utilizarlos en algoritmos de RL. El primero que probé fue este llamado Lunar Lander el cual cada estado tiene 8 observaciones de la nave que ven y la nave puede ejecutar 4 acciones distintas. Y el objetivo es aterrizar entre las dos banderas. Ahí en la gráfica les presento el resultado del entrenamiento utilizando la arquitectura dueling y el algoritmo Double DQN. Este epsilon que ven es una de las formas que los algoritmos de Q-learning introducen exploración en la política, y no es más que seleccionar un número al azar entre 0 y 1 y si es menor que el valor de epsilon ejecuta una acción aleatoria y si no realizo una predicción de la acción con la red Q, que sería el equivalente a explotar la política actual. Con el tiempo este epsilon se va reduciendo dejando menos exploración y más explotación de la política. 
El video que ven ahí es 10 corridas de la política que aprendió hasta ese momento y se puede observar que ya empieza a tener buenos resultados.

Luego, tomamos la decisión de implementar un escenario que se pareciera a lo que queremos hacer pero más simplificado de forma tal que pudiesemos probar estos algoritmos en nuestro propia mesa de prueba por decirlo de una forma. En pygame diseñé este juego donde el punto azul representa un perseguidor y el rojo un evasor. Simulamos el mismo problema de ir al área cercana al punto rojo ejecutando las acciones A = {No Action, Up, Down, Left, Right, Double-Left, Double-Right} y el estado consistía en la imagen que ven escalada a 84x84 y en escala de grises. Y si bien para el problema anterior del Lunar Lander funcionaba bien y este problema empezaba a dar ciertos resultados positivos la verdad es que se demoraba muchísimo, esto que ven me tardó dos semanas en obtenerlo.

Luego leí más papers y algunos combinaban imágenes con otros sensores como lidar y pasé a utilizarlo también. No tengo resultados de ese experimento porque lo que buscaba era si añadiendole esa información podía converger más rápido y no fue así. Y empecé a buscar también otras alternativas en cuanto al tratado de la experience replay. Probé el tradicional y uno que se llama Prioritized Experience Replay el cual asigna probabilidades a las tuplas de experiencia que se van actualizando a partir de las pérdidas del algoritmo de entrenamiento de las redes.
























