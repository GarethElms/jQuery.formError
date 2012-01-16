// jQuery.formError v0.3
//
// Copyright (C)2012 Gareth Elms
// Distributed under MIT License
//
// Documentation and full license availabe at:
// https://github.com/GarethElms/jQuery.formError
 
(function( $ )
{
   $.fn.formError =
      function( message, options)
      {
         if( typeof( message) === "string")
         {
            options = $.extend( true, {}, $.fn.formError.defaultOptions, options);
            options.message = message;
            show.call( this, options);
         }
        else
         {
            var options = $.extend( true, {}, $.fn.formError.defaultOptions, message);
            if( typeof( options.message) === "string")
            {
               show.call( this, options);
            }
            else if( options.remove)
            {
               if( remove.call( this, options))
               {
                  this.addClass( "valid");
               }
            }
         }
 
         function remove( options)
         {
            var wasInErrorState = false;
            if( options.successImage.enabled)
            {
               if( this.hasClass('invalid')) //Used to be invalid
               {
                  var img = $( "<img class='successImage' style='position:absolute; right:-20px; top:3px; z-index:9999;' src='" + options.successImage.src + "' />");

                  var positionMethod = this.css( "position");
                  if( positionMethod == "relative" || positionMethod == "absolute" || positionMethod == "fixed")
                  {
                      img
                         .css( "left", ((this.position().left + this.outerWidth()) + 3) + "px")
                         .css( "top", (this.position().top - 3) + "px");
                  }
                  else
                  {
                      img
                         .css( "left", ((this.position().left + this.outerWidth()) + 5) + "px")
                  }

                  this.after( img.fadeIn());
               }
               else
               {
                  removeSuccessImage.call( this);
               }
            }
            if( this.hasClass( "invalid"))
            {
               this.removeClass('invalid');
               wasInErrorState = true;
            }
            this.next(".validationErrorContainer").fadeOut();
            this.next("img.successImage").next( ".validationErrorContainer").fadeOut();
            return wasInErrorState;
         }
 
         function removeSuccessImage()
         {
            if( this.next().hasClass( "successImage"))
            {
               this.next().fadeOut();
            }
         }
 
         function show( options)
         {
            remove.call( this, {successImage: {disabled:true}}); // Just remove the previous error message if it exists, we are replacing it now
            removeSuccessImage.call( this); // Also remove the success image if present
 
            options.message = options.message.injectNewLines( options.newLineAtCharacterCount);

            var errorDiv =
               $("<div class='validationErrorContainer' style='position:absolute; left:101%; top:-2px; z-index:99999;'>" +
                   "<canvas width='14' height='14' style='position:absolute; left:-3px; top:7px;' />" +
                      "<div class='validationError' style='border:2px solid #811; border-radius:5px; padding:4px; background-color:#f99; color:#511; position:relative; left:10px; white-space:nowrap;'>" +
                     options.message +
                   "</div>" +
                 "</div>");

            var positionMethod = this.css( "position");
            if( positionMethod == "relative" || positionMethod == "absolute" || positionMethod == "fixed")
            {
                errorDiv
                        .css( "left", ((this.position().left + this.outerWidth()) - 3) + "px")
                        .css( "top", (this.position().top - 3) + "px");
            }
            else if( this.parent().hasClass( "inputContainer") == false)
            {
               this.wrap( $("<div class='inputContainer' style='position:relative; width:" + this.width() + "px'></div>"));
            }
 
            this.after( errorDiv.fadeIn()).addClass( "invalid");
                 
            var canvas = $("canvas", errorDiv)[0];
 
            if( typeof( canvas.getContext) == "function")
            {
                var context = canvas.getContext( "2d");
 
                context.fillStyle = '#811';
                context.strokeStyle = '#811';
                context.lineWidth = 1;
 
                context.beginPath();
                context.moveTo(1, 7);
                context.lineTo(13, 13);
                context.lineTo(13, 1);
                context.lineTo(1, 7);
                context.closePath();
 
                context.fill();
                context.stroke();
            }
         }
      };
 
   $.fn.formError.defaultOptions =
      {
         newLineAtCharacterCount: 30,
         successImage:
         {
            enabled:true,
            src: "success.gif"
         }
      };
})( jQuery );


String.prototype.injectNewLines =
    function( maxLineLength)
    {
        if( typeof( maxLineLength) == "number" && maxLineLength > 0)
        {
            var tempMessage = "";
            var lineLength = 0;
            var words = this.split( /\s+/);
            for( var word in words)
            {
                tempMessage += words[word];
                lineLength += words[word].length;
                if( lineLength > maxLineLength)
                {
                    tempMessage += "<br />";
                    lineLength = 0;
                }
                else
                {
                    tempMessage += " ";
                    lineLength ++;
                }
            }

            return tempMessage;
        }

        return this;
    };