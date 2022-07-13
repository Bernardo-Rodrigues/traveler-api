import { prisma } from "../src/database.js";

export default async function seed() {
  const avatars = await prisma.avatar.createMany({
    data: [
      {
        id: 1,
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/avatars/Boy-1",
      },
      {
        id: 2,
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/avatars/Boy-2",
      },
      {
        id: 3,
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/avatars/Boy-3",
      },
      {
        id: 4,
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/avatars/Girl-1",
      },
      {
        id: 5,
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/avatars/Girl-2",
      },
      {
        id: 6,
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/avatars/Girl-3",
      },
      {
        id: 7,
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/avatars/Boy-Traveler",
        tripsCount: 3,
      },
      {
        id: 8,
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/avatars/Girl-Traveler",
        tripsCount: 3,
      },
    ],
  });

  const continents = await prisma.continent.createMany({
    data: [
      { id: 1, name: "South America" },
      { id: 2, name: "North America" },
      { id: 3, name: "Europe" },
      { id: 4, name: "Africa" },
      { id: 5, name: "Asia" },
      { id: 6, name: "Oceania" },
      { id: 7, name: "Antarctica" },
    ],
  });

  const countries = await prisma.country.createMany({
    data: [
      { id: 1, name: "Peru", continentId: 1 },
      { id: 2, name: "Nepal", continentId: 5 },
      { id: 3, name: "France", continentId: 3 },
      { id: 4, name: "Brazil", continentId: 1 },
      { id: 5, name: "Italy", continentId: 3 },
      { id: 6, name: "Indonesia", continentId: 5 },
    ],
  });

  const destinations = await prisma.destination.createMany({
    data: [
      {
        id: 1,
        name: "Machu Picchu",
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/destinies/Machu-Picchu.jpg",
        countryId: 1,
      },
      {
        id: 2,
        name: "Mount Everest",
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/destinies/Mount-Everest.jpg",
        countryId: 2,
      },
      {
        id: 3,
        name: "Paris",
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/destinies/Paris.jpg",
        countryId: 3,
      },
      {
        id: 4,
        name: "Rio de Janeiro",
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/destinies/Rio-de-Janeiro.jpg",
        countryId: 4,
      },
      {
        id: 5,
        name: "Rome",
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/destinies/Rome.jpg",
        countryId: 5,
      },
      {
        id: 6,
        name: "Bali",
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/destinies/Bali.jpeg",
        countryId: 6,
      },
    ],
  });

  const localizations = await prisma.localization.createMany({
    data: [
      {
        id: 1,
        lat: "-13.163068",
        lng: "-72.545128",
        destinationId: 1,
      },
      {
        id: 2,
        lat: "27.986065",
        lng: "86.922623",
        destinationId: 2,
      },
      {
        id: 3,
        lat: "48.864716",
        lng: "2.349014",
        destinationId: 3,
      },
      {
        id: 4,
        lat: "-22.908333",
        lng: "-43.196388",
        destinationId: 4,
      },
      {
        id: 5,
        lat: "41.902782",
        lng: "12.496366",
        destinationId: 5,
      },
      {
        id: 6,
        lat: "-8.275",
        lng: "115.166",
        destinationId: 6,
      },
    ],
  });

  const tips = await prisma.tip.createMany({
    data: [
      {
        id: 1,
        destinationId: 1,
        description:
          "Food in Machu Picchu is expensive and super limited. Take a fancy Picnic or something to satisfy your hunger and leave for a fancy lunch in the afternoon on the way back to Aguas Calientes. Having a picnic sitting on top of the mountain is something incredible.",
      },
      {
        id: 2,
        destinationId: 1,
        description:
          "Even on cloudy days the solar radiation in Peru is strong and it burns for real. Bring sunscreen (and sunglasses) and repeat the application as often as you remember.",
      },
      {
        id: 3,
        destinationId: 2,
        description:
          "Don't forget to bring appropriate clothes according to the climate of each destination. In the case of Mount Everest, the average temperature is -36o C. Therefore, be sure to wear appropriate clothing for the journey that can take up to four days.",
      },
      {
        id: 4,
        destinationId: 2,
        description:
          "To protect the skin from ultraviolet rays, the ideal is to apply sunscreen every four hours. This should be done even when the weather is not very sunny.",
      },
      {
        id: 5,
        destinationId: 3,
        description:
          "As in most Catholic countries, most local businesses are closed on Sundays. Because of this, plan to buy items from the market or pharmacy in advance.",
      },
      {
        id: 6,
        destinationId: 3,
        description:
          "If there's one thing you can't miss in Paris, it's trying French pastries. The French patisserie is world famous and you've probably heard of sweets like macaron and crème brulée.",
      },
      {
        id: 7,
        destinationId: 4,
        description:
          "On the weekends, tourists flock to Rio de Janeiro in huge numbers. This means traffic and crowds at all top attractions like Christ the Redeemer (Cristo Redentor).  If you can visit on a weekday, you should be able to save yourself some stress and make your experience a little better.",
      },
      {
        id: 8,
        destinationId: 4,
        description:
          "Speaking of what to wear in Rio de Janeiro, make sure to get yourself some Havaianas as soon as you get to Brazil!  These charming flip-flops are the most comfortable kind of footwear in Brazil, and you can get them at a great price. Also, they are like the official dress code of Rio.",
      },
      {
        id: 9,
        destinationId: 5,
        description:
          "Buy the Roma Pass when you arrive at the airport. If you're going to visit the basic attractions (the Coliseum, the Galleria Borghese, the Capitoline Museum), the pass is great. It includes two free entries (of your choice) and reduced entry to several others, as well as giving you the right to use all public transport in the city for the duration of the pass.",
      },
      {
        id: 10,
        destinationId: 5,
        description:
          "If you're traveling to Rome on a budget or otherwise, don't eve bother paying for water. The city has water fountains, affectionately called 'nasoni' or little noses around every other corner and these fountains have good to drink water flowing from it 24*7. ",
      },
      {
        id: 11,
        destinationId: 1,
        description:
          "In Machu Picchu there are public restrooms but they are located outside the enclosure, next to the main entrance. If you are inside the archaeological site, it is possible to go out to use the bathroom and enter again without going through the lines.",
      },
      {
        id: 12,
        destinationId: 3,
        description:
          "There are two ways to visit the Eiffel Tower: you can go up to the top for a breathtaking view, or just go up to the second floor and still have an amazing view from up there!",
      },
      {
        id: 13,
        destinationId: 6,
        description:
          "At the center of Bali is Ubud, considered the island's cultural hotspot. Galleries, museums, palaces, hidden temples and typical crafts are what make the city vibrant, in addition to the welcoming people. Adventurers also find many activities there, such as trekking, rafting, climbing the volcano on Mount Batur and even riding an elephant.",
      },
      {
        id: 14,
        destinationId: 6,
        description:
          "The beautiful beaches are concentrated in the south of the island, such as Bukit, Padang Padang, Uluwatu, Jimbaran and Seminyak, the latter two being the most frequented by those who appreciate beach clubs and good restaurants. Comfort seekers look to the luxurious resorts of Nusa Dua, dominated by family-friendly hotels.",
      },
      {
        id: 15,
        destinationId: 6,
        description:
          "One of the main activities for those who travel to the so-called island of the gods, as Bali is also known, is to visit and be dazzled by beautiful and very different temples.",
      },
    ],
  });

  const descriptions = await prisma.description.createMany({
    data: [
      {
        id: 1,
        destinationId: 1,
        text: 'Huayna Picchu Picchu or Machu Picchu (in Quechua Machu Picchu, "old mountain"), also called "lost city of the Incas", is a well-preserved pre-Columbian city, located on top of a mountain, at an altitude of 2,400 meters, in the valley of the Urubamba River, present-day Peru.',
        type: "About Destination",
      },
      {
        id: 2,
        destinationId: 2,
        text: "Mount Everest  is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The China–Nepal border runs across its summit point. Its elevation (snow height) of 8,848.86 m (29,031.7 ft) was most recently established in 2020 by the Chinese and Nepali authorities.",
        type: "About Destination",
      },
      {
        id: 3,
        destinationId: 3,
        text: "Paris is the capital and most populous city in France, with an estimated 2020 population of 2,148,271 in an area of 105 square kilometers. second most expensive city in the world, behind only Singapore and ahead of Zurich, Hong Kong, Oslo and Geneva.",
        type: "About Destination",
      },
      {
        id: 4,
        destinationId: 4,
        text: 'Rio de Janeiro is a Brazilian municipality, capital of the homonymous state, located in the Southeast of the country. Largest international tourist destination in Brazil, Latin America and the entire Southern Hemisphere (in 2008), the capital of Rio de Janeiro is the best known Brazilian city abroad, functioning as a national "mirror", or "portrait".',
        type: "About Destination",
      },
      {
        id: 5,
        destinationId: 5,
        text: "Rome is the capital city of Italy. It is also the capital of the Lazio region, the centre of the Metropolitan City of Rome, and a special comune named Comune di Roma Capitale. With 2,860,009 residents in 1,285 km2 (496.1 sq mi), Rome is the country's most populated comune and the third most populous city in the European Union.",
        type: "About Destination",
      },
      {
        id: 6,
        destinationId: 1,
        text: "The Spanish conqueror Baltasar de Ocampo had notes of a visit during the late 16th century to a mountain fortress called Pitcos with very sumptuous and majestic buildings, erected with great skill and art, all the lintels of the doors, as well as the main and the vulgar, being of marble, elaborately carved. Therefore, we can consider him the first discoverer from outside the region.",
        type: "Discoverer",
      },
      {
        id: 7,
        destinationId: 2,
        text: "Mount Everest has been host to other winter sports and adventuring besides mountaineering, including snowboarding, skiing, paragliding, and BASE jumping.",
        type: "Extreme Sports",
      },
      {
        id: 8,
        destinationId: 2,
        text: "In 2008, a new weather station at about 8,000 m (26,000 ft) elevation went online.The station's first data in May 2008 were air temperature −17 °C (1 °F), relative humidity 41.3 per cent, atmospheric pressure 382.1 hPa (38.21 kPa), wind direction 262.8°, wind speed 12.8 m/s (28.6 mph, 46.1 km/h), global solar radiation 711.9 watts/m2, solar UVA radiation 30.4 W/m2.",
        type: "Meteorology",
      },
      {
        id: 9,
        destinationId: 3,
        text: "Paris Saint-Germain football club and Stade Français rugby club are based in Paris. The 81,000-seat Stade de France, built for the 1998 FIFA World Cup, is located north of the city, in the neighboring commune of Saint-Denis. Paris annually organizes the Grand Slam tennis tournament. It hosted the 1900 and 1924 Summer Olympics, and is expected to host the 2024. Paris was also the host city for the 1938 and 1998 FIFA World Cups, the 2007 Rugby Union World Cup and the European Football Championship in 1960, 1984 and 2016. The Tour de France road cycling competition ends in Paris every July.",
        type: "Sports",
      },
      {
        id: 10,
        destinationId: 4,
        text: "Its coastline is 197 kilometers long and includes more than one hundred islands that occupy 37 km², and is divided into three parts, facing Sepetiba Bay, the Atlantic Ocean and Guanabara Bay.",
        type: "Coastline",
      },
      {
        id: 11,
        destinationId: 4,
        text: "The city experiences hot, humid summers and warm, sunny winters. In the inner areas of the city, temperatures above 40 °C are common during the summer, although rarely for long periods, while maximum temperatures above 23 °C can occur monthly.",
        type: "Climate",
      },
      {
        id: 12,
        destinationId: 5,
        text: 'In 2019, Rome was the 14th most visited city in the world, with 8.6 million tourists, the third most visited in the European Union, and the most popular tourist destination in Italy. Rome today is one of the most important tourist destinations of the world, due to the incalculable immensity of its archaeological and artistic treasures, as well as for the charm of its unique traditions, the beauty of its panoramic views, and the majesty of its magnificent "villas" (parks).',
        type: "Tourism",
      },
      {
        id: 13,
        destinationId: 6,
        text: "Bali is an island and province of Indonesia, situated at the western end of the Lesser Sunda Islands archipelago, between the islands of Java (to the west) and Lombok (to the east). roughly in the middle of the south coast.It is known for the cultural manifestations of its people, such as dance, sculpture, painting, leather and metal work and music. Bali is part of the Coral Triangle, a maritime area of ​​extremely high biodiversity, where more than 500 species of coral are found (76% of the number known worldwide).",
        type: "About",
      },
      {
        id: 14,
        destinationId: 6,
        text: 'The name Bali, with which the island was named in the 9th century, derives from the word Wali. Wali or Wari was the term by which the natives, who greatly venerated their gods, called the act of worship. Wali is a Sanskrit word meaning "sacrifice offered to the god", "worship", "worship" or "offering".',
        type: "Etymology",
      },
      {
        id: 15,
        destinationId: 6,
        text: "",
        type: "Languages",
      },
    ],
  });

  const achievements = await prisma.achievement.createMany({
    data: [
      {
        id: 1,
        name: "Machu Picchu",
        description: "You visited Machu Picchu!",
        destinationId: 1,
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/destinies/Machu-Picchu.jpg",
      },
      {
        id: 2,
        name: "Mount Everest",
        description: "You visited Mount Everest!",
        destinationId: 2,
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/destinies/Mount-Everest.jpg",
      },
      {
        id: 3,
        name: "Paris",
        description: "You visited Paris!",
        destinationId: 3,
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/destinies/Paris.jpg",
      },
      {
        id: 4,
        name: "Rio de Janeiro",
        description: "You visited Rio de Janeiro!",
        destinationId: 4,
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/destinies/Rio-de-Janeiro.jpg",
      },
      {
        id: 5,
        name: "Rome",
        description: "You visited Rome!",
        destinationId: 5,
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/destinies/Rome.jpg",
      },
      {
        id: 6,
        name: "Beginner Traveler",
        description: "You visited 3 destinations!",
        count: 3,
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/destinies/Rome.jpg",
      },
      {
        id: 7,
        name: "Intermediate Traveler",
        description: "You visited 5 destinations!",
        count: 5,
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/destinies/Rome.jpg",
      },
      {
        id: 8,
        name: "Experient Traveler",
        description: "You visited 10 destinations!",
        count: 10,
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/destinies/Rome.jpg",
      },
      {
        id: 5,
        name: "Bali",
        description: "You visited Bali!",
        destinationId: 6,
        imageLink:
          "https://hjjvsmpqvznxkydtrqzo.supabase.co/storage/v1/object/public/destinies/Bali.jpeg",
      },
    ],
  });

  console.log({
    achievements,
    avatars,
    continents,
    countries,
    descriptions,
    destinations,
    localizations,
    tips,
  });
}
