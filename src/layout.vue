<template>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
  
      <body>
        <Header />
          <main>
            <slot></slot> <!-- This will render the child content -->
          </main>
      </body>
  </template>
  
  <script>
  import Header from '@/components/Header.vue';
  
  export default {
    name: 'Layout',
    components: {
      Header
    },
  };
  </script>
  