# Gerador de Etiquetas - Malotes.

### Como Iniciar

- 1 - Descompact o arquivo readimp-cartao-develop.zip
- 2 - Entre na pasta readimp-cartao-develop
- 3 - Click com o botão direito em um local vazio da pasta e vai em Git Bash Here

- 4 - Instale as dependências com o comando:

  ```bash 
  npm install
  ```

- 5 - Encontro o arquivo `.env.example`, faça uma cópia e renomei para `.env`

- 6 - Inicie o servidor com o comando:

  ```bash 
  npm run dev
  ```

- 7 - Abra o Insomnia 
  - Importe o aquivo com as lista de requisições
  - Selecione a requisição: Upload Pouches HangTags

### Parâmetro obrigatórios:

- file
- discipline
- evaluation
- client
- printTestNumber (sim ou não)

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
