/*
  ================================================================
  THIS IS THE MAIN FILE YOU EDIT
  ================================================================

  EASY RULES:
  1. Change only the words between quotation marks.
  2. Keep every comma, bracket and quotation mark.
  3. Put photos in images/, videos in videos/, and audio in audio/.
  4. Then write the matching path here, for example:
       photos: ["images/month-5.jpg"]
  5. Leave a media path as "" to keep its beautiful placeholder.

  You do NOT need React, npm, a terminal, or any installation.
*/

window.BABY_STORY = {
  /* ---------- BASIC DETAILS ---------- */
  babyDisplayName: "Baby Boy",
  babyFullName: "[Baby's Full Name]",
  babyNickname: "[Nickname]",
  dueDate: "2026-09-01T00:00:00",
  babyHasArrived: false,
  familyCountry: "Sri Lanka",
  sisterCountry: "USA",

  openingTitleFirstLine: "Waiting for You,",
  openingTitleSecondLine: "Baby boy",
  openingMessage:
    "While you were growing inside her, we were loving you from miles away.",
  comingSoonText: "Coming late August / early September 2026",

  /* Keep this image, or replace it with your own wide photograph. */
  heroImage: "images/hero-watercolor.webp",
  familySong: "audio/backgroundsong.mp3" ,

  /* ---------- THE DAY WE FOUND OUT ---------- */
  foundOutStory:
    "One little message arrived—and suddenly our family conversations were full of due dates, tiny clothes, name ideas, and happy disbelief.",
  foundOutQuote:
    "You were smaller than a grain of rice, and somehow you had already made our whole family excited.",
  firstUltrasoundPhoto: "images/firstscan.jpeg",
  firstFamilyMessagePhoto:"images/firstmsg.jpeg",

  /* ---------- PREGNANCY JOURNEY ---------- */
  pregnancyMonths: [
    {
      number: "01",
      label: "Month One",
      title: "A tiny secret began",
      baby: "Smaller than a poppy seed",
      memory:
        "We did not know you yet, but the world had already started making room for you.",
      note: "Add the day you first suspected something wonderful.",
      photos: [
        "images/firstday.jpeg",
        "images/firstscan.jpeg"
      ],
      video: ""
    },
    {
      number: "02",
      label: "Month Two",
      title: "The first hello",
      baby: "A heartbeat, quick and brave",
      memory:
        "You were smaller than a grain of rice, and somehow you had already made our whole family excited.",
      note: "Add your memory from the first scan here.",
      photos: [
        "images/firstscan.jpeg",
        "images/2months.jpeg"
      ],
      video: ""
    },
    {
      number: "03",
      label: "Month Three",
      title: "Our little dream felt real",
      baby: "Tiny fingers were forming",
      memory:
        "Every update crossed the miles like a small parcel of joy, opened again and again.",
      note: "Add a bump photo, craving, or funny moment.",
      photos: ["images/2months.jpeg"],
      video: ""
    },
    {
      number: "04",
      label: "Month Four",
      title: "Growing quietly",
      baby: "Learning to stretch and move",
      memory:
        "We began imagining the person you might become—and all the stories we would one day tell you.",
      note: "Add a video-call screenshot or a note from Mama.",
      photos: ["images/4months.jpeg"],
      video: "videos/heartbeat.mp4"
    },
    {
      number: "05",
      label: "Month Five",
      title: "A little boy",
      baby: "The sweetest surprise revealed",
      memory:
        "The day we learned you were our little boy, the future suddenly had a thousand shades of blue.",
      note: "Add your gender-reveal memory or favourite photograph.",
      photos: [],
      video: ""
    },
    {
      number: "06",
      label: "Month Six",
      title: "Kicks across the miles",
      baby: "Recognising familiar voices",
      memory:
        "We could not feel your kicks, so Mama described every one—and we treasured each retelling.",
      note: "Add a voice note, short video, or Mama's favourite craving.",
      photos: [],
      video: ""
    },
    {
      number: "07",
      label: "Month Seven",
      title: "The waiting grew sweeter",
      baby: "Opening and closing his eyes",
      memory:
        "Your little corner was taking shape, and ours was filling with messages we could not wait to give you.",
      note: "Add nursery photos, gifts, or family messages.",
      photos: [],
      video: ""
    },
    {
      number: "08",
      label: "Month Eight",
      title: "Nearly in our world",
      baby: "Listening, dreaming, growing",
      memory:
        "Every phone call began with the same question: is today the day we get to meet you?",
      note: "Add the latest bump photo and a message for the final weeks.",
      photos: [],
      video: ""
    },
    {
      number: "09",
      label: "Month Nine",
      title: "Any day now",
      baby: "Ready for his first hello",
      memory:
        "The whole family is holding its breath, loving you before we have even seen your face.",
      note: "Add the last pregnancy photograph and final countdown memory.",
      photos: ["images/9months.jpeg"],
      video: ""
    },
    {
      number: "♥",
      label: "Hello Baby",
      title: "A chapter waiting to be written",
      baby: "Coming soon",
      memory:
        "When you arrive, this page will open—with your name, first photograph, and the story of your first day.",
      note: "Set babyHasArrived to true after birth.",
      photos: [],
      video: ""
    }
  ],

  /* ---------- LOVING FROM FAR AWAY ---------- */
  distanceStory:
    "Every photograph she sent became family news. Every video call became a small visit. We watched the months pass through a screen, but not one moment passed without love.",
  distanceQuote:
    "Distance was a place on the map. It was never a place in our hearts.",
  videoCallPhoto: "images/groupcall.jpeg",
  pregnancyUpdatePhoto:"images/couple.jpeg",

  /* ---------- MY ONE SPECIAL LETTER ---------- */
  myLetter: {
    kicker: "A letter across the miles",
    title: "For my sister",
    introduction:
      "Some feelings deserved a page of their own.",
    salutation: "My dearest sister,",
    message:
      "I wish I could sit beside you, make you tea, listen to every worry, and celebrate every tiny movement. Even from here, I see your courage. You are already giving your little boy such a beautiful beginning, and I am so proud of you. No distance could ever make me miss this journey in my heart.",
    closing: "With all my love,",
    from: "Your Sister",
    relationship: "the one missing you fiercely",
    photo: "" // Example: "images/our-sister-photo.jpg"
  },

  /* ---------- FAMILY PREDICTIONS ---------- */
  predictionQuestions: [
    {
      question: "Who will he look like?",
      options: ["Mama", "Dad", "A little of both" ]
    },
    {
      question: "Who will spoil him the most?",
      options: ["Grandma", "Grandpa","Dad", "Loku puncha", "Chooty punchi"]
    },
    {
      question: "What will his personality be?",
      options: [
        "Quiet little angel",
        "Little troublemaker",
        "Family comedian",
        "Tiny adventurer"
      ]
    },
    {
      question: "What will his first word be?",
      options: ["Mama", "Dada", "Puncha", "Something unexpected"]
    }
  ],

  /* ---------- NAME REVEAL ---------- */
  nameMeaning:
    "Add the meaning of his name here after Mama and Dad choose it.",

  /* ---------- BIRTH DETAILS ---------- */
  birth: {
    dateAndTime: "[Date and time]",
    weight: "[Birth weight]",
    length: "[Length]",
    hospital: "[Hospital]",
    firstPhoto: "", // Example: "images/baby-first-photo.jpg"
    firstVideo: "", // Example: "videos/baby-first-video.mp4"
    story:
      "Add the story of his first day here—the message that announced his arrival, the first photograph everyone waited for, and how Mama felt when she finally held him."
  },

  /* ---------- BABY GALLERY ---------- */
  gallery: [
    { caption: "Your first yawn", photo: "", date: "" },
    { caption: "Tiny toes", photo: "", date: "" },
    { caption: "Mama's favourite picture", photo: "", date: "" },
    { caption: "Your first little smile", photo: "", date: "" },
    { caption: "The photo that made Grandma cry", photo: "", date: "" },
    { caption: "The first time Auntie saw you", photo: "", date: "" }
  ],

  /* ---------- FAMILY VOICES ---------- */
  voices: [
    {
      name: "Grandma",
      relationship: "a lullaby from home",
      initials: "GM",
      audio: "" // Example: "audio/grandma-message.mp3"
    },
    {
      name: "Grandpa",
      relationship: "a first little story",
      initials: "GP",
      audio: ""
    },
    {
      name: "Auntie",
      relationship: "all the things I cannot wait to say",
      initials: "A",
      audio: ""
    },
    {
      name: "Uncle",
      relationship: "a promise of future adventures",
      initials: "U",
      audio: ""
    }
  ],

  /* ---------- OUR FIRST HELLO ---------- */
  firstHello: {
    date: "[Date]",
    photo: "", // Example: "images/first-video-call.jpg"
    video: "", // Example: "videos/first-hello.mp4"
    memory:
      "Add the happy chaos, who cried first, and the little detail everyone remembers from that call."
  },

  /* ---------- SURPRISE FOR MAMA ---------- */
  surpriseVideo: "", // Example: "videos/family-surprise.mp4"
  surpriseFinalMessage: "No distance could make us miss this moment.",

  /* ---------- FUTURE MILESTONES ---------- */
  milestones: [
    { title: "Pregnancy", date: "2026", completed: true, photo: "", memory: "" },
    { title: "Birth", date: "Coming soon", completed: false, photo: "", memory: "" },
    { title: "First Smile", date: "A memory to come", completed: false, photo: "", memory: "" },
    { title: "First Laugh", date: "A memory to come", completed: false, photo: "", memory: "" },
    { title: "First Tooth", date: "A memory to come", completed: false, photo: "", memory: "" },
    { title: "First Word", date: "A memory to come", completed: false, photo: "", memory: "" },
    { title: "First Steps", date: "A memory to come", completed: false, photo: "", memory: "" },
    { title: "First Birthday", date: "A memory to come", completed: false, photo: "", memory: "" },
    { title: "First Visit to Sri Lanka", date: "One day", completed: false, photo: "", memory: "" },
    { title: "The Day We Finally Met", date: "The page we dream about", completed: false, photo: "", memory: "" }
  ]
};
