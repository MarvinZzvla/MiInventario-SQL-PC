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
    title: 'Nombres',
    text: `Llena los campos: Nombres`,
    attachTo: {
    element: '#name_input',
      on: 'bottom'
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
    title: 'Apellidos',
    text: `Llena los campos: Apellidos`,
    attachTo: {
    element: '#lastname_input',
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

  /*****************************************************************
   * PASO 3
   *****************************************************************/
  tour.addStep({
    title: 'Contraseña de 8 o mas caracteres',
    text: `Llena los campos: Contraseña`,
    attachTo: {
    element: '#password_input',
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

  /*****************************************************************
   * PASO 4
   *****************************************************************/
  tour.addStep({
    title: 'Telefono o celular',
    text: `Llena los campos: Telefono`,
    attachTo: {
    element: '#phone_input',
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

  /*****************************************************************
   * PASO 5
   *****************************************************************/
  tour.addStep({
    title: 'Email o Correo Electronico',
    text: `Llena los campos: Email`,
    attachTo: {
    element: '#email_input',
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

  /*****************************************************************
   * PASO 6
   *****************************************************************/
  tour.addStep({
    title: 'Nombre del negocio',
    text: `No te olvides del nombre de tu negocio 😊`,
    attachTo: {
    element: '#negocio_input',
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
          localStorage.setItem('firstTime',false);
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

  if(localStorage.getItem('firstTime') == undefined)
  {
    tour.start()
  }