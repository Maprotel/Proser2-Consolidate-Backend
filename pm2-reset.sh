pm2 startup

cd /var/www/html/proser_reports
pm2 start --name SERVER ./src/server/server.js --interpreter ./node_modules/.bin/babel-node
pm2 start --name UPDATE ./src/sync/etl/load/load_day.js --interpreter ./node_modules/.bin/babel-node
pm2 save



