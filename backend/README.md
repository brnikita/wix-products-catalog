## Structure

Root Directory
app.module.ts: The root module of your application. This is where you import and configure other modules.
main.ts: The entry point of your application, where the Nest.js application is created and started.
Common Directory
This directory can contain shared resources and utilities like data transfer objects (DTOs), exception filters, guards, interceptors, and pipes that can be reused across different modules.

### Common subdirectories:

 - dto: Contains shared DTOs.
 - exceptions: Contains custom exception classes.
 - filters: Contains custom exception filters.
 - guards: Contains custom guards.
 - interceptors: Contains custom interceptors.
 - pipes: Contains custom pipes.
 
 ### Products Directory
 - dto: Contains the data transfer objects used for product-related operations.

 - create-product.dto.ts: DTO for creating a new product.
 - update-product.dto.ts: DTO for updating an existing product.
 - entities: Contains the entity definitions.

 - product.entity.ts: Defines the Product entity, representing the product table in the database.
 - products.controller.ts: The controller for handling HTTP requests related to products.

 - products.module.ts: The module that bundles together the controller and service for products.

 - products.service.ts: The service containing business logic related to products.

### Config Directory
 - config.module.ts: Configures the configuration module for the application.
 - config.service.ts: Provides access to configuration variables.
