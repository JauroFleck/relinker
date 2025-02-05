# Relinker

Relinker is a URL shortener that allows any user with an email to generate shortened URLs without the need for registration. The system also provides detailed metrics on the usage of the shortened links.

## Technologies Used

- **Backend:** Laravel
- **Frontend:** React (via Inertia.js)
- **Database:** PostgreSQL (can be changed as needed)
- **Container:** Docker + Docker Compose

## Main Features

- URL shortening without the need for user registration
- Access to link metrics upon email confirmation
- Collected metrics:
  - Total number of accesses
  - Redirect response time
  - Link expiration date
  - Access statistics (by country, browser, operating system, etc.)

## Installation and Setup

### Requirements

- Docker and Docker Compose installed

### Running the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/your-user/relinker.git
   cd relinker
   ```

2. Copy the configuration file and adjust as needed:

   ```bash
   cp .env.example .env
   ```

3. Start the project containers:

   ```bash
   docker-compose up -d --build
   ```

4. The project will be available at `http://localhost`

## API (work in progress)

The system offers an API to interact with shortened URLs. Some endpoints include:

- `POST /api/shorten` - Create a shortened link
- `GET /api/links/{id}/stats` - Get link metrics
- `DELETE /api/links/{id}` - Remove a shortened link

## Contribution

Contributions are welcome! To contribute, follow these steps:

1. Fork the repository
2. Create a branch for your feature/fix (`git checkout -b my-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push your branch (`git push origin my-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
