.PHONY: install build start

install:
	# instala dependencias del paquete raíz
	npm install --prefix ..
	# instala dependencias del frontend
	npm install --prefix ../frontend

build:
	# compila el CRA
	npm run build --prefix ../frontend

start: build
	# sirve el build con chat-server
	npm start --prefix ..
