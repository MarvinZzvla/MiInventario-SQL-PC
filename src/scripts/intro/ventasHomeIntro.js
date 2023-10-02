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
  title: `Ventas - Inicio`,
  text: `Aqui se mostraran las ventas realizadas 😀`,
  attachTo: {
    //element: '#name_input',
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
  title: `Ventas`,
  text: `Aqui puedes filtrar por para ver las fechas por periodo 😎`,
  attachTo: {
    element: '#pick1Box',
    on: 'right',
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
  title: `Ventas`,
  text: `Coloca una fecha final y haz click en buscar 😎`,
  attachTo: {
    element: '#pick2Box',
    on: 'left',
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
  title: `Ventas`,
  text: `De momento no tienes niguna venta, vamos a crear nuestra primera venta! 🤩`,
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
        localStorage.setItem('firstTimeVentasHome',false)
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
if (localStorage.getItem('firstTimeVentasHome') == undefined) {
  tour.start()
}