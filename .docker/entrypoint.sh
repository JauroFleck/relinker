#!/bin/bash
set -e

# Aguarda o banco de dados estar pronto antes de rodar as migrations
echo "Aguardando o banco de dados..."
until nc -z -v -w30 db 5432; do
    echo "Esperando pelo banco de dados..."
    sleep 5
done

echo "Banco de dados pronto, rodando migrations..."
php artisan migrate:fresh --seed

# Inicia o Apache
apache2-foreground
