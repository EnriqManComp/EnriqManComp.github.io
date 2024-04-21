---
layout: post
title: "Técnica de regularización: Multi-Sample Dropout"
categories: regularization techniques DL
---

## Introducción

Dropout es una técnica de regularización simple pero eficiente cuando se quiere lograr mejorar la generalización de las redes neuronales (NN). 

Básicamente, dropout lo que hace es descartar aleatoriamente una proporción de las neuronas para evitar el overfitting durante el entrenamiento de la NN. En ["Multi-sample dropout for accelerated training and better generalization"](https://arxiv.org/abs/1905.09788) introducen una variante de esta técnica con el objetivo de acelerar el entrenamiento e incrementar la generalización.

<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/multi-sample-dropout/Post_MultiSample_Dropout.png" />
</div>

## Resumen del paper

* En el paper se propone utilizar diferentes stream de capas dropout donde lo único que se comparte son los pesos de las fully connected layers.
* Luego para cada uno de los stream se calcula la pérdida y estas pérdidas se promedian para obtener la pérdida para actualizar los pesos.

<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/multi-sample-dropout/Post_MultiSample_Dropout1.png" />
</div>

* El uso de esta técnica reduce el número de iteraciones para el entrenamiento, pero incrementa el tiempo de ejecución por iteraciones.
* Donde quiera que exista una capa dropout con características similares a la figura anterior se puede usar este método para acelerar el entrenamiento.
* Esta técnica no solo acelera el entrenamiento sino que demuestran que se puede alcanzar una exactitud mayor en los resultados.

### Hiperparámetros recomendados

* **Cantidad de streams:** En el paper prueban las combinaciones de sin dropout, 1, 2, 4, 8, 16, 32, y 64. La selección de la cantidad de streams depende del tiempo de ejecución que se desee, pero se demuestra que entre mayor sea el número de streams utilizados disminuye el error en el entrenamiento y la validación.
* **Probabilidad de descarte de neuronas:** Se prueba 10%, 30%, 50%, 70%, y 90% de probabilidad, donde se concluye que para 30% de probabilidad de descarte se obtienen los mejores resultados.








