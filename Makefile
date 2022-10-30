.PHONY: \
all \
run start \
pretty \
clean

SB_VERSION=LOCAL_DEVELOPMENT

all: run

run: start

start:
	REACT_APP_SB_VERSION=${SB_VERSION} \
		npm start

pretty:
	npx eslint .
	# npx prettier --write .

clean: pretty