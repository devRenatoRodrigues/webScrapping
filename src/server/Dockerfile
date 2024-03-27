FROM node:18-buster

# Instale as dependências necessárias para o Google Chrome
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    libxi6 \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libgtk-3-0


# Instale o Google Chrome
RUN wget --no-verbose -O /tmp/chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && apt install -y /tmp/chrome.deb \
    && rm /tmp/chrome.deb

# Instale o Chromedriver
RUN echo "Installing chromium webdriver version " &&\
    wget -O /tmp/chromedriver.zip https://storage.googleapis.com/chrome-for-testing-public/123.0.6312.58/linux64/chromedriver-linux64.zip &&\
    unzip -j /tmp/chromedriver.zip -d /usr/bin &&\
    rm /tmp/chromedriver.zip 

COPY package*.json ./

WORKDIR /app

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build &&  npm run generate

CMD [ "npm", "run", "dev" ]