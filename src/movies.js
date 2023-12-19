const movies = [
    "Cadet Kelly",
    "Zapped",
    "Eight Below",
    "How to Build a Better Boy",
    "Brave",
    "Luca",
    "Lemonade Mouth",
    "A Bug's Life",
    "Encanto",
    "A Goofy Movie",
    "Million Dollar Arm",
    "WALL-E",
    "Turning Red",
    "Peter Pan",
    "Zombies",
    "Fantasia 2000",
    "The Tigger Movie",
    "Invincible",
    "A Bug’s Life",
    "The Aristocats",
    "The Princess Diaries",
    "The Adventures of Ichabod and Mr. Toad",
    "Den Brother",
    "Robin Hood",
    "Read It and Weep",
    "G-Force",
    "Honey, I Blew Up the Kid",
    "Bedtime Stories",
    "Finding Nemo",
    "Pocahontas",
    "Remember the Titans",
    "Mary Poppins",
    "The Lizzie McGuire Movie",
    "Sharpay's Fabulous Adventure",
    "Kim Possible",
    "101 Dalmatians [live action]",
    "The Jungle Book 2",
    "Ready to Run",
    "Honey, I Shrunk the Kids",
    "Toy Story 3",
    "The Emperor’s New Groove",
    "Cruella",
    "The Incredibles",
    "Pirates of the Caribbean: Dead Man's Chest",
    "Camp Rock",
    "Atlantis: The Lost Empire",
    "Jungle Cruise",
    "The Odd Life of Timothy Green",
    "Aladdin",
    "Sky High",
    "Tron",
    "The Mighty Ducks",
    "Dinosaur",
    "The Reluctant Dragon",
    "Tarzan",
    "The Haunted Mansion",
    "Winnie the Pooh",
    "Meet the Robinsons",
    "Hannah Montana the Movie",
    "The Santa Clause 3: The Escape Clause",
    "Mary Poppins Returns",
    "Underdog",
    "Princess Protection Program",
    "Stuck in the Suburbs",
    "Toy Story 2",
    "Minutemen",
    "Saving Mr. Banks",
    "The Santa Clause 3",
    "The BFG",
    "John Carter",
    "Bolt",
    "Lilo & Stitch",
    "The Princess and the Frog",
    "Descendants 3",
    "Race to Witch Mountain",
    "The Proud Family Movie",
    "Tangled",
    "Jungle 2 Jungle",
    "The Rescuers",
    "Tinker Bell and the Legend of the NeverBeast",
    "The Princess Diaries 2",
    "The Santa Clause",
    "Herbie Rides Again",
    "Snow Dogs",
    "The Sword in the Stone",
    "Air Bud",
    "Tomorrowland",
    "The Pirate Fairy",
    "Elemental",
    "Diary of a Wimpy Kid",
    "Return to Never Land",
    "Disenchanted",
    "Frenemies",
    "Planes",
    "Invisible Sister",
    "Alice in Wonderland",
    "Wish",
    "Brother Bear",
    "The Lion King",
    "Snow White and the Seven Dwarfs",
    "Indiana Jones and the Dial of Destiny",
    "Toy Story",
    "Cinderella",
    "Life Is Ruff",
    "Oliver & Company",
    "Pete's Dragon",
    "College Road Trip",
    "Melody Time",
    "Descendants",
    "High School Musical",
    "Beauty and the Beast",
    "Ratatouille",
    "Toy Story 4",
    "Incredibles 2",
    "Mulan",
    "Home on the Range",
    "The Great Mouse Detective",
    "Kim Possible Movie: So the Drama",
    "Hercules",
    "The Santa Clause 2",
    "A Wrinkle in Time",
    "Bambi",
    "The Sorcerer's Apprentice",
    "Sister Act 2",
    "Avalon High",
    "Hannah Montana: The Movie",
    "Up",
    "The Muppet Christmas Carol",
    "Three Men and a Little Lady",
    "Christopher Robin",
    "The Little Mermaid",
    "Zombies 2",
    "Tron: Legacy",
    "The Hunchback of Notre Dame",
    "Strange World",
    "Cheaper by the Dozen",
    "The Nutcracker and the Four Realms",
    "The Nightmare Before Christmas",
    "Lady and the Tramp",
    "Fantasia/2000",
    "Prince of Persia",
    "Starstruck",
    "Chip ’n Dale",
    "Saludos Amigos",
    "Ducktales",
    "102 Dalmatians",
    "Alexander and the Terrible, Horrible, No Good, Very Bad Day",
    "Inside Out",
    "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe",
    "Pixel Perfect",
    "Muppet Treasure Island",
    "High School Musical 3",
    "The Secret of the Magic Gourd",
    "Into The Woods",
    "Herbie Goes to Monte Carlo",
    "The Wild",
    "High School Musical 2",
    "Piglet’s Big Movie",
    "The Rescuers Down Under",
    "Finding Dory",
    "Pirates of the Caribbean: At World's End",
    "Wizards of Waverly Place: The Movie",
    "Descendants 2",
    "Alice Through the Looking Glass",
    "Fantasia",
    "Frozen",
    "Herbie",
    "Hatching Pete",
    "The Fox and the Hound",
    "Who Framed Roger Rabbit",
    "Pirates of the Caribbean: The Curse of the Black Pearl",
    "George of the Jungle",
    "The Parent Trap",
    "McFarland, USA",
    "The Chronicles of Narnia: Prince Caspian",
    "Maleficent: Mistress of Evil",
    "One Hundred and One Dalmatians",
    "Geek Charming",
    "Around the World in 80 Days",
    "Atlantis",
    "Halloweentown II: Kalabar's Revenge",
    "Cloud 9",
    "Zootopia",
    "The Suite Life Movie",
    "Pirates of the Caribbean: On Stranger Tides",
    "Ralph Breaks the Internet",
    "Freaky Friday",
    "Sleeping Beauty",
    "The Emperor's New Groove",
    "The Sorcerer’s Apprentice",
    "Confessions of a Teenage Drama Queen",
    "Oz the Great and Powerful",
    "Moana",
    "Monsters University",
    "Lightyear",
    "Camp Rock 2: The Final Jam",
    "Dumbo",
    "Onward",
    "The Game Plan",
    "Pooh’s Heffalump Movie",
    "Return to Halloweentown",
    "Frankenweenie",
    "Artemis Fowl",
    "The Black Cauldron",
    "Into the Woods",
    "The Pacifier",
    "The Shaggy Dog",
    "Miracle in Lane 2",
    "The Cheetah Girls",
    "Jonas Brothers",
    "Beverly Hills Chihuahua",
    "Soul",
    "The Cheetah Girls 2",
    "Hannah Montana & Miley Cyrus",
    "Big Hero 6",
    "Secretariat",
    "Wreck-It Ralph",
    "Recess",
    "Teen Beach Movie",
    "Hocus Pocus 2",
    "Herbie Fully Loaded",
    "The Rocketeer",
    "Cars",
    "Real Steel",
    "Diary of a Wimpy Kid Christmas",
    "Sister Act",
    "The Ice Age Adventures of Buck Wild",
    "Teen Beach 2",
    "Prom",
    "Wendy Wu: Homecoming Warrior",
    "101 Dalmatians",
    "Coco",
    "Ice Princess",
    "The Cheetah Girls: One World",
    "Disney’s A Christmas Carol",
    "Santa Clause 2",
    "Valiant",
    "Spirited Away",
    "Stargirl",
    "Get a Clue",
    "The Lone Ranger",
    "Hamilton",
    "National Treasure: Book of Secrets",
    "Twitches",
    "Haunted Mansion",
    "Queen of Katwe",
    "Prince of Persia: The Sands of Time",
    "Raya and the Last Dragon",
    "Treasure Planet",
    "National Treasure",
    "Tinker Bell and the Great Fairy Rescue",
    "Jump In!",
    "Muppets Most Wanted",
    "Bears",
    "Chicken Little",
    "The Young Black Stallion",
    "Pirates of the Caribbean: Dead Men Tell No Tales",
    "Pete’s Dragon",
    "Turner & Hooch",
    "The Shaggy D.A.",
    "Hocus Pocus",
    "Herbie Goes Bananas",
    "Enchanted",
    "Cars 3",
    "The Muppets",
    "Cars 2",
    "The Chronicles of Narnia: The Voyage of the Dawn Treader",
    "Noelle",
    "Frozen II",
    "Tinker Bell",
    "Pinocchio",
    "The Many Adventures of Winnie the Pooh",
    "Monsters, Inc.",
    "The Princess Diaries 2: Royal Engagement",
    "Tinker Bell and the Lost Treasure",
    "The Three Caballeros",
    "Twitches Too",
    "The Jungle Book",
    "Radio Rebel",
    "The Love Bug",
    "James and the Giant Peach",
    "Secret of the Wings",
    "The Good Dinosaur",
    "Adventures in Babysitting",
    "Maleficent",
    "Halloweentown High",
    "Halloweentown",
    "Good Luck Charlie, It's Christmas!",
    "Flubber",
];

export default movies;