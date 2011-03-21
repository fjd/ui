/*global
  jQuery: false,
  window: false
*/

/*jshint
  bitwise: true,
  browser: true,
  eqeqeq: true,
  indent: 2,
  newcap: true,
  nomen: true,
  regexp: true,
  undef: true,
  white: true
*/

(function ($) {
  /* Console */
  var console;
  if (window.console) {
    console = window.console;
  }
  else {
    console = {
      log: function (message) {
        window.alert(message);
      }
    };
  }
  
  var $body = $('body'), $title = $('<h2/>');

  /* Icon */
  var $icons = $('<div/>');
  $.each(['home', 'at', 'quote', 'quoteAlt', 'arrowUp', 'arrowRight', 'arrowBottom', 'arrowLeft', 'arrowUpAlt', 'arrowRightAlt', 'arrowBottomAlt', 'arrowLeftAlt', 'move', 'moveVertical', 'moveHorizontal', 'moveAlt', 'moveVerticalAlt', 'moveHorizontalAlt', 'cursor', 'plus', 'plusAlt', 'minus', 'minusAlt', 'newWindow', 'dial', 'lightbulb', 'link', 'image', 'article', 'readMore', 'headphones', 'equalizer', 'fullscreen', 'exitFullscreen', 'spin', 'spinAlt', 'moon', 'sun', 'mapPin', 'pin', 'eyedropper', 'denied', 'calendar', 'calendarAlt', 'bolt', 'clock', 'document', 'book', 'bookAlt', 'magnifyingGlass', 'tag', 'heart', 'info', 'chat', 'chatAlt', 'key', 'unlocked', 'locked', 'mail', 'mailAlt', 'phone', 'box', 'pencil', 'pencilAlt', 'comment', 'commentAlt', 'rss', 'star', 'trash', 'user', 'volume', 'mute', 'cog', 'cogAlt', 'x', 'xAlt', 'check', 'checkAlt', 'beaker', 'beakerAlt'
  ], function (i, name) {
    if (i !== 0) {
      $icons.append(' ');
    }
    $icons.append($.ninja().icon(name));
  });
  $body.append($title.clone().text('Icon'), $icons);
  
  /* Slider */
  var $slider = $.ninja().slider({
    choices: [{
      html: '0 dB',
      select: function (event) {
        console.log(event.choice.html);
      }
    },
    {
      html: '10 dB',
      select: function (event) {
        console.log(event.choice.html + ': Light leaf rustling, calm breathing');
      }
    },
    {
      html: '20-30 dB',
      select: function (event) {
        console.log(event.choice.html + ': Very calm room');
      }
      
    },
    {
      html: '40-60 dB',
      select: function (event) {
        console.log(event.choice.html + ': Normal conversation at 1 m');
      }
    },
    {
      html: '60 dB',
      select: function (event) {
        console.log(event.choice.html + ': TV set at home level at 1 m');
      }
    },
    {
      html: '60-80 dB',
      select: function (event) {
        console.log(event.choice.html + ': Passenger car at 10 m');
      }
    },
    {
      html: '78 dB',
      select: function (event) {
        console.log(event.choice.html + ': Hearing damage over long-term exposure, need not be continuous');
      }
    },
    {
      html: '80-90 dB',
      select: function (event) {
        console.log(event.choice.html + ': Traffic on a busy roadway at 10 m');
      }
    },
    {
      html: '100 dB',
      select: function (event) {
        console.log(event.choice.html + ': Jack hammer at 1 m');
      }
    },
    {
      html: '120 dB',
      select: function (event) {
        console.log(event.choice.html + ': Hearing damage immediately possible');
      }
    },
    {
      html: '130 dB',
      select: function (event) {
        console.log(event.choice.html + ': Threshold of pain');
      }
    },
    {
      html: '150 dB',
      select: function (event) {
        console.log(event.choice.html + ': Jet engine at 30 m');
      }
    },
    {
      html: '168 dB',
      select: function (event) {
        console.log(event.choice.html + ': M1 Garand rifle being fired at 1 m');
      }
    }],
    slot: 3,
    title: 'Volume'
  }).select(function (event) {
    console.log('Slider returns: ' + event.choice.html);
  });
  $body.append($title.clone().text('Slider'), $slider);

  /* Suggest */
  var $suggest = $.ninja().suggest({
    html: $.ninja().icon('magnifyingGlass'),
    placeholder: 'Ninja UI Search',
    width: '50%'
  }).change(function (event) {
    $.ajax({
      url: 'http://clients1.google.com/complete/search',
      dataType: 'jsonp',
      data: {
        q: event.value,
        ds: '',
        nolabels: 't'
      },
      success: function (data, message) {
        $suggest.update({
          choices: $.map(data[1], function (item) {
            return {
              html: item[0]
            };
          })
        });
      },
      error: function (request, status, error) {
        console.error(error);
        $suggest.update({
          choices: [{
            html: $('<div/>', {
              css: {
                color: 'red'
              },
              text: 'Server error: ' + error
            }),
            spacer: true
          }]
        });
      },
      timeout: 4000
    });  
  }).select(function (event) {
    console.log('Global select function called returning: ' + event.html);
  });
  $body.append($title.clone().text('Suggest'), $suggest);
  
  /* Button */
  var $button = $.ninja().button({
    html: 'Default',
    theme: 'light'
  }),
  $buttonStates = $.ninja().button({
    html: 'Disabled',
    theme: 'light'
  }).deselect(function () {
    console.log('Deselected button.');
  }).enable(function () {
    console.log('Enabled button.');
  }).select(function () {
    console.log('Selected button.');
  }),
  $buttonChangeState = $.ninja().button({
    html: 'Disable/Enable',
    select: true,
    theme: 'light'
  }).toggle(function () {
    $buttonStates.enable();
  }, function () {
    $buttonStates.disable();
  }),
  $buttonIcon = $.ninja().button({
    html: $('<span/>').append($.ninja().icon('home'), ' With Icon'),
    theme: 'light'
  });
  $body.append($title.clone().text('Button'), $button, ' ', $buttonIcon, ' ', $buttonStates, ' ', $buttonChangeState);
  $buttonStates.disable().disable(function () {
    console.log('Disabled button.');
  });
  
  /* Bubble */
  var $bubbleButton;
  var $buttonBubble = $.ninja().button({
    html: 'Button Bubble'
  }).select(function () {
    $bubbleButton = $buttonBubble.bubble();
    $bubbleButton.html($('<div/>', {
      css: {
        whiteSpace: 'nowrap'
      },
      text: 'Button bubble content loaded via ninja().html().'
    }));
  }).deselect(function () {
    $bubbleButton.detach();
  });

  var $bubbleList;
  var $buttonListBubble = $.ninja().button({
    html: 'List Bubble'
  }).select(function () {
    $bubbleList = $buttonListBubble.bubble();
    $bubbleList.html($.ninja().list({
      choices: [{
        html: $('<div/>', {
          text: 'Choose me!'
        }),
        select: function () {
          console.log('Local select function called.');
        }
      },
      {
        html: $('<hr/>'),
        spacer: true
      },
      {
        html: $('<div/>', {
          text: 'No, choose me!'
        })
      }]
    }).select(function (event) {
      console.log('Global select function called returning: ' + $(event.html).text());
      $bubbleList.detach();
    }));
  }).deselect(function () {
    $bubbleList.detach();
  });

  var $bubbleWindow;
  var $buttonWindowBubble = $.ninja().button({
    html: 'Window Bubble'
  }).select(function () {
    $bubbleWindow = $buttonWindowBubble.ninja().bubble({
      html: 'Loading...',
      pop: true,
      window: true
    });
    /* Fake asynchronous delay */
    setTimeout(function () {
      $bubbleWindow.html('Document body bubble content loaded via ninja().html().');
    }, 2000);
  }).deselect(function () {
    $bubbleWindow.detach();
  });
  $body.append($title.clone().text('Bubble'), $buttonBubble, ' ', $buttonListBubble, ' ', $buttonWindowBubble);

  var $rating = $.ninja().rating({
    choices: [{
      html: $('<div/>', {
        text: 'One star.'
      }),
      select: function () {
        console.log('Local select function called.');
      }
    },
    {
      html: $('<div/>', {
        text: 'Two stars.'
      })
    },
    {
      html: $('<div/>', {
        text: 'Three stars.'
      })
    },
    {
      html: $('<div/>', {
        text: 'Four stars.'
      })
    },
    {
      html: $('<div/>', {
        text: 'Five stars.'
      })
    }],
    starsAverage: 3
  }).select(function (event) {
    console.log('Global select function called returning: ' + event.html.text());
  });
  $body.append($title.clone().text('Rating'), $rating);

/*
    $('#drawerDefault').ninja().create('drawer', {
      title: 'Default',
      width: '50%'
    });
    $('#drawerSelected').ninja().create('drawer', {
      isSelected: true,
      title: 'Selected',
      width: '50%'
    });
    $('#drawerToggle').click(function () {
      if ($('#drawerDefault').data().options.isSelected) {
        $('#drawerDefault').ninja().deselect();
      }
      else {
        $('#drawerDefault').ninja().select();
      }
    });
    
    var slider = $('#slider').ninja().create('slider', {
      names: ['0 dB', '10 dB (Light leaf rustling, calm breathing)', '20-30 dB (Very calm room)', '40-60 dB (Normal conversation at 1 m)', '60 dB (TV set at home level at 1 m)', '60-80 dB (Passenger car at 10 m)', '78 dB (Hearing damage over long-term exposure, need not be continuous)', '80-90 dB (Traffic on a busy roadway at 10 m)', '100 dB (Jack hammer at 1 m)', '120 dB (Hearing damage immediately possible)', '130 dB (Threshold of pain)', '150 dB (Jet engine at 30 m)', '168 dB (M1 Garand rifle being fired at 1 m)'],
      onSelect: function () {
        console.log('Ninja ui: Slider changed to value:' + this.value + ', name:' + this.name + '.');
        if ($(this).val() === '168') {
          $('#sliderSelect').unbind('click').click(function (event) {
            event.preventDefault();
          }).css({ color: 'black', cursor: 'default', textDecoration: 'none' });
        }
        else {
          $('#sliderSelect').unbind('click').click(function () {
            slider.ninja().select({ value: '168' });
          }).css({ color: 'blue', cursor: 'pointer', textDecoration: 'underline' });
        }
      },
      title: 'Volume',
      value: '40-60',
      values: ['0', '10-10', '20-30', '40-60', '60', '60-80', '78', '80-90', '100', '120', '130', '150', '168'],
      width: 400
    });

    $('#sliderSelect').click(function () {
      slider.ninja().select({ value: '168' });
    }).css({ color: 'blue' });
    
    $('#disableSlider').toggle(function () {
      slider.ninja().disable({
        message: 'Click Wait/Resume link again to resume.'
      });
    }, function () {
      slider.ninja().enable();
    });
    
    $('#disableMenu').toggle(function () {
      menu.ninja().disable({
        message: 'Click Wait/Resume link again to resume.'
      });
    }, function () {
      menu.ninja().enable();
    });
    
*/
}(jQuery));