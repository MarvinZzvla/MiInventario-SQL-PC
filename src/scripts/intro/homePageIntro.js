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
    title: `Bienvenido ${localStorage.getItem('Name')}`,
    text: `Le damos la bienvenida a su inventario,\t
    Te enseñaremos las opciones disponibles 😀`,
    attachTo: {
    //element: '#name_input',
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
    title: `Ventas 🤑`,
    text: `Aqui podras realizar y ver las ventas`,
    attachTo: {
    element: '#ventasBox',
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
    title: `Productos`,
    text: `Aqui ves el inventario disponible, los precios, cantidad disponibles 🤗`,
    attachTo: {
    element: '#productosBox',
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
    title: `Finanzas`,
    text: `Aqui ves las finanzas y las ganancias diarias, mensuales y anuales 🤑`,
    attachTo: {
    element: '#finanzasBox',
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
    title: `Usuarios 🧑👩`,
    text: `Aqui ves los usuarios, Administradores y Empleados, para controlar el acesso a las opciones
    administrativas`,
    attachTo: {
    element: '#usuariosBox',
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
  title: `Productos 🤔`,
  text: `Comencemos creando un producto`,
  attachTo: {
  element: '#productosBox',
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
        localStorage.setItem('firstTimeHome', false)
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
  if(localStorage.getItem('firstTimeHome') == undefined)
  {
    tour.start()
  }