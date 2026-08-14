/*
  Website behaviour lives here.
  You normally do NOT need to edit this file.
  Change names, memories and media paths in EDIT-HERE.js instead.
*/

(function () {
  "use strict";

  const story = window.BABY_STORY;

  if (!story) {
    document.body.innerHTML =
      '<main style="padding:40px;font-family:Arial"><h1>EDIT-HERE.js could not be loaded.</h1><p>Keep EDIT-HERE.js in the same folder as index.html.</p></main>';
    return;
  }

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

  function setText(selector, value) {
    const element = $(selector);
    if (element) element.textContent = value == null ? "" : String(value);
  }

  function safeGet(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (_error) {
      return fallback;
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_error) {
      // The website still works when private browsing blocks local storage.
    }
  }

  function createPlaceholder(label, tone = "blue") {
    const placeholder = document.createElement("div");
    placeholder.className = `photo-placeholder tone-${tone}`;

    const star = document.createElement("span");
    star.setAttribute("aria-hidden", "true");
    star.textContent = "✦";

    const text = document.createElement("small");
    text.textContent = label;

    placeholder.append(star, text);
    return placeholder;
  }

  function createImage(path, alt, options = {}) {
    if (!path) return createPlaceholder(options.placeholder || "Add your photograph", options.tone);

    const image = document.createElement("img");
    image.src = path;
    image.alt = alt;
    image.loading = options.eager ? "eager" : "lazy";
    image.decoding = "async";
    image.className = "story-image";
    image.addEventListener("error", () => {
      image.replaceWith(createPlaceholder(`Photo not found: ${path}`, options.tone));
    });
    return image;
  }

  function createVideo(path, label) {
    if (!path) return null;

    const wrap = document.createElement("div");
    wrap.className = "video-wrap";

    const video = document.createElement("video");
    video.controls = true;
    video.preload = "metadata";
    video.playsInline = true;
    video.setAttribute("aria-label", label);

    const source = document.createElement("source");
    source.src = path;
    source.type = path.toLowerCase().endsWith(".webm") ? "video/webm" : "video/mp4";
    source.addEventListener("error", () => {
      const message = document.createElement("p");
      message.className = "video-error";
      message.textContent = `Video could not be loaded. Check this path: ${path}`;
      wrap.replaceChildren(message);
    });
    video.append(source);
    wrap.append(video);
    return wrap;
  }

  function replaceChildren(selector, ...children) {
    const container = typeof selector === "string" ? $(selector) : selector;
    if (container) container.replaceChildren(...children.filter(Boolean));
  }

  /* ------------------------------------------------------------------
     BASIC CONTENT
  ------------------------------------------------------------------ */
  document.title = `${story.openingTitleFirstLine} ${story.openingTitleSecondLine}`;
  setText("#openingTitleFirst", story.openingTitleFirstLine);
  setText("#openingTitleSecond", story.openingTitleSecondLine);
  setText("#openingMessage", story.openingMessage);
  setText("#heroBabyName", story.babyDisplayName);
  setText("#comingSoonText", story.comingSoonText);
  setText("#familyCountry", story.familyCountry);
  setText("#sisterCountry", story.sisterCountry);
  setText("#foundOutStory", story.foundOutStory);
  setText("#foundOutQuote", `“${story.foundOutQuote}”`);
  setText("#distanceStory", story.distanceStory);
  setText("#distanceQuote", `“${story.distanceQuote}”`);

  if (story.heroImage) {
    $("#home").style.setProperty("--hero-image", `url("${story.heroImage}")`);
  }

  replaceChildren(
    "#firstUltrasoundMedia",
    createImage(story.firstUltrasoundPhoto, "First ultrasound", {
      placeholder: "Add the first ultrasound",
      eager: true
    })
  );
  replaceChildren(
    "#firstFamilyMessageMedia",
    createImage(story.firstFamilyMessagePhoto, "Family pregnancy message", {
      placeholder: "Add the family message",
      tone: "cream"
    })
  );
  replaceChildren(
    "#videoCallMedia",
    createImage(story.videoCallPhoto, "Family video call", {
      placeholder: "Add a video-call screenshot",
      tone: "mist"
    })
  );
  replaceChildren(
    "#pregnancyUpdateMedia",
    createImage(story.pregnancyUpdatePhoto, "Pregnancy update from abroad", {
      placeholder: "Add a pregnancy update",
      tone: "cream"
    })
  );

  /* ------------------------------------------------------------------
     NAVIGATION, PROGRESS AND REVEAL ANIMATIONS
  ------------------------------------------------------------------ */
  const navLinks = $("#navLinks");
  const menuToggle = $("#menuToggle");

  $$('[data-go]').forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.go);
      if (target) target.scrollIntoView({ behavior: "smooth" });
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  function updateProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    $("#readingProgress").style.width = `${percentage}%`;
    $("#siteHeader").classList.toggle("scrolled", window.scrollY > 80);
  }

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    $$(".reveal").forEach((element) => observer.observe(element));
  } else {
    $$(".reveal").forEach((element) => element.classList.add("visible"));
  }

  /* ------------------------------------------------------------------
   BACKGROUND MUSIC AND OTHER MEDIA
------------------------------------------------------------------ */

