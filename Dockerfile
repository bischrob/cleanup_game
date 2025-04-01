# Use a minimal base image
FROM python:3.11-slim

# Create app directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app files
COPY app.py scores.json ./

# Expose port for Flask
EXPOSE 8002

# Run the app
CMD ["flask", "run", "--host=0.0.0.0", "--port=8002"]
