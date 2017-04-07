# Set any missing env variables used to configure deck

_DECK_HOST=0.0.0.0
_DECK_PORT=9000
_API_HOST=http://gate:8084
_DECK_CERT_PATH=$DECK_CERT
_DECK_KEY_PATH=$DECK_KEY

if [ -z "$_DECK_HOST" ];
then
    _DECK_HOST=0.0.0.0
fi

if [ -z "$_DECK_PORT" ];
then
    _DECK_PORT=9000
fi

if [ -z "$_API_HOST" ];
then
    _API_HOST=http://localhost:8084
fi

if [ -z "$_DECK_CERT_PATH" ];
then
	# SSL not enabled
	cp docker/spinnaker.conf.gen spinnaker.conf
else
	service apache2 stop
	a2enmod ssl
	cp docker/spinnaker.conf.ssl spinnaker.conf
	sed -ie 's|{%DECK_CERT_PATH%}|'$_DECK_CERT_PATH'|g' spinnaker.conf
	sed -ie 's|{%DECK_KEY_PATH%}|'$_DECK_KEY_PATH'|g' spinnaker.conf
fi

# Generate spinnaker.conf site & enable it

sed -ie 's|{%DECK_HOST%}|'$_DECK_HOST'|g' spinnaker.conf
sed -ie 's|{%DECK_PORT%}|'$_DECK_PORT'|g' spinnaker.conf
sed -ie 's|{%API_HOST%}|'$_API_HOST'|g' spinnaker.conf

mkdir -p /etc/apache2/sites-available
mv spinnaker.conf  /etc/apache2/sites-available

a2ensite spinnaker

# Update ports.conf to reflect desired deck host

cp docker/ports.conf.gen ports.conf

sed -ie "s/{%DECK_HOST%}/$_DECK_HOST/g" ports.conf
sed -ie "s/{%DECK_PORT%}/$_DECK_PORT/g" ports.conf

mv ports.conf /etc/apache2/ports.conf


cp /settings.js /opt/deck/html/settings.js

apache2ctl -D FOREGROUND 