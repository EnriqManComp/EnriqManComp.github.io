---
layout: post
title: "¿Por qué se necesita el Deep Reinforcement Learning?"
categories: misc
---

# ¿Qué problemas tiene el RL tradicional?

1) **La cantidad de estados y la capacidad de iterar sobre estos**. En RL tradicional se asume que se conocen todos los estados en el entorno por adelantado. Por lo tanto, se puede iterar fácilmente y almacenar el valor asociado a cada uno. Esta metodología funciona cuando se tiene un entorno donde la cantidad de estados es pequeña. Cuando la cantidad de estados es grande se convierte en un problema computacional complejo, principalmente para dispositivos de poca capacidad computacional. 
2) **Capacidad de almacenamiento**. Este problema se relaciona con el problema anterior en cuanto a que el incremento de la cantidad de estados exige un incremento de la capacidad de memoria para almacenarlos. Por ejemplo, una imagen obtenida de algún juego de Atari 2600 tiene una resolución de 210x160 pixeles, y cada pixel puede tener 128 colores. Por lo tanto, cada frame que se obtenga de la pantalla tiene 33600 pixeles, para un total de ***128exp(33600)*** posibles estados que es aproximadamente igual a ***10exp((70802)***. Por consiguiente, tanto almacenar tantas imágenes y otros datos que pueden incluirse en los estados, como iterar sobre ellos no es práctico.

Si estos problemas no parecen ser suficientes como para sacrificar optimalidad por realizar la transición hacia el DRL, ya que existen algoritmos para reducir dimensionalidad o los avances computacionales han mejorado el desempeño de los algoritmos en general. Pues existen otras limitantes que se relacionan con la motivación de la inteligencia artificial actual a utilizar sistemas basados en redes neuronales.

1) **No dependencia de conocimiento previo**. Me refiero a que en RL tradicional se necesita información del entorno y de los estados por adelantado para poder calcular los valores de cada estado. 



