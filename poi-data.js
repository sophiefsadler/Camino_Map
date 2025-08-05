const poiData = [
  {
    day: 1,
    title: "The Start of the Camino",
    description: "About to set off on my big adventure!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_1/camino_start.jpg?raw=true",
    coordinates: [43.162417, -1.237222]
  },
  {
    day: 1,
    title: "Horses in the Pyrenees",
    description: "The Camino starts with amazing views and lots of cute animals",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_1/horses_pyrenees.jpg?raw=true",
    coordinates: [43.151669, -1.255244]
  },
  {
    day: 1,
    title: "The village of Pekotxeta / Arnéguy",
    description: "On the right side of the river is Spain (Pekotxeta); on the left side of the river is France (Arnéguy)!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_1/france_spain_river.jpg?raw=true",
    coordinates: [43.110742, -1.280233]
  },
  {
    day: 1,
    title: "A view of the hills from Valcarlos",
    description: "Valcarlos is roughly halfway through the day's walking. Some pilgrims even stay here and split the day in two.",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_1/valcarlos.jpg?raw=true",
    coordinates: [43.092336, -1.302158]
  },
  {
    day: 1,
    title: "The River Luzaide",
    description: "This was probably my favourite part of the day.",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_1/walking_by_river.jpg?raw=true",
    coordinates: [43.063644, -1.306406]
  },
  {
    day: 1,
    title: "The Monumento a Roldán",
    description: "We made it to the top of the big hill!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_1/monument.jpg?raw=true",
    coordinates: [43.020589, -1.323442]
  },
  {
    day: 2,
    title: "Roncesvalles Museum",
    description: 'Looking back at the "town" of Roncesvalles as we left (basically the museum + the albergue where we slept!)',
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_2/roncesvalles.jpg?raw=true",
    coordinates: [43.008858, -1.319750]
  },
  {
    day: 2,
    title: "Making friends on the Camino",
    description: "I spent that morning walking alone with Nils (that's not him in the photo, though)",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_2/cows.jpg?raw=true",
    coordinates: [42.989250, -1.340300]
  },
  {
    day: 2,
    title: "The River Crossing",
    description: "This is where Nils and I caught up to a large group of pilgrims, including Lawrence and Woody",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_2/river_crossing.jpg?raw=true",
    coordinates: [42.970806, -1.406044]
  },
  {
    day: 2,
    title: "Van Refreshments",
    description: "There was a van by the roadside selling refreshments, where Nils, Lawrence and I caught up to the others. I met Mille & Emma for the first time",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_2/van_stop.jpg?raw=true",
    coordinates: [42.941469, -1.470506]
  },
  {
    day: 2,
    title: "Our Albergue in Zubiri",
    description: "We slept in one big room, with no curtains. A streetlight shone right onto my face during the night",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_2/zubiri_albergue.jpg?raw=true",
    coordinates: [42.931619, -1.504669]
  },
  {
    day: 2,
    title: "Yoga by the river",
    description: "I sat out of the yoga & swimming, instead taking the time to call my boyfriend, Alex",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_2/zubiri_river.jpg?raw=true",
    coordinates: [42.930328, -1.503611]
  },
  {
    day: 3,
    title: "A Misty Morning",
    description: "Leaving Zubiri, we saw lots of mist blanketing the surrounding hills",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_3/zubiri_mist.jpg?raw=true",
    coordinates: [42.929897, -1.503450]
  },
  {
    day: 3,
    title: "Industrial Mining",
    description: "We saw some very unusual and unexpected views that morning...",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_3/mining.jpg?raw=true",
    coordinates: [42.923828, -1.504956]
  },
  {
    day: 3,
    title: "The Basque Country",
    description: "The Basque Country is a region in the western Pyrenees with a distinct language!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_3/basque_country.jpg?raw=true",
    coordinates: [42.906614, -1.531644]
  },
  {
    day: 3,
    title: "Approaching Pamplona",
    description: "Our group grew larger as we bumped into Corey, Fynn and Mille, leading to minor confusion about which was the right direction (too many cooks!)",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_3/beautiful_views.jpg?raw=true",
    coordinates: [42.851719, -1.585558]
  },
  {
    day: 3,
    title: "Trinity Bridge",
    description: "This bridge marked our arrival into Pamplona, our first larger city of the Camino!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_3/pamplona_bridge.jpg?raw=true",
    coordinates: [42.835708, -1.604372]
  },
  {
    day: 3,
    title: "Albergue Jesus y Maria",
    description: "We stayed in an albergue set in a restored church, which I found very cosy",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_3/pamplona_albergue.jpg?raw=true",
    coordinates: [42.818783, -1.641900]
  },
  {
    day: 3,
    title: "Café Iruña",
    description: "The cafe where Ernest Hemingway used to spend his time, where I had a delicious steak",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_3/hemingway_cafe.jpg?raw=true",
    coordinates: [42.816911, -1.643117]
  },
  {
    day: 4,
    title: "Ciudadela de Pamplona",
    description: "Together with Nils and Woody I walked past the ruins of Pamplona's old fortress, which was built in the 1500s",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_4/pamplona_fortress.jpg?raw=true",
    coordinates: [42.812383, -1.652947]
  },
  {
    day: 4,
    title: "Leaving Pamplona behind",
    description: "Shortly after taking this photo, I stopped to put sun cream on and got completely left behind from Woody & Nils",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_4/leaving_pamplona.jpg?raw=true",
    coordinates: [42.777725, -1.690011]
  },
  {
    day: 4,
    title: "A Bizarre Roadside Sign",
    description: "What's the story behind this sign? Why is it here? Is it necessary? I could've googled the answers, but I preferred to keep the mystery",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_4/sexist_aggressions.jpg?raw=true",
    coordinates: [42.748339, -1.722650]
  },
  {
    day: 4,
    title: "My first Kas Limon",
    description: "The beginning of a great love ❤️ From this point onwards, I had at least one per day, normally more",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_4/kas_limon.jpg?raw=true",
    coordinates: [42.748692, -1.722111]
  },
  {
    day: 4,
    title: "Alto del Perdón",
    description: "Walking in the footsteps of many, many pilgrims that came before :)",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_4/alto_perdon.jpg?raw=true",
    coordinates: [42.735853, -1.742525]
  },
  {
    day: 4,
    title: "The View from Alto del Perdón",
    description: "Just breathtaking, especially knowing that we were looking out at our journey of the next 27 days",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_4/alto_perdon_view.jpg?raw=true",
    coordinates: [42.735653, -1.742653]
  },
  {
    day: 4,
    title: "The Beautiful Village of Obanos",
    description: "It was unbelievably quiet, and I didn't see a single soul as I walked through the village",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_4/obanos.jpg?raw=true",
    coordinates: [42.679267, -1.786697]
  },
  {
    day: 5,
    title: "Leaving Puente La Reina",
    description: "It wasn't until the morning that we saw the bridge (puente) of the town of Puente La Reina!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_5/puente_la_reina.jpg?raw=true",
    coordinates: [42.670428, -1.819219]
  },
  {
    day: 5,
    title: "A View of Montejurra",
    description: "Montejurra looked like a very inviting hike in the distance, but the Camino takes a different path",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_5/montejurra.jpg?raw=true",
    coordinates: [42.660939, -2.001522]
  },
  {
    day: 5,
    title: "Wildlife of the Camino",
    description: "We were fascinated by this hairy black bug but everyone was too scared to hold or touch it",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_5/black_bug.jpg?raw=true",
    coordinates: [42.661275, -2.004603]
  },
  {
    day: 5,
    title: "The Lokiz Mountain Range",
    description: "There were so many beautiful views on the approach into Estella!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_5/lokiz_mountains.jpg?raw=true",
    coordinates: [42.661294, -2.004767]
  },
  {
    day: 5,
    title: "Estella",
    description: "Estella was one of my favourite towns of the whole Camino, with its beautiful rock formations",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_5/estella.jpg?raw=true",
    coordinates: [42.670533, -2.029678]
  },
];
