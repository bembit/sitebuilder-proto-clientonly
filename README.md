# Sitebuilder Prototype Snapshot

Felt emo, might continue.

## Low dependency client side only

A `proof on concept prototype` for a site builder.
Started as a design tool concept to test colors, fonts, ideas and concepts. But I couldn't just stop.

Not sure if I'll continue, don't feel like it mid AI hype season.

`Builds into 395kb, 121kb gzipped.`

I included a basic useable UI for it. UX is "not the strongest" atm..

## Dependencies
    "dexie": "^4.0.11",
    "react": "^19.0.0",
    "react-colorful": "^5.6.1",
    "react-dnd": "^16.0.1",
    "react-dnd-html5-backend": "^16.0.1",
    "react-dom": "^19.0.0"
-colorful can be removed just tested with it

## Features
- Fully client side
- IndexedDB for storing templates and app state using Dexie
- React DnD for drag and drop
- React Context for theme and state management
- Has templates
- Bin
- Setting
- UI
- Undo redo

## CRUD
- Can add text, image, heading, button elements
- Can add sections
- Can add custom templates
- Can save and load templates

## Handles images as base64 strings
- Can add images to elements
