export default function handler(req, res) {
  res.status(200).json({ 
    service: 'Auth Service', 
    status: 'Active',
    message: 'Halo dari Node.js Microservice!' 
  });
}