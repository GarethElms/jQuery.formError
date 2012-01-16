# jQuery.formError

A small jQuery plugin that lets you add a validation message next to a form control. The error appears like a tooltip. See it in action on my [blog post](http://www.garethelms.org/2012/01/jquery-form-error-plugin/).

## How to use the plugin

Just include [jQuery.formError.js](https://github.com/GarethElms/jQuery.formError/blob/master/jquery.formError.js) in your html page and then call the formError() method on a form control.

For example, given a html input control :

####
	<input type="text" id="name" name="name" />

If this has a dodgy value you can display a validation error in one line :

####
	$("#name").formError( "Name cannot be greater than 15 characters long");

Once the user has changed the value and you have successfully revalidated you can remove the validation error like this :

####
	$("#name").formError( {remove:true});

When you call formError() with {remove:true} the plugin will, by default, replace the error with an image that indicates successful validation. The presence of this image clearly confirms that the error has been corrected. It is a web forms best practice to do this. The default src attribute of the success image is "success.gif". You can control the url of the success image like this :

####
	$("#name").formError(
	   {
	      remove:true,
	      successImage: {src:"/img/success.gif"}
	   });

It is also possible to have error messages wrap onto new lines to prevent error messages being too linear. The plugin will make sure that if an error message exceeds a given number of characters (the default is 30) then a &lt;br/&gt; tag is inserted into the text of the message which will effectively split the error over a new line. To change this character limit :

####
	$("#name").formError(
		"A user with this name has already been added to the list. Please change the name.",
		{newLineAtCharacterCount: 25});

This will ensure that after 25 characters has been reached, a new line is inserted into the error message before it is rendered on the page. To disable this feature, set newLineAtCharacterCount to 0.

To globally disable the validation image functionality (so you don't have to pass it into every formError() call) add this somewhere in your javascript code :

####
	$.extend( true, $.fn.formError.defaultOptions, {successImage:{enabled:false}});

And to change the character limit globally :

####
	$.extend( true, $.fn.formError.defaultOptions, {successImage:{newLineAtCharacterCount:20}});

You can use the same technique to globally override any of the default options. The default options are :

#### Default options
	$.fn.formError.defaultOptions =
	{
		newLineAtCharacterCount: 30,
		successImage:
		{
			enabled:true,
			src: "/resources/shared/images/success.gif"
		}
	};

# Release notes

### v0.3
* Ensure that the error message appears immediately next to the form control regardless of css position

### v0.2
* Newlines are inserted into error messages that are too long (default is maximum 30 characters per line)
* z-index changed to ensure that an error message overlays a success image

### v0.1
* Initial release