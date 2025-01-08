# Usa a imagem oficial do Node.js como base
FROM node:16

# Define o diretório de trabalho no container
WORKDIR /app

# Copia o package.json e o package-lock.json para instalar as dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código-fonte para o container
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm", "start"]
