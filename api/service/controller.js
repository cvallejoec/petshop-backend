exports.list = async (req, res) => {
  // Get services
  const services = ['Mis servicio de prueba'];

  if (services.length > 0) {
    res.status(200).json({
      message: 'Services retrieved successfully',
      data: services,
    });
  } else {
    res.status(240).json({
      message: "You don't have services yet",
    });
  }
};

exports.get = async (req, res) => {
  const slug = req.params.slug;
  console.log(slug);

  // Get service by slug
  const service = ['Mi servicio de prueba'];

  if (service.length > 0) {
    res.status(200).json({
      message: 'Services retrieved successfully',
      data: service,
    });
  } else {
    res.status(240).json({
      message: "You don't have services yet",
    });
  }
};

exports.create = async (req, res) => {
  const {
    name,
    email,
    species,
    petName,
    genre,
    serviceType,
    location,
  } = req.body;

  const client = {
    nombres: name,
    email,
  };

  const pet = {
    especie: species,
    nombreMascota: petName,
    genero: genre,
  };

  const service = {
    idMascota: 0,
    tipoServicio: serviceType,
  };

  console.log('Cliente', client);
  console.log('Mascota', pet), console.log('Service', service);

  res.status(200).json({
    message: 'Service created successfully',
    data: {
      client,
      pet,
      service,
    },
  });
};
