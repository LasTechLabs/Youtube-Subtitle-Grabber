# YouTube Subtitle Grabber
## Table of Contents

1. [What is YouTube Subtitle grabber?](#what-is-youtube-subtitle-grabber)
2. [YSG system requirements](#ysg-requirements)
3. [How to Install YSG](#how-to-install-ysg)
4. [How to Run YSG](#how-to-run-ysg)
5. [How to Use YSG](#how-to-use-ysg)

![](https://pbs.twimg.com/media/EWxeNzzWAAAw6aB?format=jpg&name=large)

## What is YouTube Subtitle Grabber?<a name="what-is-youtube-subtitle-grabber"></a>

Writing the transcript for a YouTube video from scratch can be inconvenient and time consuming, but an easy way to solve this problem is to grab the captions from a YouTube video. 

Voila! You can have the entire video's transcript right there generated automatically! But as we've all experienced, this transcription isn't perfect, but it's a start. 

YouTube Subtitle Grabber (YSG) recognises this fact and gives an easy interface not only to download the subtitles from any YouTube video (as long as they've already been automatically generated for that video), but also a convenient way to format and edit them while being able to watch, pause and rewind the video at the same time!

Other benefits: 

- YSG is lightweight,
- YSG runs right on your computer, regardless of your OS,
- YSG can be accessed via mobile with the same easy interface as PC 

## YSG System Requirements:<a name="ysg-requirements"></a>

YSG is fairly lightweight, the only "requirement" is that nodeJS is installed on your computer (and you're comfortable using it's basic functions). 

The only other requirement is that you have your favourite web-browser installed, which you'll use to access the interface

## How to Install YSG:<a name="how-to-install-ysg"></a>

1. Download the contents of this repository using git clone or the download button at the top right hand corner. (Extract the files if necessary)
2. In the folder containing the files you've downloaded, run: `npm install`. This will install the necessary packages. 
    - **IMPORTANT NOTE:** by default, there will be npm 1 security audit warning. This is because the youtube-caption-scraper package (which isn't maintained by me) requires by default an old version of axios to be installed. This will have no effect on the performance of YSG *HOWEVER* if this warning is upsetting to you, do as follows:
        1. Run the command: `npm update youtube-caption-scraper` this *should* install the latest version of axios. 
        2. Delete the package-lock file
        3. Run the command: `npm install --package-lock`
        4. Running the command: `npm audit` should now return 0 vulnerabilities.
        5. If vulnerabilities are still detected, delete the axios folder from the node-modules folder, and re-install the latest version with the command: `npm install axios`
        6. In the package.json file in the youtube-caption-scraper folder within node-modules, edit the axios dependency version to the version you installed in (5.)
        7. Repeat steps 2, 3, 4.


## How to Run YSG:<a name="how-to-run-ysg"></a>

YSR is simple and easy to run on all your devices:

1. After installing YSG, simply run the command `npm start`
2. On the machine you ran it on, go to http://localhost:1235 in your favourite web-browser.
3. If you want to access it from a device on which it isn't directly running, but is on the same network (using the same wifi), simply go to <ipaddress>:1235, replacing "ipaddress" with the local ip address of the machine on which you ran npm start.
    - The easiest way to get your machines local address is using the `ipconfig` command on windows or `ifconfig` command on linux/mac

## How to use YSG:<a name="how-to-use-ysg"></a>

1. Ensure that Regular mode is selected
    - Project mode is a mode I used for a project, I'll probably delete in the future some time. Feel free to ignore it.
2. Copy/Paste a youtube video's URL into the Search Bar.
3. Hit "Search".
4. If Video Subtitles are found, they'll be compiled and appear in the text box, where they can be edited. The video from which they were taken will appear also, for convenience in editing the subtitles.
