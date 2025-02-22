const axios = require('axios');

const testBackend = async () => {
  try {
    const response = await axios.post('https://recetas-ct844de95-luis-jarabas-projects.vercel.app/api/auth/login', {
      email: 'u@.com',
      password: 'Qwertyui'
    });
    console.log('Respuesta del servidor:', response.data);
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
  }
};

testBackend();