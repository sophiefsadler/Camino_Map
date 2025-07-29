const caminoData = [
  { 
    day: 1, 
    start: 'St-Jean-Pied-de-Port', 
    end: 'Roncesvalles', 
    distance: 25.7, 
    description: "The classic, challenging Pyrenees crossing. A day of steep climbs and breathtaking views, ending in the legendary Spanish enclave of Roncesvalles.", 
    photo: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=2070&auto=format&fit=crop", 
    path: [ // Paste the coordinates array from your Day 1 GPX file here
      [-1.2333, 43.1636], [-1.28, 43.09], [-1.3208, 43.0155]
    ] 
  },
  { 
    day: 2, 
    start: 'Roncesvalles', 
    end: 'Zubiri', 
    distance: 21.4, 
    description: "A descent through beautiful beech and oak forests. The path follows the Rio Arga, passing through several charming Basque villages.", 
    photo: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop", 
    path: [ // Paste coordinates for Day 2 here
      [-1.3208, 43.0155], [-1.40, 42.95], [-1.4813, 42.9211]
    ] 
  },
  { 
    day: 3, 
    start: 'Zubiri', 
    end: 'Pamplona', 
    distance: 20.4, 
    description: "The approach to the first major city, Pamplona. The landscape opens up as we leave the deep woods, with the excitement of the city ahead.", 
    photo: "https://images.unsplash.com/photo-1559594432-342ee2765d7e?q=80&w=2070&auto=format&fit=crop", 
    path: [ // Paste coordinates for Day 3 here
      [-1.4813, 42.9211], [-1.55, 42.87], [-1.6458, 42.8167]
    ] 
  },
  { 
    day: 4, 
    start: 'Pamplona', 
    end: 'Puente la Reina', 
    distance: 24.0, 
    description: "Leaving Pamplona behind, we climb the Alto del Perdón, famous for its pilgrim sculptures, before descending to the iconic bridge at Puente la Reina.", 
    photo: "https://images.unsplash.com/photo-1599789334426-3a5b3a5f7e1b?q=80&w=2070&auto=format&fit=crop", 
    path: [ // Paste coordinates for Day 4 here
      [-1.6458, 42.8167], [-1.75, 42.73], [-1.8153, 42.6719]
    ] 
  },
  { 
    day: 5, 
    start: 'Puente la Reina', 
    end: 'Estella', 
    distance: 22.0, 
    description: "A day of rolling hills, vineyards, and olive groves. The route passes through several historical towns with Romanesque churches.", 
    photo: "https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=2070&auto=format&fit=crop", 
    path: [ // Paste coordinates for Day 5 here
      [-1.8153, 42.6719], [-1.92, 42.66], [-2.0303, 42.6711]
    ] 
  },
  // ... Add objects for days 6 through 30 here
  { 
    day: 31, 
    start: 'O Pedrouzo', 
    end: 'Santiago de Compostela', 
    distance: 20.0, 
    description: "The final steps into the magical city of Santiago. The anticipation builds with every step, culminating in the arrival at the grand cathedral.", 
    photo: "https://images.unsplash.com/photo-1569984353924-34b72b6435f1?q=80&w=1935&auto=format&fit=crop", 
    path: [ // Paste coordinates for Day 31 here
      [-8.38, 42.92], [-8.544, 42.88]
    ] 
  },
];
