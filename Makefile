.PHONY: \
run start \
pretty \
clean

run: start

start:
	npm start

pretty:
	npx eslint .
	npx prettier --write .

clean: pretty