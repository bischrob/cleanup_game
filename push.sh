rm -r /var/www/html/assets/cleanup
cp -r dist/* /var/www/html/assets/cleanup/
mkdir -p /var/www/html/icons/cleanup
rm -r /var/www/html/icons/cleanup
cp -r icons /var/www/html/icons/cleanup
cp manifest.json /var/www/html/cleanup
