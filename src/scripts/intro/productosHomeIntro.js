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
    title: 'Bienvenido a tus Productos 🤗',
    text: `Aqui veras los productos que tienes en inventario`,
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

   /*********************************************************************************
   * PASO 2
   **********************************************************************************/
   tour.addStep({
    title: 'Productos 😁',
    text: `No tienes productos aun creados 😥, vamos a crear nuestro primer producto 😊, Haz Click!`,
    attachTo: {
     element: '#createVentaBtn',
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
            localStorage.setItem('firstTimeProductosHome',false);
          return this.next();
        },
        text: 'Ok'
      }
    ],
    id: 'creating'
  });

  /******************************************************************* */

  let firstTime = localStorage.getItem('firstTimeProductosHome')
if(firstTime == undefined){
    tour.start();
}