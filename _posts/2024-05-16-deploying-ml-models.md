---
layout: post
title: "Deploying Machine Learning Models"
categories: MLOps
---

# ( IN DEVELOPMENT ... )

Models are performing **worse in production than in development**, and the classic ML workflow is proving inadequate.

## Classic ML Workflow

<div align="center">
  <img src="https://raw.githubusercontent.com/EnriqManComp/EnriqManComp.github.io/master/assets/deploying-ml-models/Deploying%20ML%20post.drawio.png" />
</div>

## Realities of Deployed Models

Models degrade in accuracy as soon as they are deployed in the real world. This is due the dinamic changes of the data. So, a constant stream of new data is needed to keep models working well and train the model again every one or two months.

***How frequently the model needs to be retrain?***

The answer to that question is it depends. It's based on what your model is used for.
- By application
- By geographic location

## Problem Afflicting AI-based Solutions

- Overfitting
- Training-serving Skew: This has to do with how you process the data that you use in training versus production.
- Concept Drift: The relationships that the model found in the data at the time of deployment do they still hold true, or have they changed?
- Concerted Adversaries: Security Issues related to expose data to the public or been hacked.

## Options for Deployment of ML models

### Amazon SageMaker for Deep Learning

Amazon SageMaker is a ML service to help you build and train ML models. 
- SageMaker runs Jupyter notebooks on instances in the cloud to explore and prepare data.
- Support frameworks like Tensorflow and PyTorch.
- Allow allocate and manage compute resources: VMs, memory, scaling parameters, GPUs, CPUs.
- Offer you support to evaluate the model.
- You can use Built-in algorithms hosted on containers on the AWS Cloud for a faster deployment. Or you can bring your own algorithm (Own code, model, or container)






