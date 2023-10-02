const tour = new Shepherd.Tour({
    defaultStepOptions: {
      cancelIcon: {
        enabled: true
      },
      classes: 'shepherd-theme-arrows',
      scrollTo: { behavior: 'smooth', block: 'center' }
    }
  });
  /*****************************************************************
    * PASO 1
    *****************************************************************/
  tour.addStep({
    title: `Nueva Venta`,
    text: `Comienza eligiendo un producto 😀 
    Si aun no creas vuelve atras y crea un producto nuevo`,
    attachTo: {
      element: '#productoBox',
      on: 'bottom',
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

  /*****************************************************************
    * PASO 2
    *****************************************************************/
  tour.addStep({
    title: `Codigo de barras o identificador`,
    text: `Puedes buscar por codigo de barra o nombre 😊`,
    attachTo: {
      element: '#nombre_input',
      on: 'bottom',
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

  /*****************************************************************
    * PASO 2
    *****************************************************************/
  tour.addStep({
    title: `Precio de la venta`,
    text: `Este es el precio sugerido o por defecto del producto 😊
    pero puedes modificarlo a voluntad`,
    attachTo: {
      element: '#precio_input',
      on: 'bottom',
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

  /*****************************************************************
    * PASO 3
    *****************************************************************/
  tour.addStep({
    title: `Cantidad de la venta`,
    text: `Agrega la cantidad a vender del producto o servicio 🤗`,
    attachTo: {
      element: '#cantidad_input',
      on: 'bottom',
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

  /*****************************************************************
    * PASO 4
    *****************************************************************/
  tour.addStep({
    title: `Añadir `,
    text: `Haz click en añadir 🤗`,
    attachTo: {
      element: '#addBtn',
      on: 'bottom',
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

  /*****************************************************************
    * PASO 5
    *****************************************************************/
  tour.addStep({
    title: `Resumen de la venta `,
    text: `Aqui tienes el resumen de la venta, puedes añadir los productos que desees 😎`,
    attachTo: {
      element: '#productosLista',
      on: 'bottom',
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

  /*****************************************************************
    * PASO 6
    *****************************************************************/
  tour.addStep({
    title: `Haz click en Pagar!`,
    text: `Cuando termines de añadir los productos haz click en Pagar! \n para realizar la venta`,
    attachTo: {
      element: '#pagarBtn',
      on: 'bottom',
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
        localStorage.setItem('firstTimeCreateVentas', false);
          return this.next();
        },
        text: 'OK'
      }
    ],
    id: 'creating'
  });
  /*****************************************************
 * INICIAR
 ********************************************************/
if (localStorage.getItem('firstTimeCreateVentas') == undefined) {
    tour.start()
  }