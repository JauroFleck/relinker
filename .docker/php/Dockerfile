# Usa a imagem do PHP 8.4 com Apache
FROM php:8.4-apache

# Instala extensões necessárias para Laravel e PostgreSQL
RUN apt-get update && apt-get install -y \
    netcat-traditional \
    libpq-dev \
    unzip \
    curl \
    git \
    npm \
    && docker-php-ext-install pdo pdo_pgsql

# Habilita os módulos necessários do Apache
RUN a2enmod rewrite headers

# Define o diretório de trabalho dentro do container
WORKDIR /var/www/html

# Copia os arquivos do Laravel para o container
COPY . .

# Instala as dependências do Laravel
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && composer install --no-dev --optimize-autoloader

# Instala as dependências do Node.js
RUN npm install && npm run build

# Permissões corretas para o storage e cache
RUN chmod -R 775 storage bootstrap/cache

# Copia o arquivo de configuração do Apache
COPY .docker/apache/vhost.conf /etc/apache2/sites-available/000-default.conf

#Instala o opcache
RUN docker-php-ext-install opcache

# Copia o arquivo de configuração do opcache
COPY .docker/php/opcache.ini /usr/local/etc/php/conf.d/opcache.ini

# Copia o script para o container
COPY .docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Adiciona o ServerName ao arquivo de configuração do Apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Define a porta do Apache
EXPOSE 80

# Define o script como comando de inicialização
CMD ["/usr/local/bin/entrypoint.sh"]
