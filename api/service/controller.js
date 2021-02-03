const axios = require('axios');
const { servers } = require('../../config');

exports.list = async (req, res) => {
  var services = [];

  axios
    .get(servers.service + '/api/services')
    .then((response) => {
      response.data.reverse().map((item, index) => {
        console.log(response.data.length);
        axios
          .get(`${servers.client}/api/sendData/${item.petId}`)
          .then((response2) => {
            service = {
              item,
              pet: response2.data,
            };
            services.push({
              service,
            });
            if (index + 1 === response.data.length) {
              res.status(200).json({
                message: 'Services retrieved successfully',
                data: services,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.get = async (req, res) => {
  const serviceId = req.params.serviceId;

  let service = {};

  axios
    .get(`${servers.service}/api/services/${serviceId}`)
    .then((response) => {
      const petId = response.data.petId;
      const foundedService = response.data;
      service = {
        serviceId: foundedService.serviceID,
        petId: foundedService.petId,
        status: foundedService.status,
        serviceType: foundedService.serviceType,
      };
      return axios.get(`${servers.client}/api/sendData/${petId}`);
    })
    .then((response) => {
      const foundedPet = response.data[0];
      const foundedClient = response.data[1];
      service = {
        ...service,
        petName: foundedPet.nombre_mascota,
        species: foundedPet.especie,
        genre: foundedPet.genero,
        clientId: foundedClient.id_Cliente,
        nombre: foundedClient.nombres_apellidos,
        cedula: foundedClient.cedula,
        latitude: foundedClient.latitud,
        longitude: foundedClient.longitud,
      };
      res.status(200).json({
        message: 'Service retrieved successfully',
        data: service,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(240).json({
        message: "You don't have services yet",
      });
    });

  // if (service.length > 0) {
  //   res.status(200).json({
  //     message: 'Services retrieved successfully',
  //     data: service,
  //   });
  // } else {
  //   res.status(240).json({
  //     message: "You don't have services yet",
  //   });
  // }
};

exports.create = async (req, res) => {
  const {
    name,
    clientDocument,
    species,
    petName,
    genre,
    serviceType,
    location,
    creationDate,
  } = req.body;

  const client = {
    NombresApellidos: name,
    Cedula: clientDocument,
    Longitud: location.longitude,
    Latitud: location.latitude,
    NombreMascota: petName,
    Especie: species,
    GeneroMascota: genre,
  };

  axios
    .post(`${servers.client}/api/fillInfo`, client)
    .then((response) => {
      const petId = response.data['ID Mascota'];
      const service = {
        petId,
        serviceType,
        creation_date: creationDate,
      };

      return axios.post(`${servers.service}/api/services`, service);
    })
    .then((response) => {
      const serviceId = response.data.serviceID;
      res.status(200).json({
        message: 'Service created successfully',
        data: {
          serviceId,
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: 'Internal Server.',
        error: {
          err,
        },
      });
    });
};
