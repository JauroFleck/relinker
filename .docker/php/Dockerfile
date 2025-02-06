# Usa a imagem do PHP 8.4 com Apache
FROM php:8.4-apache

# Instala extensões necessárias para Laravel e PostgreSQL
RUN apt-get update && apt-get install -y \
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

# Instala as dependências do projeto
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && npm install

#Instala e configura o opcache
RUN docker-php-ext-install opcache
COPY .docker/php/opcache.ini /usr/local/etc/php/conf.d/opcache.ini

# Instala dependências apenas em produção
RUN composer install --no-dev --optimize-autoloader --no-interaction
RUN npm run build

# Permissões de diretórios
RUN chown -R www-data:www-data .
RUN find . -type f -exec chmod 644 {} \;
RUN find . -type d -exec chmod 755 {} \;
RUN chgrp -R www-data storage bootstrap/cache
RUN chmod -R ug+rwx storage bootstrap/cache

# Copia o arquivo de configuração do Apache
COPY .docker/apache/vhost.conf /etc/apache2/sites-available/000-default.conf

# Adiciona o ServerName ao arquivo de configuração do Apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Define a porta do Apache
EXPOSE 80

# Define o script como comando de inicialização
CMD ["apache2-foreground"]
