### About

The [changewithin.py](https://github.com/mapbox/changewithin/blob/master/changewithin.py) script pulls [daily changes](http://planet.openstreetmap.org/)
from OpenStreetMap with `requests`, parses them with `lxml`, finds the ones that are inside
of a GeoJSON shape (in this case a national park), sorts out the ones that have tags set by the user, and emails a set of users
with [mailgun](http://www.mailgun.com/).

This script was forked from the [osmlab/changewithin](https://github.com/osmlab/changewithin) repository and enhanced to assist NPS iteratively explore integrating more OpenStreetMap geo data into the production of Park Tiles. Now the script has been improved to capture ways and nodes, with any tags set in the configuration file. This gives NPS access to all data from the changesets, and the control to tweak the amount of information monitored as they iterate on the Park Tiles data workflow.

**Reports are located in the lib directory.**

0 7 * * * ~/venv-changewithin/bin/python ~/lib/changewithin.py


#### Enhancements
 - Script detects changes in Great Smoky Mtn National park

 - Script now checks for ways **and nodes** that match tags set in configuration file

 - Improved output layout with detected contributions grouped by changeset, then by tag, see [example output](http://bl.ocks.org/davejohn/raw/1f843639983d55f4116a/) from February 19, 2014.


### Configuration

The one file that will require editing is [config.ini](https://github.com/mapbox/changewithin/blob/master/config.ini).

This configuration file sets the following:
 - email addresses to which the script will send reports
 - mailgun api key
 - GeoJSON file
 - tags for ways that you wish to retrieve with the script that fall within the GeoJSON boundaries
    - *these tags must be separated by commas only*


#### Output

The email templates for html can be edited within
the file `lib.py`.

The report itself contains a summary of changes, then lists each relevant changeset, its ID, then a summary of details by tag. The report will automatically generate a section for each tag entered in the configuration file. If there are no changes with a certain tag for that changeset, it will not appear. Furhter details also include the user who made the change and their comment, individual element IDs for building footprint and address changes that link to their history, and a map thumbnail that is centered on the location where the edits were made.

### Geography

#### Local files

Geographic areas for the script to run against are stored in the folder `/boundaries/`.

Since there aren't frequent changes in national parks at the moment, the script runs on a larger area surrounding Olympic National Park to display the change detetion capabilities.

As this screenshot shows, `olympic-park-large.geojson` extends beyond the boundaries of Olympic National Park.

![](http://i.imgur.com/AOYM2H8.png)

The actual park, stored in this repository as `olympic-park.geojson`, will return less results since there are infrequent contributions to parks on OSM.

You can also run the script against urban areas. Add `nyc.geojson` to the configuration file to see the relatively larger amount of contributions captured.


## Installation

Requires [wget](http://www.gnu.org/software/wget/) or [cURL ](http://curl.haxx.se/).

cURL typically comes pre-installed.

For Mac use [homebrew](http://brew.sh/) and one of:

    brew install wget
    brew install curl

    brew install python
 http://pypi.python.org/packages/source/l/lxml/lxml-3.3.5.tar.gz


Requires Python with [lxml](http://lxml.de/), [requests](http://docs.python-requests.org/),
[pystache](http://defunkt.io/pystache/), [PIL](http://effbot.org/imagingbook/),
and [ModestMaps](https://github.com/stamen/modestmaps-py).

Optionally [set up virtualenv](http://www.virtualenv.org/en/latest/#usage):

    virtualenv --no-site-packages venv-changewithin
    source venv-changewithin/bin/activate

Install libraries needed for fast XML processing and Python extensions.
For Ubuntu/Linux:

    apt-get install python-dev libxml2-dev libxslt1-dev

Install Python packages:

    pip install -r requirements.txt

## Running

    python changewithin.py

## Automating

Assuming the above installation, edit your [cron table](https://en.wikipedia.org/wiki/Cron) (`crontab -e`) to run the script once a day at 7:00am.

    0 7 * * * ~/path/to/changewithin/bin/python ~/path/to/changewithin/changewithin.py

    link in heroku
