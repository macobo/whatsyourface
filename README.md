# whatsyourface

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

WhatsYourFace is tool to bring your team closer together when working remotely.

![snapshot](https://raw.githubusercontent.com/macobo/whatsyourface/master/snapshot.png)

## Motivation

The world is kind of crazy right now and our team at [eAgronom](http://eagronom.com/) started working remotely as everyone else.

[One of the biggest downsides of working remotely is the feeling of isolation](https://lp.buffer.com/state-of-remote-work-2020) and not knowing whether someone is available to collaborate.

We even wrote about our experience using Pukka, a similar tool [here](https://eagronom.com/en/blog/working-remotely/), but the tool was having some reliability problems. So I decided to follow the advice set in ["An app can be a home-cooked meal"](https://www.robinsloan.com/notes/home-cooked-app/) and write a quick and dirty solution that would work for us at eAgronom.

Feel free to try it out and hope you will find some value in it.

## How we use it

We have hosted a version of this on heroku, where people who want can join.

In addition, we have a slack channel where people can share highlights and make jokes:

![highlight1](https://raw.githubusercontent.com/macobo/whatsyourface/master/highlight1.png)
![highlight2](https://raw.githubusercontent.com/macobo/whatsyourface/master/highlight2.png)
![highlight3](https://raw.githubusercontent.com/macobo/whatsyourface/master/highlight3.png)


## Overview of functionality

Whatsyourface takes a picture with your webcam every minute, and shares it with other active people.

Only the last image for every person is stored in-memory and wiped every restart - we're not here to spy on people!

In addition:

- You can add filters on top of images (who doesn't like good instagram filters?)
- Make it rain emojis (because why not?)

## Last words

Stay at home and stay sane.

Made with ♥️ by Karl, with support of the eAgronom team.
