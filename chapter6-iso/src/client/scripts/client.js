import App from '../../app';

var attachElement = document.getElementById('app');

var state = {
  cart: {
    title: 'My Cart',
    items: [
      {
        title: 'Item 1',
        price: 12
      },
      {
        title: 'Item 2',
        price: 21
      },
      {
        title: 'Item 3',
        price: 33
      }
    ]
  }
};

var app;


// Create new app and attach to element
app = new App({
  state: state
});

app.renderToDOM(attachElement);
