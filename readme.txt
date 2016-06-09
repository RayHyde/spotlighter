Spotlighter, a jQuery plugin for explaining a web page

Spotlighter lets you highlights parts of your web page for instruction or explanation. You can either add data tags to the element you want to highlight, or you can stick everything in a JSON file and load all data tags in one fell swoop.

you can adjust the position of the spotlight per element tot the left ort right or up and down, and you can broaden or narrow the spotlights beam for each element individually.

The spotlight has a text box that takes HTML tags, so you can style the content to your heart's content.

Needless to say, all is styled in CSS so you can adjust as you please. Even going so far as replacing the spotlight e.g. with a dotted ring or square.

Oh and yes, the minified version is only 2.78 K in size!

See it in action: http://rayhyde.github.io/spotlighter

How to use this plugin
1. Link the files you need

Include the jQuery script at the bottom of your page, e.g. through a CDN:

<script src="//code.jquery.com/jquery-2.1.3.min.js"></script>

Then include the minimized version of the script:

<script src="[path to your script]/jquery.spotlighter.min.js"></script>

Change [path to your script] to where it resides, eg "js".
2. Create your HTML markup or create a JSON file

You can add the necessary data tags to each element straight into your HTML, something that comes in handy if you have elements that are generated on the fly, or you can create a JSON file that creates the data tags on the elements once the script is loaded.

To add the data tags to the elements, you have to add

data-spltext="The text that you want to show next to your spotlight"

This can be everything you want to show as an explanatory text, including HTML tags such as <strong> or <h4>

data-splsize="300"

The size of the spotlight in pixels. You can set a default (see below) and leave this blank.

data-splseq="1"	

The sequence of the element. The spotlight jumps from one number to the next, so this allows you to have it jump up and down and across the page.
3. Call the plugin

Tell the plugin it needs to run on this page and tell it what is the element that triggers it:

<script>
  $('.startspotlighter').spotlighter();
</script>
	

4. Putting it all together

This is your basic page to get the plugin up and running:

<!DOCTYPE html>
<html>
  <head>
    ...
    <link rel="stylesheet" href="css/spotlighter.css">
  </head>
  <body>
  	... your page content ...
   
  	<button class="startspotlighter">Show live help!<button>
	 
		... more of you page content ...
   
    <script src="//code.jquery.com/jquery-2.1.3.min.js"></script>
    <script src="js/jquery.spotlighter.min.js"></script>
    <script>
         $('.startspotlighter').spotlighter();	
    </script>
  </body>
</html>
			

Options

If you don't specify options, like in the example above, the plugin will use its default settings:

- json: false,
- json_file: '',
- default_spotlight_width: 150,
- showNumbers: true

These are the options:
Json

If true, use a JSON file to tell the script what to do. This is its structure:

[
	{
		"tipSeq": 1,
		"tipLink": "#download-button", /* <- can be any element */
		"tipText": "This is the explanatory text",
		"tipSize": 150,
		"adjustX" : -68, /* <- plus or minus number adjusts to the right or the left */
		"adjustY" : 20 		 /* <- plus or minus number adjusts up or down */
	},
	{
		"tipSeq": 2,
		"tipLink": "#download-button", /* <- can be any element */
		"tipText": "We're here to help
This is the explanatory text",
		"tipSize": 250,
		"adjustX" : 0,
		"adjustY" : 0
	}
]
					

Default spotlight width

If not specified, the default is 150px/p> default_spotlight_width: 150
Show sequence numbers

If true, the sequence number is shown above the spotlighter text
showNumbers: true

 
///////////////////////////////////////////////////////////////////
This jQuery plugin is part of my Playground - a collection of fun stuff I made in the past, from jQuery games and plugins to CSS animation tests.

Please drop in on the playground section of my portfolio site www.rayhyde.nl!
