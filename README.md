# jQuery.formError

A small jQuery plugin that lets you add a validation message next to a form control. The error appears like a tooltip. See it in action on my [blog post](http://www.garethelms.org/2012/01/jquery-form-error-plugin/).

## How to use the plugin

Just include the [jQuery.formError.js file](https://github.com/GarethElms/jQuery.formError/blob/master/jquery.formError.js) in your html page and then call the formError() method on a form control.

For example, given a html input control :

####
<input type="text" id="name" name="name" />

You can display a validation error in one line :

####
$("#name").formError( "Name cannot be greater than 15 characters long");

To remove the validation error :

####
$("#name").formError( {remove:true});

When you call formError() with {remove:true} the plugin will, by default, replace the error with an image that indicates successful validation. This indicates clearly to the user that the error has been corrected. It is web form best practice to do this. The default success image is "success.gif". You can control the url of the success image like this :

####
$("#name").formError(
   {
      remove:true,
      successImage: {src:"img/success.gif"}
   });

It is also possible to have error message wrap onto new lines to prevent error messages being too linear. The plugin will make sure that if an error message exceeds a given number of characters (the default is 30) then a <br/> tag is inserted which will split the error over a new line. To change this character limit :

####
$("#name").formError( "Name cannot be greater than 15 characters long", {newLineAtCharacterCount: 25});

This will ensure that after 25 characters has been reached, a new line is inserted into the error message before it is rendered on the page. To disable this feature, set newLineAtCharacterCount to 0.

# Release notes

### v0.1

* Initial release

### v0.2

* Newlines are inserted into error message that are too long
* z-index changed to ensure that an error message overlays a success image