FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Install Chrome and Chromedriver

# Instale as dependências necessárias para o Google Chrome
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    libxi6 \
    libgconf-2-4


# Instale o Google Chrome
RUN wget --no-verbose -O /tmp/chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && apt install -y /tmp/chrome.deb \
    && rm /tmp/chrome.deb

RUN 

# Instale o Chromedriver
RUN echo "Installing chromium webdriver version " &&\
    wget -O /tmp/chromedriver.zip https://storage.googleapis.com/chrome-for-testing-public/123.0.6312.58/linux64/chromedriver-linux64.zip &&\
    unzip -j /tmp/chromedriver.zip -d /usr/local/bin/ &&\
    rm /tmp/chromedriver.zip

RUN npm run build

RUN npm run generate

CMD [ "npm", "run", "dev" ]