const songButton = $("#songButton");
const familySong = $("#familySong");

let backgroundMusicWanted = false;
let resumeBackgroundAfterMedia = false;

if (story.familySong) {
  familySong.src = story.familySong;

  /* Play continuously */
  familySong.loop = true;

  /* Keep it soft behind the story */
  familySong.volume = 0.35;
}

function updateSongButton() {
  if (!story.familySong) {
    songButton.textContent =
      "♫ Add the song path in EDIT-HERE.js";

    return;
  }

  songButton.textContent = familySong.paused
    ? "♫ Play our song"
    : "Ⅱ Pause our song";
}

async function playBackgroundMusic() {
  if (!story.familySong) {
    updateSongButton();
    return;
  }

  try {
    await familySong.play();
    backgroundMusicWanted = true;
    updateSongButton();
  } catch (error) {
    songButton.textContent =
      "Song could not be played";
  }
}

function pauseBackgroundMusic() {
  backgroundMusicWanted = false;
  resumeBackgroundAfterMedia = false;
  familySong.pause();
  updateSongButton();
}

songButton.addEventListener("click", function () {
  if (!story.familySong) {
    updateSongButton();
    return;
  }

  if (familySong.paused) {
    playBackgroundMusic();
  } else {
    pauseBackgroundMusic();
  }
});

/*
  When another audio or video starts:

  1. Pause the background music.
  2. Pause any other audio or video.
  3. Remember whether the background music should return.
*/

document.addEventListener(
  "play",
  function (event) {
    const selectedMedia = event.target;

    if (
      !(selectedMedia instanceof HTMLMediaElement) ||
      selectedMedia === familySong
    ) {
      return;
    }

    resumeBackgroundAfterMedia =
      backgroundMusicWanted;

    if (!familySong.paused) {
      familySong.pause();
    }

    $$("audio, video").forEach(function (otherMedia) {
      if (
        otherMedia !== selectedMedia &&
        otherMedia !== familySong &&
        !otherMedia.paused
      ) {
        otherMedia.pause();
      }
    });

    updateSongButton();
  },
  true
);

/*
  Restart the background song after the other audio
  or video is paused or finishes.
*/

function resumeBackgroundIfReady() {
  window.setTimeout(async function () {
    const anotherMediaIsPlaying =
      $$("audio, video").some(function (media) {
        return (
          media !== familySong &&
          !media.paused &&
          !media.ended
        );
      });

    if (
      resumeBackgroundAfterMedia &&
      backgroundMusicWanted &&
      !anotherMediaIsPlaying
    ) {
      resumeBackgroundAfterMedia = false;

      try {
        await familySong.play();
      } catch (error) {
        songButton.textContent =
          "Press to continue our song";
      }
    }

    updateSongButton();
  }, 150);
}

document.addEventListener(
  "pause",
  function (event) {
    if (
      event.target instanceof HTMLMediaElement &&
      event.target !== familySong
    ) {
      resumeBackgroundIfReady();
    }
  },
  true
);

document.addEventListener(
  "ended",
  function (event) {
    if (
      event.target instanceof HTMLMediaElement &&
      event.target !== familySong
    ) {
      resumeBackgroundIfReady();
    }
  },
  true
);

familySong.addEventListener("error", function () {
  songButton.textContent =
    "Music file not found";
});

