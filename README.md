# Restaurant
CRUD API de restaurantes

## Instalação

* Arquivos de configuração estão nos arquivos `.env` e são carregados automaticamente de acordo com o ambiente.
* Ao rodar em desenvolvimento é possivel acessar a documentação em [/api](http://localhost:3000/api), a senha de acesso está na variável de ambiente.


## Rodando a aplicação

```bash
# Instalação de dependencias
$ yarn install

# modo desenvolvimento
$ yarn start:dev

# modo produção
$ yarn build
$ yarn start:prod
```
## Rodando em Docker

```bash
# buildar a imagem
$ docker build -t restaurant .

# rodar a imagem
$ docker run -p 3000:3000 restaurant
```

