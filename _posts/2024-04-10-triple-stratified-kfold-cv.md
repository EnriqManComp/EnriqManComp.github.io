---
layout: post
title: "Triple Stratified KFold CV (IN DEVELOPMENT)"
categories: misc
---

## Triple Stratified KFold

### Stratify 1 - Aislar Pacientes

Un paciente puede tener múltiples imágenes. Para prevenir el data leakage durante el cross validation se tienen que poner en un TFRecord juntas.

### Stratify 2 - Balancear las imágenes Malignas

El dataset tiene una baja cantidad de imágenes del tipo Maligno. Por lo tanto, para mantener la confianza en los resultados de los entrenamientos cada TFRecord tiene que tener el mismo porcentaje de imágenes de tipo Maligno que el dataset completo.

### Stratify 3 - Balancear la cantidad de imágenes por paciente

Mientrás que unos pacientes tienen 115 imágenes otros solamente tienen 2 imágenes. Lo que se hace es crear TFRecord con aislamiento de pacientes (Stratify 1) donde cada TFRecord contenga la misma cantidad de pacientes aunque no tenga la misma cantidad de imágenes.



