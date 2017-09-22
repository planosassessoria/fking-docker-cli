FROM node
ADD install.sh /home/node/install.sh

RUN chmod +x /home/node/install.sh \
	&& ./home/node/install.sh

ENV PRODUCTION=true

EXPOSE 3001
ENTRYPOINT pm2 start /home/node/funcionario-service/docker/pm2-deploy.json && bash
