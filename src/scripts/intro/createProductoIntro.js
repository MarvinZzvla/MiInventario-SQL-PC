const tour = new Shepherd.Tour({
    defaultStepOptions: {
      cancelIcon: {
        enabled: true
      },
      classes: 'shepherd-theme-arrows',
      scrollTo: { behavior: 'smooth', block: 'center' }
    }
  });

  /*********************************************************************************
   * PASO 1
   **********************************************************************************/
  tour.addStep({
    title: 'Vamos a crear un producto 🤗',
    text: `Aqui registraremos un nuevo producto y yo te guiaré`,
    attachTo: {
    //element: '#title_bussiness',
      on: 'left'
    },
    buttons: [
    //   {
    //     action() {
    //       return this.back();
    //     },
    //     classes: 'shepherd-button-secondary',
    //     text: 'Atras'
    //   },
      {
        action() {
          return this.next();
        },
        text: 'Siguiente'
      }
    ],
    id: 'creating'
  });

  /*********************************************************************************
   * PASO 2
   **********************************************************************************/
  tour.addStep({
    title: 'Nombre del producto',
    text: `Comencemos con colocar el nombre el producto o servicio que ofreces`,
    attachTo: {
    element: '#nombre_input',
      on: 'bottom'
    },
    buttons: [
      {
        action() {
          return this.back();
        },
        classes: 'shepherd-button-secondary',
        text: 'Atras'
      },
      {
        action() {
          return this.next();
        },
        text: 'Siguiente'
      }
    ],
    id: 'creating'
  });
  /*********************************************************************************
   * PASO 3
   **********************************************************************************/
  tour.addStep({
    title: 'Costo del producto o servicio',
    text: `Cuanto te cuesta a ti el producto o servicio que ofreces, esta cantidad es antes de ofrecerla al publico
    Ejemplo: 1 Pan me cuesta 5$ y lo vendo a 10$, en este caso 5$ es lo que deberia ir en este campo`,
    attachTo: {
    element: '#precio_input',
      on: 'bottom'
    },
    buttons: [
      {
        action() {
          return this.back();
        },
        classes: 'shepherd-button-secondary',
        text: 'Atras'
      },
      {
        action() {
          return this.next();
        },
        text: 'Siguiente'
      }
    ],
    id: 'creating'
  });
  /*********************************************************************************
   * PASO 4
   **********************************************************************************/
  tour.addStep({
    title: 'Codigo de Barra o Identificador',
    text: `Aqui va el codigo de barra del producto, si no tiene dejalo en blanco sin tocar nada`,
    attachTo: {
    element: '#barcode_input',
      on: 'bottom'
    },
    buttons: [
      {
        action() {
          return this.back();
        },
        classes: 'shepherd-button-secondary',
        text: 'Atras'
      },
      {
        action() {
          return this.next();
        },
        text: 'Siguiente'
      }
    ],
    id: 'creating'
  });
  /*********************************************************************************
   * PASO 5
   **********************************************************************************/
  tour.addStep({
    title: 'Precio de Venta',
    text: `Aqui va el precio al cual ofreces el producto o servicio al cliente.
    Ejemplo: 1 Pan me cuesta 5$ y lo vendo a 10$, en este caso 10$ es lo que deberia ir en este campo`,
    attachTo: {
    element: '#precioPublico_input',
      on: 'bottom'
    },
    buttons: [
      {
        action() {
          return this.back();
        },
        classes: 'shepherd-button-secondary',
        text: 'Atras'
      },
      {
        action() {
          return this.next();
        },
        text: 'Siguiente'
      }
    ],
    id: 'creating'
  });
  /*********************************************************************************
   * PASO 6
   **********************************************************************************/
  tour.addStep({
    title: 'Cantidad disponible',
    text: `Aqui es la cantidad que dispones para vender, si es un servicio coloca 1000`,
    attachTo: {
    element: '#cantidad_input',
      on: 'bottom'
    },
    buttons: [
      {
        action() {
          return this.back();
        },
        classes: 'shepherd-button-secondary',
        text: 'Atras'
      },
      {
        action() {
          return this.next();
        },
        text: 'Siguiente'
      }
    ],
    id: 'creating'
  });

  /*********************************************************************************
   * PASO 7
   **********************************************************************************/
  tour.addStep({
    title: 'Listo 😎',
    text: `Ahora haz click en Agregar cuando te asegures de introducir la información correcta`,
    attachTo: {
    element: '#addBtn',
      on: 'bottom'
    },
    buttons: [
      {
        action() {
          return this.back();
        },
        classes: 'shepherd-button-secondary',
        text: 'Atras'
      },
      {
        action() {
            localStorage.setItem('firstCreateProducto', false)
          return this.next();
        },
        text: 'Ok'
      }
    ],
    id: 'creating'
  });
 /*****************************************************
 * INICIAR
 ********************************************************/
 if(localStorage.getItem('firstCreateProducto') == undefined)
 {
   tour.start()
 }