# Usar a imagem oficial do Node.js como base
FROM node:14

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o código da aplicação
COPY . .

# Expor a porta que a aplicação usará
EXPOSE 4000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
