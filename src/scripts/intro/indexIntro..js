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
    title: 'Bienvenido a Mi Inventario 🤗',
    text: `Sere tu guia para que puedas aprender todas las funciones`,
    attachTo: {
        // element: '#title_bussiness',
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


  /*****************************************************************************
   * PASO 2
   *****************************************************************************/

  tour.addStep({
    title: 'Comienza aqui!',
    text: `Vamos a registrarnos 😎, para comenzar`,
    attachTo: {
     element: '#btnRegister',
      on: 'right'
    },
    buttons: [
    //   {
    //     action() {
    //       return this.back();
    //     },
    //     classes: 'shepherd-button-secondary',
    //     text: 'Atras'
    //   },
    //   {
    //     action() {
    //       return this.next();
    //     },
    //     text: 'Siguiente'
    //   }
    ],
    id: 'creating'
  });

  

let firstTime = localStorage.getItem('firstTime')
if(firstTime == undefined){
    tour.start();
}