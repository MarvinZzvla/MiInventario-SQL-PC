let bussiness = localStorage.getItem('negocio');
document.getElementById('title_bussiness').innerHTML = bussiness;

const tour = new Shepherd.Tour({
    defaultStepOptions: {
      cancelIcon: {
        enabled: true
      },
      classes: 'class-1 class-2',
      scrollTo: { behavior: 'smooth', block: 'center' }
    }
  });

  tour.addStep({
    title: 'Nombre de inventario',
    text: `Aqui esta el nombre del inventario`,
    attachTo: {
        element: '#title_bussiness',
      on: 'left'
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

  