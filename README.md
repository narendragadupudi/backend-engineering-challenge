
## Getting Started

### Prerequisites

- Docker
- Docker Compose
- Kubernetes and kubectl (optional for Kubernetes deployment)

### Running Locally

To run the services locally using Docker Compose, follow these steps:

1. Clone the repository:
git clone <repository-url>
cd backend-engineering-challenge


2. Start the services:
docker-compose up --build


3. The services will be available at the following ports:
- User Authentication Service: http://localhost:3000
- Product Management Service: http://localhost:3001
- Order Processing Service: http://localhost:3002

### Deploying on Kubernetes

To deploy the services on a Kubernetes cluster, follow these steps:

1. Apply the MongoDB and PostgreSQL manifests:
kubectl apply -f k8s/mongo-deployment.yml
kubectl apply -f k8s/postgres-deployment.yml


2. Apply the service manifests:
kubectl apply -f k8s/user-authentication-deployment.yml
kubectl apply -f k8s/product-management-deployment.yml
kubectl apply -f k8s/order-processing-deployment.yml


3. The services will be available through their respective Kubernetes services.

## API Documentation

### User Authentication Service

- `POST /register`: Register a new user
- `POST /login`: Login and get a JWT token
- `GET /profile`: Get the user's profile (requires JWT)

### Product Management Service

- `GET /products`: Get all products
- `POST /products`: Create a new product
- `PUT /products/:id`: Update a product
- `DELETE /products/:id`: Delete a product

### Order Processing Service

- `GET /orders`: Get all orders
- `POST /orders`: Create a new order
- `PUT /orders/:id`: Update an order
- `DELETE /orders/:id`: Delete an order

## Assumptions

- User authentication is implemented using JWT tokens.
- MongoDB is used for user and product data storage.
- PostgreSQL is used for order data storage.
- Optimistic locking is used for concurrency control in the Product Management Service.
- Docker and Kubernetes are used for containerization and orchestration.

## Testing

To run unit tests for the services, navigate to the respective service directory and run:

npm test


## Additional Documentation

For more detailed information on each service, refer to the README.md files inside each service directory.

## Conclusion

This project demonstrates the implementation of a simple e-commerce application using microservices architecture, with an emphasis on concurrency control, high availability, and robust authentication and authorization mechanisms.
