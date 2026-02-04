# Visualizador de Algoritmos de Ordenação

Projeto interativo para **visualizar algoritmos de ordenação** passo a passo. A ideia é facilitar o aprendizado, mostrando como cada algoritmo compara, troca e organiza os dados ao longo do tempo.

---

## 🎯 Objetivo

* Visualizar algoritmos de ordenação em execução
* Entender como cada algoritmo funciona internamente
* Observar diferenças de comportamento em diferentes cenários

> O objetivo **não é comparar desempenho real**, mas sim compreender o funcionamento. Alguns algoritmos podem parecer mais lentos visualmente por conta da própria estratégia usada.

---

## 🧠 Como funciona

* Os dados podem iniciar:

  * Embaralhados
  * Ordenados (ascendente)
  * Ordenados (descendente)
  * Semi-ordenados
* Cada algoritmo executa passo a passo
* A visualização utiliza **highlights** para indicar:

  * Comparações
  * Trocas
  * Regiões ativas do array

---

## 📚 Algoritmos Implementados

Cada algoritmo abaixo possui um **dropdown (`<details>` / `<summary>`)** com:

* Complexidade de tempo (melhor, médio e pior caso)
* Uso de memória
* Explicação detalhada do funcionamento

Você pode expandir cada um para estudar individualmente.

---

### Simples (didáticos)

<details>
<summary><strong>Bubble Sort</strong></summary>

**Complexidade de tempo**

* Melhor caso: O(n)
* Caso médio: O(n²)
* Pior caso: O(n²)

**Uso de memória**

* O(1) — in-place

**Como funciona**
Percorre o array várias vezes, comparando pares adjacentes e trocando quando estão fora de ordem. A cada iteração, o maior elemento "flutua" para o final.

</details>

<details>
<summary><strong>Selection Sort</strong></summary>

**Complexidade de tempo**

* Melhor caso: O(n²)
* Caso médio: O(n²)
* Pior caso: O(n²)

**Uso de memória**

* O(1) — in-place

**Como funciona**
Busca o menor elemento do array e o coloca na posição correta. Repete o processo para o restante da lista.

</details>

<details>
<summary><strong>Insertion Sort</strong></summary>

**Complexidade de tempo**

* Melhor caso: O(n)
* Caso médio: O(n²)
* Pior caso: O(n²)

**Uso de memória**

* O(1) — in-place

**Como funciona**
Constrói uma parte ordenada do array, inserindo cada novo elemento na posição correta.

</details>

<details>
<summary><strong>Odd-Even Sort</strong></summary>

**Complexidade de tempo**

* Melhor caso: O(n)
* Caso médio: O(n²)
* Pior caso: O(n²)

**Uso de memória**

* O(1)

**Como funciona**
Executa comparações alternando entre índices pares e ímpares até que o array esteja ordenado.

</details>

<details>
<summary><strong>Cocktail Shaker Sort</strong></summary>

**Complexidade de tempo**

* Melhor caso: O(n)
* Caso médio: O(n²)
* Pior caso: O(n²)

**Uso de memória**

* O(1)

**Como funciona**
Variação do Bubble Sort que percorre o array nos dois sentidos, melhorando casos parcialmente ordenados.

</details>

---

### Intermediários

<details>
<summary><strong>Comb Sort</strong></summary>

**Complexidade de tempo**

* Melhor caso: O(n log n)
* Caso médio: O(n²)
* Pior caso: O(n²)

**Uso de memória**

* O(1)

**Como funciona**
Melhora o Bubble Sort comparando elementos distantes usando um gap que diminui ao longo do tempo.

</details>

<details>
<summary><strong>Shell Sort</strong></summary>

**Complexidade de tempo**

* Melhor caso: O(n log n)
* Caso médio: depende da sequência de gaps
* Pior caso: O(n²)

**Uso de memória**

* O(1)

**Como funciona**
Generalização do Insertion Sort que usa gaps para mover elementos longas distâncias.

</details>

<details>
<summary><strong>Double Selection Sort</strong></summary>

**Complexidade de tempo**

* Melhor caso: O(n²)
* Caso médio: O(n²)
* Pior caso: O(n²)

**Uso de memória**

* O(1)

**Como funciona**
Seleciona simultaneamente o menor e o maior elemento e os posiciona nas extremidades.

</details>

<details>
<summary><strong>Pancake Sort</strong></summary>

**Complexidade de tempo**

* Melhor caso: O(n²)
* Caso médio: O(n²)
* Pior caso: O(n²)

