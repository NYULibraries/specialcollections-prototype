# Dockerfile
FROM solr:9.9.0

COPY conf/ /configs/development-core/conf/

USER root
RUN mkdir -p /var/solr/data \
 && chown -R solr:solr /var/solr /configs

USER solr

RUN /opt/solr/bin/solr start \
 && /opt/solr/bin/solr create_core -c development-core -d /configs/development-core \
 && /opt/solr/bin/solr stop
