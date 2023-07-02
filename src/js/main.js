import '../scss/styles.scss';

const rewardBtn = $('.reward-btn');
const success = $('.success-container');
const nav = $('#nav');
const overlay = $('.overlay');
const okBtn = $('.ok-btn');
const body = $('body');
const hamburgerBtn = $('.hamburger-btn');
const menu = $('.menu');
const closeBtn = $('.close-btn');
const bookmark = $('.bookmark');
const choiceRadio = $('.choice-radio');
const cardBp = $('.card-bp');

hamburgerBtn.on('click', () => {
  hamburgerBtn.css('display', 'none');
  closeBtn.css('display', 'flex');
  menu.css('display', 'inline');
  overlay.addClass('active');
  body.css('overflow', 'hidden');
});

closeBtn.on('click', () => {
  hamburgerBtn.css('display', 'flex');
  closeBtn.css('display', 'none');
  menu.css('display', 'none');
  overlay.removeClass('active');
  body.css('overflow', 'visible');
});

bookmark.on('click', () => {
  const bookmarkTxt = $('#bookmark-txt');

  if (bookmark.hasClass('active')) {
    bookmark.removeClass('active');
    bookmarkTxt.text(bookmarkTxt.text().replace('Bookmarked', 'Bookmark'));
  } else {
    bookmark.addClass('active');
    bookmarkTxt.text(bookmarkTxt.text().replace('Bookmark', 'Bookmarked'));
  }
});

$(window).on('resize', function () {
  let windowWidth = $(window).width();

  if (windowWidth > 900) {
    // Disable or hide the overlay here
    hamburgerBtn.hide();
    /* overlay.hide(); */
    menu.show();
    closeBtn.hide();
  } else {
    hamburgerBtn.show();
    menu.hide();
  }
});

/* BACK PROJECT SECTION */
class BPSection {
  constructor() {
    this.backProject = $('.back-project-section');
    this.btnSupport = $('.btn-support');
    this.btnClose = this.backProject.find('.close');
    this.btnContinue = this.backProject.find('.continue-btn');

    this.btnSupport.on('click', this.handleSupportButtonClick.bind(this));
    this.btnClose.on('click', this.handleCloseButtonClick.bind(this));
    choiceRadio.on('click', this.checkBoxes.bind(this));
    this.btnContinue.on('click', this.handleContinueButtonClick.bind(this));

    this.checkNumber();
  }

  showBPSection() {
    this.backProject.addClass('active');
  }

  hideBPSection() {
    this.backProject.removeClass('active');
  }

  handleScrollBP(distanceToTop) {
    let isScrolling = true;

    const handleScroll = () => {
      if (isScrolling) {
        isScrolling = false;

        const delay = this.calculateDelay(distanceToTop);
        setTimeout(() => {
          overlay.addClass('active');
        }, delay);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Check if the user is already at the top of the page
    if (window.scrollY === 0) {
      handleScroll();
    }
  }

  checkNumber() {
    $(document).on('input', '#card-bp-input', function () {
      let inputValue = $(this).val();
      let numericValue = inputValue.replace(/\D/g, '');
      $(this).val(numericValue);
    });
  }

  calculateDelay(distance) {
    const baseDelay = 50;
    const pixelsPerMillisecond = 5;

    // Calculate the delay by dividing the distance by pixelsPerMillisecond
    const delay = Math.max(baseDelay, distance / pixelsPerMillisecond);

    return delay;
  }

  checkBoxes() {
    // Remove active class from all cards
    cardBp.removeClass('active');

    // Clear input value when radio selection changes
    choiceRadio.on('change', function () {
      $(this).closest('.card-bp').find('input[type="text"]').val('');
    });

    // Iterate through each radio button
    choiceRadio.each(function () {
      const currentCardBP = $(this).closest('.card-bp');

      if ($(this).prop('checked')) {
        currentCardBP.addClass('active');
      }
    });
  }

  handleSupportButtonClick(e) {
    const buttonOffsetTop = e.currentTarget.offsetTop;
    const distanceToTop = buttonOffsetTop - window.scrollY;

    this.showBPSection();
    nav.get(0).scrollIntoView({ behavior: 'smooth' });

    this.handleScrollBP(distanceToTop);
  }

  handleCloseButtonClick() {
    this.hideBPSection();
    overlay.removeClass('active');
  }

  handleContinueButtonClick(e) {
    this.hideBPSection();

    const buttonOffsetTop = e.currentTarget.offsetTop;
    const distanceToTop = buttonOffsetTop - window.scrollY;

    success.css('display', 'flex');
    nav.get(0).scrollIntoView({ behavior: 'smooth' });

    this.handleScrollBP(distanceToTop);
  }
}

const bpSection = new BPSection();

/* SELECT REWARD SECTION */
rewardBtn.on('click', (event) => {
  const buttonOffsetTop = event.currentTarget.offsetTop;
  const distanceToTop = buttonOffsetTop - window.scrollY;

  success.css('display', 'flex');
  nav.get(0).scrollIntoView({ behavior: 'smooth' });

  handleScroll(distanceToTop);
});

okBtn.on('click', () => {
  success.css('display', 'none');
  overlay.removeClass('active');
  body.css('overflow', 'visible');

  cardBp.removeClass('active');

  clearRadioSelection();
});

function handleScroll(distance) {
  let isScrolling = true;

  window.addEventListener('scroll', () => {
    if (isScrolling) {
      isScrolling = false;

      const delay = calculateDelay(distance);
      setTimeout(() => {
        overlay.addClass('active');
        body.css('overflow', 'hidden');
      }, delay);
    }
  });

  function calculateDelay(distance) {
    const baseDelay = 400;
    const pixelsPerMillisecond = 0.4;

    // Calculate the delay by dividing the distance by pixelsPerMillisecond
    const delay = Math.max(baseDelay, distance / pixelsPerMillisecond);

    return delay;
  }
}

$(document).ready(function () {
  // Clear the stored radio selection and remove 'checked' attribute from all radio buttons on page load
  clearRadioSelection();
});

function clearRadioSelection() {
  // Remove the 'checked' attribute from all radio buttons
  choiceRadio.prop('checked', false);
}
