.PHONY: install build start

install:
	# instala deps del paquete raíz (server, scripts, etc.)
	npm install --prefix ..
	# instala deps del CRA
	npm install --prefix ../frontend

build:
	# compila el CRA
	npm run build --prefix ../frontend

start: build
	# levanta el server sirviendo el build
	npm start --prefix ..
