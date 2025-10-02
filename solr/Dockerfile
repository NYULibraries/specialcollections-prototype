# Dockerfile
FROM solr:9.9.0

COPY conf/ /configs/development-core/conf/

USER root
RUN mkdir -p /var/solr/data \
    && chown -R solr:solr /var/solr /configs

USER solr

