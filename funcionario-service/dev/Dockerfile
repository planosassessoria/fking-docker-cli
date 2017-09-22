FROM node
ADD install.sh /home/node/install.sh

RUN chmod +x /home/node/install.sh \
	&& ./home/node/install.sh

# ENV PRODUCTION=false

EXPOSE 3001
ENTRYPOINT bash