updateSongButton();

  /* ------------------------------------------------------------------
     PREGNANCY TIMELINE
  ------------------------------------------------------------------ */
  let selectedMonth = 1;
  function createMonthGallery(month) {
    const gallery = document.createElement("div");
    gallery.className = "month-photo-grid";

    let photos = [];

    if (Array.isArray(month.photos)) {
      photos = month.photos;
    } else if (Array.isArray(month.photo)) {
      photos = month.photo;
    } else if (month.photo) {
      photos = [month.photo];
    }

    photos = photos.filter(Boolean);

    if (photos.length === 0) {
      gallery.append(
        createPlaceholder(
          `Add photographs for ${month.label.toLowerCase()}`,
          "blue"
        )
      );
      return gallery;
    }

    photos.forEach((photoPath, photoIndex) => {
      gallery.append(
        createImage(
          photoPath,
          `${month.label} pregnancy photograph ${photoIndex + 1}`,
          { placeholder: `Photograph ${photoIndex + 1} not found` }
        )
      );
    });

    return gallery;
  }

  function showMonth(index) {
    const month = story.pregnancyMonths[index];
    if (!month) return;

    selectedMonth = index;
    $$(".month-tab", $("#monthTabs")).forEach((button, buttonIndex) => {
      const active = buttonIndex === index;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    });

    setText("#monthLabel", month.label);
    setText("#monthTitle", month.title);
    setText("#monthBaby", month.baby);
    setText("#monthMemory", month.memory);
    setText("#monthNote", month.note);

    replaceChildren("#monthMedia", createMonthGallery(month));
    replaceChildren("#monthVideo", createVideo(month.video, `${month.label} video`));
  }

  story.pregnancyMonths.forEach((month, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "month-tab";
    button.setAttribute("role", "tab");
    button.setAttribute("aria-label", month.label);

    const number = document.createElement("span");
    number.textContent = month.number;
    const label = document.createElement("small");
    label.textContent = index === story.pregnancyMonths.length - 1 ? "Hello" : `Month ${index + 1}`;
    button.append(number, label);
    button.addEventListener("click", () => showMonth(index));
    button.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = (selectedMonth + direction + story.pregnancyMonths.length) % story.pregnancyMonths.length;
      showMonth(next);
      $$(".month-tab", $("#monthTabs"))[next].focus();
    });
    $("#monthTabs").append(button);
  });
  showMonth(Math.min(selectedMonth, story.pregnancyMonths.length - 1));

  /* ------------------------------------------------------------------
     MY ONE SPECIAL LETTER
  ------------------------------------------------------------------ */
  const myLetter = story.myLetter || {};
  setText("#myLetterKicker", myLetter.kicker);
  setText("#myLetterTitle", myLetter.title);
  setText("#myLetterIntroduction", myLetter.introduction);
  setText("#myLetterSalutation", myLetter.salutation);
  setText("#myLetterMessage", myLetter.message);
  setText("#myLetterClosing", myLetter.closing);
  setText("#myLetterFrom", myLetter.from);
  setText("#myLetterRelationship", myLetter.relationship);

  if (myLetter.photo) {
    replaceChildren(
      "#myLetterPhoto",
      createImage(myLetter.photo, "Photograph attached to my special letter")
    );
  }

  /* ------------------------------------------------------------------
     PREDICTIONS
  ------------------------------------------------------------------ */
  const savedPredictions = safeGet("baby-story-predictions", {});

  story.predictionQuestions.forEach((item, index) => {
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    const number = document.createElement("span");
    number.textContent = String(index + 1).padStart(2, "0");
    legend.append(number, document.createTextNode(item.question));

    const options = document.createElement("div");
    options.className = "prediction-options";

    item.options.forEach((option) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `prediction-${index}`;
      input.value = option;
      input.checked = savedPredictions[index] === option;

      const text = document.createElement("span");
      text.textContent = option;
      label.append(input, text);
      options.append(label);
    });

    fieldset.append(legend, options);
    $("#predictionQuestions").append(fieldset);
  });

  $("#predictionForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const answers = {};
    story.predictionQuestions.forEach((_item, index) => {
      const selected = $(`input[name="prediction-${index}"]:checked`);
      if (selected) answers[index] = selected.value;
    });
    safeSet("baby-story-predictions", answers);
    const button = $("#savePredictions");
    button.textContent = "Saved for later ✓";
    window.setTimeout(() => (button.textContent = "Seal our predictions"), 2600);
  });

  /* ------------------------------------------------------------------
     NAME REVEAL
  ------------------------------------------------------------------ */
  setText("#fullName", story.babyFullName);
  setText("#nickname", story.babyNickname);
  setText("#nameMeaning", story.nameMeaning);

  $("#revealName").addEventListener("click", () => {
    $("#nameHidden").hidden = true;
    $("#nameShown").hidden = false;
    $("#nameCard").classList.add("revealed");
  });

  $("#hideName").addEventListener("click", () => {
    $("#nameHidden").hidden = false;
    $("#nameShown").hidden = true;
    $("#nameCard").classList.remove("revealed");
  });

  /* ------------------------------------------------------------------
     BIRTH CHAPTER
  ------------------------------------------------------------------ */
  let birthPreviewOpen = story.babyHasArrived || safeGet("baby-story-birth-preview", false);

  function updateBirthView() {
    $("#birthLocked").hidden = birthPreviewOpen;
    $("#birthUnlocked").hidden = !birthPreviewOpen;
  }

  function toggleBirthPreview() {
    birthPreviewOpen = !birthPreviewOpen;
    safeSet("baby-story-birth-preview", birthPreviewOpen);
    updateBirthView();
  }

  $("#unlockBirth").addEventListener("click", toggleBirthPreview);

  setText("#birthBabyName", story.babyFullName);
  setText("#birthStory", story.birth.story);
  setText("#birthDate", story.birth.dateAndTime);
  setText("#birthWeight", story.birth.weight);
  setText("#birthLength", story.birth.length);
  setText("#birthHospital", story.birth.hospital);
  replaceChildren(
    "#firstBabyPhoto",
    createImage(story.birth.firstPhoto, "Baby's first photograph", {
      placeholder: "Add his first photograph",
      tone: "sky"
    })
  );
  replaceChildren("#birthVideo", createVideo(story.birth.firstVideo, "Baby's first video"));
  updateBirthView();

  /* ------------------------------------------------------------------
     GALLERY AND LIGHTBOX
  ------------------------------------------------------------------ */
  const galleryTones = ["blue", "cream", "sky", "beige", "mist", "gold"];

  function openPhotoModal(item, index) {
    replaceChildren(
      "#lightboxMedia",
      createImage(item.photo, item.caption, {
        placeholder: "Your photograph will fill this frame",
        tone: galleryTones[index % galleryTones.length]
      })
    );
    setText("#lightboxCaption", item.date ? `${item.caption} · ${item.date}` : item.caption);
    openModal($("#photoModal"));
  }

  story.gallery.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `gallery-polaroid gallery-${index + 1}`;
    button.setAttribute("aria-label", `Open memory: ${item.caption}`);

    const media = createImage(item.photo, item.caption, {
      placeholder: "Add photo",
      tone: galleryTones[index % galleryTones.length]
    });
    const caption = document.createElement("span");
    caption.textContent = item.caption;
    const hint = document.createElement("small");
    hint.textContent = "view memory";

    button.append(media, caption, hint);
    button.addEventListener("click", () => openPhotoModal(item, index));
    $("#gallery").append(button);
  });

  /* ------------------------------------------------------------------
     FAMILY VOICES
  ------------------------------------------------------------------ */
  story.voices.forEach((voice) => {
    const row = document.createElement("article");
    row.className = "voice-row";

    const avatar = document.createElement("span");
    avatar.className = "voice-avatar";
    avatar.textContent = voice.initials;

    const details = document.createElement("div");
    const name = document.createElement("h3");
    name.textContent = voice.name;
    const relationship = document.createElement("p");
    relationship.textContent = voice.relationship;
    details.append(name, relationship);

    if (voice.audio) {
      const audio = document.createElement("audio");
      audio.controls = true;
      audio.preload = "none";
      audio.src = voice.audio;
      audio.setAttribute("aria-label", `Audio message from ${voice.name}`);
      row.append(avatar, details, audio);
    } else {
      const missing = document.createElement("button");
      missing.type = "button";
      missing.innerHTML = "<span>▶</span> Listen";
      missing.addEventListener("click", () => {
        missing.textContent = "Add MP3 in EDIT-HERE.js";
      });
      row.append(avatar, details, missing);
    }
    $("#voiceList").append(row);
  });

  /* ------------------------------------------------------------------
     FIRST HELLO
  ------------------------------------------------------------------ */
  setText("#firstHelloDate", story.firstHello.date);
  setText("#firstHelloMemory", story.firstHello.memory);
  replaceChildren(
    "#firstHelloMedia",
    createImage(story.firstHello.photo, "Our first video-call hello", {
      placeholder: "Add our first video-call screenshot",
      tone: "mist"
    })
  );
  replaceChildren("#firstHelloVideo", createVideo(story.firstHello.video, "Our first hello video"));

  /* ------------------------------------------------------------------
     SURPRISE FOR MAMA
  ------------------------------------------------------------------ */
  setText("#surpriseFinalMessage", story.surpriseFinalMessage);

  if (story.surpriseVideo) {
    replaceChildren("#surpriseVideo", createVideo(story.surpriseVideo, "Family surprise for Mama"));
  } else {
    const note = document.createElement("div");
    note.className = "montage-play";
    note.textContent = "▶ Add family montage video in EDIT-HERE.js";
    replaceChildren("#surpriseVideo", note);
  }

  $("#openSurprise").addEventListener("click", () => openModal($("#surpriseModal")));

  /* ------------------------------------------------------------------
     MILESTONES
  ------------------------------------------------------------------ */
  const savedMilestones = safeGet("baby-story-milestones", []);

  function renderMilestones() {
    $("#milestoneTimeline").replaceChildren();

    story.milestones.forEach((milestone, index) => {
      const unlocked = milestone.completed || savedMilestones.includes(index);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `milestone${unlocked ? " unlocked" : ""}${index === story.milestones.length - 1 ? " final-milestone" : ""}`;
      button.setAttribute("aria-pressed", String(unlocked));

      const number = document.createElement("span");
      number.className = "milestone-index";
      number.textContent = String(index + 1).padStart(2, "0");
      const dot = document.createElement("span");
      dot.className = "milestone-dot";
      dot.textContent = unlocked ? "✓" : "";

      const details = document.createElement("span");
      const title = document.createElement("strong");
      title.textContent = milestone.title;
      const date = document.createElement("small");
      date.textContent = unlocked && !milestone.completed ? "Memory ready to add" : milestone.date;
      details.append(title, date);

      const status = document.createElement("em");
      status.textContent = unlocked ? "open" : "locked";
      button.append(number, dot, details, status);

      if (!milestone.completed) {
        button.addEventListener("click", () => {
          const savedIndex = savedMilestones.indexOf(index);
          if (savedIndex >= 0) savedMilestones.splice(savedIndex, 1);
          else savedMilestones.push(index);
          safeSet("baby-story-milestones", savedMilestones);
          renderMilestones();
        });
      }
      $("#milestoneTimeline").append(button);
    });
  }
  renderMilestones();

  /* ------------------------------------------------------------------
     MODALS
  ------------------------------------------------------------------ */
  let previouslyFocused = null;

  function openModal(modal) {
    previouslyFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    $(".modal-close", modal).focus();
  }

  function closeModal(modal) {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    $$('video', modal).forEach((video) => video.pause());
    if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
  }

  $$("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", () => closeModal(button.closest(".modal")));
  });

  $$(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal(modal);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const openModalElement = $$(".modal").find((modal) => !modal.hidden);
    if (openModalElement) closeModal(openModalElement);
  });
 /* ======================================================
   ELEGANT GOLDEN WEBSITE SPARKLES
====================================================== */

