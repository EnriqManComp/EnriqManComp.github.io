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


