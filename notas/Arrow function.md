---
tags:
  - Sintaxe
---
arrow functions são versões simplificadas de funções tradicionais, exemplos abaixo.
#### se há mais de 1 argumento, deve-se incluir os parênteses e os argumentos
**função tradicional:**
```ts
let soma = function(a, b) {
  return a + b;
}
```

**arrow function:**
```ts
let soma = (a, b) => a + b;
```

#### se há somente 1 argumento, o parênteses pode ser omitido.
**função tradicional:**
```ts
let dobro = function(n) {
  return n * 2;
}
```

**arrow function:**
```ts
let dobro = n => n * 2;
```

#### se não há argumentos, somente os parênteses devem ser incluídos.
**função tradicional:**
```ts
let saudacao = function() {
  alert("Olá Mundo");
}
```

**arrow function:**
```ts
let saudacao = () => alert("Olá Mundo");
```
