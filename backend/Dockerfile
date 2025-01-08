# Etapa 1: Build do backend
FROM node:16 AS build

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código-fonte para o container
COPY . .

# Compila o código TypeScript para JavaScript no diretório dist/
RUN npm run build

# Etapa 2: Executar o backend
FROM node:16

# Define o diretório de trabalho no container
WORKDIR /app

# Copia apenas os arquivos necessários da etapa de build
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# Expõe a porta 4000
EXPOSE 4000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]