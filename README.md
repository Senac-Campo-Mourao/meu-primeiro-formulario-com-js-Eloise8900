[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/uImbBc_N)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=21017416&assignment_repo_type=AssignmentRepo)
# 💻 Template de Exercício: Formulário de Cadastro de Clientes - Senac Programador Web

Este repositório serve como um template base para o **Exercício Prático** da disciplina de Desenvolvimento Web do curso de **Programador Web do Senac Paraná**.

O objetivo é desenvolver uma aplicação web simples que permita o cadastro e a listagem de clientes, utilizando **HTML**, **CSS** (com **Bootstrap**) e **JavaScript** (para lógica e manipulação do **Web Storage**).

---

## 🚀 Desafio Proposto

Você deverá construir uma aplicação com as seguintes funcionalidades:

### 1. Formulário de Cadastro
Crie um formulário completo com os seguintes campos para o cadastro de clientes:

| Campo | Tipo de Dado/Formato | Observações |
| :--- | :--- | :--- |
| **Nome** | Texto | |
| **CPF** | Texto/Máscara | Formato: `999.999.999-99` |
| **Telefone** | Texto/Máscara | Formato: `(99) 99999-9999` ou `(99) 9999-9999` |
| **Data de Nascimento** | Data | |
| **Salário** | Número/Moeda | Deve ser usado no cálculo do Limite de Crédito. |
| **Limite de Crédito** | Número/Moeda | **Campo calculado!** Não deve ser preenchido pelo usuário. |

### 2. Cálculo do Limite de Crédito
O sistema deve calcular automaticamente o **Limite de Crédito** do cliente, que é definido como **30% (trinta por cento) do valor do Salário** informado.

$$\text{Limite de Crédito} = \text{Salário} \times 0.30$$

### 3. Persistência de Dados (Storage)
Todos os dados dos clientes cadastrados deverão ser salvos e recuperados usando o **Web Storage** (preferencialmente `localStorage` ou `sessionStorage`) do navegador.

### 4. Listagem de Clientes
Após o cadastro, deve haver uma tela (ou seção) que exiba uma **lista** (tabela ou cards) de *todos os clientes cadastrados* no Storage.

---

## 🛠️ Tecnologias Envolvidas

Para a realização deste exercício, você deverá utilizar as seguintes tecnologias:

* **HTML