const sparkleLayer = document.createElement("div");

sparkleLayer.className = "sparkle-layer";
sparkleLayer.setAttribute("aria-hidden", "true");

const numberOfSparkles = window.matchMedia("(max-width: 580px)").matches ? 38 : 72;

const sparkleShapes = [
  "✦",
  "✧",
  "⋆",
  "✦",
  "·"
];

for (let index = 0; index < numberOfSparkles; index += 1) {
  const sparkle = document.createElement("span");

  sparkle.className = "floating-sparkle";

  sparkle.textContent =
    sparkleShapes[index % sparkleShapes.length];

  sparkle.style.setProperty(
    "--sparkle-x",
    `${Math.random() * 100}%`
  );

  sparkle.style.setProperty(
    "--sparkle-y",
    `${Math.random() * 100}%`
  );

  sparkle.style.setProperty(
    "--sparkle-size",
    `${5 + Math.random() * 11}px`
  );

  sparkle.style.setProperty(
    "--sparkle-speed",
    `${4.5 + Math.random() * 6}s`
  );

  sparkle.style.setProperty(
    "--sparkle-delay",
    `${-Math.random() * 10}s`
  );

  sparkleLayer.appendChild(sparkle);
}

document.body.appendChild(sparkleLayer);

/* Golden sparkle burst when clicking */

document.addEventListener("pointerdown", function (event) {
  const burstAmount = window.matchMedia("(max-width: 580px)").matches ? 6 : 9;

  for (let index = 0; index < burstAmount; index += 1) {
    const sparkle = document.createElement("span");

    sparkle.className = "click-sparkle";

    sparkle.textContent =
      index % 3 === 0 ? "✧" : "✦";

    sparkle.style.setProperty(
      "--click-x",
      `${event.clientX}px`
    );

    sparkle.style.setProperty(
      "--click-y",
      `${event.clientY}px`
    );

    sparkle.style.setProperty(
      "--click-size",
      `${7 + Math.random() * 12}px`
    );

    sparkle.style.setProperty(
      "--move-x",
      `${(Math.random() - 0.5) * 150}px`
    );

    sparkle.style.setProperty(
      "--move-y",
      `${(Math.random() - 0.6) * 150}px`
    );

    document.body.appendChild(sparkle);

    setTimeout(function () {
      sparkle.remove();
    }, 1050);
  }
});
})();