**Uso de memória**

* O(1)

**Como funciona**
Ordena usando reversões (flips), levando o maior elemento ao topo e depois à posição correta.

</details>

---

### Avançados

<details>
<summary><strong>Heap Sort</strong></summary>

**Complexidade de tempo**

* Melhor caso: O(n log n)
* Caso médio: O(n log n)
* Pior caso: O(n log n)

**Uso de memória**

* O(1)

**Como funciona**
Constrói uma heap binária e remove o maior elemento repetidamente.

</details>

<details>
<summary><strong>Merge Sort (Top-Down)</strong></summary>

**Complexidade de tempo**

* Melhor caso: O(n log n)
* Caso médio: O(n log n)
* Pior caso: O(n log n)

**Uso de memória**

* O(n)

**Como funciona**
Divide recursivamente o array e depois mescla as partes ordenadas.

</details>

<details>
<summary><strong>Merge Sort (Bottom-Up)</strong></summary>

**Complexidade de tempo**

* Melhor caso: O(n log n)
* Caso médio: O(n log n)
* Pior caso: O(n log n)

**Uso de memória**

* O(n)

**Como funciona**
Mescla blocos pequenos de forma iterativa até ordenar todo o array.

</details>

<details>
<summary><strong>Quick Sort (LL / LR)</strong></summary>

**Complexidade de tempo**

* Melhor caso: O(n log n)
* Caso médio: O(n log n)
* Pior caso: O(n²)

**Uso de memória**

* O(log n)

**Como funciona**
Divide o array em torno de um pivô e ordena recursivamente as partições.

</details>

<details>
<summary><strong>Quick Sort Dual Pivot</strong></summary>

**Complexidade de tempo**

* Melhor caso: O(n log n)
* Caso médio: O(n log n)
* Pior caso: O(n²)

**Uso de memória**

* O(log n)

**Como funciona**
Usa dois pivôs para dividir o array em três regiões.

</details>

<details>
<summary><strong>Intro Sort</strong></summary>

**Complexidade de tempo**

* Melhor caso: O(n log n)
* Caso médio: O(n log n)
* Pior caso: O(n log n)

**Uso de memória**

* O(log n)

**Como funciona**
Começa com Quick Sort e muda para Heap Sort quando a recursão fica profunda demais.

</details>

<details>
<summary><strong>Tim Sort</strong></summary>

**Complexidade de tempo**

* Melhor caso: O(n)
* Caso médio: O(n log n)
* Pior caso: O(n log n)

**Uso de memória**

* O(n)

**Como funciona**
Algoritmo híbrido baseado em Merge Sort e Insertion Sort, otimizado para dados parcialmente ordenados.

</details>

---

### Não comparativos

<details>
<summary><strong>Counting Sort</strong></summary>

**Complexidade de tempo**

* Melhor caso: O(n + k)
* Caso médio: O(n + k)
* Pior caso: O(n + k)

**Uso de memória**

* O(k)

**Como funciona**
Conta a frequência de cada valor e reconstrói o array ordenado.

</details>

<details>
<summary><strong>Radix Sort (LSD)</strong></summary>

**Complexidade de tempo**

* Melhor caso: O(n · k)
* Caso médio: O(n · k)
* Pior caso: O(n · k)

**Uso de memória**

* O(n + k)

**Como funciona**
Ordena os elementos dígito por dígito, do menos significativo para o mais significativo.

</details>

<details>
<summary><strong>Radix Sort (MSD)</strong></summary>

**Complexidade de tempo**

* Melhor caso: O(n · k)
* Caso médio: O(n · k)
* Pior caso: O(n · k)

**Uso de memória**

* O(n + k)

**Como funciona**
Ordena os elementos começando pelo dígito mais significativo.

</details>

---

## ⚖️ Comparação

* Alguns algoritmos são **estáveis**, outros não
* Alguns usam **memória extra**, outros são in-place
* A visualização ajuda a entender essas diferenças na prática

---

## 🚀 Motivação

O projeto foi criado inicialmente para **estudos pessoais**, como forma de aprender algoritmos de ordenação de maneira prática e visual. Com o tempo, decidi compartilhar esse aprendizado em forma de um projeto interativo.

---

## 📌 Observações

* O foco do projeto é **aprendizado e visualização**, não performance
* Todos os algoritmos foram **implementados manualmente**
* Algumas implementações podem diferir da versão clássica
* Apenas algoritmos que eu estudei foram adicionados ao projeto
