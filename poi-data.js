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
  {
    day: 15,
    title: "Sunrise in Boadilla del Camino",
    description: "It was a lovely sunrise and the weather would go on to be amazing!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_15/sunrise.jpg?raw=true",
    coordinates: [42.258636, -4.346447]
  },
  {
    day: 15,
    title: "The Locks of the Canal de Castilla",
    description: "The river into Frómista was pleasantly different from anywhere we'd walked so far",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_15/canal_de_castilla.jpg?raw=true",
    coordinates: [42.263794, -4.399061]
  },
  {
    day: 15,
    title: "A Stork's Nest",
    description: "We saw lots of storks along the Camino that day",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_15/stork.jpg?raw=true",
    coordinates: [42.266311, -4.403061]
  },
  {
    day: 15,
    title: "Frómista",
    description: "Another beautiful town along the Camino",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_15/fromista.jpg?raw=true",
    coordinates: [42.267239, -4.407258]
  },
  {
    day: 15,
    title: "Tucked in Bed",
    description: "For the second night in a row we had good luck with our albergue, which had an amazing dinner and comfortable, clean showers",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_15/albergue.jpg?raw=true",
    coordinates: [42.337769, -4.601556]
  },
  {
    day: 16,
    title: "Leaving Carrión de los Condes",
    description: "The sign says that the town wishes us a Buen Camino!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_16/buen_camino.jpg?raw=true",
    coordinates: [42.339789, -4.608533]
  },
  {
    day: 16,
    title: "The Fields of the Meseta",
    description: "It was at this point along the Camino that my shoulders started getting really sore from carrying the backpack",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_16/meseta_fields.jpg?raw=true",
    coordinates: [42.344117, -4.666706]
  },
  {
    day: 16,
    title: "Stopping for a Snack",
    description: "There were no proper towns, so a food truck was set up in one of the fields",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_16/food_truck.jpg?raw=true",
    coordinates: [42.342133, -4.687597]
  },
  {
    day: 16,
    title: "A Lone Tree",
    description: "The Meseta sometimes looked just like the Windows Screensaver",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_16/lone_tree.jpg?raw=true",
    coordinates: [42.337528, -4.722342]
  },
  {
    day: 16,
    title: "A Personal Sign",
    description: "Someone had left some love for people called Sophie :)",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_16/sophie.jpg?raw=true",
    coordinates: [42.340472, -4.834219]
  },
  {
    day: 16,
    title: "Woody Walking Alone",
    description: "By this point we would happily split up and walk in pairs or on our own intuitively, sometimes reuniting at cafes or towns, always reuniting at our final stop for the day",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_16/woody_alone.jpg?raw=true",
    coordinates: [42.358556, -4.888861]
  },
  {
    day: 16,
    title: "Pilgrims' Dinner",
    description: "Sometimes pilgrims' dinners were had as a group with all those sleeping at the albergue. This one had a particularly large amount of alcohol involved",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_16/pilgrim_dinner.jpg?raw=true",
    coordinates: [42.360472, -4.924919]
  },
  {
    day: 17,
    title: "Approaching Halfway",
    description: "We were just about to hit the halfway markers of the Camino Francés at Sahagún",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_17/halfway_bridge.jpg?raw=true",
    coordinates: [42.370497, -4.999508]
  },
  {
    day: 17,
    title: "The Halfway Point!",
    description: "We took a lot of photos, not quite able to believe we were halfway! In fact, we were a little over halfway, as the markers do not take into account the first day in France",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_17/halfway_markers.jpg?raw=true",
    coordinates: [42.370317, -5.000517]
  },
  {
    day: 17,
    title: "A Great Monstrosity",
    description: "Probably one of the ugliest things I saw on the Camino",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_17/monstrosity.jpg?raw=true",
    coordinates: [42.370203, -5.021050]
  },
  {
    day: 17,
    title: "Sahagún",
    description: "The halfway markers are reached just before the lovely town of Sahagún",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_17/sahagun.jpg?raw=true",
    coordinates: [42.370431, -5.033847]
  },
  {
    day: 17,
    title: "A Fantastic Meal",
    description: "I ate one of my best meals of the Camino here (a burger and a chocolate mousse)",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_17/tasty_food.jpg?raw=true",
    coordinates: [42.388206, -5.141397]
  },
  {
    day: 18,
    title: "Lots of Rain!!",
    description: "This was probably our rainiest day on the Camino, and lots of effort had to be made to keep morale high",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_18/rain.jpg?raw=true",
    coordinates: [42.496625, -5.412133]
  },
  {
    day: 18,
    title: "Bear-igrinos",
    description: 'We stopped in a cafe for a snack to shelter from the rain. Morale was very low (especially Lawrence\'s), but these friendly bear-igrinos greeted us! (In Spanish, pilgrims are known as "perigrinos")',
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_18/bearigrinos.jpg?raw=true",
    coordinates: [42.544333, -5.457203]
  },
  {
    day: 18,
    title: "León",
    description: 'Finally we could see León, which meant our time on the Meseta was coming to an end!',
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_18/leon.jpg?raw=true",
    coordinates: [42.575547, -5.540639]
  },
  {
    day: 19,
    title: "León Cathedral",
    description: "We were standing at almost exactly this spot when we reunited with Corey, Fynn and Mille!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_19/leon_cathedral.jpg?raw=true",
    coordinates: [42.598772, -5.567506]
  },
  {
    day: 19,
    title: "Inside León Cathedral",
    description: "The cathedral has 125 stained-glass windows and was built in the 1400s",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_19/inside_leon_cathedral.jpg?raw=true",
    coordinates: [42.599203, -5.568119]
  },
  {
    day: 19,
    title: "An Uncanny Resemblance",
    description: "Somehow these figures look just exactly like Nils, Lawrence and Woody",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_19/statues.jpg?raw=true",
    coordinates: [42.598942, -5.567111]
  },
  {
    day: 19,
    title: "Changing Landscapes",
    description: "Although it was grey and we were walking by a road, it was nice to be back in the countryside and away from the city",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_19/countryside.jpg?raw=true",
    coordinates: [42.560553, -5.657747]
  },
  {
    day: 19,
    title: "Better Weather!",
    description: "Finally after two grey and rainy days, the weather started to improve",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_19/better_weather.jpg?raw=true",
    coordinates: [42.542156, -5.662700]
  },
  {
    day: 19,
    title: "Albergue El Refugio de Jesús",
    description: "The albergue has a swimming pool, but since we were hiking early in the season, it was not filled",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_19/albergue.jpg?raw=true",
    coordinates: [42.484764, -5.725139]
  },
  {
    day: 20,
    title: "A Crisp Morning",
    description: "Finally it was a nice sunny morning, though it was still cold",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_20/crisp_morning.jpg?raw=true",
    coordinates: [42.478825, -5.742094]
  },
  {
    day: 20,
    title: "Mountains in the Distance",
    description: "Now we could see mountains in the distance, which significantly lifted my mood",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_20/mountains.jpg?raw=true",
    coordinates: [42.460092, -5.828311]
  },
  {
    day: 20,
    title: "More Mountain Views",
    description: "I took a lot of photos of the mountains that day, so I will share only a few of them here!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_20/mountains_again.jpg?raw=true",
    coordinates: [42.460331, -5.845003]
  },
  {
    day: 20,
    title: "Hospital de Órbigo",
    description: "Although we had been walking separately, Lawrence, Nils and I all caught up to eachother at the entrance of the town, as we stopped to appreciate its pretty bridge",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_20/hospital_de_orbigo.jpg?raw=true",
    coordinates: [42.463919, -5.877572]
  },
  {
    day: 20,
    title: "Camino Directions",
    description: "Sometimes comical signs advised us of the best path ahead!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_20/directions.jpg?raw=true",
    coordinates: [42.463067, -5.888031]
  },
  {
    day: 20,
    title: "Quiet Albergue Stop",
    description: "We were hungry and thirsty, so walked into an albergue seeking refreshments, which we bought from a vending machine. The host then brought us more snacks for free! It was at this moment I realised I'd lost my cap, though :(",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_20/albergue_snacks.jpg?raw=true",
    coordinates: [42.469000, -5.910433]
  },
  {
    day: 20,
    title: "A New Look...",
    description: "Since I'd lost my hat, Lawrence lent me this one he'd bought earlier on the Camino. I looked quite ridiculous...",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_20/new_look.jpg?raw=true",
    coordinates: [42.463892, -5.925725]
  },
  {
    day: 20,
    title: "Playful Cows",
    description: "Lawrence and I played with a group of cows, who licked his walking stick",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_20/friendly_cows.jpg?raw=true",
    coordinates: [42.459717, -5.933136]
  },
  {
    day: 20,
    title: "Skipping Stones",
    description: "Lawrence impressed me by skipping rocks on this pond we found",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_20/skipping_stones.jpg?raw=true",
    coordinates: [42.465756, -5.946539]
  },
  {
    day: 20,
    title: "Just under 300km to go!",
    description: "The views of the mountains just continued to get better as we reached the end of the day",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_20/300k_to_go.jpg?raw=true",
    coordinates: [42.458861, -5.991972]
  },
  {
    day: 20,
    title: "Approaching Astorga",
    description: "Towards the end of the day, Lawrence and I had reunited with Woody & Nils and we approached Astorga together",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_20/approaching_astorga.jpg?raw=true",
    coordinates: [42.454297, -6.001689]
  },
  {
    day: 20,
    title: "Thirsty Pilgrims",
    description: "Spirits were very high at the end of the day, which had been my favourite of the entire Camino (reflected by the number of photos!)",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_20/thirsty_pilgrims.jpg?raw=true",
    coordinates: [42.454367, -6.006075]
  },
  {
    day: 21,
    title: "Chocolatería La Cepedana",
    description: "Breakfast at the chocolate shop in Astorga!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_21/breakfast.jpg?raw=true",
    coordinates: [42.453657, -6.052011]
  },
  {
    day: 21,
    title: "The Cathedral of Santa María de Astorga",
    description: "That morning Lawrence, Woody and I walked ahead without Nils",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_21/cathedral.jpg?raw=true",
    coordinates: [42.457458, -6.057386]
  },
  {
    day: 21,
    title: "The Stupid Hat",
    description: "I actually look like a magician",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_21/stupid_hat.jpg?raw=true",
    coordinates: [42.454897, -6.134103]
  },
  {
    day: 21,
    title: "Woody's New Love",
    description: "I really don't know what Woody was doing here",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_21/woody_love.jpg?raw=true",
    coordinates: [42.455231, -6.158333]
  },
  {
    day: 21,
    title: "Hideous Food Stop",
    description: "The food was so bad that Lawrence had an emotional breakdown, but at least we were in the company of friends",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_21/bad_food.jpg?raw=true",
    coordinates: [42.462761, -6.207331]
  },
  {
    day: 21,
    title: "Baby Cows",
    description: "We were walking during Spring and saw some very cute baby animals!!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_21/baby_cows.jpg?raw=true",
    coordinates: [42.478739, -6.268056]
  },
  {
    day: 21,
    title: "Pink Flowers",
    description: "We walked on beautiful hiking trails with pink flowers and mountain views that afternoon",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_21/pink_flowers.jpg?raw=true",
    coordinates: [42.483142, -6.296808]
  },
  {
    day: 21,
    title: "View from the Top",
    description: "We had to ascend a hill, but I felt full of energy and the views at the top made it worthwhile",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_21/views.jpg?raw=true",
    coordinates: [42.490281, -6.322278]
  },
  {
    day: 21,
    title: "Foncebadón",
    description: "For the first time we were turned away by several albergues, but eventually found space in the municipal albergue",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_21/foncebadon.jpg?raw=true",
    coordinates: [42.491358, -6.342789]
  },
  {
    day: 22,
    title: "Early Morning Light",
    description: "We still had to ascend the last of the hill the next morning, bringing us more incredible views",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_22/early_morning.jpg?raw=true",
    coordinates: [42.490122, -6.350481]
  },
  {
    day: 22,
    title: "Cruz de Ferro",
    description: "I arrived at the cross before the guys and got some photos here on my own",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_22/cross_photo.jpg?raw=true",
    coordinates: [42.488919, -6.361331]
  },
  {
    day: 22,
    title: "A First Snack Break",
    description: "Kas Limon and cake with a view, what could be better?",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_22/kas_and_cake.jpg?raw=true",
    coordinates: [42.489500, -6.385117]
  },
  {
    day: 22,
    title: "Incredible Views",
    description: "One of the most beautiful sections of trail on the whole Camino! I decided to stop and rest, with disastrous consequences",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_22/amazing_views.jpg?raw=true",
    coordinates: [42.488708, -6.419014]
  },
  {
    day: 22,
    title: "Blood Spatter",
    description: "Some of my blood spatter on the rocks 😂 The blood was falling in big blobs absolutely everywhere!!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_22/blood_spatter.jpg?raw=true",
    coordinates: [42.488522, -6.419517]
  },
  {
    day: 22,
    title: "A Long Descent",
    description: "Gaelle accompanied me down to the next town to find my friends",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_22/descent_views.jpg?raw=true",
    coordinates: [42.491328, -6.439586]
  },
  {
    day: 22,
    title: "A Helpful Sign",
    description: "I know which way I'd rather go!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_22/helpful_sign.jpg?raw=true",
    coordinates: [42.521183, -6.478764]
  },
  {
    day: 22,
    title: "Molinaseca",
    description: "The lovely town of Molinaseca, where we stopped for some rather expensive food",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_22/molinaseca.jpg?raw=true",
    coordinates: [42.537406, -6.518108]
  },
  {
    day: 22,
    title: "Kas Chair",
    description: "I have no idea where this photo was taken because it came from Lawrence's phone, so this is just a guess. Me and a chair dedicated to my love, Kas ❤️",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_22/kas_chair.jpg?raw=true",
    coordinates: [42.538464, -6.521743]
  },
  {
    day: 23,
    title: "A Rather Creepy Guy",
    description: "I'm not sure what this guy's story is, but he was just chilling outside the castle",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_23/creepy_guy.jpg?raw=true",
    coordinates: [42.543094, -6.593292]
  },
  {
    day: 23,
    title: "Ponferrada Castle",
    description: "Ponferrada has a rather impressive castle!",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_23/ponferrada_castle.jpg?raw=true",
    coordinates: [42.543139, -6.593486]
  },
  {
    day: 23,
    title: "Ponferrada Artwork",
    description: "It's so cool to see all the artwork along the Camino, demonstrating even its modern cultural importance",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_23/ponferrada_artwork.jpg?raw=true",
    coordinates: [42.556578, -6.590994]
  },
  {
    day: 23,
    title: "Mountains & the Town",
    description: "The snow on the mountains looked so pretty at this time of year",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_23/ponferrada_mountains.jpg?raw=true",
    coordinates: [42.558397, -6.588258]
  },
  {
    day: 23,
    title: "Nils",
    description: "Self-explanatory photo really",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_23/nils.jpg?raw=true",
    coordinates: [42.566447, -6.598661]
  },
  {
    day: 23,
    title: "Swampy Trees",
    description: "I thought the water and the trees here looked really cool, so I took a photo",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_23/swampy_trees.jpg?raw=true",
    coordinates: [42.592428, -6.698389]
  },
  {
    day: 23,
    title: "Cantariña Vinos de Familia",
    description: "Vineyards with the mountains in the distance! At this point it was almost unbearably hot",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_23/vineyards.jpg?raw=true",
    coordinates: [42.607511, -6.780758]
  },
  {
    day: 23,
    title: "A Hat Exchange",
    description: "Lawrence took pity on me and took the stupid hat so I could wear his cap instead. I was relieved that he also looked like a magician in the terrible hat",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_23/hat_exchange.jpg?raw=true",
    coordinates: [42.605014, -6.784500]
  },
  {
    day: 23,
    title: "New Hat!!",
    description: "Thankfully I was finally able to buy a new hat in Villafranca del Bierzo",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_23/new_hat.jpg?raw=true",
    coordinates: [42.606167, -6.809428]
  },
  {
    day: 23,
    title: "Villafranca del Bierzo",
    description: "The view of Villafranca del Bierzo from our albergue",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_23/villafranca.jpg?raw=true",
    coordinates: [42.604561, -6.806875]
  },
  {
    day: 23,
    title: "Xardín da Almeda",
    description: "The garden in the centre of Villafranca del Bierzo",
    photoUrl: "https://github.com/sophiefsadler/Camino_Map/blob/main/images/poi/day_23/villafranca_garden.jpg?raw=true",
    coordinates: [42.608803, -6.808408]
  },
];
