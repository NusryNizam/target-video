// Static snapshot of TMDB `/tv/{id}/credits` (top 6 cast each), keyed by show id.
// Same approach as tmdb.ts: captured once, no live calls at runtime.

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export const mockCredits: Record<string, CastMember[]> = {
  "108978": [
    {
      "id": 64295,
      "name": "Alan Ritchson",
      "character": "Jack Reacher",
      "profile_path": "/92YNEEpCyugkTzPprJwZpvVtvuK.jpg"
    },
    {
      "id": 1247604,
      "name": "Agnez Mo",
      "character": "Lila Hoth",
      "profile_path": "/7GuBJxf5szQRCKLk3iG2ztfCo39.jpg"
    },
    {
      "id": 1104414,
      "name": "Sydelle Noel",
      "character": "Tamara Green",
      "profile_path": "/fCOlRtkZVMOMDRPYhdRLeKqymVa.jpg"
    },
    {
      "id": 1297494,
      "name": "Anggun",
      "character": "Amisha Hoth",
      "profile_path": "/4WxHGTehDvZudrunxTZmnR66CBi.jpg"
    },
    {
      "id": 59238,
      "name": "Christopher Rodriguez Marquette",
      "character": "Jacob Merrick",
      "profile_path": "/8AL7UPXM4sVkOMgTHIxNdRi2SXP.jpg"
    },
    {
      "id": 18472,
      "name": "Kevin Corrigan",
      "character": "Shaun Docherty",
      "profile_path": "/obSUGc68mQDvFONalMg25Xw5GZM.jpg"
    }
  ],
  "1416": [
    {
      "id": 9280,
      "name": "Ellen Pompeo",
      "character": "Meredith Grey",
      "profile_path": "/yPd4G2RcjXQPNWkKUPbWh5v1flC.jpg"
    },
    {
      "id": 171075,
      "name": "Chandra Wilson",
      "character": "Miranda Bailey",
      "profile_path": "/83Ynxlv3jV4ahkOiAEfunM7Rez2.jpg"
    },
    {
      "id": 25544,
      "name": "James Pickens Jr.",
      "character": "Richard Webber",
      "profile_path": "/iddDcaysDQ6IVMUjJ97Bv3lTBCu.jpg"
    },
    {
      "id": 81684,
      "name": "Caterina Scorsone",
      "character": "Amelia Shepherd",
      "profile_path": "/eLexGfeg4SyY9anPyNoh8hzKATD.jpg"
    },
    {
      "id": 236021,
      "name": "Camilla Luddington",
      "character": "Jo Wilson",
      "profile_path": "/eKF5lSEdEtOCbsgb5mKjd8vYLck.jpg"
    },
    {
      "id": 95475,
      "name": "Jason George",
      "character": "Ben Warren",
      "profile_path": "/eTiyxcbtEsdANo1NGFsfk3mZPW3.jpg"
    }
  ],
  "1434": [
    {
      "id": 52139,
      "name": "Seth MacFarlane",
      "character": "Peter Griffin / Brian Griffin / Stewie Griffin / Glenn Quagmire (voice)",
      "profile_path": "/8oQJqM51Z0Qtdb7sE6ZfX1peNCB.jpg"
    },
    {
      "id": 24357,
      "name": "Alex Borstein",
      "character": "Lois Griffin / Tricia Takanawa / Loretta Brown / Barbara Pewterschmidt (voice)",
      "profile_path": "/evbCnRe5Yfuy0B41PONLTIcvbem.jpg"
    },
    {
      "id": 18973,
      "name": "Mila Kunis",
      "character": "Meg Griffin (voice)",
      "profile_path": "/cJAHQWX9hVadDFx5WTSBIW0VjvP.jpg"
    },
    {
      "id": 13922,
      "name": "Seth Green",
      "character": "Chris Griffin (voice)",
      "profile_path": "/l4No5Eu6j0U80hCIkaSn17AOWrj.jpg"
    },
    {
      "id": 9657,
      "name": "Patrick Warburton",
      "character": "Joe Swanson (voice)",
      "profile_path": "/nDoOii5HaGwPxYa28xFC2sDkF8y.jpg"
    },
    {
      "id": 3249539,
      "name": "Arif Zahir",
      "character": "Cleveland Brown (voice)",
      "profile_path": "/b8tKuHh132LcOFKC4Nd2fCJDGMt.jpg"
    }
  ],
  "14424": [
    {
      "id": 2379200,
      "name": "Alanis Guillen",
      "character": "Rita Gomes Moraes",
      "profile_path": "/rxQO1zfEQWufJRg7byKTEzifPXL.jpg"
    },
    {
      "id": 1695607,
      "name": "Pedro Novaes",
      "character": "Filipe Pinheiro Henriques",
      "profile_path": "/h6njcEeWsKMa3S0kHtJbVmgEs9M.jpg"
    },
    {
      "id": 112108,
      "name": "Palomma Duarte",
      "character": "Lígia Pinheiro Henriques",
      "profile_path": "/vPVn0pkbtmCMWEGSyKJYcyFkEqn.jpg"
    },
    {
      "id": 592367,
      "name": "Joaquim Lopes",
      "character": "Joaquim Henriques",
      "profile_path": "/dvYjhel91yexlSytnm95CD9jWFD.jpg"
    },
    {
      "id": 1603421,
      "name": "Roger Gobeth",
      "character": "Luiz Peixoto",
      "profile_path": "/hXVwxRJIuHNOGyCvF5J847vJN08.jpg"
    },
    {
      "id": 1256934,
      "name": "Tato Gabus Mendes",
      "character": "Dr. César Nobre",
      "profile_path": "/1Gs7HqYZl0TnN98OkdjuuAFBxmg.jpg"
    }
  ],
  "15226": [
    {
      "id": 86865,
      "name": "Shivaji Satham",
      "character": "ACP Pradyuman",
      "profile_path": "/8C0lfz5T80BdWD99rCQmtB3iofF.jpg"
    },
    {
      "id": 101822,
      "name": "Aditya Srivastava",
      "character": "Sr. Inspector Abhijeet",
      "profile_path": "/nGj7ktEVQwPd8WXoN0FYZe9EgQd.jpg"
    },
    {
      "id": 85658,
      "name": "Dayanand Shetty",
      "character": "Sr. Inspector Daya",
      "profile_path": "/3wVmr5BpnoQdb5D2adV7be4SB5l.jpg"
    },
    {
      "id": 1245699,
      "name": "Narendra Gupta",
      "character": "Dr. R. P. Salunkhe",
      "profile_path": "/99xyC002SnPisIMkhpITSWWoFMk.jpg"
    },
    {
      "id": 3341682,
      "name": "Parul Rai",
      "character": "Dr. Gargi",
      "profile_path": "/7HHcJ8rCUCJ9ie3Nmh8r1U82ItI.jpg"
    },
    {
      "id": 5431203,
      "name": "Saumya Saraswat Lol",
      "character": "Sub-Inspector Avni",
      "profile_path": "/3LUSzwCxMB8Ql66hcbmbrmDu5In.jpg"
    }
  ],
  "1622": [
    {
      "id": 49623,
      "name": "Jared Padalecki",
      "character": "Sam Winchester",
      "profile_path": "/dTV5ImKP5uIdFShiG3VFbbjLFWo.jpg"
    },
    {
      "id": 49624,
      "name": "Jensen Ackles",
      "character": "Dean Winchester",
      "profile_path": "/xgOAHqDiqdZCF1BhfHaeLrd47ki.jpg"
    },
    {
      "id": 42747,
      "name": "Misha Collins",
      "character": "Castiel",
      "profile_path": "/szigprnenokR4yOpELIB2rj1Er2.jpg"
    }
  ],
  "206559": [
    {
      "id": 70966,
      "name": "Hans Strydom",
      "character": "Dr. At Koster",
      "profile_path": "/o5MURlJJCC67EvJ2hYXMFpvwFEb.jpg"
    },
    {
      "id": 2057047,
      "name": "Germandt Geldenhuys",
      "character": "Louis Koster",
      "profile_path": "/7ektNcRTOtIr4eopAybV00JiRN.jpg"
    },
    {
      "id": 1854858,
      "name": "Je-ani Swiegelaar",
      "character": "Naomi Koster",
      "profile_path": "/7ikfkseBLPdPD55NFWW4hJlwS9L.jpg"
    },
    {
      "id": 3947231,
      "name": "Gerald Steyn",
      "character": "Dr. Uys Wagener",
      "profile_path": "/dYnfi6UYok930QgcqECBhKRdiWg.jpg"
    },
    {
      "id": 230817,
      "name": "Marlee van der Merwe",
      "character": "Dr. Ella Swart",
      "profile_path": "/epCX7JDvUxDI7JCrRFXw2FhQZ4.jpg"
    },
    {
      "id": 3182686,
      "name": "Roberto Kyle",
      "character": "Dr. Joe Olivier",
      "profile_path": "/6uQJc7epTqEJ1BsSrSpFFJ6YMyi.jpg"
    }
  ],
  "213375": [
    {
      "id": 6162,
      "name": "Paul Bettany",
      "character": "Vision",
      "profile_path": "/oNrDowF5cRtK5lJJuCAh0KeFizy.jpg"
    },
    {
      "id": 13548,
      "name": "James Spader",
      "character": "Ultron",
      "profile_path": "/3gurW3OgDOD4hcqDfgcqUnoNg34.jpg"
    },
    {
      "id": 2307679,
      "name": "Ruaridh Mollica",
      "character": "Thomas",
      "profile_path": "/wiSim6nG9TSY4AO8KOwsaaPJ0EH.jpg"
    },
    {
      "id": 19277,
      "name": "Todd Stashwick",
      "character": "Paladin",
      "profile_path": "/seKRXV2HMS36ip4SfQq6PLRiLL2.jpg"
    },
    {
      "id": 5089882,
      "name": "Lauren Morais",
      "character": "Lisa Molinari",
      "profile_path": "/7Eur3EddzlvXTYzKAGkRmo87xcS.jpg"
    },
    {
      "id": 107734,
      "name": "Orla Brady",
      "character": "F.R.I.D.A.Y.",
      "profile_path": "/wjo8xposTE0HenFopy6KELCWoD0.jpg"
    }
  ],
  "2224": [],
  "2261": [
    {
      "id": 141028,
      "name": "Johnny Carson",
      "character": "Self - Host",
      "profile_path": "/sSltRe7S82Zw29lMRGLeEoL2PUu.jpg"
    }
  ],
  "22980": [
    {
      "id": 54772,
      "name": "Andy Cohen",
      "character": "Self - Host",
      "profile_path": "/eZrNjW7RQgkhwfcBw0qGTLPVgf4.jpg"
    }
  ],
  "2734": [
    {
      "id": 6240,
      "name": "Mariska Hargitay",
      "character": "Olivia Benson",
      "profile_path": "/mF5BMaACeb1rlqp9Fz0f5z7N69H.jpg"
    },
    {
      "id": 21411,
      "name": "Ice-T",
      "character": "Odafin 'Fin' Tutuola",
      "profile_path": "/96TdPckI16ggfHcPrSFf6bHYLLe.jpg"
    },
    {
      "id": 206637,
      "name": "Kelli Giddish",
      "character": "Amanda Rollins",
      "profile_path": "/3zcqEyAguRhYofePyJehWm19uUX.jpg"
    },
    {
      "id": 1217599,
      "name": "Peter Scanavino",
      "character": "Dominick 'Sonny' Carisi Jr.",
      "profile_path": "/kQzX89Ar4rEC1wwHcuDMr0YxUve.jpg"
    },
    {
      "id": 2005718,
      "name": "Aimé Donna Kelly",
      "character": "Renee Curry",
      "profile_path": "/jVf2XzJeFbzEopz5LGS3yIRPUoP.jpg"
    },
    {
      "id": 1413757,
      "name": "Kevin Kane",
      "character": "Terry Bruno",
      "profile_path": "/e0yDVCropmYrjJxHaVX0gxCiYiL.jpg"
    }
  ],
  "33238": [
    {
      "id": 1239240,
      "name": "Yu Jae-seok",
      "character": "Self",
      "profile_path": "/1uktAM7R2Hgc3dynIXvzfACOmnW.jpg"
    },
    {
      "id": 1239238,
      "name": "Jee Seok-jin",
      "character": "Self",
      "profile_path": "/mB3mQ3FOqFR5dIrbtyEpvckhCib.jpg"
    },
    {
      "id": 1241035,
      "name": "Kim Jong-kook",
      "character": "Self",
      "profile_path": "/56y9LaL65dbeaWZJt9dB7ifAUhR.jpg"
    },
    {
      "id": 138519,
      "name": "Haha",
      "character": "Self",
      "profile_path": "/i3vcj3GI3TCmDlnI3aLA7pWKIuN.jpg"
    },
    {
      "id": 85174,
      "name": "Song Ji-hyo",
      "character": "Self",
      "profile_path": "/f3QRDGEqHkeLBQZfWe3GbmHeuuX.jpg"
    },
    {
      "id": 1703373,
      "name": "Yang Se-chan",
      "character": "Self",
      "profile_path": "/odyq0zKjgZjX9o9OWZDImsBCDHQ.jpg"
    }
  ],
  "336510": [],
  "4057": [
    {
      "id": 3266,
      "name": "Joe Mantegna",
      "character": "David Rossi",
      "profile_path": "/4jzvAE6B1eoiZDUnDUuMazirCPP.jpg"
    },
    {
      "id": 15423,
      "name": "Paget Brewster",
      "character": "Emily Prentiss",
      "profile_path": "/nq9ZuGPvzyfS8dOuPWTQUw7Igxg.jpg"
    },
    {
      "id": 49706,
      "name": "Adam Rodriguez",
      "character": "Luke Alvez",
      "profile_path": "/qFSbLvyNPZK40hY9gZXJDvq0qVK.jpg"
    },
    {
      "id": 123727,
      "name": "Kirsten Vangsness",
      "character": "Penelope Garcia",
      "profile_path": "/davwWkIDqUoVF28YmSAqpvUUFuS.jpg"
    },
    {
      "id": 17236,
      "name": "A.J. Cook",
      "character": "Jennifer Jareau",
      "profile_path": "/tvEjGDQVuu7jiOvWXwEU6tEE7NW.jpg"
    },
    {
      "id": 38674,
      "name": "Aisha Tyler",
      "character": "Dr. Tara Lewis",
      "profile_path": "/gVvqznx4udJMgO86IbufADinfE9.jpg"
    }
  ],
  "456": [
    {
      "id": 198,
      "name": "Dan Castellaneta",
      "character": "Homer Simpson / Abe Simpson / Barney Gumble / Krusty the Clown / Groundskeeper Willie / Mayor Quimby (voice)",
      "profile_path": "/AmeqWhP4A46AWkM4kVphg6jOTQX.jpg"
    },
    {
      "id": 199,
      "name": "Julie Kavner",
      "character": "Marge Simpson / Patty Bouvier / Selma Bouvier / Jacqueline Bouvier (voice)",
      "profile_path": "/87kSPYlWcHvqOVEkhdqxysiAf6w.jpg"
    },
    {
      "id": 200,
      "name": "Nancy Cartwright",
      "character": "Bart Simpson / Maggie Simpson / Nelson Muntz / Ralph Wiggum (voice)",
      "profile_path": "/kJQEz3NAwHGdb2sQzAnBf1RmMV4.jpg"
    },
    {
      "id": 5586,
      "name": "Yeardley Smith",
      "character": "Lisa Simpson / Maggie Simpson (voice)",
      "profile_path": "/9AjPwbb3uz4GfgOPBYsy2ILvwkB.jpg"
    },
    {
      "id": 5587,
      "name": "Hank Azaria",
      "character": "Moe Szyslak / Chief Wiggum / Apu / Comic Book Guy / Carl Carlson / Superintendent Chalmers (voice)",
      "profile_path": "/yFDw4b0jucuFWNnGcBPfpYUtn16.jpg"
    },
    {
      "id": 6008,
      "name": "Harry Shearer",
      "character": "Ned Flanders / Mr. Burns / Smithers / Principal Skinner / Lenny Leonard (voice)",
      "profile_path": "/wZpovXxQQqP7kxXPy2yj6QMbM55.jpg"
    }
  ],
  "4614": [
    {
      "id": 1230381,
      "name": "Sean Murray",
      "character": "Timothy McGee",
      "profile_path": "/1RlMqC3qL5gKlfqyAR2xzgKjWrN.jpg"
    },
    {
      "id": 18975,
      "name": "Wilmer Valderrama",
      "character": "Nick Torres",
      "profile_path": "/uohkEwMGIGCq4k8P2AiomuKQwYv.jpg"
    },
    {
      "id": 164930,
      "name": "Katrina Law",
      "character": "Jessica Knight",
      "profile_path": "/y7LzCN8BaoPPSXDBo0UwPQ4UwSB.jpg"
    },
    {
      "id": 1213580,
      "name": "Brian Dietzen",
      "character": "Jimmy Palmer",
      "profile_path": "/njOHd9yWWGQrTS7btmp2vbMbQjE.jpg"
    },
    {
      "id": 1470346,
      "name": "Diona Reasonover",
      "character": "Kasie Hines",
      "profile_path": "/eor8QzQjERWozp1iv7Tgw6TYnAG.jpg"
    },
    {
      "id": 21163,
      "name": "Gary Cole",
      "character": "Alden Parker",
      "profile_path": "/uWsqIlfHbyxkmBJLmq2mR93musF.jpg"
    }
  ],
  "549": [
    {
      "id": 16307,
      "name": "Maura Tierney",
      "character": "Jessica Brady",
      "profile_path": "/4BCrwdHdC4iRSDimvkoYaXg2qki.jpg"
    },
    {
      "id": 971049,
      "name": "David Ajala",
      "character": "Theo Walker",
      "profile_path": "/aug1B4J5UjL1Z7iHQRF7WXdIZLk.jpg"
    },
    {
      "id": 3417,
      "name": "Tony Goldwyn",
      "character": "Nicholas Baxter",
      "profile_path": "/A3hXimbzDtFxQ1PXNo8gG7RZeN4.jpg"
    },
    {
      "id": 12791,
      "name": "Hugh Dancy",
      "character": "Nolan Price",
      "profile_path": "/6UIiS3nxdNTbIo0G2kFNXpcDKhE.jpg"
    },
    {
      "id": 1639904,
      "name": "Odelya Halevi",
      "character": "Samantha Maroun",
      "profile_path": "/26jv3dcS5Us8Ut13Tu9PmvT7uPh.jpg"
    }
  ],
  "5920": [
    {
      "id": 1284159,
      "name": "Simon Baker",
      "character": "Patrick Jane",
      "profile_path": "/oay0Lo2zl0lJdguptxgx1BK9Xq7.jpg"
    },
    {
      "id": 17346,
      "name": "Robin Tunney",
      "character": "Teresa Lisbon",
      "profile_path": "/vOmWyYNoVEaPPvoto4IW8dSXn7I.jpg"
    },
    {
      "id": 52947,
      "name": "Tim Kang",
      "character": "Kimball Cho",
      "profile_path": "/Ae7qMN6fJTut145qpeSn1NOu8yx.jpg"
    },
    {
      "id": 17345,
      "name": "Rockmond Dunbar",
      "character": "Dennis Abbott",
      "profile_path": "/gim7zIrYkbKWsp2Kod7fp74fWyI.jpg"
    },
    {
      "id": 970561,
      "name": "Joe Adler",
      "character": "Jason Wylie",
      "profile_path": "/bsle7zqj6HBs6NYstkwDwQY7EEf.jpg"
    },
    {
      "id": 146516,
      "name": "Josie Loren",
      "character": "Michelle Vega",
      "profile_path": "/vZJc51rwheOC0TCdUkA4KM1UfXu.jpg"
    }
  ],
  "59941": [
    {
      "id": 11669,
      "name": "Jimmy Fallon",
      "character": "Self - Host",
      "profile_path": "/h9kYouEP6VrM8GkS2jl7jMDKbwu.jpg"
    },
    {
      "id": 1215931,
      "name": "Steve Higgins",
      "character": "Self - Announcer",
      "profile_path": "/yia3GOqqCVfiNISWFjcqih88f1j.jpg"
    }
  ],
  "61818": [
    {
      "id": 62856,
      "name": "Seth Meyers",
      "character": "Self - Host",
      "profile_path": "/nCcvpJFHWYHfu5oPxTOyA1uSdqA.jpg"
    }
  ],
  "63770": [
    {
      "id": 58769,
      "name": "Stephen Colbert",
      "character": "Self - Host",
      "profile_path": "/zQ6pvfqIqYiV4TB7lDoaJL52H93.jpg"
    }
  ],
  "65733": [
    {
      "id": 932986,
      "name": "Megumi Oohara",
      "character": "Nobita Nobi (voice)",
      "profile_path": "/zelZQmq65MaiSeDIiqEpZOINIxd.jpg"
    },
    {
      "id": 1241939,
      "name": "Wasabi Mizuta",
      "character": "Doraemon (voice)",
      "profile_path": "/sJ4kytbg2XiERgch3k2k82FXK2B.jpg"
    },
    {
      "id": 9715,
      "name": "Yumi Kakazu",
      "character": "Shizuka Minamoto (voice)",
      "profile_path": "/sVIBofobg32jmGmL0gjEDVsJdaz.jpg"
    },
    {
      "id": 90567,
      "name": "Tomokazu Seki",
      "character": "Suneo Honekawa (voice)",
      "profile_path": "/jGQC9KkfNMh2wBgizw81GLX2KN2.jpg"
    },
    {
      "id": 1142780,
      "name": "Subaru Kimura",
      "character": "Takeshi Gouda (voice)",
      "profile_path": "/8o24ix4Lk9WduRXFDI6Nmip5Deq.jpg"
    },
    {
      "id": 932984,
      "name": "Chiaki",
      "character": "Dorami (voice)",
      "profile_path": "/yKpXkoOsLWPCO8SGD1vWwj9krov.jpg"
    }
  ],
  "91759": [
    {
      "id": 1133980,
      "name": "Danny Lau Dan",
      "character": "Hung Shu-kan",
      "profile_path": "/gEmCCnMg9GvskUPSuGQA3ae8irk.jpg"
    },
    {
      "id": 142644,
      "name": "Pal Sinn Lap-Man",
      "character": "Hung Shu-yan",
      "profile_path": "/hRx1G9DtH7Vjo5vLZynbTFMFaD9.jpg"
    },
    {
      "id": 1223072,
      "name": "Joyce Tang Lai-Ming",
      "character": "Hung Sheung-sin",
      "profile_path": "/uew5C67Af17DlfPFU4qF6Tgmkt9.jpg"
    },
    {
      "id": 564829,
      "name": "Koni Lui",
      "character": "Hung Yeuk-shui",
      "profile_path": "/E9oaDaOleW7LsXtcgkY7p4D6lx.jpg"
    },
    {
      "id": 4135035,
      "name": "Stanley Cheung",
      "character": "Gong Yip 'Industry'",
      "profile_path": "/gSDqJFM94jP6JGNZmlOcUh0UCEA.jpg"
    },
    {
      "id": 125775,
      "name": "Angela Tong Ying-Ying",
      "character": "Ko Pak-fei",
      "profile_path": "/uYXUs9v9r6zBO4RWwYiMzRtzYGg.jpg"
    }
  ],
  "94722": []
};
