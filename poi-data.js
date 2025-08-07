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
  {
    day: 6,
    title: "Even Closer to Montejurra!",
    description: "Although Montejurra had been visible in the distance for a while now, on day 6 we finally left it behind us",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_6/montejurra.jpg?raw=true",
    coordinates: [42.655908, -2.039697]
  },
  {
    day: 6,
    title: "The Infamous Wine Fountain",
    description: "A major landmark for the Camino, pilgrims are able to enjoy free wine from the fountain shortly after leaving Estella",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_6/wine_fountain.jpg?raw=true",
    coordinates: [42.650911, -2.043636]
  },
  {
    day: 6,
    title: "Monastery of Santa Maria de Irache",
    description: "The winery is right next door to a beautiful monastery",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_6/irache_monastery.jpg?raw=true",
    coordinates: [42.650331, -2.044094]
  },
  {
    day: 6,
    title: "Fun at a Playground",
    description: "When walking non-stop for a month straight, amusement and distraction can be found in even the smallest things",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_6/nils_slide.jpg?raw=true",
    coordinates: [42.646569, -2.056439]
  },
  {
    day: 6,
    title: "New Mountain Views",
    description: "Shortly after losing sight of Montejurra, we were greeted by more mountains. I distinctly remember needing to pee in almost this exact spot and not seeing shelter for a long way ahead",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_6/mountain_view.jpg?raw=true",
    coordinates: [42.593031, -2.168297]
  },
  {
    day: 6,
    title: "Residents of Los Arcos",
    description: "As we entered the village, we were greeted by goats, dogs and chickens",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_6/goat_and_dog.jpg?raw=true",
    coordinates: [42.574089, -2.192875]
  },
  {
    day: 6,
    title: "Plaza de Santa Maria",
    description: "The beautiful plaza of Los Arcos, where we could only find food in one restaurant serving from 7:30pm",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_6/los_arcos_plaza.jpg?raw=true",
    coordinates: [42.569361, -2.192183]
  },
  {
    day: 7,
    title: "Torres del Rio",
    description: "Cute Camino artwork in the village of Torres del Rio",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_7/torres_del_rio.jpg?raw=true",
    coordinates: [42.551953, -2.272283]
  },
  {
    day: 7,
    title: "The Church of Santa Maria",
    description: "A cute church in the town of Viana! Nils walked into a Spanish girl while looking up at the church, but she still wished us a Buen Camino",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_7/church.jpg?raw=true",
    coordinates: [42.514964, -2.371917]
  },
  {
    day: 7,
    title: "Rock Arrow",
    description: "It's pretty hard to get lost on the Camino as there are all types of indications of the right direction",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_7/rock_arrow.jpg?raw=true",
    coordinates: [42.493911, -2.401794]
  },
  {
    day: 7,
    title: "Cake in Logroño",
    description: "I took fewer photos today as the weather was grey, but we rewarded ourselves when we arrived with cake and the usual lemonade",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_7/logrono_cake.jpg?raw=true",
    coordinates: [42.466819, -2.447436]
  },
  {
    day: 8,
    title: "Church of Santiago el Real",
    description: "Since Masha was joining us, we took the opportunity to explore one of the churches in Logroño",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_8/logrono_church.jpg?raw=true",
    coordinates: [42.467783, -2.447611]
  },
  {
    day: 8,
    title: "Parque de la Grajera",
    description: "The beautiful Grajera Park was one of our first stops that morning",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_8/grajera_park.jpg?raw=true",
    coordinates: [42.448011, -2.503683]
  },
  {
    day: 8,
    title: "The Town of Navarrete",
    description: "The town of Navarrete was visible from a long distance",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_8/navarrete.jpg?raw=true",
    coordinates: [42.436906, -2.540431]
  },
  {
    day: 8,
    title: "Walking with my Camino Family",
    description: "I'm so glad Masha joined us just to take the one nice photo of the four of us walking together 😂",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_8/camino_family.jpg?raw=true",
    coordinates: [42.411500, -2.614300]
  },
  {
    day: 8,
    title: "Outside of Ventosa",
    description: "We had a bit too much fun as we passed by the town of Ventosa, playing rock games at the various art installations",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_8/ventosa.jpg?raw=true",
    coordinates: [42.407406, -2.627708]
  },
  {
    day: 8,
    title: "More Mountain Views!!",
    description: "Views of the mountains just don't get old! These ones are the Sierra de la Demanda mountains",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_8/mountains.jpg?raw=true",
    coordinates: [42.414542, -2.680464]
  },
  {
    day: 8,
    title: "Guardaviñas de Alesón",
    description: "A shelter for pilgrims along the Camino",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_8/mountain_hut.jpg?raw=true",
    coordinates: [42.413333, -2.686356]
  },
  {
    day: 8,
    title: "Nájera",
    description: "We were absolutely exhausted as we walked the final few hundred metres to the albergue!!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_8/najera.jpg?raw=true",
    coordinates: [42.417214, -2.732067]
  },
  {
    day: 8,
    title: "A Culinary Success",
    description: "One of the better meals we cooked on the Camino 😋",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_8/najera_dinner.jpg?raw=true",
    coordinates: [42.414767, -2.734308]
  },
  {
    day: 9,
    title: "Sunrise",
    description: "Masha needed to catch a train just after midday, so we started our hike earlier than normal and saw a beautiful sunrise",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_9/sunrise.jpg?raw=true",
    coordinates: [42.414419, -2.745325]
  },
  {
    day: 9,
    title: "Typical Camino Scenery",
    description: "Few photos were taken today despite the beautiful scenery, as we needed to make good time for Masha to catch her train",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_9/camino_scenery.jpg?raw=true",
    coordinates: [42.424672, -2.874842]
  },
  {
    day: 9,
    title: "A Miniature Golf Resort",
    description: "We took our break that morning in a golf course cafe, where they had an interesting model of the golf resort",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_9/golf_resort.jpg?raw=true",
    coordinates: [42.417547, -2.886511]
  },
  {
    day: 10,
    title: "Four Musketeers",
    description: "With Masha now gone, we were back as the four musketeers",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_10/four_musketeers.jpg?raw=true",
    coordinates: [42.452333, -3.008289]
  },
  {
    day: 10,
    title: "The Town of Grañón",
    description: "By day 10 on the Camino we now had less than 600km to go!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_10/granon_artwork.jpg?raw=true",
    coordinates: [42.451489, -3.024794]
  },
  {
    day: 10,
    title: "The Town of Grañón",
    description: "We stopped for a drink but I was grumpy because there was no Kas Limon",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_10/granon_rest.jpg?raw=true",
    coordinates: [42.451664, -3.024944]
  },
  {
    day: 10,
    title: "A Cute House",
    description: "This was my least favourite day of the Camino so far, as we spent most of the time walking by a main road. This village was a pleasant break from that!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_10/cute_house.jpg?raw=true",
    coordinates: [42.427356, -3.136631]
  },
  {
    day: 11,
    title: "Rainy Views",
    description: "It was a grey and rainy day, but nevertheless I was much happier walking through the forest than I had been by the main road",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_11/forest_view.jpg?raw=true",
    coordinates: [42.386383, -3.322286]
  },
  {
    day: 11,
    title: "Walking in the Forest",
    description: "This was the very first day where we encountered mud on the Camino",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_11/forest_mud.jpg?raw=true",
    coordinates: [42.377981, -3.417981]
  },
  {
    day: 11,
    title: "Parking for Horses?",
    description: "The Camino can be completed on horseback, but we never saw anyone riding during our journey!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_11/horse_parking.jpg?raw=true",
    coordinates: [42.375731, -3.436925]
  },
  {
    day: 11,
    title: "The Worst Albergue of the Camino",
    description: "I was the only one of the four of us who brought a warm sleeping bag instead of a liner. This was the one night I was so glad I did!!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_11/cold_albergue.jpg?raw=true",
    coordinates: [42.376136, -3.437153]
  },
  {
    day: 11,
    title: "Pilgrim Heaven",
    description: "The bar adjacent to our albergue was so much warmer and cosier!!!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_11/pilgrim_heaven.jpg?raw=true",
    coordinates: [42.3760599, -3.4376381]
  },
  {
    day: 12,
    title: "Stonehenge of the Camino",
    description: "We saw these rocks near the archaeological site of Atapuerca, where the earliest evidence of human occupation in Europe was found",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_12/camino_stonehenge.jpg?raw=true",
    coordinates: [42.373419, -3.499442]
  },
  {
    day: 12,
    title: "Gaining Elevation",
    description: "We had to climb a hill, but the hiking was very pleasant",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_12/climbing_hill.jpg?raw=true",
    coordinates: [42.378911, -3.523278]
  },
  {
    day: 12,
    title: "Views of Burgos",
    description: "From the top of the hill, we could see Burgos. The sign here talks of the beautiful view that greets a pilgrim after her climb",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_12/hill_view.jpg?raw=true",
    coordinates: [42.379103, -3.535506]
  },
  {
    day: 12,
    title: "Villafría de Burgos",
    description: "The approach into Burgos was extremely challenging, as the weather turned very bad and the views gradually grew worse (though not so bad at this point!)",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_12/burgos_approach.jpg?raw=true",
    coordinates: [42.363953, -3.616467]
  },
  {
    day: 13,
    title: "Rejoining the Camino",
    description: "I had already been walking for over an hour from the train station by the time I rejoined the Camino!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_13/rejoin_camino.jpg?raw=true",
    coordinates: [42.343281, -3.695453]
  },
  {
    day: 13,
    title: "University of Burgos",
    description: "After a couple of hours, I was still on the outskirts of Burgos, walking by the university",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_13/burgos_university.jpg?raw=true",
    coordinates: [42.341050, -3.726172]
  },
  {
    day: 13,
    title: "500km To Go!",
    description: "In total, we walked about 800km, so had walked about 300km already",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_13/500_to_go.jpg?raw=true",
    coordinates: [42.346111, -3.751256]
  },
  {
    day: 13,
    title: "Under the Motorway",
    description: "Passing under the motorway it finally felt like I'd left Burgos behind!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_13/motorway_crossing.jpg?raw=true",
    coordinates: [42.351558, -3.795867]
  },
  {
    day: 13,
    title: "Tardajos",
    description: "While I spent 2 days in Madrid, my friends had spent 1 day in Burgos and then walked to Tardajos the next day. Therefore, they would've set off from here many hours before I arrived",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_13/tardajos.jpg?raw=true",
    coordinates: [42.348494, -3.813586]
  },
  {
    day: 13,
    title: "Camino Artwork",
    description: "I loved seeing artwork of the Camino along the way",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_13/camino_artwork.jpg?raw=true",
    coordinates: [42.340292, -3.837347]
  },
  {
    day: 13,
    title: "Hornillos del Camino",
    description: "When I reached the top of this hill, I could see the town of Hornillos del Camino",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_13/hornillos_del_camino.jpg?raw=true",
    coordinates: [42.341064, -3.895097]
  },
  {
    day: 13,
    title: "Albergue in the Middle of Nowhere",
    description: "With only 5km until I'd catch up with my friends, the rain was wearing me down and I wanted to stop. Thankfully, the albergue was abandoned so I was forced to carry on!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_13/abandoned_albergue.jpg?raw=true",
    coordinates: [42.324964, -3.990503]
  },
  {
    day: 14,
    title: "Reunited with Friends",
    description: "I was so happy to walk with my friends again that morning",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_14/reunited.jpg?raw=true",
    coordinates: [42.3126778, -4.0449093]
  },
  {
    day: 14,
    title: "A Grey Morning",
    description: "With the grey weather, this section of the Camino kinda reminded me of England!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_14/grey_weather.jpg?raw=true",
    coordinates: [42.310714, -4.066494]
  },
  {
    day: 14,
    title: "Convento de San Antón",
    description: "Though the convent is in ruins, there is also an albergue here where pilgrims can stay!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_14/convent_san_anton.jpg?raw=true",
    coordinates: [42.293433,-4.098375]
  },
  {
    day: 14,
    title: "A Resident of the Convent de San Antón",
    description: "We wished we could take our new friend with us",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_14/cute_dog.jpg?raw=true",
    coordinates: [42.292614, -4.098947]
  },
  {
    day: 14,
    title: "View from the Hill",
    description: "One of the few bigger hills to climb on the Camino, but the views were more than worth it",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_14/hill_views.jpg?raw=true",
    coordinates: [42.290500, -4.169814]
  },
  {
    day: 14,
    title: "The Meseta",
    description: "Since Burgos and until León we would be walking on the Meseta, a notoriously flat section lacking in shade. This is exactly how I had imagined it!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_14/meseta.jpg?raw=true",
    coordinates: [42.285933, -4.189247]
  },
  {
    day: 14,
    title: "Ermita de San Nicolás de Puente Fitero",
    description: "I did not know it at the time but you can also stay in this 1000 year old building while walking the Camino!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_14/ermita_san_nicolas.jpg?raw=true",
    coordinates: [42.279142, -4.242758]
  },
  {
    day: 14,
    title: "The Best Albergue of the Camino",
    description: "We had a huge outhouse with beds, a bathroom and a lounge with a fire just to the four of us!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_14/lovely_albergue.jpg?raw=true",
    coordinates: [42.258336, -4.346856]
  },
];
