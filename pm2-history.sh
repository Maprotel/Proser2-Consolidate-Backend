pm2 startup

cd /var/www/html/proser_reports
pm2 start --name HISTORY ./src/sync/etl/load/load_history.js --interpreter ./node_modules/.bin/babel-node
pm2 save

