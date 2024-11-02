# Local Harvest Market 🌾

A modern e-commerce platform connecting local farmers with customers, built with React, TypeScript, and Tailwind CSS. This is a frontend demonstration project that uses simulated data to showcase the user interface and functionality.

![Local Harvest Market](https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)

## Demo Features

- 🛒 User-friendly shopping experience with simulated checkout
- 👨‍🌾 Farmer dashboard for product management (demo data)
- 📦 Real-time cart management using React Context
- 💳 Checkout process simulation
- 📱 Responsive design
- 📊 Admin dashboard with mock analytics
- 🔍 Product search and filtering
- 📅 Delivery scheduling interface

## Important Note

This is a frontend demonstration project that:
- Uses static data stored in TypeScript files
- Simulates backend functionality using React Context
- Does not include actual database connections
- Maintains state only during the session
- Resets to initial state on page refresh

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Recharts (for demo analytics)
- Lucide Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Mindtecture/local-harvest-market.git
cd local-harvest-market
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/         # React context providers (including cart state)
├── pages/           # Page components
├── types/           # TypeScript type definitions
└── main.tsx         # Application entry point
```

## Implementation Details

### Data Management
- Product data is stored in static TypeScript arrays
- Cart state is managed through React Context
- User sessions are temporary and reset on page refresh
- Orders and transactions are simulated

### Available Demonstrations
- Product browsing and filtering
- Shopping cart operations
- Simulated checkout process
- Farmer product management interface
- Admin dashboard with mock data visualization

## Future Enhancements
Potential improvements to make this a production-ready application:
- Integration with a backend API
- Real database implementation
- User authentication and authorization
- Payment processing integration
- Order fulfillment system
- Real-time inventory management

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Images provided by [Unsplash](https://unsplash.com)
- Icons by [Lucide](https://lucide.dev)

## Contact

Mindtecture - [@mindtecture](https://twitter.com/mindtecture)

Project Link: [https://github.com/Mindtecture/local-harvest-market](https://github.com/Mindtecture/local-harvest-market)