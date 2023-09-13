# Gerador de Etiquetas - Malotes.

# Acesse esse link para visualizar as instruções formatadas: https://github.com/eloilsondosanjos/readimp-cartao

## 📦 Como Baixar e Executar o Projeto
- 1 - Abre o terminal na pasta que deseja salvar os arquivos do projeto

```bash

  # Para clonar o repositório para sua maquina

  $ git clone https://github.com/eloilsondosanjos/readimp-cartao.git

  # Para entrar na pasta do projeto
  $ cd readimp-cartao

  # Para instalar todas as dependências do projeto
  $ npm install

```
- 2 - Encontro o arquivo `.env.example`, faça uma cópia e renomei para `.env`

- 3 - Inicie o servidor com o comando:

  ```bash 
  npm run dev
  ```

- 4 - Abra o Insomnia 
  - Importe o aquivo com as lista de requisições em: docs/Insomnia_XXXX-XX-XX.json 
  - Selecione a requisição: Upload Pouches HangTags

### Parâmetro obrigatórios:

- file
- discipline
- evaluation
- client
- printTestNumber (sim ou não)

### Projeto já estando clonado:

```bash

  # Para atualizar e baixar a ultima versão do projeto

  $ git pull
```


### Como resolver possíveis problemas

### Windows

<br>

- 1 - Servidor não inicia, mensagens de erros de portas e processos do node, execute os comandos no CMD do Windows como admin:
<br>

  > Listar os processor abertos, e procure todos os processos abertos no local host: 127.0.0.1*

  ```bash
  netstat -o -n
  ```

  > Este mata o processo do node na porta:

  ```bash
  taskkill /F /PID <nome_processo>
  ```

  > Este mata o processo na porta:

  ```bash
  netstat -a -n -o | findstr <porta>
  ```

  ```bash
  #Ex: 

  netstat -a -n -o | findstr 3000
  ```

### Linux
<br>

- 1 - Caso e servidor não inicie execute o comando no Linux:
<br>

  > Este lista os processos abertos na porta: 3000

  ```bash
  sudo netstat -lpn |grep :3000
  ```

  > Este mata o processo na porta:

  ```bash
  kill <numero do processo>
  ```

  ```bash
  #Ex: 

  kill 13187
  ```
