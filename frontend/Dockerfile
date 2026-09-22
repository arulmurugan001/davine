# syntax=docker/dockerfile:1

FROM nginx:1.29-alpine

# Remove default nginx configuration
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy our nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy frontend files
COPY index.html /usr/share/nginx/html/index.html

# Make frontend files readable
RUN chmod -R 755 /usr/share/nginx/html

# Nginx will run as non-root user
USER nginx

# Nginx listens on 8080
EXPOSE 8080

# Health check
HEALTHCHECK --interval=10s --timeout=3s --retries=5 \
    CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]  