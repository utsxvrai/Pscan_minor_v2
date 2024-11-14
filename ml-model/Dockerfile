FROM python:3.9-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port (optional, but recommended)
EXPOSE 8000

# Set the entry point to use uvicorn with api:app
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]