require 'compass/import-once/activate'
# Require any additional compass plugins here.



# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "css"
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "js"
fonts_dir = "fonts"

# You can select your preferred output style here (can be overridden via the command line):
output_style = :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false

# to enable developing inspector to show info about SCSS files
sourcemap = true



# Disabled ?129837 cache buster on images 
# used through   `image-url()` mixin.
# De-comment this if you intend to use CDN
asset_cache_buster :none
