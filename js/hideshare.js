/*! hideshare - v0.1.0 - 2013-09-11
* https://github.com/arnonate/jQuery-FASS-Widget
* Copyright (c) 2013 Nate Arnold; Licensed MIT */
/* ========================================================================
 * HIDESHARE v1.0.0
 * https://github.com/arnonate/hideshare
 * ========================================================================

  Copyright (c) 2013 Nate Arnold

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation
  files (the "Software"), to deal in the Software without
  restriction, including without limitation the rights to use,
  copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following
  conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
 */

/*global jQuery:false, window:false, document:false */

;(function(window, $) {

  "use strict";

  // HIDESHARE PUBLIC CLASS DEFINITION
  // =================================

  var Hideshare = function (elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
  };

  Hideshare.prototype = {
    defaults: {
      link: document.URL,
      title: document.title,
      description: '',
      media: null,
      facebook: true,
      twitter: true,
      pinterest: true,
      googleplus: true,
      linkedin: true,
      position: "bottom",
      speed: 100
    },

    init: function() {
      this.config = $.extend({}, this.defaults, this.options);
      this.wrapHideshare();
      return this;
    },

    wrapHideshare: function() {
      var output = output,
          width = this.$elem.outerWidth(),
          height = this.$elem.outerHeight(),
          liWidth = 0,
          placement = this.config.position,
          transition = this.config.speed,
          shareTitle = this.config.title,
          shareLink = this.config.link,
          shareMedia = this.config.media,
          shareDescription = this.config.description,
          facebookTemplate = '<li><a class="hideshare-facebook" href="#"><i class="fa fa-facebook-square fa-2x"></i><span>Facebook</span></a></li>',
          twitterTemplate = '<li><a class="hideshare-twitter" href="#"><i class="fa fa-twitter-square fa-2x"></i><span>Twitter</span></a></li>',
          pinterestTemplate = '<li><a class="hideshare-pinterest" href="#" data-pin-do="buttonPin" data-pin-config="above"><i class="fa fa-pinterest-square fa-2x"></i><span>Pinterest</span></a></li>',
          googleplusTemplate = '<li><a class="hideshare-google-plus" href="#"><i class="fa fa-google-plus-square fa-2x"></i><span>Google Plus</span></a></li>',
          linkedinTemplate = '<li><a class="hideshare-linkedin" href="#"><i class="fa fa-linkedin-square fa-2x"></i><span>Linked In</span></a></li>';

      if (this.config.facebook) {
        output = facebookTemplate;
        liWidth += 40;
      } else {
        output = "";
        liWidth = liWidth;
      }
      if (this.config.twitter) {
        output += twitterTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.pinterest) {
        output += pinterestTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.googleplus) {
        output += googleplusTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.linkedin) {
        output += linkedinTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (liWidth < width) {
        liWidth = width;
      }

      // Construct sharing list
      var hideshareList = '<ul class="hideshare-list" style="display: none; width: ' + liWidth + 'px' + '">' + output + '</ul>';

      // Wrap button
      this.$elem.addClass("hideshare-btn").wrap("<div class='hideshare-wrap' style='width:" + width + "px; height:" + height + "px;' />");

      // Insert sharing button list
      $(hideshareList).insertAfter(this.$elem);

      // Get placement of share buttons
      var getPlacement = function(placement, width, height, speed) {

        var styles = {};

        if (placement === "right") {
          styles = {
            "left"    : width + 10 + "px",
            "right"   : -(width + 10) + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "left") {
          styles = {
            "left"    : -(width + 10) + "px",
            "right"   : width + 10 + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "top") {
          styles = {
            "top"     : -(height + 10) + "px",
            "bottom"  : height + 10 + "px",
            "opacity" : "toggle"
          };
        } else /* placement === "bottom" */ {
          styles = {
            "top"     : height + 10 + "px",
            "bottom"  : -(height + 10) + "px",
            "left"    : "0px",
            "opacity" : "toggle"
          };
        }

        $(".hideshare-list").animate(styles, speed).addClass("shown");
      };

      // Return to original position
      var returnPlacement = function(speed) {
        var styles = {
          "top"     : "0px",
          "left"    : "0px",
          "opacity" : "toggle"
        };

        $(".hideshare-list").animate(styles, speed).removeClass("shown");
      };

      // Toggle sharing on button click
      this.$elem.click(function() {
        var list = $(".hideshare-list");
        if (list.hasClass("shown")){
          returnPlacement(transition);
        } else {
          getPlacement(placement, width, height, transition);
        }
        return false;
      });


      // SHARING FUNCTIONS
      var shareFacebook = function() {
        window.open('//www.facebook.com/share.php?m2w&s=100&p[url]=' + encodeURIComponent(shareLink) + '&p[images][0]=' + encodeURIComponent(shareMedia) + '&p[title]=' + encodeURIComponent(shareTitle) + '&p[summary]=' + encodeURIComponent(shareDescription),'Facebook','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareTwitter = function() {
        window.open('https://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(shareLink) + '&text=' + encodeURIComponent(shareTitle) + '%20' + encodeURIComponent(shareLink),'Twitter','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var sharePinterest = function() {
        window.open('//pinterest.com/pin/create/button/?url=' + encodeURIComponent(shareLink) + '&media=' + encodeURIComponent(shareMedia) + '&description=' + encodeURIComponent(shareTitle),'Pinterest','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareGooglePlus = function() {
        window.open('//plus.google.com/share?url=' + encodeURIComponent(shareLink),'GooglePlus','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareLinkedIn = function() {
        window.open('//www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(shareLink) + '&title=' + encodeURIComponent(shareTitle) + '&source=' + encodeURIComponent(shareLink),'LinkedIn','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };

      $(".hideshare-facebook").click(function() {
        shareFacebook();
        return false;
      });

      $(".hideshare-twitter").click(function() {
        shareTwitter();
        return false;
      });

      $(".hideshare-pinterest").click(function() {
        sharePinterest();
        return false;
      });

      $(".hideshare-google-plus").click(function() {
        shareGooglePlus();
        return false;
      });

      $(".hideshare-linkedin").click(function() {
        shareLinkedIn();
        return false;
      });

    }
  };

  Hideshare.defaults = Hideshare.prototype.defaults;

  $.fn.hideshare = function(options) {
    return this.each(function() {
      new Hideshare(this, options).init();
    });
  };

  window.Hideshare = Hideshare;

})(window, jQuery);

;(function(window, $) {

  "use strict";

  // hidesharee PUBLIC CLASS DEFINITION
  // =================================

  var hidesharee = function (elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
  };

  hidesharee.prototype = {
    defaults: {
      link: document.URL,
      title: document.title,
      description: '',
      media: null,
      facebook: true,
      twitter: true,
      pinterest: true,
      googleplus: true,
      linkedin: true,
      position: "bottom",
      speed: 100
    },

    init: function() {
      this.config = $.extend({}, this.defaults, this.options);
      this.wraphidesharee();
      return this;
    },

    wraphidesharee: function() {
      var output = output,
          width = this.$elem.outerWidth(),
          height = this.$elem.outerHeight(),
          liWidth = 0,
          placement = this.config.position,
          transition = this.config.speed,
          shareTitle = this.config.title,
          shareLink = this.config.link,
          shareMedia = this.config.media,
          shareDescription = this.config.description,
          facebookTemplate = '<li><a class="hidesharee-facebook" href="#"><i class="fa fa-facebook-square fa-2x"></i><span>Facebook</span></a></li>',
          twitterTemplate = '<li><a class="hidesharee-twitter" href="#"><i class="fa fa-twitter-square fa-2x"></i><span>Twitter</span></a></li>',
          pinterestTemplate = '<li><a class="hidesharee-pinterest" href="#" data-pin-do="buttonPin" data-pin-config="above"><i class="fa fa-pinterest-square fa-2x"></i><span>Pinterest</span></a></li>',
          googleplusTemplate = '<li><a class="hidesharee-google-plus" href="#"><i class="fa fa-google-plus-square fa-2x"></i><span>Google Plus</span></a></li>',
          linkedinTemplate = '<li><a class="hidesharee-linkedin" href="#"><i class="fa fa-linkedin-square fa-2x"></i><span>Linked In</span></a></li>';

      if (this.config.facebook) {
        output = facebookTemplate;
        liWidth += 40;
      } else {
        output = "";
        liWidth = liWidth;
      }
      if (this.config.twitter) {
        output += twitterTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.pinterest) {
        output += pinterestTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.googleplus) {
        output += googleplusTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.linkedin) {
        output += linkedinTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (liWidth < width) {
        liWidth = width;
      }

      // Construct sharing list
      var hideshareeList = '<ul class="hidesharee-list" style="display: none; width: ' + liWidth + 'px' + '">' + output + '</ul>';

      // Wrap button
      this.$elem.addClass("hidesharee-btn").wrap("<div class='hidesharee-wrap' style='width:" + width + "px; height:" + height + "px;' />");

      // Insert sharing button list
      $(hideshareeList).insertAfter(this.$elem);

      // Get placement of share buttons
      var getPlacement = function(placement, width, height, speed) {

        var styles = {};

        if (placement === "right") {
          styles = {
            "left"    : width + 10 + "px",
            "right"   : -(width + 10) + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "left") {
          styles = {
            "left"    : -(width + 10) + "px",
            "right"   : width + 10 + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "top") {
          styles = {
            "top"     : -(height + 10) + "px",
            "bottom"  : height + 10 + "px",
            "opacity" : "toggle"
          };
        } else /* placement === "bottom" */ {
          styles = {
            "top"     : height + 10 + "px",
            "bottom"  : -(height + 10) + "px",
            "left"    : "0px",
            "opacity" : "toggle"
          };
        }

        $(".hidesharee-list").animate(styles, speed).addClass("shown");
      };

      // Return to original position
      var returnPlacement = function(speed) {
        var styles = {
          "top"     : "0px",
          "left"    : "0px",
          "opacity" : "toggle"
        };

        $(".hidesharee-list").animate(styles, speed).removeClass("shown");
      };

      // Toggle sharing on button click
      this.$elem.click(function() {
        var list = $(".hidesharee-list");
        if (list.hasClass("shown")){
          returnPlacement(transition);
        } else {
          getPlacement(placement, width, height, transition);
        }
        return false;
      });


      // SHARING FUNCTIONS
      var shareFacebook = function() {
        window.open('//www.facebook.com/share.php?m2w&s=100&p[url]=' + encodeURIComponent(shareLink) + '&p[images][0]=' + encodeURIComponent(shareMedia) + '&p[title]=' + encodeURIComponent(shareTitle) + '&p[summary]=' + encodeURIComponent(shareDescription),'Facebook','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareTwitter = function() {
        window.open('https://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(shareLink) + '&text=' + encodeURIComponent(shareTitle) + '%20' + encodeURIComponent(shareLink),'Twitter','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var sharePinterest = function() {
        window.open('//pinterest.com/pin/create/button/?url=' + encodeURIComponent(shareLink) + '&media=' + encodeURIComponent(shareMedia) + '&description=' + encodeURIComponent(shareTitle),'Pinterest','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareGooglePlus = function() {
        window.open('//plus.google.com/share?url=' + encodeURIComponent(shareLink),'GooglePlus','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareLinkedIn = function() {
        window.open('//www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(shareLink) + '&title=' + encodeURIComponent(shareTitle) + '&source=' + encodeURIComponent(shareLink),'LinkedIn','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };

      $(".hidesharee-facebook").click(function() {
        shareFacebook();
        return false;
      });

      $(".hidesharee-twitter").click(function() {
        shareTwitter();
        return false;
      });

      $(".hidesharee-pinterest").click(function() {
        sharePinterest();
        return false;
      });

      $(".hidesharee-google-plus").click(function() {
        shareGooglePlus();
        return false;
      });

      $(".hidesharee-linkedin").click(function() {
        shareLinkedIn();
        return false;
      });

    }
  };

  hidesharee.defaults = hidesharee.prototype.defaults;

  $.fn.hidesharee = function(options) {
    return this.each(function() {
      new hidesharee(this, options).init();
    });
  };

  window.hidesharee = hidesharee;

})(window, jQuery);


;(function(window, $) {

  "use strict";

  // hidesharee1 PUBLIC CLASS DEFINITION
  // =================================

  var hidesharee1 = function (elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
  };

  hidesharee1.prototype = {
    defaults: {
      link: document.URL,
      title: document.title,
      description: '',
      media: null,
      facebook: true,
      twitter: true,
      pinterest: true,
      googleplus: true,
      linkedin: true,
      position: "bottom",
      speed: 100
    },

    init: function() {
      this.config = $.extend({}, this.defaults, this.options);
      this.wraphidesharee1();
      return this;
    },

    wraphidesharee1: function() {
      var output = output,
          width = this.$elem.outerWidth(),
          height = this.$elem.outerHeight(),
          liWidth = 0,
          placement = this.config.position,
          transition = this.config.speed,
          shareTitle = this.config.title,
          shareLink = this.config.link,
          shareMedia = this.config.media,
          shareDescription = this.config.description,
          facebookTemplate = '<li><a class="hidesharee1-facebook" href="#"><i class="fa fa-facebook-square fa-2x"></i><span>Facebook</span></a></li>',
          twitterTemplate = '<li><a class="hidesharee1-twitter" href="#"><i class="fa fa-twitter-square fa-2x"></i><span>Twitter</span></a></li>',
          pinterestTemplate = '<li><a class="hidesharee1-pinterest" href="#" data-pin-do="buttonPin" data-pin-config="above"><i class="fa fa-pinterest-square fa-2x"></i><span>Pinterest</span></a></li>',
          googleplusTemplate = '<li><a class="hidesharee1-google-plus" href="#"><i class="fa fa-google-plus-square fa-2x"></i><span>Google Plus</span></a></li>',
          linkedinTemplate = '<li><a class="hidesharee1-linkedin" href="#"><i class="fa fa-linkedin-square fa-2x"></i><span>Linked In</span></a></li>';

      if (this.config.facebook) {
        output = facebookTemplate;
        liWidth += 40;
      } else {
        output = "";
        liWidth = liWidth;
      }
      if (this.config.twitter) {
        output += twitterTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.pinterest) {
        output += pinterestTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.googleplus) {
        output += googleplusTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.linkedin) {
        output += linkedinTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (liWidth < width) {
        liWidth = width;
      }

      // Construct sharing list
      var hidesharee1List = '<ul class="hidesharee1-list" style="display: none; width: ' + liWidth + 'px' + '">' + output + '</ul>';

      // Wrap button
      this.$elem.addClass("hidesharee1-btn").wrap("<div class='hidesharee1-wrap' style='width:" + width + "px; height:" + height + "px;' />");

      // Insert sharing button list
      $(hidesharee1List).insertAfter(this.$elem);

      // Get placement of share buttons
      var getPlacement = function(placement, width, height, speed) {

        var styles = {};

        if (placement === "right") {
          styles = {
            "left"    : width + 10 + "px",
            "right"   : -(width + 10) + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "left") {
          styles = {
            "left"    : -(width + 10) + "px",
            "right"   : width + 10 + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "top") {
          styles = {
            "top"     : -(height + 10) + "px",
            "bottom"  : height + 10 + "px",
            "opacity" : "toggle"
          };
        } else /* placement === "bottom" */ {
          styles = {
            "top"     : height + 10 + "px",
            "bottom"  : -(height + 10) + "px",
            "left"    : "0px",
            "opacity" : "toggle"
          };
        }

        $(".hidesharee1-list").animate(styles, speed).addClass("shown");
      };

      // Return to original position
      var returnPlacement = function(speed) {
        var styles = {
          "top"     : "0px",
          "left"    : "0px",
          "opacity" : "toggle"
        };

        $(".hidesharee1-list").animate(styles, speed).removeClass("shown");
      };

      // Toggle sharing on button click
      this.$elem.click(function() {
        var list = $(".hidesharee1-list");
        if (list.hasClass("shown")){
          returnPlacement(transition);
        } else {
          getPlacement(placement, width, height, transition);
        }
        return false;
      });


      // SHARING FUNCTIONS
      var shareFacebook = function() {
        window.open('//www.facebook.com/share.php?m2w&s=100&p[url]=' + encodeURIComponent(shareLink) + '&p[images][0]=' + encodeURIComponent(shareMedia) + '&p[title]=' + encodeURIComponent(shareTitle) + '&p[summary]=' + encodeURIComponent(shareDescription),'Facebook','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareTwitter = function() {
        window.open('https://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(shareLink) + '&text=' + encodeURIComponent(shareTitle) + '%20' + encodeURIComponent(shareLink),'Twitter','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var sharePinterest = function() {
        window.open('//pinterest.com/pin/create/button/?url=' + encodeURIComponent(shareLink) + '&media=' + encodeURIComponent(shareMedia) + '&description=' + encodeURIComponent(shareTitle),'Pinterest','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareGooglePlus = function() {
        window.open('//plus.google.com/share?url=' + encodeURIComponent(shareLink),'GooglePlus','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareLinkedIn = function() {
        window.open('//www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(shareLink) + '&title=' + encodeURIComponent(shareTitle) + '&source=' + encodeURIComponent(shareLink),'LinkedIn','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };

      $(".hidesharee1-facebook").click(function() {
        shareFacebook();
        return false;
      });

      $(".hidesharee1-twitter").click(function() {
        shareTwitter();
        return false;
      });

      $(".hidesharee1-pinterest").click(function() {
        sharePinterest();
        return false;
      });

      $(".hidesharee1-google-plus").click(function() {
        shareGooglePlus();
        return false;
      });

      $(".hidesharee1-linkedin").click(function() {
        shareLinkedIn();
        return false;
      });

    }
  };

  hidesharee1.defaults = hidesharee1.prototype.defaults;

  $.fn.hidesharee1 = function(options) {
    return this.each(function() {
      new hidesharee1(this, options).init();
    });
  };

  window.hidesharee1 = hidesharee1;

})(window, jQuery);

;(function(window, $) {

  "use strict";

  // hidesharee2 PUBLIC CLASS DEFINITION
  // =================================

  var hidesharee2 = function (elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
  };

  hidesharee2.prototype = {
    defaults: {
      link: document.URL,
      title: document.title,
      description: '',
      media: null,
      facebook: true,
      twitter: true,
      pinterest: true,
      googleplus: true,
      linkedin: true,
      position: "bottom",
      speed: 100
    },

    init: function() {
      this.config = $.extend({}, this.defaults, this.options);
      this.wraphidesharee2();
      return this;
    },

    wraphidesharee2: function() {
      var output = output,
          width = this.$elem.outerWidth(),
          height = this.$elem.outerHeight(),
          liWidth = 0,
          placement = this.config.position,
          transition = this.config.speed,
          shareTitle = this.config.title,
          shareLink = this.config.link,
          shareMedia = this.config.media,
          shareDescription = this.config.description,
          facebookTemplate = '<li><a class="hidesharee2-facebook" href="#"><i class="fa fa-facebook-square fa-2x"></i><span>Facebook</span></a></li>',
          twitterTemplate = '<li><a class="hidesharee2-twitter" href="#"><i class="fa fa-twitter-square fa-2x"></i><span>Twitter</span></a></li>',
          pinterestTemplate = '<li><a class="hidesharee2-pinterest" href="#" data-pin-do="buttonPin" data-pin-config="above"><i class="fa fa-pinterest-square fa-2x"></i><span>Pinterest</span></a></li>',
          googleplusTemplate = '<li><a class="hidesharee2-google-plus" href="#"><i class="fa fa-google-plus-square fa-2x"></i><span>Google Plus</span></a></li>',
          linkedinTemplate = '<li><a class="hidesharee2-linkedin" href="#"><i class="fa fa-linkedin-square fa-2x"></i><span>Linked In</span></a></li>';

      if (this.config.facebook) {
        output = facebookTemplate;
        liWidth += 40;
      } else {
        output = "";
        liWidth = liWidth;
      }
      if (this.config.twitter) {
        output += twitterTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.pinterest) {
        output += pinterestTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.googleplus) {
        output += googleplusTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.linkedin) {
        output += linkedinTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (liWidth < width) {
        liWidth = width;
      }

      // Construct sharing list
      var hidesharee2List = '<ul class="hidesharee2-list" style="display: none; width: ' + liWidth + 'px' + '">' + output + '</ul>';

      // Wrap button
      this.$elem.addClass("hidesharee2-btn").wrap("<div class='hidesharee2-wrap' style='width:" + width + "px; height:" + height + "px;' />");

      // Insert sharing button list
      $(hidesharee2List).insertAfter(this.$elem);

      // Get placement of share buttons
      var getPlacement = function(placement, width, height, speed) {

        var styles = {};

        if (placement === "right") {
          styles = {
            "left"    : width + 10 + "px",
            "right"   : -(width + 10) + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "left") {
          styles = {
            "left"    : -(width + 10) + "px",
            "right"   : width + 10 + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "top") {
          styles = {
            "top"     : -(height + 10) + "px",
            "bottom"  : height + 10 + "px",
            "opacity" : "toggle"
          };
        } else /* placement === "bottom" */ {
          styles = {
            "top"     : height + 10 + "px",
            "bottom"  : -(height + 10) + "px",
            "left"    : "0px",
            "opacity" : "toggle"
          };
        }

        $(".hidesharee2-list").animate(styles, speed).addClass("shown");
      };

      // Return to original position
      var returnPlacement = function(speed) {
        var styles = {
          "top"     : "0px",
          "left"    : "0px",
          "opacity" : "toggle"
        };

        $(".hidesharee2-list").animate(styles, speed).removeClass("shown");
      };

      // Toggle sharing on button click
      this.$elem.click(function() {
        var list = $(".hidesharee2-list");
        if (list.hasClass("shown")){
          returnPlacement(transition);
        } else {
          getPlacement(placement, width, height, transition);
        }
        return false;
      });


      // SHARING FUNCTIONS
      var shareFacebook = function() {
        window.open('//www.facebook.com/share.php?m2w&s=100&p[url]=' + encodeURIComponent(shareLink) + '&p[images][0]=' + encodeURIComponent(shareMedia) + '&p[title]=' + encodeURIComponent(shareTitle) + '&p[summary]=' + encodeURIComponent(shareDescription),'Facebook','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareTwitter = function() {
        window.open('https://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(shareLink) + '&text=' + encodeURIComponent(shareTitle) + '%20' + encodeURIComponent(shareLink),'Twitter','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var sharePinterest = function() {
        window.open('//pinterest.com/pin/create/button/?url=' + encodeURIComponent(shareLink) + '&media=' + encodeURIComponent(shareMedia) + '&description=' + encodeURIComponent(shareTitle),'Pinterest','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareGooglePlus = function() {
        window.open('//plus.google.com/share?url=' + encodeURIComponent(shareLink),'GooglePlus','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareLinkedIn = function() {
        window.open('//www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(shareLink) + '&title=' + encodeURIComponent(shareTitle) + '&source=' + encodeURIComponent(shareLink),'LinkedIn','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };

      $(".hidesharee2-facebook").click(function() {
        shareFacebook();
        return false;
      });

      $(".hidesharee2-twitter").click(function() {
        shareTwitter();
        return false;
      });

      $(".hidesharee2-pinterest").click(function() {
        sharePinterest();
        return false;
      });

      $(".hidesharee2-google-plus").click(function() {
        shareGooglePlus();
        return false;
      });

      $(".hidesharee2-linkedin").click(function() {
        shareLinkedIn();
        return false;
      });

    }
  };

  hidesharee2.defaults = hidesharee2.prototype.defaults;

  $.fn.hidesharee2 = function(options) {
    return this.each(function() {
      new hidesharee2(this, options).init();
    });
  };

  window.hidesharee2 = hidesharee2;

})(window, jQuery);

;(function(window, $) {

  "use strict";

  // hidesharee3 PUBLIC CLASS DEFINITION
  // =================================

  var hidesharee3 = function (elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
  };

  hidesharee3.prototype = {
    defaults: {
      link: document.URL,
      title: document.title,
      description: '',
      media: null,
      facebook: true,
      twitter: true,
      pinterest: true,
      googleplus: true,
      linkedin: true,
      position: "bottom",
      speed: 100
    },

    init: function() {
      this.config = $.extend({}, this.defaults, this.options);
      this.wraphidesharee3();
      return this;
    },

    wraphidesharee3: function() {
      var output = output,
          width = this.$elem.outerWidth(),
          height = this.$elem.outerHeight(),
          liWidth = 0,
          placement = this.config.position,
          transition = this.config.speed,
          shareTitle = this.config.title,
          shareLink = this.config.link,
          shareMedia = this.config.media,
          shareDescription = this.config.description,
          facebookTemplate = '<li><a class="hidesharee3-facebook" href="#"><i class="fa fa-facebook-square fa-2x"></i><span>Facebook</span></a></li>',
          twitterTemplate = '<li><a class="hidesharee3-twitter" href="#"><i class="fa fa-twitter-square fa-2x"></i><span>Twitter</span></a></li>',
          pinterestTemplate = '<li><a class="hidesharee3-pinterest" href="#" data-pin-do="buttonPin" data-pin-config="above"><i class="fa fa-pinterest-square fa-2x"></i><span>Pinterest</span></a></li>',
          googleplusTemplate = '<li><a class="hidesharee3-google-plus" href="#"><i class="fa fa-google-plus-square fa-2x"></i><span>Google Plus</span></a></li>',
          linkedinTemplate = '<li><a class="hidesharee3-linkedin" href="#"><i class="fa fa-linkedin-square fa-2x"></i><span>Linked In</span></a></li>';

      if (this.config.facebook) {
        output = facebookTemplate;
        liWidth += 40;
      } else {
        output = "";
        liWidth = liWidth;
      }
      if (this.config.twitter) {
        output += twitterTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.pinterest) {
        output += pinterestTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.googleplus) {
        output += googleplusTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.linkedin) {
        output += linkedinTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (liWidth < width) {
        liWidth = width;
      }

      // Construct sharing list
      var hidesharee3List = '<ul class="hidesharee3-list" style="display: none; width: ' + liWidth + 'px' + '">' + output + '</ul>';

      // Wrap button
      this.$elem.addClass("hidesharee3-btn").wrap("<div class='hidesharee3-wrap' style='width:" + width + "px; height:" + height + "px;' />");

      // Insert sharing button list
      $(hidesharee3List).insertAfter(this.$elem);

      // Get placement of share buttons
      var getPlacement = function(placement, width, height, speed) {

        var styles = {};

        if (placement === "right") {
          styles = {
            "left"    : width + 10 + "px",
            "right"   : -(width + 10) + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "left") {
          styles = {
            "left"    : -(width + 10) + "px",
            "right"   : width + 10 + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "top") {
          styles = {
            "top"     : -(height + 10) + "px",
            "bottom"  : height + 10 + "px",
            "opacity" : "toggle"
          };
        } else /* placement === "bottom" */ {
          styles = {
            "top"     : height + 10 + "px",
            "bottom"  : -(height + 10) + "px",
            "left"    : "0px",
            "opacity" : "toggle"
          };
        }

        $(".hidesharee3-list").animate(styles, speed).addClass("shown");
      };

      // Return to original position
      var returnPlacement = function(speed) {
        var styles = {
          "top"     : "0px",
          "left"    : "0px",
          "opacity" : "toggle"
        };

        $(".hidesharee3-list").animate(styles, speed).removeClass("shown");
      };

      // Toggle sharing on button click
      this.$elem.click(function() {
        var list = $(".hidesharee3-list");
        if (list.hasClass("shown")){
          returnPlacement(transition);
        } else {
          getPlacement(placement, width, height, transition);
        }
        return false;
      });


      // SHARING FUNCTIONS
      var shareFacebook = function() {
        window.open('//www.facebook.com/share.php?m2w&s=100&p[url]=' + encodeURIComponent(shareLink) + '&p[images][0]=' + encodeURIComponent(shareMedia) + '&p[title]=' + encodeURIComponent(shareTitle) + '&p[summary]=' + encodeURIComponent(shareDescription),'Facebook','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareTwitter = function() {
        window.open('https://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(shareLink) + '&text=' + encodeURIComponent(shareTitle) + '%20' + encodeURIComponent(shareLink),'Twitter','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var sharePinterest = function() {
        window.open('//pinterest.com/pin/create/button/?url=' + encodeURIComponent(shareLink) + '&media=' + encodeURIComponent(shareMedia) + '&description=' + encodeURIComponent(shareTitle),'Pinterest','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareGooglePlus = function() {
        window.open('//plus.google.com/share?url=' + encodeURIComponent(shareLink),'GooglePlus','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareLinkedIn = function() {
        window.open('//www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(shareLink) + '&title=' + encodeURIComponent(shareTitle) + '&source=' + encodeURIComponent(shareLink),'LinkedIn','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };

      $(".hidesharee3-facebook").click(function() {
        shareFacebook();
        return false;
      });

      $(".hidesharee3-twitter").click(function() {
        shareTwitter();
        return false;
      });

      $(".hidesharee3-pinterest").click(function() {
        sharePinterest();
        return false;
      });

      $(".hidesharee3-google-plus").click(function() {
        shareGooglePlus();
        return false;
      });

      $(".hidesharee3-linkedin").click(function() {
        shareLinkedIn();
        return false;
      });

    }
  };

  hidesharee3.defaults = hidesharee3.prototype.defaults;

  $.fn.hidesharee3 = function(options) {
    return this.each(function() {
      new hidesharee3(this, options).init();
    });
  };

  window.hidesharee3 = hidesharee3;

})(window, jQuery);

;(function(window, $) {

  "use strict";

  // hidesharee4 PUBLIC CLASS DEFINITION
  // =================================

  var hidesharee4 = function (elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
  };

  hidesharee4.prototype = {
    defaults: {
      link: document.URL,
      title: document.title,
      description: '',
      media: null,
      facebook: true,
      twitter: true,
      pinterest: true,
      googleplus: true,
      linkedin: true,
      position: "bottom",
      speed: 100
    },

    init: function() {
      this.config = $.extend({}, this.defaults, this.options);
      this.wraphidesharee4();
      return this;
    },

    wraphidesharee4: function() {
      var output = output,
          width = this.$elem.outerWidth(),
          height = this.$elem.outerHeight(),
          liWidth = 0,
          placement = this.config.position,
          transition = this.config.speed,
          shareTitle = this.config.title,
          shareLink = this.config.link,
          shareMedia = this.config.media,
          shareDescription = this.config.description,
          facebookTemplate = '<li><a class="hidesharee4-facebook" href="#"><i class="fa fa-facebook-square fa-2x"></i><span>Facebook</span></a></li>',
          twitterTemplate = '<li><a class="hidesharee4-twitter" href="#"><i class="fa fa-twitter-square fa-2x"></i><span>Twitter</span></a></li>',
          pinterestTemplate = '<li><a class="hidesharee4-pinterest" href="#" data-pin-do="buttonPin" data-pin-config="above"><i class="fa fa-pinterest-square fa-2x"></i><span>Pinterest</span></a></li>',
          googleplusTemplate = '<li><a class="hidesharee4-google-plus" href="#"><i class="fa fa-google-plus-square fa-2x"></i><span>Google Plus</span></a></li>',
          linkedinTemplate = '<li><a class="hidesharee4-linkedin" href="#"><i class="fa fa-linkedin-square fa-2x"></i><span>Linked In</span></a></li>';

      if (this.config.facebook) {
        output = facebookTemplate;
        liWidth += 40;
      } else {
        output = "";
        liWidth = liWidth;
      }
      if (this.config.twitter) {
        output += twitterTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.pinterest) {
        output += pinterestTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.googleplus) {
        output += googleplusTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.linkedin) {
        output += linkedinTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (liWidth < width) {
        liWidth = width;
      }

      // Construct sharing list
      var hidesharee4List = '<ul class="hidesharee4-list" style="display: none; width: ' + liWidth + 'px' + '">' + output + '</ul>';

      // Wrap button
      this.$elem.addClass("hidesharee4-btn").wrap("<div class='hidesharee4-wrap' style='width:" + width + "px; height:" + height + "px;' />");

      // Insert sharing button list
      $(hidesharee4List).insertAfter(this.$elem);

      // Get placement of share buttons
      var getPlacement = function(placement, width, height, speed) {

        var styles = {};

        if (placement === "right") {
          styles = {
            "left"    : width + 10 + "px",
            "right"   : -(width + 10) + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "left") {
          styles = {
            "left"    : -(width + 10) + "px",
            "right"   : width + 10 + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "top") {
          styles = {
            "top"     : -(height + 10) + "px",
            "bottom"  : height + 10 + "px",
            "opacity" : "toggle"
          };
        } else /* placement === "bottom" */ {
          styles = {
            "top"     : height + 10 + "px",
            "bottom"  : -(height + 10) + "px",
            "left"    : "0px",
            "opacity" : "toggle"
          };
        }

        $(".hidesharee4-list").animate(styles, speed).addClass("shown");
      };

      // Return to original position
      var returnPlacement = function(speed) {
        var styles = {
          "top"     : "0px",
          "left"    : "0px",
          "opacity" : "toggle"
        };

        $(".hidesharee4-list").animate(styles, speed).removeClass("shown");
      };

      // Toggle sharing on button click
      this.$elem.click(function() {
        var list = $(".hidesharee4-list");
        if (list.hasClass("shown")){
          returnPlacement(transition);
        } else {
          getPlacement(placement, width, height, transition);
        }
        return false;
      });


      // SHARING FUNCTIONS
      var shareFacebook = function() {
        window.open('//www.facebook.com/share.php?m2w&s=100&p[url]=' + encodeURIComponent(shareLink) + '&p[images][0]=' + encodeURIComponent(shareMedia) + '&p[title]=' + encodeURIComponent(shareTitle) + '&p[summary]=' + encodeURIComponent(shareDescription),'Facebook','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareTwitter = function() {
        window.open('https://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(shareLink) + '&text=' + encodeURIComponent(shareTitle) + '%20' + encodeURIComponent(shareLink),'Twitter','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var sharePinterest = function() {
        window.open('//pinterest.com/pin/create/button/?url=' + encodeURIComponent(shareLink) + '&media=' + encodeURIComponent(shareMedia) + '&description=' + encodeURIComponent(shareTitle),'Pinterest','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareGooglePlus = function() {
        window.open('//plus.google.com/share?url=' + encodeURIComponent(shareLink),'GooglePlus','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareLinkedIn = function() {
        window.open('//www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(shareLink) + '&title=' + encodeURIComponent(shareTitle) + '&source=' + encodeURIComponent(shareLink),'LinkedIn','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };

      $(".hidesharee4-facebook").click(function() {
        shareFacebook();
        return false;
      });

      $(".hidesharee4-twitter").click(function() {
        shareTwitter();
        return false;
      });

      $(".hidesharee4-pinterest").click(function() {
        sharePinterest();
        return false;
      });

      $(".hidesharee4-google-plus").click(function() {
        shareGooglePlus();
        return false;
      });

      $(".hidesharee4-linkedin").click(function() {
        shareLinkedIn();
        return false;
      });

    }
  };

  hidesharee4.defaults = hidesharee4.prototype.defaults;

  $.fn.hidesharee4 = function(options) {
    return this.each(function() {
      new hidesharee4(this, options).init();
    });
  };

  window.hidesharee4 = hidesharee4;

})(window, jQuery);

;(function(window, $) {

  "use strict";

  // hidesharee5 PUBLIC CLASS DEFINITION
  // =================================

  var hidesharee5 = function (elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
  };

  hidesharee5.prototype = {
    defaults: {
      link: document.URL,
      title: document.title,
      description: '',
      media: null,
      facebook: true,
      twitter: true,
      pinterest: true,
      googleplus: true,
      linkedin: true,
      position: "bottom",
      speed: 100
    },

    init: function() {
      this.config = $.extend({}, this.defaults, this.options);
      this.wraphidesharee5();
      return this;
    },

    wraphidesharee5: function() {
      var output = output,
          width = this.$elem.outerWidth(),
          height = this.$elem.outerHeight(),
          liWidth = 0,
          placement = this.config.position,
          transition = this.config.speed,
          shareTitle = this.config.title,
          shareLink = this.config.link,
          shareMedia = this.config.media,
          shareDescription = this.config.description,
          facebookTemplate = '<li><a class="hidesharee5-facebook" href="#"><i class="fa fa-facebook-square fa-2x"></i><span>Facebook</span></a></li>',
          twitterTemplate = '<li><a class="hidesharee5-twitter" href="#"><i class="fa fa-twitter-square fa-2x"></i><span>Twitter</span></a></li>',
          pinterestTemplate = '<li><a class="hidesharee5-pinterest" href="#" data-pin-do="buttonPin" data-pin-config="above"><i class="fa fa-pinterest-square fa-2x"></i><span>Pinterest</span></a></li>',
          googleplusTemplate = '<li><a class="hidesharee5-google-plus" href="#"><i class="fa fa-google-plus-square fa-2x"></i><span>Google Plus</span></a></li>',
          linkedinTemplate = '<li><a class="hidesharee5-linkedin" href="#"><i class="fa fa-linkedin-square fa-2x"></i><span>Linked In</span></a></li>';

      if (this.config.facebook) {
        output = facebookTemplate;
        liWidth += 40;
      } else {
        output = "";
        liWidth = liWidth;
      }
      if (this.config.twitter) {
        output += twitterTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.pinterest) {
        output += pinterestTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.googleplus) {
        output += googleplusTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.linkedin) {
        output += linkedinTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (liWidth < width) {
        liWidth = width;
      }

      // Construct sharing list
      var hidesharee5List = '<ul class="hidesharee5-list" style="display: none; width: ' + liWidth + 'px' + '">' + output + '</ul>';

      // Wrap button
      this.$elem.addClass("hidesharee5-btn").wrap("<div class='hidesharee5-wrap' style='width:" + width + "px; height:" + height + "px;' />");

      // Insert sharing button list
      $(hidesharee5List).insertAfter(this.$elem);

      // Get placement of share buttons
      var getPlacement = function(placement, width, height, speed) {

        var styles = {};

        if (placement === "right") {
          styles = {
            "left"    : width + 10 + "px",
            "right"   : -(width + 10) + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "left") {
          styles = {
            "left"    : -(width + 10) + "px",
            "right"   : width + 10 + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "top") {
          styles = {
            "top"     : -(height + 10) + "px",
            "bottom"  : height + 10 + "px",
            "opacity" : "toggle"
          };
        } else /* placement === "bottom" */ {
          styles = {
            "top"     : height + 10 + "px",
            "bottom"  : -(height + 10) + "px",
            "left"    : "0px",
            "opacity" : "toggle"
          };
        }

        $(".hidesharee5-list").animate(styles, speed).addClass("shown");
      };

      // Return to original position
      var returnPlacement = function(speed) {
        var styles = {
          "top"     : "0px",
          "left"    : "0px",
          "opacity" : "toggle"
        };

        $(".hidesharee5-list").animate(styles, speed).removeClass("shown");
      };

      // Toggle sharing on button click
      this.$elem.click(function() {
        var list = $(".hidesharee5-list");
        if (list.hasClass("shown")){
          returnPlacement(transition);
        } else {
          getPlacement(placement, width, height, transition);
        }
        return false;
      });


      // SHARING FUNCTIONS
      var shareFacebook = function() {
        window.open('//www.facebook.com/share.php?m2w&s=100&p[url]=' + encodeURIComponent(shareLink) + '&p[images][0]=' + encodeURIComponent(shareMedia) + '&p[title]=' + encodeURIComponent(shareTitle) + '&p[summary]=' + encodeURIComponent(shareDescription),'Facebook','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareTwitter = function() {
        window.open('https://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(shareLink) + '&text=' + encodeURIComponent(shareTitle) + '%20' + encodeURIComponent(shareLink),'Twitter','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var sharePinterest = function() {
        window.open('//pinterest.com/pin/create/button/?url=' + encodeURIComponent(shareLink) + '&media=' + encodeURIComponent(shareMedia) + '&description=' + encodeURIComponent(shareTitle),'Pinterest','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareGooglePlus = function() {
        window.open('//plus.google.com/share?url=' + encodeURIComponent(shareLink),'GooglePlus','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareLinkedIn = function() {
        window.open('//www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(shareLink) + '&title=' + encodeURIComponent(shareTitle) + '&source=' + encodeURIComponent(shareLink),'LinkedIn','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };

      $(".hidesharee5-facebook").click(function() {
        shareFacebook();
        return false;
      });

      $(".hidesharee5-twitter").click(function() {
        shareTwitter();
        return false;
      });

      $(".hidesharee5-pinterest").click(function() {
        sharePinterest();
        return false;
      });

      $(".hidesharee5-google-plus").click(function() {
        shareGooglePlus();
        return false;
      });

      $(".hidesharee5-linkedin").click(function() {
        shareLinkedIn();
        return false;
      });

    }
  };

  hidesharee5.defaults = hidesharee5.prototype.defaults;

  $.fn.hidesharee5 = function(options) {
    return this.each(function() {
      new hidesharee5(this, options).init();
    });
  };

  window.hidesharee5 = hidesharee5;

})(window, jQuery);

;(function(window, $) {

  "use strict";

  // hidesharee6 PUBLIC CLASS DEFINITION
  // =================================

  var hidesharee6 = function (elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
  };

  hidesharee6.prototype = {
    defaults: {
      link: document.URL,
      title: document.title,
      description: '',
      media: null,
      facebook: true,
      twitter: true,
      pinterest: true,
      googleplus: true,
      linkedin: true,
      position: "bottom",
      speed: 100
    },

    init: function() {
      this.config = $.extend({}, this.defaults, this.options);
      this.wraphidesharee6();
      return this;
    },

    wraphidesharee6: function() {
      var output = output,
          width = this.$elem.outerWidth(),
          height = this.$elem.outerHeight(),
          liWidth = 0,
          placement = this.config.position,
          transition = this.config.speed,
          shareTitle = this.config.title,
          shareLink = this.config.link,
          shareMedia = this.config.media,
          shareDescription = this.config.description,
          facebookTemplate = '<li><a class="hidesharee6-facebook" href="#"><i class="fa fa-facebook-square fa-2x"></i><span>Facebook</span></a></li>',
          twitterTemplate = '<li><a class="hidesharee6-twitter" href="#"><i class="fa fa-twitter-square fa-2x"></i><span>Twitter</span></a></li>',
          pinterestTemplate = '<li><a class="hidesharee6-pinterest" href="#" data-pin-do="buttonPin" data-pin-config="above"><i class="fa fa-pinterest-square fa-2x"></i><span>Pinterest</span></a></li>',
          googleplusTemplate = '<li><a class="hidesharee6-google-plus" href="#"><i class="fa fa-google-plus-square fa-2x"></i><span>Google Plus</span></a></li>',
          linkedinTemplate = '<li><a class="hidesharee6-linkedin" href="#"><i class="fa fa-linkedin-square fa-2x"></i><span>Linked In</span></a></li>';

      if (this.config.facebook) {
        output = facebookTemplate;
        liWidth += 40;
      } else {
        output = "";
        liWidth = liWidth;
      }
      if (this.config.twitter) {
        output += twitterTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.pinterest) {
        output += pinterestTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.googleplus) {
        output += googleplusTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.linkedin) {
        output += linkedinTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (liWidth < width) {
        liWidth = width;
      }

      // Construct sharing list
      var hidesharee6List = '<ul class="hidesharee6-list" style="display: none; width: ' + liWidth + 'px' + '">' + output + '</ul>';

      // Wrap button
      this.$elem.addClass("hidesharee6-btn").wrap("<div class='hidesharee6-wrap' style='width:" + width + "px; height:" + height + "px;' />");

      // Insert sharing button list
      $(hidesharee6List).insertAfter(this.$elem);

      // Get placement of share buttons
      var getPlacement = function(placement, width, height, speed) {

        var styles = {};

        if (placement === "right") {
          styles = {
            "left"    : width + 10 + "px",
            "right"   : -(width + 10) + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "left") {
          styles = {
            "left"    : -(width + 10) + "px",
            "right"   : width + 10 + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "top") {
          styles = {
            "top"     : -(height + 10) + "px",
            "bottom"  : height + 10 + "px",
            "opacity" : "toggle"
          };
        } else /* placement === "bottom" */ {
          styles = {
            "top"     : height + 10 + "px",
            "bottom"  : -(height + 10) + "px",
            "left"    : "0px",
            "opacity" : "toggle"
          };
        }

        $(".hidesharee6-list").animate(styles, speed).addClass("shown");
      };

      // Return to original position
      var returnPlacement = function(speed) {
        var styles = {
          "top"     : "0px",
          "left"    : "0px",
          "opacity" : "toggle"
        };

        $(".hidesharee6-list").animate(styles, speed).removeClass("shown");
      };

      // Toggle sharing on button click
      this.$elem.click(function() {
        var list = $(".hidesharee6-list");
        if (list.hasClass("shown")){
          returnPlacement(transition);
        } else {
          getPlacement(placement, width, height, transition);
        }
        return false;
      });


      // SHARING FUNCTIONS
      var shareFacebook = function() {
        window.open('//www.facebook.com/share.php?m2w&s=100&p[url]=' + encodeURIComponent(shareLink) + '&p[images][0]=' + encodeURIComponent(shareMedia) + '&p[title]=' + encodeURIComponent(shareTitle) + '&p[summary]=' + encodeURIComponent(shareDescription),'Facebook','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareTwitter = function() {
        window.open('https://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(shareLink) + '&text=' + encodeURIComponent(shareTitle) + '%20' + encodeURIComponent(shareLink),'Twitter','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var sharePinterest = function() {
        window.open('//pinterest.com/pin/create/button/?url=' + encodeURIComponent(shareLink) + '&media=' + encodeURIComponent(shareMedia) + '&description=' + encodeURIComponent(shareTitle),'Pinterest','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareGooglePlus = function() {
        window.open('//plus.google.com/share?url=' + encodeURIComponent(shareLink),'GooglePlus','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareLinkedIn = function() {
        window.open('//www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(shareLink) + '&title=' + encodeURIComponent(shareTitle) + '&source=' + encodeURIComponent(shareLink),'LinkedIn','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };

      $(".hidesharee6-facebook").click(function() {
        shareFacebook();
        return false;
      });

      $(".hidesharee6-twitter").click(function() {
        shareTwitter();
        return false;
      });

      $(".hidesharee6-pinterest").click(function() {
        sharePinterest();
        return false;
      });

      $(".hidesharee6-google-plus").click(function() {
        shareGooglePlus();
        return false;
      });

      $(".hidesharee6-linkedin").click(function() {
        shareLinkedIn();
        return false;
      });

    }
  };

  hidesharee6.defaults = hidesharee6.prototype.defaults;

  $.fn.hidesharee6 = function(options) {
    return this.each(function() {
      new hidesharee6(this, options).init();
    });
  };

  window.hidesharee6 = hidesharee6;

})(window, jQuery);

;(function(window, $) {

  "use strict";

  // hidesharee7 PUBLIC CLASS DEFINITION
  // =================================

  var hidesharee7 = function (elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
  };

  hidesharee7.prototype = {
    defaults: {
      link: document.URL,
      title: document.title,
      description: '',
      media: null,
      facebook: true,
      twitter: true,
      pinterest: true,
      googleplus: true,
      linkedin: true,
      position: "bottom",
      speed: 100
    },

    init: function() {
      this.config = $.extend({}, this.defaults, this.options);
      this.wraphidesharee7();
      return this;
    },

    wraphidesharee7: function() {
      var output = output,
          width = this.$elem.outerWidth(),
          height = this.$elem.outerHeight(),
          liWidth = 0,
          placement = this.config.position,
          transition = this.config.speed,
          shareTitle = this.config.title,
          shareLink = this.config.link,
          shareMedia = this.config.media,
          shareDescription = this.config.description,
          facebookTemplate = '<li><a class="hidesharee7-facebook" href="#"><i class="fa fa-facebook-square fa-2x"></i><span>Facebook</span></a></li>',
          twitterTemplate = '<li><a class="hidesharee7-twitter" href="#"><i class="fa fa-twitter-square fa-2x"></i><span>Twitter</span></a></li>',
          pinterestTemplate = '<li><a class="hidesharee7-pinterest" href="#" data-pin-do="buttonPin" data-pin-config="above"><i class="fa fa-pinterest-square fa-2x"></i><span>Pinterest</span></a></li>',
          googleplusTemplate = '<li><a class="hidesharee7-google-plus" href="#"><i class="fa fa-google-plus-square fa-2x"></i><span>Google Plus</span></a></li>',
          linkedinTemplate = '<li><a class="hidesharee7-linkedin" href="#"><i class="fa fa-linkedin-square fa-2x"></i><span>Linked In</span></a></li>';

      if (this.config.facebook) {
        output = facebookTemplate;
        liWidth += 40;
      } else {
        output = "";
        liWidth = liWidth;
      }
      if (this.config.twitter) {
        output += twitterTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.pinterest) {
        output += pinterestTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.googleplus) {
        output += googleplusTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.linkedin) {
        output += linkedinTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (liWidth < width) {
        liWidth = width;
      }

      // Construct sharing list
      var hidesharee7List = '<ul class="hidesharee7-list" style="display: none; width: ' + liWidth + 'px' + '">' + output + '</ul>';

      // Wrap button
      this.$elem.addClass("hidesharee7-btn").wrap("<div class='hidesharee7-wrap' style='width:" + width + "px; height:" + height + "px;' />");

      // Insert sharing button list
      $(hidesharee7List).insertAfter(this.$elem);

      // Get placement of share buttons
      var getPlacement = function(placement, width, height, speed) {

        var styles = {};

        if (placement === "right") {
          styles = {
            "left"    : width + 10 + "px",
            "right"   : -(width + 10) + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "left") {
          styles = {
            "left"    : -(width + 10) + "px",
            "right"   : width + 10 + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "top") {
          styles = {
            "top"     : -(height + 10) + "px",
            "bottom"  : height + 10 + "px",
            "opacity" : "toggle"
          };
        } else /* placement === "bottom" */ {
          styles = {
            "top"     : height + 10 + "px",
            "bottom"  : -(height + 10) + "px",
            "left"    : "0px",
            "opacity" : "toggle"
          };
        }

        $(".hidesharee7-list").animate(styles, speed).addClass("shown");
      };

      // Return to original position
      var returnPlacement = function(speed) {
        var styles = {
          "top"     : "0px",
          "left"    : "0px",
          "opacity" : "toggle"
        };

        $(".hidesharee7-list").animate(styles, speed).removeClass("shown");
      };

      // Toggle sharing on button click
      this.$elem.click(function() {
        var list = $(".hidesharee7-list");
        if (list.hasClass("shown")){
          returnPlacement(transition);
        } else {
          getPlacement(placement, width, height, transition);
        }
        return false;
      });


      // SHARING FUNCTIONS
      var shareFacebook = function() {
        window.open('//www.facebook.com/share.php?m2w&s=100&p[url]=' + encodeURIComponent(shareLink) + '&p[images][0]=' + encodeURIComponent(shareMedia) + '&p[title]=' + encodeURIComponent(shareTitle) + '&p[summary]=' + encodeURIComponent(shareDescription),'Facebook','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareTwitter = function() {
        window.open('https://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(shareLink) + '&text=' + encodeURIComponent(shareTitle) + '%20' + encodeURIComponent(shareLink),'Twitter','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var sharePinterest = function() {
        window.open('//pinterest.com/pin/create/button/?url=' + encodeURIComponent(shareLink) + '&media=' + encodeURIComponent(shareMedia) + '&description=' + encodeURIComponent(shareTitle),'Pinterest','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareGooglePlus = function() {
        window.open('//plus.google.com/share?url=' + encodeURIComponent(shareLink),'GooglePlus','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareLinkedIn = function() {
        window.open('//www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(shareLink) + '&title=' + encodeURIComponent(shareTitle) + '&source=' + encodeURIComponent(shareLink),'LinkedIn','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };

      $(".hidesharee7-facebook").click(function() {
        shareFacebook();
        return false;
      });

      $(".hidesharee7-twitter").click(function() {
        shareTwitter();
        return false;
      });

      $(".hidesharee7-pinterest").click(function() {
        sharePinterest();
        return false;
      });

      $(".hidesharee7-google-plus").click(function() {
        shareGooglePlus();
        return false;
      });

      $(".hidesharee7-linkedin").click(function() {
        shareLinkedIn();
        return false;
      });

    }
  };

  hidesharee7.defaults = hidesharee7.prototype.defaults;

  $.fn.hidesharee7 = function(options) {
    return this.each(function() {
      new hidesharee7(this, options).init();
    });
  };

  window.hidesharee7 = hidesharee7;

})(window, jQuery);


