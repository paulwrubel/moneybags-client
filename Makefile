.PHONY: \
all \
run start \
pretty \
clean

SB_VERSION=local-development

all: run

run: start

start:
	REACT_APP_SB_VERSION=${SB_VERSION} \
		npm start

pretty:
	npx eslint .
	# npx prettier --write .

clean: pretty